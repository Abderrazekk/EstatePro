import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const TermsOfService = () => {
  return (
    <div className="min-h-screen flex flex-col bg-stone-50 selection:bg-stone-200 selection:text-stone-900">
      <Navbar />

      <main className="flex-1 pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
        <div className="bg-white p-8 md:p-16 rounded-[2rem] border border-stone-200/60 shadow-sm animate-fade-in-up">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-2">Terms of Service</h1>
          <p className="text-sm text-stone-500 font-bold tracking-widest uppercase mb-12">Effective Date: August 2026</p>

          <div className="space-y-8 text-stone-600 font-light leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">1. Agreement to Terms</h2>
              <p>
                These Terms of Service constitute a legally binding agreement made between you and DarHôte concerning your access to and use of the website as well as any other media form, media channel, mobile website or mobile application related, linked, or otherwise connected thereto.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">2. Bookings and Payments</h2>
              <p>
                By booking a property on DarHôte, you agree to pay all charges associated with your booking, including the nightly rate, applicable taxes, and any cleaning fees. Payments are processed securely via our third-party payment providers. DarHôte acts as an intermediary between the guest and the property host.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">3. User Responsibilities</h2>
              <p className="mb-4">As a user of our platform, you agree to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide accurate, current, and complete registration information.</li>
                <li>Respect the property rules as stated by the host on the property listing page.</li>
                <li>Not use the site for any illegal or unauthorized purpose.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">4. Liability</h2>
              <p>
                DarHôte is not liable for any injuries, damages, or losses sustained during a stay at a property booked through our platform. All disputes related to the property condition or experience must be handled primarily between the guest and the host.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">5. Modifications to Terms</h2>
              <p>
                We reserve the right, in our sole discretion, to make changes or modifications to these Terms of Service at any time and for any reason. We will alert you about any changes by updating the "Effective Date" of these terms.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TermsOfService;