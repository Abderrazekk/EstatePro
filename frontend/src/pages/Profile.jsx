import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useTranslation } from "react-i18next";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import {
  Camera,
  User,
  Mail,
  Phone,
  CheckCircle,
  AlertCircle,
  Sparkles,
} from "lucide-react";

const Profile = () => {
  const { t } = useTranslation("userPages");
  const { user, refreshUser } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [avatar, setAvatar] = useState(null);
  const [preview, setPreview] = useState(user?.avatar || "");
  const [message, setMessage] = useState({ text: "", type: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage({ text: "", type: "" });

    const formData = new FormData();
    formData.append("name", name);
    formData.append("phone", phone);
    if (avatar) formData.append("avatar", avatar);

    try {
      await axios.put("/api/users/profile", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage({ text: t("profile.messages.success"), type: "success" });
      await refreshUser();
    } catch (error) {
      setMessage({ text: t("profile.messages.error"), type: "error" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-stone-50/50 selection:bg-stone-200 selection:text-stone-900">
      <style>{`
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

      <Navbar />

      <main className="flex-1 max-w-3xl mx-auto px-4 py-16 w-full animate-fade-in-up">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase text-stone-500 bg-white border border-stone-200 px-4 py-2 rounded-full shadow-sm mb-4">
            <Sparkles className="w-3.5 h-3.5 text-stone-700" />
            {t("profile.header.badge")}
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
            {t("profile.header.title")}
          </h1>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-3xl p-8 md:p-12 border border-stone-200/80 shadow-xl shadow-stone-200/40">
          {/* Status Message */}
          {message.text && (
            <div
              className={`mb-8 p-4 rounded-2xl flex items-center gap-3 text-sm font-medium ${
                message.type === "success"
                  ? "bg-emerald-50 border border-emerald-200 text-emerald-800"
                  : "bg-rose-50 border border-rose-200 text-rose-800"
              }`}
            >
              {message.type === "success" ? (
                <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
              ) : (
                <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
              )}
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Avatar Section */}
            <div className="flex flex-col items-center sm:flex-row gap-6 pb-8 border-b border-stone-100">
              <div className="relative group cursor-pointer">
                <img
                  src={
                    preview ||
                    user?.avatar ||
                    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300"
                  }
                  alt="Avatar"
                  className="w-24 h-24 rounded-full object-cover border-2 border-stone-200 shadow-md group-hover:opacity-90 transition"
                />
                <label
                  htmlFor="avatar-upload"
                  className="absolute bottom-0 right-0 bg-gray-900 text-white p-2 rounded-full shadow-lg cursor-pointer hover:bg-stone-800 transition-colors"
                >
                  <Camera className="w-4 h-4" />
                </label>
                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
              </div>

              <div className="text-center sm:text-left">
                <h3 className="font-bold text-gray-900 text-lg">
                  {t("profile.photo.title")}
                </h3>
                <p className="text-sm text-stone-500 font-light mt-1">
                  {t("profile.photo.subtitle")}
                </p>
              </div>
            </div>

            {/* Inputs */}
            <div className="space-y-6">
              {/* Name Input */}
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">
                  {t("profile.form.fullName")}
                </label>
                <div className="relative">
                  <User className="w-5 h-5 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-12 pr-4 py-3.5 bg-stone-50/50 border border-stone-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition font-medium text-gray-900"
                    required
                  />
                </div>
              </div>

              {/* Phone Input */}
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">
                  {t("profile.form.phoneNumber")}
                </label>
                <div className="relative">
                  <Phone className="w-5 h-5 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-12 pr-4 py-3.5 bg-stone-50/50 border border-stone-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition font-medium text-gray-900"
                    required
                  />
                </div>
              </div>

              {/* Email Input (Disabled) */}
              <div>
                <label className="block text-sm font-bold text-stone-400 mb-2">
                  {t("profile.form.emailAddress")}{" "}
                  <span className="text-xs font-normal">
                    {t("profile.form.cannotChange")}
                  </span>
                </label>
                <div className="relative">
                  <Mail className="w-5 h-5 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={user?.email || ""}
                    disabled
                    className="w-full pl-12 pr-4 py-3.5 bg-stone-100 border border-stone-200 rounded-2xl text-stone-500 font-medium cursor-not-allowed"
                  />
                </div>
              </div>
            </div>

            {/* Action Button */}
            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto bg-gray-900 hover:bg-stone-800 text-white px-8 py-4 rounded-full font-bold transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-50"
              >
                {isSubmitting
                  ? t("profile.form.saving")
                  : t("profile.form.save")}
              </button>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Profile;
