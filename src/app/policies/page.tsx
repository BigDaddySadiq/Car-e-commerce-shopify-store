import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Policies() {
  return (
    <main className="min-h-screen bg-[#080808] selection:bg-[#E8000D] selection:text-white flex flex-col">
      <Navbar />
      <div className="flex-1 pt-[120px] pb-32 px-6 md:px-[8vw] max-w-4xl mx-auto font-inter text-[#9A9A9A] w-full">
        <h1 className="font-bebas text-[64px] md:text-[80px] leading-none tracking-[2px] text-white mb-20 uppercase">LEGAL & POLICIES</h1>
        
        <div className="space-y-20">
          <section id="returns" className="scroll-mt-32">
            <h2 className="font-bebas text-3xl md:text-4xl text-white tracking-[2px] mb-6 uppercase">Returns & Refunds</h2>
            <p className="leading-relaxed mb-4">We offer a 30-day guarantee on any damaged or defective items. If your model arrives in anything less than perfect condition, we will replace it or issue a full refund immediately.</p>
            <p className="leading-relaxed">Please note that because of the premium nature of the sourcing and packaging, we do not accept change-of-mind returns once an order has been dispatched.</p>
          </section>

          <section id="shipping" className="scroll-mt-32">
            <h2 className="font-bebas text-3xl md:text-4xl text-white tracking-[2px] mb-6 uppercase">Shipping Policy</h2>
            <p className="leading-relaxed">We provide free international shipping on all orders, with no minimum spend required. Your order will be carefully packaged and dispatched within 1–2 business days. Delivery typically takes 6–12 business days worldwide. A tracking number will be sent via email once your order has shipped.</p>
          </section>

          <section id="privacy" className="scroll-mt-32">
            <h2 className="font-bebas text-3xl md:text-4xl text-white tracking-[2px] mb-6 uppercase">Privacy Policy</h2>
            <p className="leading-relaxed">Your privacy is fundamental to our business. We only collect the information necessary to process your order securely and improve your shopping experience. We do not and will never sell your personal data to third parties.</p>
          </section>

          <section id="terms" className="scroll-mt-32">
            <h2 className="font-bebas text-3xl md:text-4xl text-white tracking-[2px] mb-6 uppercase">Terms of Service</h2>
            <p className="leading-relaxed">By accessing our website and purchasing our luxury scale models, you agree to be bound by these terms. Real Drive reserves the right to update these policies at any time to reflect operational changes.</p>
          </section>

          <section id="contact" className="scroll-mt-32">
            <h2 className="font-bebas text-3xl md:text-4xl text-white tracking-[2px] mb-6 uppercase">Contact</h2>
            <p className="leading-relaxed">For any inquiries, requests, or post-purchase support, please reach out directly to our concierge team at <a href="mailto:support@realdrive.com" className="text-white underline hover:text-[#E8000D] transition-colors">support@realdrive.com</a>.</p>
          </section>
        </div>
      </div>
      <Footer />
    </main>
  );
}
