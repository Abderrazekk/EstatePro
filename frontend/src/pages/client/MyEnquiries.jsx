import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import {
  MapPin,
  MessageSquare,
  Calendar,
  ImageOff,
  Inbox,
  Sparkles,
  Clock,
  CheckCircle2,
  XCircle,
  Eye,
  ArrowRight,
  Receipt,
} from "lucide-react";

const statusConfig = {
  pending: {
    label: "Pending Review",
    badge: "bg-amber-50 text-amber-800 border-amber-200/80",
    icon: Clock,
  },
  unread: {
    label: "Pending Review",
    badge: "bg-amber-50 text-amber-800 border-amber-200/80",
    icon: Clock,
  },
  read: {
    label: "Under Review",
    badge: "bg-sky-50 text-sky-800 border-sky-200/80",
    icon: Eye,
  },
  confirmed: {
    label: "Confirmed Stay",
    badge: "bg-emerald-50 text-emerald-800 border-emerald-200/80",
    icon: CheckCircle2,
  },
  refused: {
    label: "Declined",
    badge: "bg-rose-50 text-rose-800 border-rose-200/80",
    icon: XCircle,
  },
};

const MyEnquiries = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEnquiries = async () => {
      try {
        const res = await axios.get("/api/enquiries/mine");
        setEnquiries(res.data || []);
      } catch (error) {
        console.error("Failed to load enquiries:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEnquiries();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-stone-50/50">
        <Navbar />
        <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 py-12 w-full animate-pulse">
          <div className="h-8 w-56 bg-stone-200 rounded-full mb-8" />
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white border border-stone-200 rounded-3xl p-6 flex flex-col sm:flex-row gap-6"
              >
                <div className="sm:w-44 h-32 bg-stone-100 rounded-2xl shrink-0" />
                <div className="flex-1 space-y-3 py-1">
                  <div className="h-5 w-1/3 bg-stone-100 rounded-lg" />
                  <div className="h-4 w-1/4 bg-stone-100 rounded-lg" />
                  <div className="h-4 w-3/4 bg-stone-100 rounded-lg" />
                </div>
              </div>
            ))}
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-stone-50/50 selection:bg-stone-200 selection:text-stone-900">
      <Navbar />

      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        {/* Header Section */}
        <div className="mb-10 text-center sm:text-left">
          <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase text-stone-500 bg-white border border-stone-200 px-4 py-2 rounded-full shadow-sm mb-3">
            <Sparkles className="w-3.5 h-3.5 text-stone-700" />
            Booking History
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            My Reservations
          </h1>
          <p className="text-stone-500 mt-2 text-base font-light">
            Review and track all your luxury stay requests and host responses.
          </p>
        </div>

        {/* Empty State */}
        {enquiries.length === 0 ? (
          <div className="bg-white border border-stone-200/80 rounded-3xl py-16 px-6 text-center shadow-sm">
            <div className="w-16 h-16 rounded-full bg-stone-100 text-stone-700 border border-stone-200 flex items-center justify-center mx-auto mb-4">
              <Inbox className="w-8 h-8" strokeWidth={1.5} />
            </div>
            <h3 className="text-xl font-bold text-gray-900">
              No Reservations Yet
            </h3>
            <p className="text-stone-500 text-sm mt-2 max-w-md mx-auto font-light leading-relaxed">
              You haven't submitted booking enquiries to any host yet. Explore
              our curated residences to plan your next retreat.
            </p>
            <Link
              to="/properties"
              className="inline-flex items-center gap-2 mt-6 px-6 py-3.5 bg-gray-900 hover:bg-stone-800 text-white rounded-full text-sm font-bold transition shadow-sm"
            >
              <span>Browse Our Homes</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          /* Enquiry Cards List */
          <div className="space-y-6">
            {enquiries.map((enq) => {
              const statusInfo = statusConfig[enq.status] || {
                label: enq.status,
                badge: "bg-stone-100 text-stone-700 border-stone-200",
                icon: Clock,
              };
              const StatusIcon = statusInfo.icon;

              return (
                <div
                  key={enq._id}
                  className="bg-white border border-stone-200/80 rounded-3xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col md:flex-row gap-6"
                >
                  {/* Property Image */}
                  <div className="w-full md:w-52 h-44 sm:h-36 bg-stone-100 rounded-2xl overflow-hidden shrink-0 relative">
                    {enq.property?.images?.[0] ? (
                      <img
                        src={enq.property.images[0].url}
                        alt={enq.property?.title || "Property image"}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-stone-300">
                        <ImageOff className="w-8 h-8" strokeWidth={1.5} />
                      </div>
                    )}
                  </div>

                  {/* Property Details */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
                        <h3 className="text-xl font-bold text-gray-900 tracking-tight">
                          {enq.property?.title ||
                            "Residence Listing Unavailable"}
                        </h3>

                        {/* Status Badge */}
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border shrink-0 ${statusInfo.badge}`}
                        >
                          <StatusIcon className="w-3.5 h-3.5" />
                          <span>{statusInfo.label}</span>
                        </span>
                      </div>

                      {/* Location */}
                      {enq.property?.location && (
                        <p className="text-sm font-medium text-stone-500 flex items-center gap-1.5 mb-3">
                          <MapPin className="w-4 h-4 text-stone-400 shrink-0" />
                          <span>{enq.property.location}</span>
                        </p>
                      )}

                      {/* Customer Note */}
                      <div className="bg-stone-50 border border-stone-100 rounded-2xl p-3.5 mb-4 text-xs sm:text-sm text-stone-700 flex gap-2.5 items-start">
                        <MessageSquare className="w-4 h-4 text-stone-400 shrink-0 mt-0.5" />
                        <span className="italic leading-relaxed">
                          "{enq.message}"
                        </span>
                      </div>
                    </div>

                    {/* Booking Dates & Pricing Card */}
                    {enq.checkIn && enq.checkOut && (
                      <div className="bg-stone-900 text-white p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-stone-300">
                          <Calendar className="w-4 h-4 text-stone-400 shrink-0" />
                          <span>
                            {new Date(enq.checkIn).toLocaleDateString()}
                          </span>
                          <span className="text-stone-500">→</span>
                          <span>
                            {new Date(enq.checkOut).toLocaleDateString()}
                          </span>
                        </div>

                        {enq.totalPrice && (
                          <div className="flex items-center gap-1.5 text-sm sm:text-base font-extrabold text-white">
                            <Receipt className="w-4 h-4 text-stone-400" />
                            <span>{enq.totalPrice.toLocaleString()} TND</span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Rejection Reason Notice */}
                    {enq.status === "refused" && enq.rejectionReason && (
                      <div className="mt-3 p-3 bg-rose-50 border border-rose-200/60 rounded-2xl text-xs text-rose-800">
                        <strong className="font-bold">Host feedback: </strong>
                        <span>{enq.rejectionReason}</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default MyEnquiries;
