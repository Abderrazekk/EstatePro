import { useState, useEffect } from "react";
import axios from "axios";

const AdminEnquiries = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refuseId, setRefuseId] = useState(null);
  const [refuseReason, setRefuseReason] = useState("");
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);

  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [propertyFilter, setPropertyFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [customDate, setCustomDate] = useState("");

  // Inline confirmation state
  const [confirmAction, setConfirmAction] = useState(null);

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const fetchEnquiries = async () => {
    try {
      const res = await axios.get("/api/enquiries");
      setEnquiries(res.data);
    } catch (error) {
      console.error("Error fetching enquiries:", error);
    } finally {
      setLoading(false);
    }
  };

  // ENHANCED: Improved error reporting to catch exact backend errors
  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.put(`/api/enquiries/${id}`, { status: newStatus });
      fetchEnquiries();
    } catch (error) {
      console.error(
        "Status update error details:",
        error.response?.data || error,
      );

      // Display specific error message from server if available
      const serverMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Failed to update status. Please check server logs.";

      alert(`Error (${error.response?.status || 500}): ${serverMessage}`);
    }
  };

  const handleRefuse = async () => {
    if (!refuseReason.trim()) return alert("Please provide a reason.");
    try {
      await axios.put(`/api/enquiries/${refuseId}`, {
        status: "refused",
        rejectionReason: refuseReason,
      });
      setRefuseId(null);
      fetchEnquiries();
    } catch (error) {
      console.error("Refuse error:", error.response?.data || error);
      alert(error.response?.data?.message || "Failed to refuse enquiry");
    }
  };

  const executeDelete = async (id) => {
    try {
      await axios.delete(`/api/enquiries/${id}`);
      fetchEnquiries();
    } catch (error) {
      console.error("Delete error:", error.response?.data || error);
      alert(error.response?.data?.message || "Failed to delete enquiry");
    }
  };

  const handleConfirmExecute = (enq) => {
    if (!confirmAction) return;

    if (confirmAction.type === "approve") {
      // Sends "confirmed" to backend. If your backend uses "approved", change this string to "approved"
      handleStatusChange(enq._id, "confirmed");
    } else if (confirmAction.type === "delete") {
      executeDelete(enq._id);
    } else if (confirmAction.type === "refuse") {
      setRefuseId(enq._id);
      setRefuseReason("");
    }

    setConfirmAction(null);
  };

  const resolveImageUrl = (imagePath) => {
    if (!imagePath) return "";

    const urlString =
      typeof imagePath === "string"
        ? imagePath
        : imagePath.url || imagePath.path || String(imagePath);

    if (urlString.startsWith("http")) return urlString;

    const normalizedPath = urlString.replace(/\\/g, "/").replace(/^\//, "");
    return `http://localhost:5000/${normalizedPath}`;
  };

  // Filtering Logic
  const filteredEnquiries = enquiries.filter((enq) => {
    const searchLower = searchTerm.toLowerCase();
    const clientName = enq.client?.name?.toLowerCase() || "";
    const clientEmail = enq.client?.email?.toLowerCase() || "";
    const contactPhone = enq.contactPhone
      ? String(enq.contactPhone).toLowerCase()
      : "";

    const matchesSearch =
      clientName.includes(searchLower) ||
      clientEmail.includes(searchLower) ||
      contactPhone.includes(searchLower);

    const propLower = propertyFilter.toLowerCase();
    const propertyTitle = enq.property?.title?.toLowerCase() || "";
    const matchesProperty = propertyTitle.includes(propLower);

    const matchesStatus = statusFilter === "all" || enq.status === statusFilter;

    let matchesDate = true;
    if (dateFilter !== "all") {
      const recordDate = new Date(enq.createdAt || enq.checkIn);
      const now = new Date();

      if (dateFilter === "week") {
        const weekAgo = new Date();
        weekAgo.setDate(now.getDate() - 7);
        matchesDate = recordDate >= weekAgo;
      } else if (dateFilter === "month") {
        const monthAgo = new Date();
        monthAgo.setMonth(now.getMonth() - 1);
        matchesDate = recordDate >= monthAgo;
      } else if (dateFilter === "custom" && customDate) {
        const enqDateString = recordDate.toISOString().split("T")[0];
        matchesDate = enqDateString === customDate;
      }
    }

    return matchesSearch && matchesProperty && matchesStatus && matchesDate;
  });

  if (loading)
    return (
      <div className="p-4 flex justify-center text-gray-500 font-medium">
        Loading reservations...
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        Reservation Requests
      </h1>

      {/* Filtering & Search Dashboard */}
      <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 mb-6 flex flex-col md:flex-row flex-wrap gap-4">
        {/* Search Input */}
        <div className="flex-1 min-w-[200px]">
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
            Search Client
          </label>
          <input
            type="text"
            placeholder="Name, Email, or Phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </div>

        {/* Property Filter */}
        <div className="flex-1 min-w-[150px]">
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
            Property
          </label>
          <input
            type="text"
            placeholder="Property name..."
            value={propertyFilter}
            onChange={(e) => setPropertyFilter(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </div>

        {/* Status Filter */}
        <div className="w-full md:w-32">
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
            Status
          </label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white cursor-pointer"
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="approved">Approved</option>
            <option value="refused">Refused</option>
          </select>
        </div>

        {/* Date Filter */}
        <div className="w-full md:w-40">
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
            Timeframe
          </label>
          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white cursor-pointer"
          >
            <option value="all">All Time</option>
            <option value="week">Past Week</option>
            <option value="month">Past Month</option>
            <option value="custom">Specific Date</option>
          </select>
        </div>

        {/* Custom Date Picker */}
        {dateFilter === "custom" && (
          <div className="w-full md:w-auto transition-all duration-300">
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
              Pick Date
            </label>
            <input
              type="date"
              value={customDate}
              onChange={(e) => setCustomDate(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>
        )}
      </div>

      {/* Main Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-x-auto">
        {filteredEnquiries.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No enquiries found matching your filters.
          </div>
        ) : (
          <table className="min-w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Client
                </th>
                <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Property
                </th>
                <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Dates & Price
                </th>
                <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredEnquiries.map((enq) => (
                <tr
                  key={enq._id}
                  className="hover:bg-gray-50/50 transition-colors"
                >
                  <td className="p-4">
                    <p className="font-medium text-gray-900">
                      {enq.client?.name || "Unknown"}
                    </p>
                    <p className="text-sm text-gray-500">{enq.client?.email}</p>
                    {enq.contactPhone && (
                      <p className="text-sm text-gray-800 font-semibold mt-1">
                        📞 {enq.contactPhone}
                      </p>
                    )}
                  </td>
                  <td className="p-4 font-medium text-gray-800">
                    {enq.property?.title || "N/A"}
                  </td>
                  <td className="p-4">
                    <p className="text-sm font-medium text-gray-700">
                      In:{" "}
                      <span className="text-gray-900">
                        {new Date(enq.checkIn).toLocaleDateString()}
                      </span>
                    </p>
                    <p className="text-sm font-medium text-gray-700">
                      Out:{" "}
                      <span className="text-gray-900">
                        {new Date(enq.checkOut).toLocaleDateString()}
                      </span>
                    </p>
                    <p className="text-blue-600 font-bold mt-1 text-sm bg-blue-50 inline-block px-2 py-0.5 rounded">
                      {enq.totalPrice ? enq.totalPrice.toLocaleString() : 0} Euro
                    </p>
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold tracking-wide ${
                        enq.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : enq.status === "confirmed" ||
                              enq.status === "approved"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      {enq.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="p-4">
                    {confirmAction?.id === enq._id ? (
                      <div className="flex flex-col items-end gap-2 animate-fade-in">
                        <span className="text-xs font-bold text-gray-700 bg-gray-100 px-3 py-1 rounded-lg">
                          Are you sure you want to {confirmAction.type}?
                        </span>
                        <div className="flex gap-2">
                          <button
                            onClick={() => setConfirmAction(null)}
                            className="text-xs bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-1.5 rounded-lg font-medium transition-colors"
                          >
                            No
                          </button>
                          <button
                            onClick={() => handleConfirmExecute(enq)}
                            className={`text-xs px-4 py-1.5 rounded-lg font-medium text-white transition-colors ${
                              confirmAction.type === "approve"
                                ? "bg-emerald-600 hover:bg-emerald-700"
                                : confirmAction.type === "refuse"
                                  ? "bg-rose-600 hover:bg-rose-700"
                                  : "bg-red-600 hover:bg-red-700"
                            }`}
                          >
                            Yes
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex gap-2 justify-end">
                        <button
                          onClick={() => setSelectedEnquiry(enq)}
                          className="text-xs bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg font-medium transition-colors"
                        >
                          View
                        </button>

                        {enq.status === "pending" && (
                          <>
                            <button
                              onClick={() =>
                                setConfirmAction({
                                  id: enq._id,
                                  type: "approve",
                                })
                              }
                              className="text-xs bg-emerald-500 hover:bg-emerald-600 text-white px-3 py-2 rounded-lg font-medium transition-colors"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() =>
                                setConfirmAction({
                                  id: enq._id,
                                  type: "refuse",
                                })
                              }
                              className="text-xs bg-rose-500 hover:bg-rose-600 text-white px-3 py-2 rounded-lg font-medium transition-colors"
                            >
                              Refuse
                            </button>
                          </>
                        )}

                        <button
                          onClick={() =>
                            setConfirmAction({ id: enq._id, type: "delete" })
                          }
                          className="text-xs bg-gray-700 hover:bg-gray-900 text-white px-3 py-2 rounded-lg font-medium transition-colors ml-1"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Details Modal */}
      {selectedEnquiry && (
        <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="flex justify-between items-center p-5 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900">
                Enquiry Details
              </h2>
              <button
                onClick={() => setSelectedEnquiry(null)}
                className="text-gray-400 hover:text-gray-700 font-bold text-2xl transition-colors w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
              >
                &times;
              </button>
            </div>

            <div className="p-6 overflow-y-auto">
              <div className="mb-6 flex flex-col sm:flex-row gap-5 bg-gray-50/50 p-5 rounded-xl border border-gray-100">
                {selectedEnquiry.property?.images?.[0] ? (
                  <img
                    src={resolveImageUrl(selectedEnquiry.property.images[0])}
                    alt={selectedEnquiry.property.title}
                    className="w-full sm:w-36 h-36 object-cover rounded-xl shadow-sm border border-gray-200"
                    onError={(e) => {
                      e.target.onerror = null;
                      const imgData = selectedEnquiry.property.images[0];
                      const urlString =
                        typeof imgData === "string"
                          ? imgData
                          : imgData?.url || imgData?.path || "";

                      if (urlString) {
                        const fallbackPath = urlString
                          .replace(/\\/g, "/")
                          .replace(/^\//, "");
                        e.target.src = `/${fallbackPath}`;
                      }
                    }}
                  />
                ) : (
                  <div className="w-full sm:w-36 h-36 bg-gray-100 border border-gray-200 rounded-xl flex items-center justify-center text-gray-400 text-sm font-medium">
                    No Image
                  </div>
                )}
                <div className="flex flex-col justify-center">
                  <h3 className="text-lg font-bold text-gray-900">
                    {selectedEnquiry.property?.title || "Unknown Property"}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1 font-medium">
                    📍{" "}
                    {selectedEnquiry.property?.location ||
                      "Location not specified"}
                  </p>
                  <div className="flex gap-6 mt-4 text-sm bg-white p-3 rounded-lg border border-gray-100">
                    <div>
                      <span className="text-gray-400 block text-xs uppercase font-bold tracking-wider mb-1">
                        Check-in
                      </span>
                      <p className="font-bold text-gray-900">
                        {new Date(selectedEnquiry.checkIn).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="w-px bg-gray-200"></div>
                    <div>
                      <span className="text-gray-400 block text-xs uppercase font-bold tracking-wider mb-1">
                        Check-out
                      </span>
                      <p className="font-bold text-gray-900">
                        {new Date(
                          selectedEnquiry.checkOut,
                        ).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <p className="text-blue-600 font-bold mt-4 text-xl">
                    {selectedEnquiry.totalPrice
                      ? selectedEnquiry.totalPrice.toLocaleString()
                      : 0}{" "}
                    Euro
                  </p>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                  Client Information
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-white border border-gray-100 p-4 rounded-xl">
                  <div>
                    <span className="text-xs text-gray-400 uppercase font-bold tracking-wider block mb-1">
                      Name
                    </span>
                    <p className="text-gray-900 font-medium">
                      {selectedEnquiry.client?.name || "N/A"}
                    </p>
                  </div>
                  <div>
                    <span className="text-xs text-gray-400 uppercase font-bold tracking-wider block mb-1">
                      Email
                    </span>
                    <p className="text-gray-900 font-medium break-all">
                      {selectedEnquiry.client?.email || "N/A"}
                    </p>
                  </div>
                  <div>
                    <span className="text-xs text-gray-400 uppercase font-bold tracking-wider block mb-1">
                      Phone
                    </span>
                    <p className="text-gray-900 font-medium">
                      {selectedEnquiry.contactPhone || "N/A"}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                  Message
                </h4>
                <div className="bg-gray-50/80 p-5 rounded-xl text-sm text-gray-700 whitespace-pre-wrap border border-gray-100 italic leading-relaxed">
                  {selectedEnquiry.message
                    ? `"${selectedEnquiry.message}"`
                    : "No message provided."}
                </div>
              </div>
            </div>

            <div className="p-5 border-t border-gray-100 flex justify-end gap-3 bg-gray-50">
              <button
                onClick={() => setSelectedEnquiry(null)}
                className="px-6 py-2.5 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors shadow-sm"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Refusal Modal */}
      {refuseId && (
        <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-md border border-gray-100">
            <h2 className="text-xl font-bold mb-2 text-gray-900">
              Refuse Reservation
            </h2>
            <p className="text-sm text-gray-500 mb-4">
              Please provide a reason for declining this request. This may be
              visible to the client.
            </p>
            <textarea
              rows="3"
              className="w-full border border-gray-300 px-4 py-3 rounded-lg mb-5 text-sm focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none resize-none"
              value={refuseReason}
              onChange={(e) => setRefuseReason(e.target.value)}
              placeholder="e.g., Dates no longer available, property under maintenance..."
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setRefuseId(null)}
                className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleRefuse}
                className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg font-medium transition-colors shadow-sm"
              >
                Confirm Refusal
              </button>
            </div>
          </div>
        </div>
      )}

      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.2s ease-out forwards;
        }
      `,
        }}
      />
    </div>
  );
};

export default AdminEnquiries;
