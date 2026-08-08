import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";

const Profile = () => {
  const { user, refreshUser } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [avatar, setAvatar] = useState(null);
  const [preview, setPreview] = useState(user?.avatar || "");
  const [message, setMessage] = useState("");

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    if (avatar) formData.append("avatar", avatar);

    try {
      await axios.put("/api/users/profile", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage("Profile updated successfully!");
      await refreshUser(); // refresh user data in context
    } catch (error) {
      setMessage("Update failed");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-2xl mx-auto px-4 py-8 w-full">
        <h1 className="text-2xl font-bold mb-6">My Profile</h1>
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded shadow space-y-4"
        >
          {message && <p className="text-center text-green-600">{message}</p>}
          <div className="flex items-center gap-4">
            <img
              src={preview || user?.avatar || "default-avatar.png"}
              alt="Avatar"
              className="w-20 h-20 rounded-full object-cover"
            />
            <input type="file" accept="image/*" onChange={handleAvatarChange} />
          </div>
          <div>
            <label className="block mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-1">Email</label>
            <input
              type="email"
              value={user?.email || ""}
              disabled
              className="w-full border px-3 py-2 rounded bg-gray-100"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Update Profile
          </button>
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;
