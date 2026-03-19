"use client";
import { useEffect, useState } from "react";

export default function ShopifyProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  return (
    <>
      {mounted ? (
        // @ts-ignore
        <shopify-store store-domain="https://reel-to-real-2.myshopify.com" public-access-token="c2d5c118eaba70c09bf70f2303c0105d">
          {children}
          {/* @ts-ignore */}
          <shopify-cart id="cart" />
        </shopify-store>
      ) : (
        <div className="opacity-0">{children}</div>
      )}
    </>
  );
}
