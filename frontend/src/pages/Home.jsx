import Hero from "../components/Hero";
import FeaturedProperties from "../components/FeaturedProperties";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <main className="flex-1">
        {/* Hero (already premium) */}
        <Hero />

        {/* Featured Properties (already integrated) */}
        <FeaturedProperties />

        {/* Why choose us – modern grid */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-blue-600 bg-blue-50 px-4 py-2 rounded-full">
                Why EstatePro
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-4">
                The smarter way to find your home
              </h2>
              <p className="text-gray-500 mt-2 max-w-2xl mx-auto">
                We combine local expertise with a seamless digital experience to
                make your property journey effortless.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Card 1 */}
              <div className="group p-8 rounded-2xl border border-gray-100 bg-white hover:border-blue-200 hover:shadow-xl hover:shadow-blue-50 transition-all duration-300">
                <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center mb-5 group-hover:bg-blue-100 transition">
                  <svg
                    className="w-7 h-7 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Verified Listings
                </h3>
                <p className="text-gray-500 leading-relaxed">
                  Every property is personally vetted by our team. No fake ads,
                  no surprises – just genuine homes waiting for you.
                </p>
              </div>

              {/* Card 2 */}
              <div className="group p-8 rounded-2xl border border-gray-100 bg-white hover:border-blue-200 hover:shadow-xl hover:shadow-blue-50 transition-all duration-300">
                <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center mb-5 group-hover:bg-blue-100 transition">
                  <svg
                    className="w-7 h-7 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Lightning Fast Process
                </h3>
                <p className="text-gray-500 leading-relaxed">
                  From first contact to keys in hand, we streamline every step –
                  saving you time and stress.
                </p>
              </div>

              {/* Card 3 */}
              <div className="group p-8 rounded-2xl border border-gray-100 bg-white hover:border-blue-200 hover:shadow-xl hover:shadow-blue-50 transition-all duration-300">
                <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center mb-5 group-hover:bg-blue-100 transition">
                  <svg
                    className="w-7 h-7 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Dedicated Agents
                </h3>
                <p className="text-gray-500 leading-relaxed">
                  A personal expert is with you from start to finish – advising,
                  negotiating, and handling every detail.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="bg-gray-900 py-16 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-64 h-64 bg-blue-500 rounded-full filter blur-3xl" />
            <div className="absolute bottom-10 right-10 w-48 h-48 bg-blue-300 rounded-full filter blur-3xl" />
          </div>
          <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to find your perfect property?
            </h2>
            <p className="text-gray-300 mb-8 max-w-xl mx-auto">
              Join thousands of satisfied clients who found their dream home
              through EstatePro.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              {/* Phone call button */}
              <a
                href="tel:+21671234567"
                className="group bg-blue-500 text-white px-8 py-4 rounded-full font-semibold hover:bg-blue-600 transition shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                +216 71 234 567
              </a>

              {/* WhatsApp button */}
              <a
                href="https://wa.me/21612345678"
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-green-500 text-white px-8 py-4 rounded-full font-semibold hover:bg-green-600 transition shadow-lg shadow-green-500/30 flex items-center justify-center gap-2"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12.04 2C6.58 2 2.04 6.54 2.04 12c0 1.78.46 3.46 1.33 4.93L2 22l5.28-1.38A9.98 9.98 0 0012.04 22C17.5 22 22 17.46 22 12 22 6.54 17.5 2 12.04 2zM12 20.04a8.04 8.04 0 01-4.14-1.14l-.3-.18-3.17.83.84-3.08-.2-.31A8.03 8.03 0 014 12c0-4.41 3.59-8 8-8s8 3.59 8 8-3.59 8-8 8zm4.53-5.97c-.24-.12-1.4-.69-1.62-.77-.22-.08-.38-.12-.54.12-.16.24-.62.77-.76.93-.14.16-.28.18-.52.06-.24-.12-1.01-.37-1.92-1.18-.71-.63-1.19-1.4-1.33-1.64-.14-.24-.02-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.47-.4-.41-.54-.42h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.7 2.59 4.11 3.63.57.25 1.02.4 1.37.51.58.18 1.1.16 1.52.1.46-.07 1.4-.57 1.6-1.12.2-.55.2-1.02.14-1.12-.06-.1-.22-.16-.46-.28z" />
                </svg>
                WhatsApp
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
