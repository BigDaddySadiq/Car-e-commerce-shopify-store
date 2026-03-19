import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Shop() {
  return (
    <main className="min-h-screen bg-[#080808] selection:bg-[#E8000D] selection:text-white flex flex-col">
      <Navbar />
      <div className="flex-1 flex flex-col items-center justify-center pt-[64px] pb-20 px-6 mt-32 md:mt-0">
        <h1 className="font-bebas text-[clamp(48px,8vw,120px)] tracking-[2px] text-white uppercase text-center mb-6">SHOP FULL CATALOG</h1>
        <p className="font-inter text-[#9A9A9A] text-center max-w-lg mb-12">The full collection is currently curated. Please return shortly or claim your first piece from the home collection.</p>
        <a href="/#the-cars" className="inline-block font-bebas text-[16px] tracking-[4px] px-10 py-4 uppercase text-white bg-[#E8000D] btn-premium">
          BACK TO SHOWROOM
        </a>
      </div>
      <Footer />
    </main>
  );
}
