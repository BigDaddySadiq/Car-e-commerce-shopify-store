import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import MarqueeBanner from "@/components/MarqueeBanner";
import SwipeManifesto from "@/components/SwipeManifesto";
import Truth from "@/components/Truth";
import Collection from "@/components/Collection";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import ManifestBanner from "@/components/ManifestBanner";
import Footer from "@/components/Footer";

export default function Home() {
 return (
   <main className="min-h-screen bg-[#080808] selection:bg-[#E8000D] selection:text-white">
     <Navbar />
     <div className="pt-[64px]"><MarqueeBanner variant="dark" /></div>
     <Hero />
     <SwipeManifesto />
     <Truth />
     <Collection />
     <MarqueeBanner variant="red" />
     <TestimonialCarousel />
     <FAQ />
     <CTA />
     <ManifestBanner />
     <Footer />
   </main>
 );
}
