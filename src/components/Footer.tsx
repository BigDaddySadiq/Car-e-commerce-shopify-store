import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#050505] text-[#9A9A9A] border-t border-white/[0.04]">
      <div className="max-w-[1440px] mx-auto px-6 py-20 md:px-[8vw] grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
        
        {/* Column 1: Brand Logo & Tagline */}
        <div className="flex flex-col items-start gap-6">
          <Link href="/" className="group inline-flex flex-col items-start">
            <span className="font-bebas text-[24px] tracking-[10px] text-white leading-none uppercase">REAL</span>
            <div className="w-full h-[1px] bg-[#E8000D] my-[4px] transition-transform duration-300 group-hover:scale-x-110 origin-left" />
            <span className="font-bebas text-[24px] tracking-[10px] text-[#E8000D] leading-none uppercase">DRIVE</span>
          </Link>
          <div className="font-inter text-[13px] leading-relaxed max-w-[200px]">
            Own It In Your Hand First. Everything else follows.
          </div>
          <div className="font-inter text-[11px] tracking-[2px] uppercase text-[#E8000D]">
            Free Worldwide Shipping.
          </div>
        </div>

        {/* Column 2: Spacer */}
        <div className="hidden md:block"></div>

        {/* Column 3: Shop Nav */}
        <div className="flex flex-col gap-4">
          <div className="font-inter text-[11px] tracking-[4px] text-white uppercase mb-2">Shop</div>
          <Link href="/#the-cars" className="font-inter text-[14px] hover:text-white transition-colors">The Cars</Link>
          <Link href="/#faq" className="font-inter text-[14px] hover:text-white transition-colors">FAQs</Link>
          <Link href="/shop" className="font-inter text-[14px] hover:text-white transition-colors text-[#E8000D] font-semibold">Full Catalog</Link>
        </div>

        {/* Column 4: Legal Nav */}
        <div className="flex flex-col gap-4">
          <div className="font-inter text-[11px] tracking-[4px] text-white uppercase mb-2">Legal</div>
          <Link href="/policies#returns" className="font-inter text-[14px] hover:text-white transition-colors">Returns & Refunds</Link>
          <Link href="/policies#shipping" className="font-inter text-[14px] hover:text-white transition-colors">Shipping Policy</Link>
          <Link href="/policies#privacy" className="font-inter text-[14px] hover:text-white transition-colors">Privacy Policy</Link>
          <Link href="/policies#terms" className="font-inter text-[14px] hover:text-white transition-colors">Terms of Service</Link>
          <Link href="/policies#contact" className="font-inter text-[14px] hover:text-white transition-colors">Contact</Link>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-[8vw] py-8 border-t border-white/[0.04] flex flex-col md:flex-row justify-between items-center gap-4 font-inter text-[11px] tracking-[2px] uppercase">
        <div>&copy; {new Date().getFullYear()} REAL DRIVE. ALL RIGHTS RESERVED.</div>
        <div className="text-white/30">SHIPS WORLDWIDE</div>
      </div>
    </footer>
  );
}
