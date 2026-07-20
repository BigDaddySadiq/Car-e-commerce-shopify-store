import {
  SHOPIFY_API_VERSION,
  SHOPIFY_STOREFRONT_TOKEN,
  SHOPIFY_STORE_DOMAIN,
} from "@/lib/shopify";

const HEALTH_QUERY = `query StorefrontHealth { shop { name } }`;

export async function GET() {
  try {
    const response = await fetch(
      `${SHOPIFY_STORE_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_TOKEN,
        },
        body: JSON.stringify({ query: HEALTH_QUERY }),
        cache: "no-store",
        signal: AbortSignal.timeout(5000),
      },
    );

    const payload = response.ok ? await response.json() : null;
    const available = Boolean(payload?.data?.shop?.name);

    return Response.json(
      { available },
      {
        status: 200,
        headers: {
          "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
        },
      },
    );
  } catch {
    return Response.json(
      { available: false },
      {
        status: 200,
        headers: {
          "Cache-Control": "public, s-maxage=30, stale-while-revalidate=60",
        },
      },
    );
  }
}
