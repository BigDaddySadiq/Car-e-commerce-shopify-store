import type { NextConfig } from "next";
const nextConfig: NextConfig = {
 compress: true,
 images: {
   formats: ["image/avif", "image/webp"],
   minimumCacheTTL: 31536000,
   remotePatterns: [
     { protocol: "https", hostname: "images.unsplash.com" },
     { protocol: "https", hostname: "cdn.shopify.com" },
   ],
 },
 experimental: { optimizeCss: true },
 async headers() {
   return [
     { source: "/:path*.(jpg|jpeg|png|webp|avif|svg|ico|woff|woff2|ttf|otf)", headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }] },
     { source: "/:path*.(mp4|webm)", headers: [{ key: "Cache-Control", value: "public, max-age=604800, stale-while-revalidate=86400" }] },
     { source: "/(.*)", headers: [{ key: "X-Content-Type-Options", value: "nosniff" }, { key: "X-Frame-Options", value: "DENY" }] },
   ];
 },
 typescript: {
   ignoreBuildErrors: true,
 },
 eslint: {
   ignoreDuringBuilds: true,
 }
};
export default nextConfig;
