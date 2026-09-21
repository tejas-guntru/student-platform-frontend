import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/dashboard/",
        "/profile/",
        "/applications/",
        "/membership/",
        "/coding-profiles/",
        "/admin/",
      ],
    },

    sitemap: "https://www.trailbliz.in/sitemap.xml",
  };
}