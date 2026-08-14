import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Mail, Phone, MapPin, Send } from "lucide-react";

const ContactConcierge = () => {
  return (
    <div className="min-h-screen flex flex-col bg-stone-50 selection:bg-stone-200 selection:text-stone-900">
      <Navbar />

      <main className="flex-1 pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="max-w-3xl mx-auto text-center mb-16 animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-6">
            Contact <span className="italic font-serif text-stone-500 font-light">Concierge</span>
          </h1>
          <p className="text-lg text-stone-500 font-light leading-relaxed">
            Whether you need assistance booking a stay, arranging special requests, or simply have a question, our dedicated team is here to help.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Contact Details */}
          <div className="space-y-10 animate-fade-in-up delay-100">
            <div className="bg-white p-8 rounded-[2rem] border border-stone-200/60 shadow-sm space-y-8">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-stone-100 rounded-2xl flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-stone-900" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">Call Us</h3>
                  <p className="text-stone-500 font-light mb-2">Available Mon-Sat, 9am - 6pm (CET)</p>
                  <a href="tel:+21671234567" className="text-gray-900 font-bold hover:text-stone-500 transition-colors">+216 71 234 567</a>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-stone-100 rounded-2xl flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-stone-900" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">Email Us</h3>
                  <p className="text-stone-500 font-light mb-2">We typically reply within 24 hours.</p>
                  <a href="mailto:bonjour@darhote.tn" className="text-gray-900 font-bold hover:text-stone-500 transition-colors">bonjour@darhote.tn</a>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-stone-100 rounded-2xl flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-stone-900" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">Office</h3>
                  <p className="text-stone-500 font-light leading-relaxed">
                    123 Avenue Habib Bourguiba<br />
                    Tunis 1000, Tunisia
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 md:p-10 rounded-[2rem] border border-stone-200/60 shadow-sm animate-fade-in-up delay-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a message</h2>
            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-stone-700 mb-2">First Name</label>
                  <input type="text" className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-stone-900 outline-none transition-all" placeholder="John" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-stone-700 mb-2">Last Name</label>
                  <input type="text" className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-stone-900 outline-none transition-all" placeholder="Doe" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-stone-700 mb-2">Email Address</label>
                <input type="email" className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-stone-900 outline-none transition-all" placeholder="john@example.com" />
              </div>
              <div>
                <label className="block text-sm font-bold text-stone-700 mb-2">Message</label>
                <textarea rows="4" className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-stone-900 outline-none transition-all resize-none" placeholder="How can we help you?"></textarea>
              </div>
              <button type="button" className="w-full py-4 bg-gray-900 text-white font-bold rounded-xl hover:bg-stone-800 transition-all flex items-center justify-center gap-2 shadow-md">
                <Send className="w-4 h-4" /> Send Message
              </button>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ContactConcierge;