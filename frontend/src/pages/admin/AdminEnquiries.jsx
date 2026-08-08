import { useState, useEffect } from "react";
import axios from "axios";

const AdminEnquiries = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editDate, setEditDate] = useState("");
  const [editTime, setEditTime] = useState("");
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

  const startEdit = (enq) => {
    setEditingId(enq._id);
    setEditDate(
      enq.meetingDate
        ? new Date(enq.meetingDate).toISOString().split("T")[0]
        : "",
    );
    setEditTime(enq.meetingTime || "");
  };

  const cancelEdit = () => {
    setEditingId(null);
  };

  const saveReschedule = async (id) => {
    try {
      await axios.put(`/api/enquiries/${id}`, {
        meetingDate: editDate || null,
        meetingTime: editTime || null,
      });
      setEditingId(null);
      fetchEnquiries();
    } catch (error) {
      alert("Failed to reschedule");
    }
  };

  const openRefuseModal = (id) => {
    setRefuseId(id);
    setRefuseReason("");
  };

  const handleRefuse = async () => {
    if (!refuseReason.trim())
      return alert("Please provide a reason for refusal.");
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

  if (loading) return <div className="p-4">Loading enquiries...</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Client Enquiries</h1>
      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="min-w-full text-left">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-3">Client</th>
              <th className="p-3">Property</th>
              <th className="p-3">Message</th>
              <th className="p-3">Meeting</th>
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
                </td>
                <td className="p-3">{enq.property?.title || "N/A"}</td>
                <td className="p-3 max-w-xs truncate">{enq.message}</td>
                <td className="p-3">
                  {editingId === enq._id ? (
                    <div className="flex gap-1 items-center">
                      <input
                        type="date"
                        value={editDate}
                        onChange={(e) => setEditDate(e.target.value)}
                        className="border px-2 py-1 text-sm rounded w-32"
                      />
                      <input
                        type="time"
                        value={editTime}
                        onChange={(e) => setEditTime(e.target.value)}
                        className="border px-2 py-1 text-sm rounded w-24"
                      />
                      <button
                        onClick={() => saveReschedule(enq._id)}
                        className="text-green-500 text-sm"
                      >
                        ✓
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="text-red-500 text-sm"
                      >
                        ✕
                      </button>
                    </div>
                  ) : (
                    <div>
                      {enq.meetingDate ? (
                        <span>
                          {new Date(enq.meetingDate).toLocaleDateString()} at{" "}
                          {enq.meetingTime}
                        </span>
                      ) : (
                        <span className="text-gray-400">None</span>
                      )}
                      {enq.status !== "refused" &&
                        enq.status !== "confirmed" && (
                          <button
                            onClick={() => startEdit(enq)}
                            className="ml-2 text-blue-600 hover:underline text-xs"
                          >
                            Reschedule
                          </button>
                        )}
                    </div>
                  )}
                </td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      enq.status === "unread"
                        ? "bg-yellow-100 text-yellow-700"
                        : enq.status === "read"
                          ? "bg-blue-100 text-blue-700"
                          : enq.status === "confirmed"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                    }`}
                  >
                    {enq.status}
                  </span>
                  {enq.status === "refused" && enq.rejectionReason && (
                    <p className="text-xs text-red-600 mt-1">
                      Reason: {enq.rejectionReason}
                    </p>
                  )}
                </td>
                <td className="p-3">
                  <div className="flex gap-1">
                    {enq.status === "unread" && (
                      <button
                        onClick={() => handleStatusChange(enq._id, "read")}
                        className="text-xs bg-blue-500 text-white px-2 py-1 rounded"
                      >
                        Mark Read
                      </button>
                    )}
                    {enq.status === "read" && (
                      <>
                        <button
                          onClick={() =>
                            handleStatusChange(enq._id, "confirmed")
                          }
                          className="text-xs bg-green-500 text-white px-2 py-1 rounded"
                        >
                          Confirm
                        </button>
                        <button
                          onClick={() => openRefuseModal(enq._id)}
                          className="text-xs bg-red-500 text-white px-2 py-1 rounded"
                        >
                          Refuse
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
            {enquiries.length === 0 && (
              <tr>
                <td colSpan="6" className="p-3 text-center text-gray-500">
                  No enquiries yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Refuse Modal */}
      {refuseId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Refuse Enquiry</h2>
            <label className="block mb-2 font-medium">
              Reason for refusal:
            </label>
            <textarea
              rows="3"
              className="w-full border px-3 py-2 rounded mb-4"
              value={refuseReason}
              onChange={(e) => setRefuseReason(e.target.value)}
              placeholder="Explain why the meeting is refused..."
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
