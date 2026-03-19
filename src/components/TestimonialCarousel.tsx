"use client";
import { motion } from "framer-motion";

const REVIEWS = [
  { img: "/us-t1.jpg", text: "The details are insane. Sits right next to my monitor as a daily reminder of the goal.", name: "James C.", city: "Miami, FL" },
  { img: "/us-t2.jpg", text: "Heavy, premium feel. Exactly what I needed for the home office setup.", name: "Michael T.", city: "Austin, TX" },
  { img: "/us-t3.jpg", text: "It's the first thing I see when I sit down to work. Absolute perfection.", name: "David R.", city: "New York, NY" },
  { img: "/us-t4.jpg", text: "Pictures don't do it justice. The paint finish looks incredible under my desk lamp.", name: "Alex P.", city: "Los Angeles, CA" },
  { img: "/us-t5.jpg", text: "Bought one for myself and one for my business partner. We're both obsessed.", name: "Marcus W.", city: "Chicago, IL" },
  { img: "/us-t6.jpg", text: "Keeps me focused on the bigger picture. Best $50 I've spent for the desk.", name: "Thomas L.", city: "Denver, CO" }
];

export default function TestimonialCarousel() {
  return (
    <section className="bg-white py-[100px] px-6 md:px-[8vw] text-black">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        <div className="font-bebas text-[48px] md:text-[64px] tracking-[2px] leading-none mb-4 uppercase text-center">
          REAL DESKS. REAL DRIVES.
        </div>
        <div className="font-inter text-[14px] text-[#4A4A4A] tracking-[1px] uppercase mb-16 flex items-center gap-3">
          <div className="flex gap-1 text-[#C9A84C]">
            ★★★★★
          </div>
          4.9 · 200+ VERIFIED REVIEWS
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
          {REVIEWS.map((review, i) => (
            <motion.div 
              key={i}
              initial={{opacity:0, y:30}}
              whileInView={{opacity:1, y:0}}
              viewport={{once:true, margin:"-10%"}}
              transition={{duration:0.6, delay: i * 0.1}}
              className="bg-[#F8F8F8] border border-[#EAEAEA] flex flex-col"
            >
              <div className="w-full aspect-square bg-[#E8E8E8] overflow-hidden">
                <img src={review.img} alt="Desk setup review" className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <div className="text-[#C9A84C] text-[18px] mb-4">★★★★★</div>
                <p className="font-inter text-[16px] leading-[1.6] text-black font-medium flex-grow mb-6">
                  "{review.text}"
                </p>
                <div className="font-inter text-[12px] text-[#8A8A8A] tracking-[1px] uppercase">
                  <span className="font-bold text-black">{review.name}</span> · {review.city}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
