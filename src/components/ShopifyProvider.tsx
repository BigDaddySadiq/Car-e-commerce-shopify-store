"use client";
import Script from "next/script";
import { createContext, useContext, useEffect, useState } from "react";
import {
  SHOPIFY_STORE_DOMAIN,
  SHOPIFY_STOREFRONT_TOKEN,
} from "@/lib/shopify";

type ShopifyStatus = "checking" | "ready" | "unavailable";

const ShopifyStatusContext = createContext<ShopifyStatus>("checking");

export function useShopifyStatus() {
  return useContext(ShopifyStatusContext);
}

export default function ShopifyProvider({ children }: { children: React.ReactNode }) {
  const [status, setStatus] = useState<ShopifyStatus>("checking");

  useEffect(() => {
    let active = true;

    const checkStore = async () => {
      try {
        const response = await fetch("/api/shopify/health", {
          cache: "no-store",
        });
        const data = await response.json();
        if (active) setStatus(data.available ? "ready" : "unavailable");
      } catch {
        if (active) setStatus("unavailable");
      }
    };

    void checkStore();
    const recoveryCheck = window.setInterval(checkStore, 60_000);

    return () => {
      active = false;
      window.clearInterval(recoveryCheck);
    };
  }, []);

  return (
    <ShopifyStatusContext.Provider value={status}>
      {status === "ready" && (
        <Script
          type="module"
          src="https://cdn.shopify.com/storefront/web-components.js"
          strategy="afterInteractive"
        />
      )}
      <shopify-store
        store-domain={SHOPIFY_STORE_DOMAIN}
        public-access-token={SHOPIFY_STOREFRONT_TOKEN}
      >
        {children}
        {status === "ready" && <shopify-cart id="cart" />}
      </shopify-store>
    </ShopifyStatusContext.Provider>
  );
}
