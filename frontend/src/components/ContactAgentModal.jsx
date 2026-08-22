import { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useTranslation } from "react-i18next";
import { X, Calendar as CalendarIcon, CheckCircle2, Phone } from "lucide-react";

const ContactAgentModal = ({
  propertyId,
  pricePerNight,
  bookedDates,
  onClose,
}) => {
  const { t } = useTranslation("contactAgentModal");
  const [message, setMessage] = useState("");
  const [phone, setPhone] = useState("");
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (checkIn && checkOut) {
      const start = new Date(checkIn);
      start.setHours(0, 0, 0, 0);

      const end = new Date(checkOut);
      end.setHours(0, 0, 0, 0);

      const diffTime = end.getTime() - start.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

      if (diffDays > 0) {
        setTotalPrice(diffDays * pricePerNight);
      } else {
        setTotalPrice(0);
      }
    }
  }, [checkIn, checkOut, pricePerNight]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!checkIn || !checkOut) {
      return setError(t("errors.selectDates"));
    }

    if (new Date(checkIn) > new Date(checkOut)) {
      return setError(t("errors.invalidDates"));
    }

    if (!phone.trim()) {
      return setError(t("errors.missingPhone"));
    }

    setIsSubmitting(true);
    setError("");

    const submitCheckIn = new Date(checkIn);
    submitCheckIn.setHours(12, 0, 0, 0);

    const submitCheckOut = new Date(checkOut);
    submitCheckOut.setHours(12, 0, 0, 0);

    try {
      await axios.post("/api/enquiries", {
        propertyId,
        message,
        phone,
        checkIn: submitCheckIn,
        checkOut: submitCheckOut,
        totalPrice,
      });
      setSubmitted(true);
    } catch (err) {
      setError(err.response?.data?.message || t("errors.submitFail"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <style>{`
        .modal-datepicker-popper { z-index: 100 !important; }
        .modal-datepicker-popper .react-datepicker { font-family: inherit; border: 1px solid #F3F4F6; border-radius: 1.5rem; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1); padding: 1rem; background-color: #ffffff; }
        .modal-datepicker-popper .react-datepicker__triangle { display: none; }
        .modal-datepicker-popper .react-datepicker__header { background-color: transparent; border-bottom: none; padding-top: 0; }
        .modal-datepicker-popper .react-datepicker__current-month { font-weight: 700; font-size: 1rem; color: #111827; margin-bottom: 0.75rem; }
        .modal-datepicker-popper .react-datepicker__day-names { margin-bottom: -0.25rem; display: flex; justify-content: space-between; }
        .modal-datepicker-popper .react-datepicker__day-name { color: #9CA3AF; font-weight: 600; font-size: 0.75rem; text-transform: uppercase; width: 2.25rem; }
        .modal-datepicker-popper .react-datepicker__month { margin: 0; }
        .modal-datepicker-popper .react-datepicker__week { display: flex; justify-content: space-between; margin-bottom: 0.25rem; }
        .modal-datepicker-popper .react-datepicker__day { color: #374151; width: 2.25rem; height: 2.25rem; line-height: 2.25rem; border-radius: 9999px; transition: all 0.2s ease; margin: 0; font-size: 0.875rem; }
        .modal-datepicker-popper .react-datepicker__day:hover:not(.react-datepicker__day--disabled) { background-color: #F3F4F6; color: #111827; }
        .modal-datepicker-popper .react-datepicker__day--selected, .modal-datepicker-popper .react-datepicker__day--keyboard-selected, .modal-datepicker-popper .react-datepicker__day--in-range { background-color: #111827 !important; color: white !important; }
        .modal-datepicker-popper .react-datepicker__day--in-selecting-range { background-color: #E5E7EB; color: #111827; }
        .modal-datepicker-popper .react-datepicker__day--disabled { color: #D1D5DB; text-decoration: line-through; background-color: transparent; cursor: not-allowed; }
        .modal-datepicker-popper .react-datepicker__day--disabled:hover { background-color: transparent; }
        .modal-calendar-input { background: transparent; width: 100%; outline: none; color: #111827; font-weight: 500; font-size: 0.875rem; cursor: pointer; }
        .modal-calendar-input::placeholder { color: #9CA3AF; font-weight: 400; }
      `}</style>

      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg relative overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">
            {submitted ? t("title.success") : t("title.book")}
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} strokeWidth={2.5} />
          </button>
        </div>

        <div className="p-6">
          {submitted ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2
                  size={32}
                  className="text-green-500"
                  strokeWidth={2}
                />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {t("success.heading")}
              </h3>
              <p className="text-gray-500 text-sm mb-6">
                {t("success.message")}
              </p>
              <button
                onClick={onClose}
                className="w-full bg-gray-900 text-white px-6 py-3.5 rounded-xl font-semibold hover:bg-gray-800 transition-colors"
              >
                {t("success.close")}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {error && (
                <div className="bg-red-50 text-red-600 px-4 py-3 rounded-xl text-sm font-medium border border-red-100">
                  {error}
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus-within:border-gray-900 focus-within:ring-1 focus-within:ring-gray-900 transition-all cursor-text relative">
                  <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">
                    {t("form.checkIn")}
                  </label>
                  <div className="flex items-center gap-2">
                    <CalendarIcon size={16} className="text-gray-400" />
                    <DatePicker
                      selected={checkIn}
                      onChange={(date) => setCheckIn(date)}
                      selectsStart
                      startDate={checkIn}
                      endDate={checkOut}
                      minDate={new Date()}
                      excludeDateIntervals={bookedDates}
                      className="modal-calendar-input"
                      placeholderText={t("form.addDate")}
                      dateFormat="dd/MM/yyyy"
                      popperClassName="modal-datepicker-popper"
                      required
                    />
                  </div>
                </div>

                <div className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus-within:border-gray-900 focus-within:ring-1 focus-within:ring-gray-900 transition-all cursor-text relative">
                  <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">
                    {t("form.checkOut")}
                  </label>
                  <div className="flex items-center gap-2">
                    <CalendarIcon size={16} className="text-gray-400" />
                    <DatePicker
                      selected={checkOut}
                      onChange={(date) => setCheckOut(date)}
                      selectsEnd
                      startDate={checkIn}
                      endDate={checkOut}
                      minDate={checkIn || new Date()}
                      excludeDateIntervals={bookedDates}
                      className="modal-calendar-input"
                      placeholderText={t("form.addDate")}
                      dateFormat="dd/MM/yyyy"
                      popperClassName="modal-datepicker-popper"
                      required
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">
                  {t("form.phone")}
                </label>
                <div className="relative">
                  <Phone
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="tel"
                    className="w-full bg-gray-50 border border-gray-200 pl-11 pr-4 py-3 rounded-xl text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-all"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    placeholder="+216 12 345 678"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">
                  {t("form.messageLabel")}
                </label>
                <textarea
                  rows="3"
                  className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-xl text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-all resize-none"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  placeholder={t("form.messagePlaceholder")}
                />
              </div>

              {totalPrice > 0 ? (
                <div className="py-4 border-t border-b border-gray-100 flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-600 underline decoration-gray-300 underline-offset-4">
                    {pricePerNight} {t("pricing.currency")} x{" "}
                    {Math.ceil(
                      (checkOut.getTime() - checkIn.getTime()) /
                        (1000 * 60 * 60 * 24),
                    ) + 1}{" "}
                    {t("form.days")}
                  </span>
                  <span className="text-lg font-bold text-gray-900">
                    {totalPrice.toLocaleString()} {t("pricing.currency")}
                  </span>
                </div>
              ) : (
                <div className="py-4 border-t border-b border-gray-100 flex items-center justify-between opacity-50 grayscale">
                  <span className="text-sm font-medium text-gray-500">
                    {t("form.selectDatesText")}
                  </span>
                  <span className="text-lg font-bold text-gray-400">
                    0 {t("pricing.currency")}
                  </span>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gray-900 text-white py-3.5 rounded-xl font-semibold hover:bg-gray-800 transition-colors shadow-sm disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2 mt-2"
              >
                {isSubmitting ? t("form.submitting") : t("form.confirm")}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactAgentModal;
