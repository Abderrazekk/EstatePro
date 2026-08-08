import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import {
  MapPin,
  MessageSquare,
  CalendarClock,
  ImageOff,
  Inbox,
} from "lucide-react";

/**
 * Palette matches PropertyDetail.jsx — white background, blue (#1D4ED8) as
 * the single accent. Status colors (yellow/blue/green/red) are kept as-is
 * since they encode meaning (unread/read/confirmed/refused), not decoration.
 */

const statusStyles = {
  unread: "bg-yellow-50 text-yellow-700 ring-1 ring-yellow-200",
  read: "bg-[#EFF4FF] text-[#1D4ED8] ring-1 ring-blue-100",
  confirmed: "bg-green-50 text-green-700 ring-1 ring-green-200",
  refused: "bg-red-50 text-red-700 ring-1 ring-red-200",
};

const MyEnquiries = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEnquiries = async () => {
      try {
        const res = await axios.get("/api/enquiries/mine");
        setEnquiries(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchEnquiries();
  }, []);

  if (loading)
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Navbar />
        <main className="flex-1 max-w-5xl mx-auto px-4 py-8 w-full animate-pulse">
          <div className="h-7 w-48 bg-gray-100 rounded mb-8" />
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="border border-gray-200 rounded-lg p-4 flex flex-col md:flex-row gap-4"
              >
                <div className="md:w-36 h-24 bg-gray-100 rounded-lg shrink-0" />
                <div className="flex-1 space-y-2 py-1">
                  <div className="h-4 w-1/3 bg-gray-100 rounded" />
                  <div className="h-3 w-1/4 bg-gray-100 rounded" />
                  <div className="h-3 w-2/3 bg-gray-100 rounded" />
                </div>
              </div>
            ))}
          </div>
        </main>
        <Footer />
      </div>
    );

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-1 max-w-5xl mx-auto px-4 py-8 w-full">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">
            My Enquiries
          </h1>
          <p className="text-gray-500 mt-1">
            Track the messages you've sent to listing agents.
          </p>
        </div>

        {enquiries.length === 0 ? (
          <div className="border border-dashed border-gray-200 rounded-lg py-16 flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-[#EFF4FF] text-[#1D4ED8] flex items-center justify-center mb-4">
              <Inbox size={20} strokeWidth={2} />
            </div>
            <p className="text-gray-900 font-medium">No enquiries yet</p>
            <p className="text-gray-500 text-sm mt-1">
              You haven't sent any enquiries yet.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {enquiries.map((enq) => (
              <div
                key={enq._id}
                className="border border-gray-200 rounded-lg p-4 flex flex-col md:flex-row gap-4 hover:border-gray-300 transition-colors"
              >
                <div className="md:w-36 h-24 bg-gray-50 rounded-lg overflow-hidden shrink-0">
                  {enq.property?.images?.[0] ? (
                    <img
                      src={enq.property.images[0].url}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-300">
                      <ImageOff size={20} strokeWidth={1.5} />
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {enq.property?.title || "Property deleted"}
                    </h3>
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-medium shrink-0 ${
                        statusStyles[enq.status] ??
                        "bg-gray-100 text-gray-600 ring-1 ring-gray-200"
                      }`}
                    >
                      {enq.status.charAt(0).toUpperCase() + enq.status.slice(1)}
                    </span>
                  </div>

                  {enq.property?.location && (
                    <p className="text-sm text-gray-500 mt-1 flex items-center gap-1.5">
                      <MapPin size={14} strokeWidth={2} />
                      {enq.property.location}
                    </p>
                  )}

                  <p className="text-gray-600 mt-3 flex gap-2">
                    <MessageSquare
                      size={16}
                      strokeWidth={2}
                      className="text-gray-400 shrink-0 mt-0.5"
                    />
                    <span>{enq.message}</span>
                  </p>

                  {enq.meetingDate && (
                    <p className="text-sm mt-2 text-[#1D4ED8] flex items-center gap-1.5">
                      <CalendarClock size={14} strokeWidth={2} />
                      Meeting: {new Date(
                        enq.meetingDate,
                      ).toLocaleDateString()}{" "}
                      at {enq.meetingTime}
                    </p>
                  )}

                  {enq.status === "refused" && enq.rejectionReason && (
                    <p className="text-sm text-red-600 mt-2">
                      <strong className="font-medium">Reason refused:</strong>{" "}
                      {enq.rejectionReason}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default MyEnquiries;
