import type { MetadataRoute } from "next";

const SITE_URL = "https://futurity247.com.au";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/dashboard/", "/calls/", "/leads/", "/schedule/", "/billie/", "/insights/", "/settings/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
