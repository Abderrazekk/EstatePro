import { useEffect, useState } from "react";
import Hero from "../components/Hero";
import FeaturedProperties from "../components/FeaturedProperties";
import PromoBanner from "../components/PromoBanner";
import Sponsors from "../components/Sponsors";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import {
  ShieldCheck,
  Clock,
  HeartHandshake,
  Phone,
  MessageCircle,
  Compass,
  ArrowRight,
  Sparkles,
} from "lucide-react";

const useScrollReveal = (threshold = 0.15) => {
  const [isVisible, setIsVisible] = useState(false);
  const [element, setElement] = useState(null);

  useEffect(() => {
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [element, threshold]);

  return [setElement, isVisible];
};

const Home = () => {
  const [destinationsRef, destinationsVisible] = useScrollReveal();
  const [artisanRef, artisanVisible] = useScrollReveal();
  const [promiseRef, promiseVisible] = useScrollReveal();
  const [ctaRef, ctaVisible] = useScrollReveal();

  const destinations = [
    {
      name: "Djerba Island",
      tagline: "White Domes & Olive Groves",
      count: "42 Stays",
      image:
        "https://images.unsplash.com/photo-1540555700478-4be289fbecef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Sidi Bou Saïd",
      tagline: "Cobblestone & Cobalt Blue",
      count: "28 Stays",
      image:
        "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Tozeur & Sahara",
      tagline: "Brick Architecture & Desert Palms",
      count: "19 Stays",
      image:
        "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Tunis Medina",
      tagline: "Historical Palaces & Courtyards",
      count: "34 Stays",
      image:
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#0A0A0A] selection:bg-[#0A0A0A] selection:text-white">
      <Navbar />

      <main className="flex-1">
        <Hero />

        {/* Interactive 3D Destination Section */}
        <section
          ref={destinationsRef}
          className="py-24 bg-white border-t border-neutral-100 overflow-hidden"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
              <div>
                <span className="inline-flex items-center gap-2 text-[10px] font-black tracking-[0.25em] uppercase text-neutral-400 bg-neutral-50 border border-neutral-200 px-4 py-2 rounded-full mb-4">
                  <Compass className="w-3.5 h-3.5 text-[#0A0A0A]" />
                  Iconic Destinations
                </span>
                <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[#0A0A0A]">
                  Explore by{" "}
                  <span className="font-serif italic font-normal">Region</span>
                </h2>
              </div>
              <Link
                to="/properties"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0A0A0A] hover:underline"
              >
                <span>View All Regions</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {destinations.map((dest, i) => (
                <Link
                  key={dest.name}
                  to={`/properties?location=${encodeURIComponent(dest.name)}`}
                  className={`group relative h-[420px] rounded-[2.5rem] overflow-hidden border border-neutral-200/80 shadow-lg transform-gpu hover:-translate-y-3 transition-all duration-500 ${
                    destinationsVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-12"
                  }`}
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <img
                    src={dest.image}
                    alt={dest.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Glass Pane Floating Content Layer */}
                  <div className="absolute bottom-6 left-6 right-6 p-6 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-xl group-hover:bg-white/20 transition-all duration-300">
                    <span className="text-[10px] font-black uppercase tracking-widest text-amber-300 block mb-1">
                      {dest.count}
                    </span>
                    <h3 className="text-2xl font-extrabold tracking-tight mb-1">
                      {dest.name}
                    </h3>
                    <p className="text-xs text-neutral-200 font-light truncate">
                      {dest.tagline}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <FeaturedProperties />

        {/* The Artisan Experience - Modern Minimalist Editorial Section */}
        <section
          ref={artisanRef}
          className="py-24 bg-neutral-50 border-y border-neutral-200/80"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div
                className={`transition-all duration-700 ${
                  artisanVisible
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-12"
                }`}
              >
                <span className="inline-flex items-center gap-2 text-[10px] font-black tracking-[0.25em] uppercase text-neutral-400 bg-white border border-neutral-200 px-4 py-2 rounded-full mb-6">
                  <Sparkles className="w-3.5 h-3.5 text-[#0A0A0A]" />
                  The Artisan Concierge
                </span>
                <h2 className="text-4xl sm:text-5xl font-extrabold text-[#0A0A0A] tracking-tight mb-6 leading-tight">
                  More than a reservation. <br />
                  <span className="font-serif italic font-normal">
                    A curated journey.
                  </span>
                </h2>
                <p className="text-neutral-600 leading-relaxed font-light mb-8 text-base sm:text-lg">
                  Every home listed on Borgogo represents authentic
                  architecture, regional gastronomy, and personal Tunisian
                  hospitality. Our concierge arranges private chefs, artisan
                  craft workshops, and tailored desert excursions.
                </p>

                <div className="space-y-4">
                  <div className="p-5 rounded-2xl bg-white border border-neutral-200/80 shadow-sm flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-[#0A0A0A] text-white flex items-center justify-center shrink-0 font-extrabold text-xs">
                      01
                    </div>
                    <div>
                      <h4 className="font-extrabold text-[#0A0A0A] text-base mb-1">
                        Personalized Local Welcome
                      </h4>
                      <p className="text-xs text-neutral-500 leading-relaxed font-light">
                        Greetings from house owners with traditional mint tea
                        and homemade Tunisian pastries.
                      </p>
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl bg-white border border-neutral-200/80 shadow-sm flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-[#0A0A0A] text-white flex items-center justify-center shrink-0 font-extrabold text-xs">
                      02
                    </div>
                    <div>
                      <h4 className="font-extrabold text-[#0A0A0A] text-base mb-1">
                        Verified Quality Guarantee
                      </h4>
                      <p className="text-xs text-neutral-500 leading-relaxed font-light">
                        Every listing is inspected for luxury hygiene standards,
                        guest safety, and authentic charm.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Editorial Frame Visual */}
              <div
                className={`relative transition-all duration-700 delay-200 ${
                  artisanVisible
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-12"
                }`}
              >
                <div className="relative rounded-[2.5rem] overflow-hidden border-2 border-[#0A0A0A] shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                    alt="Tunisian Maison d'Hote Interior"
                    className="w-full h-[520px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-8 left-8 right-8 p-6 bg-white/90 backdrop-blur-md rounded-3xl border border-white text-[#0A0A0A]">
                    <p className="font-serif italic text-lg mb-2">
                      "An unforgettable stay in the heart of the Sidi Bou Saïd
                      cliffside."
                    </p>
                    <p className="text-xs font-black uppercase tracking-widest text-neutral-400">
                      — Verified Borgogo Guest
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <PromoBanner />
        <Sponsors />

        {/* Why Choose Us - The Borgogo Standard */}
        <section ref={promiseRef} className="py-24 bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div
              className={`text-center mb-20 transition-all duration-700 ${
                promiseVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <span className="inline-flex items-center gap-2 text-[10px] font-black tracking-[0.25em] uppercase text-neutral-400 bg-neutral-50 border border-neutral-200 px-4 py-2 rounded-full mb-4">
                The Borgogo Standard
              </span>
              <h2 className="text-4xl sm:text-5xl font-extrabold text-[#0A0A0A] tracking-tight">
                Crafted for{" "}
                <span className="font-serif italic font-normal">
                  Tranquility
                </span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div
                className={`p-10 rounded-[2.5rem] border border-neutral-200/80 bg-white hover:border-[#0A0A0A] shadow-sm hover:shadow-2xl transition-all duration-500 transform-gpu hover:-translate-y-2 ${
                  promiseVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-12"
                }`}
              >
                <div className="w-14 h-14 bg-[#0A0A0A] rounded-2xl flex items-center justify-center text-white mb-8 shadow-md">
                  <ShieldCheck className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-extrabold text-[#0A0A0A] mb-3 tracking-tight">
                  Hand-Verified Stays
                </h3>
                <p className="text-neutral-500 leading-relaxed font-light text-sm">
                  Every guesthouse is inspected by our local architecture team.
                  No surprises—only genuine, high-end hospitality.
                </p>
              </div>

              <div
                className={`p-10 rounded-[2.5rem] border border-neutral-200/80 bg-white hover:border-[#0A0A0A] shadow-sm hover:shadow-2xl transition-all duration-500 transform-gpu hover:-translate-y-2 delay-100 ${
                  promiseVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-12"
                }`}
              >
                <div className="w-14 h-14 bg-[#0A0A0A] rounded-2xl flex items-center justify-center text-white mb-8 shadow-md">
                  <Clock className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-extrabold text-[#0A0A0A] mb-3 tracking-tight">
                  Seamless Booking
                </h3>
                <p className="text-neutral-500 leading-relaxed font-light text-sm">
                  Instant reservation confirmation with direct host
                  communication and transparent pricing with no hidden charges.
                </p>
              </div>

              <div
                className={`p-10 rounded-[2.5rem] border border-neutral-200/80 bg-white hover:border-[#0A0A0A] shadow-sm hover:shadow-2xl transition-all duration-500 transform-gpu hover:-translate-y-2 delay-200 ${
                  promiseVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-12"
                }`}
              >
                <div className="w-14 h-14 bg-[#0A0A0A] rounded-2xl flex items-center justify-center text-white mb-8 shadow-md">
                  <HeartHandshake className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-extrabold text-[#0A0A0A] mb-3 tracking-tight">
                  Dedicated Concierge
                </h3>
                <p className="text-neutral-500 leading-relaxed font-light text-sm">
                  24/7 dedicated guest support assisting with local transport,
                  private catering, and custom excursion planning.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* High-Contrast CTA Banner */}
        <section
          ref={ctaRef}
          className="bg-[#0A0A0A] text-white py-24 relative overflow-hidden"
        >
          <div
            className={`relative z-10 max-w-4xl mx-auto px-4 text-center transition-all duration-700 ${
              ctaVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <h2 className="text-4xl sm:text-6xl font-extrabold mb-6 tracking-tight leading-tight">
              Ready to experience{" "}
              <span className="font-serif italic font-normal text-neutral-300">
                unrivaled serenity?
              </span>
            </h2>
            <p className="text-neutral-400 mb-10 text-lg font-light max-w-xl mx-auto leading-relaxed">
              Connect with our concierge today to curate your next Tunisian
              luxury escape.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4 items-center">
              <a
                href="tel:+21671234567"
                className="w-full sm:w-auto bg-white text-[#0A0A0A] px-10 py-4 rounded-full font-bold uppercase tracking-wider text-xs hover:bg-neutral-100 transition-all shadow-xl hover:scale-105 flex items-center justify-center gap-3"
              >
                <Phone className="w-4 h-4" />
                +216 71 234 567
              </a>
              <a
                href="https://wa.me/21612345678"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto border border-neutral-700 text-white px-10 py-4 rounded-full font-bold uppercase tracking-wider text-xs hover:bg-neutral-900 transition-all flex items-center justify-center gap-3"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                WhatsApp Concierge
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
