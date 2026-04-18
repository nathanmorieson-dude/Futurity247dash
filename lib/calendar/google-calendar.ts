import { google } from "googleapis";
import { getServerEnv } from "@/lib/env";

function getCalendarClient() {
  const env = getServerEnv();

  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY.replace(/\\n/g, "\n"),
    },
    scopes: ["https://www.googleapis.com/auth/calendar"],
  });

  return google.calendar({ version: "v3", auth });
}

export async function getOpenSlots({
  calendarId,
  start,
  end,
}: {
  calendarId: string;
  start: string;
  end: string;
}) {
  const calendar = getCalendarClient();
  const result = await calendar.freebusy.query({
    requestBody: {
      timeMin: start,
      timeMax: end,
      items: [{ id: calendarId }],
    },
  });

  const busy = result.data.calendars?.[calendarId]?.busy ?? [];
  return busy;
}

export async function createCalendarBooking({
  calendarId,
  summary,
  description,
  start,
  end,
}: {
  calendarId: string;
  summary: string;
  description: string;
  start: string;
  end: string;
}) {
  const calendar = getCalendarClient();
  const event = await calendar.events.insert({
    calendarId,
    requestBody: {
      summary,
      description,
      start: { dateTime: start },
      end: { dateTime: end },
    },
  });

  if (!event.data.id) {
    throw new Error("Calendar event was created without ID");
  }

  return event.data;
}
