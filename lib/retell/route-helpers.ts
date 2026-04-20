import { NextResponse } from "next/server";
import { z } from "zod";
import {
  RETELL_SIGNATURE_HEADER,
  verifyRetellSignature,
} from "@/lib/retell/signature";

export interface HandledRequest<T> {
  ok: true;
  data: T;
  rawBody: string;
}

export interface RejectedRequest {
  ok: false;
  response: NextResponse;
}

export async function parseRetellRequest<T extends z.ZodTypeAny>(
  req: Request,
  schema: T
): Promise<HandledRequest<z.infer<T>> | RejectedRequest> {
  const rawBody = await req.text();

  const sig = req.headers.get(RETELL_SIGNATURE_HEADER);
  const verify = verifyRetellSignature({ rawBody, headerSignature: sig });
  if (!verify.ok) {
    console.warn("Retell signature verification failed:", verify.reason);
    return {
      ok: false,
      response: NextResponse.json(
        { error: "invalid_signature", reason: verify.reason },
        { status: 401 }
      ),
    };
  }

  let json: unknown;
  try {
    json = JSON.parse(rawBody);
  } catch {
    return {
      ok: false,
      response: NextResponse.json(
        { error: "invalid_json" },
        { status: 400 }
      ),
    };
  }

  const parsed = schema.safeParse(json);
  if (!parsed.success) {
    console.warn(
      "Retell request failed zod validation:",
      parsed.error.flatten()
    );
    return {
      ok: false,
      response: NextResponse.json(
        {
          error: "invalid_request",
          issues: parsed.error.flatten(),
        },
        { status: 400 }
      ),
    };
  }

  return { ok: true, data: parsed.data, rawBody };
}

export function jsonOk<T>(data: T, init: ResponseInit = {}) {
  return NextResponse.json(data, { status: 200, ...init });
}
