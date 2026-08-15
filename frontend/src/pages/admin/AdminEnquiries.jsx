import { useState, useEffect } from "react";
import axios from "axios";

const AdminEnquiries = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refuseId, setRefuseId] = useState(null);
  const [refuseReason, setRefuseReason] = useState("");

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const fetchEnquiries = async () => {
    try {
      const res = await axios.get("/api/enquiries");
      setEnquiries(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.put(`/api/enquiries/${id}`, { status: newStatus });
      fetchEnquiries();
    } catch (error) {
      alert("Failed to update status");
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
      alert("Failed to refuse enquiry");
    }
  };

  if (loading) return <div className="p-4">Loading reservations...</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Reservation Requests</h1>
      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="min-w-full text-left">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-3">Client</th>
              <th className="p-3">Property</th>
              <th className="p-3">Dates & Price</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {enquiries.map((enq) => (
              <tr key={enq._id} className="border-t">
                <td className="p-3">
                  <p className="font-medium">{enq.client?.name}</p>
                  <p className="text-sm text-gray-500">{enq.client?.email}</p>
                  {enq.client?.phone && (
                    <p className="text-sm text-gray-500 mt-1">
                      📞 {enq.client.phone}
                    </p>
                  )}
                </td>
                <td className="p-3">{enq.property?.title || "N/A"}</td>
                <td className="p-3">
                  <p className="text-sm font-medium">
                    In: {new Date(enq.checkIn).toLocaleDateString()}
                  </p>
                  <p className="text-sm font-medium">
                    Out: {new Date(enq.checkOut).toLocaleDateString()}
                  </p>
                  <p className="text-blue-600 font-bold mt-1">
                    {enq.totalPrice} TND
                  </p>
                </td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      enq.status === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : enq.status === "confirmed"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                    }`}
                  >
                    {enq.status.toUpperCase()}
                  </span>
                </td>
                <td className="p-3">
                  <div className="flex gap-2">
                    {enq.status === "pending" && (
                      <>
                        <button
                          onClick={() =>
                            handleStatusChange(enq._id, "confirmed")
                          }
                          className="text-xs bg-green-500 hover:bg-green-600 text-white px-3 py-1.5 rounded font-medium"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => {
                            setRefuseId(enq._id);
                            setRefuseReason("");
                          }}
                          className="text-xs bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded font-medium"
                        >
                          Refuse
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {refuseId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Refuse Reservation</h2>
            <textarea
              rows="3"
              className="w-full border px-3 py-2 rounded mb-4"
              value={refuseReason}
              onChange={(e) => setRefuseReason(e.target.value)}
              placeholder="Reason for refusal..."
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setRefuseId(null)}
                className="px-4 py-2 bg-gray-200 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleRefuse}
                className="px-4 py-2 bg-red-600 text-white rounded"
              >
                Confirm Refusal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminEnquiries;
