// frontend/src/pages/Home.jsx
import Hero from "../components/Hero";
import FeaturedProperties from "../components/FeaturedProperties";
import Sponsors from "../components/Sponsors"; // Imported Sponsors component
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import {
  ShieldCheck,
  Clock,
  HeartHandshake,
  Phone,
  MessageCircle,
} from "lucide-react";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white selection:bg-stone-200 selection:text-stone-900">
      {/* Custom Keyframe Animations */}
      <style>{`
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0;
        }
        .delay-100 { animation-delay: 100ms; }
        .delay-200 { animation-delay: 200ms; }
        .delay-300 { animation-delay: 300ms; }
      `}</style>

      <Navbar />

      <main className="flex-1">
        {/* Hero */}
        <Hero />

        {/* Featured Properties */}
        <FeaturedProperties />

        {/* Dynamic Infinite Moving Sponsors Marquee */}
        <Sponsors />

        {/* Why choose us – Refined DarHôte Elegance */}
        <section className="py-24 bg-stone-50 overflow-hidden relative">
          {/* Decorative subtle background pattern */}
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(#000 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          ></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Section Header */}
            <div className="text-center mb-20 animate-fade-in-up">
              <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase text-stone-500 bg-white border border-stone-200 px-4 py-2 rounded-full shadow-sm mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-stone-800"></span>
                The DarHôte Promise
              </span>
              <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
                Curated for{" "}
                <span className="italic font-serif text-stone-500 font-light">
                  tranquility
                </span>
              </h2>
              <p className="text-stone-500 mt-6 max-w-2xl mx-auto text-lg leading-relaxed font-light">
                We combine local expertise with a seamless digital experience,
                ensuring your getaway is effortless from booking to checkout.
              </p>
            </div>

            {/* Feature Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              {/* Card 1 */}
              <div className="group animate-fade-in-up delay-100 p-10 rounded-[2rem] border border-stone-200/60 bg-white hover:border-stone-300 hover:shadow-2xl hover:shadow-stone-200/50 transition-all duration-500 hover:-translate-y-2">
                <div className="w-16 h-16 bg-stone-50 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-gray-900 transition-colors duration-500">
                  <ShieldCheck className="w-8 h-8 text-stone-700 group-hover:text-white transition-colors duration-500 stroke-[1.5]" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 tracking-tight">
                  Hand-Verified Stays
                </h3>
                <p className="text-stone-500 leading-relaxed font-light">
                  Every guesthouse is personally vetted by our local team. No
                  hidden surprises—just authentic, beautiful homes waiting for
                  you.
                </p>
              </div>

              {/* Card 2 */}
              <div className="group animate-fade-in-up delay-200 p-10 rounded-[2rem] border border-stone-200/60 bg-white hover:border-stone-300 hover:shadow-2xl hover:shadow-stone-200/50 transition-all duration-500 hover:-translate-y-2">
                <div className="w-16 h-16 bg-stone-50 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-gray-900 transition-colors duration-500">
                  <Clock className="w-8 h-8 text-stone-700 group-hover:text-white transition-colors duration-500 stroke-[1.5]" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 tracking-tight">
                  Effortless Booking
                </h3>
                <p className="text-stone-500 leading-relaxed font-light">
                  From browsing to instant confirmation, our streamlined
                  platform is designed to save you time and eliminate stress.
                </p>
              </div>

              {/* Card 3 */}
              <div className="group animate-fade-in-up delay-300 p-10 rounded-[2rem] border border-stone-200/60 bg-white hover:border-stone-300 hover:shadow-2xl hover:shadow-stone-200/50 transition-all duration-500 hover:-translate-y-2">
                <div className="w-16 h-16 bg-stone-50 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-gray-900 transition-colors duration-500">
                  <HeartHandshake className="w-8 h-8 text-stone-700 group-hover:text-white transition-colors duration-500 stroke-[1.5]" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 tracking-tight">
                  Dedicated Concierge
                </h3>
                <p className="text-stone-500 leading-relaxed font-light">
                  Enjoy round-the-clock support from our dedicated team, ready
                  to assist with special requests and local recommendations.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Banner – Monochromatic & Premium */}
        <section className="bg-gray-900 py-24 relative overflow-hidden">
          {/* Abstract soft lighting blobs */}
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div
              className="absolute -top-24 -left-24 w-96 h-96 bg-stone-500 rounded-full mix-blend-screen filter blur-[100px] animate-pulse"
              style={{ animationDuration: "4s" }}
            />
            <div
              className="absolute -bottom-24 -right-24 w-96 h-96 bg-stone-400 rounded-full mix-blend-screen filter blur-[100px] animate-pulse"
              style={{ animationDuration: "6s" }}
            />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto px-4 text-center animate-fade-in-up">
            <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight leading-tight">
              Ready to find your{" "}
              <span className="italic font-serif text-stone-400 font-light">
                perfect retreat?
              </span>
            </h2>
            <p className="text-stone-300 mb-12 text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto">
              Connect with our experts today. We are here to help you curate an
              unforgettable experience in Tunisia's most beautiful homes.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-6 items-center">
              {/* Phone call button */}
              <a
                href="tel:+21671234567"
                className="w-full sm:w-auto group bg-white text-gray-900 px-10 py-5 rounded-full font-bold hover:bg-stone-100 transition-all duration-300 shadow-xl shadow-black/20 hover:-translate-y-1 flex items-center justify-center gap-3 text-lg"
              >
                <Phone className="w-5 h-5 text-stone-600 group-hover:text-gray-900 transition-colors" />
                +216 71 234 567
              </a>

              {/* WhatsApp button */}
              <a
                href="https://wa.me/21612345678"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto group bg-transparent border border-stone-500 text-white px-10 py-5 rounded-full font-bold hover:bg-stone-800 hover:border-stone-400 transition-all duration-300 flex items-center justify-center gap-3 text-lg"
              >
                <MessageCircle className="w-5 h-5 text-stone-400 group-hover:text-white transition-colors" />
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
