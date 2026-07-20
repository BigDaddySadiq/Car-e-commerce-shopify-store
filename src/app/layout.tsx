import type { Metadata, Viewport } from "next";
import { Inter, Bebas_Neue } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import ClientWrapper from "@/components/ClientWrapper";
import ShopifyProvider from "@/components/ShopifyProvider";
import { MetaPixel } from "@/components/MetaPixel";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", weight: ["400","500","600"] });
const bebas = Bebas_Neue({ subsets: ["latin"], weight: "400", variable: "--font-bebas" });

export const metadata: Metadata = {
 title: "Real Drive — Own It In Your Hand First",
 description: "Premium 1:32 die-cast scale models. Red Tesla Roadster Convertible. Lamborghini Huracán STO. Porsche 911 GT3 RS.",
 icons: {
   icon: [{ url: "/favicon.svg", type: "image/svg+xml" }, { url: "/favicon.ico" }],
   shortcut: "/favicon.svg", apple: "/favicon.svg",
 },
};
export const viewport: Viewport = { themeColor: "#080808" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
 return (
   <html lang="en">
     <head>
       <link rel="preload" as="image" href="/assets/hero/hero-tesla.webp" fetchPriority="high" />
     </head>
     <body className={`${inter.variable} ${bebas.variable} antialiased bg-[#080808] text-white`}>
       <CustomCursor />
       <MetaPixel />
       <ShopifyProvider>
         <ClientWrapper>{children}</ClientWrapper>
       </ShopifyProvider>
     </body>
   </html>
 );
}
