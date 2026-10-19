import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

/**
 * /robots.txt
 *
 * Everything public is crawlable, including by AI search crawlers - being
 * cited by ChatGPT, Perplexity, Claude, Gemini and Copilot is a goal, so
 * GPTBot, PerplexityBot, ClaudeBot, Google-Extended etc. are explicitly
 * allowed. Only the JSON API routes are excluded (they are not pages).
 */
export default function robots(): MetadataRoute.Robots {
  const disallow = ["/api/", "/preview/"];
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow },
      // AI search / answer engines - allow so the site can be cited
      { userAgent: "GPTBot", allow: "/", disallow },
      { userAgent: "ChatGPT-User", allow: "/", disallow },
      { userAgent: "OAI-SearchBot", allow: "/", disallow },
      { userAgent: "PerplexityBot", allow: "/", disallow },
      { userAgent: "Perplexity-User", allow: "/", disallow },
      { userAgent: "ClaudeBot", allow: "/", disallow },
      { userAgent: "Claude-User", allow: "/", disallow },
      { userAgent: "Claude-SearchBot", allow: "/", disallow },
      { userAgent: "anthropic-ai", allow: "/", disallow },
      { userAgent: "Google-Extended", allow: "/", disallow },
      { userAgent: "Applebot", allow: "/", disallow },
      { userAgent: "Applebot-Extended", allow: "/", disallow },
      { userAgent: "Bingbot", allow: "/", disallow },
      { userAgent: "DuckAssistBot", allow: "/", disallow },
      { userAgent: "Amazonbot", allow: "/", disallow },
      { userAgent: "meta-externalagent", allow: "/", disallow },
      { userAgent: "YouBot", allow: "/", disallow },
      { userAgent: "cohere-ai", allow: "/", disallow },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
