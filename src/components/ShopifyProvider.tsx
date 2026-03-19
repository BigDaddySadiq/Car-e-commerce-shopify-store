"use client";
export default function ShopifyProvider({ children }: { children: React.ReactNode }) {
 return (
   <>
     {children}
     {/* @ts-expect-error custom element */}
     <shopify-cart id="cart" />
   </>
 );
}
