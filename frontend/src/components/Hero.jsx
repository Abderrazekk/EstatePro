import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // ✅ import

const Hero = () => {
  const { user } = useAuth(); // ✅ get user

  return (
    <section className="relative min-h-[90vh] flex items-center bg-white overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-stone-50 to-transparent -z-10" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left column – Text */}
          <div className="space-y-8">
            <div className="space-y-4">
              <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-blue-600 bg-blue-50 px-4 py-2 rounded-full">
                Premium Real Estate
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-[1.1]">
                Discover{" "}
                <span className="relative inline-block">
                  exceptional
                  <svg
                    className="absolute -bottom-2 left-0 w-full h-3 text-blue-300"
                    viewBox="0 0 100 10"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M0 5 Q 25 10 50 5 Q 75 0 100 5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="6"
                    />
                  </svg>
                </span>{" "}
                properties in Tunisia
              </h1>
            </div>

            <p className="text-lg text-gray-500 max-w-xl leading-relaxed">
              From sleek city apartments to sprawling coastal villas, our
              curated collection matches discerning buyers with their ideal
              homes.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                to="/properties"
                className="bg-gray-900 text-white px-8 py-4 rounded-full font-medium hover:bg-gray-800 transition-all duration-300 shadow-lg shadow-gray-200 hover:shadow-xl hover:-translate-y-0.5"
              >
                View Properties
              </Link>
              {/* ✅ Only show "Create Account" if NOT logged in */}
              {!user && (
                <Link
                  to="/register"
                  className="border border-gray-200 text-gray-700 px-8 py-4 rounded-full font-medium hover:bg-gray-50 transition-all duration-300"
                >
                  Create Account
                </Link>
              )}
            </div>

            {/* Mini stats */}
            <div className="flex gap-10 pt-4 border-t border-gray-100">
              <div>
                <p className="text-2xl font-bold text-gray-900">500+</p>
                <p className="text-sm text-gray-400">Properties</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">98%</p>
                <p className="text-sm text-gray-400">Client Satisfaction</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">15y</p>
                <p className="text-sm text-gray-400">Experience</p>
              </div>
            </div>
          </div>

          {/* Right column – Image */}
          <div className="relative">
            <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl shadow-gray-200">
              <img
                src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Luxury villa with pool"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-6 flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-gray-900">Verified</p>
                <p className="text-sm text-gray-500">by EstatePro</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
