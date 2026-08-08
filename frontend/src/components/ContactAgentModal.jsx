import { useState } from "react";
import axios from "axios";

const ContactAgentModal = ({ propertyId, onClose }) => {
  const [message, setMessage] = useState("");
  const [meetingDate, setMeetingDate] = useState("");
  const [meetingTime, setMeetingTime] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/enquiries", {
        propertyId,
        message,
        meetingDate: meetingDate || null,
        meetingTime: meetingTime || null,
      });
      setSubmitted(true);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send enquiry");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
        {submitted ? (
          <div className="text-center py-4">
            <h2 className="text-xl font-bold text-green-600">
              Sent Successfully!
            </h2>
            <p className="mt-2">We'll get back to you soon.</p>
            <button
              onClick={onClose}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <h2 className="text-xl font-bold mb-4">Contact Agent</h2>
            {error && <p className="text-red-500 mb-2">{error}</p>}
            <div className="mb-4">
              <label className="block mb-1">Message *</label>
              <textarea
                rows="4"
                className="w-full border px-3 py-2 rounded"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                placeholder="I'm interested in this property..."
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">
                Schedule a Meeting (optional)
              </label>
              <input
                type="date"
                className="w-full border px-3 py-2 rounded mb-2"
                value={meetingDate}
                onChange={(e) => setMeetingDate(e.target.value)}
              />
              <input
                type="time"
                className="w-full border px-3 py-2 rounded"
                value={meetingTime}
                onChange={(e) => setMeetingTime(e.target.value)}
              />
              <p className="text-sm text-gray-500 mt-1">
                If you'd like to visit the agency, pick a date and time.
              </p>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              Send Enquiry
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ContactAgentModal;
