// frontend/src/pages/admin/ManageSponsors.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import { Trash2, UploadCloud, Plus } from "lucide-react";

const ManageSponsors = () => {
  const [sponsors, setSponsors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchSponsors();
  }, []);

  const fetchSponsors = async () => {
    try {
      const res = await axios.get("/api/sponsors");
      setSponsors(res.data);
    } catch (error) {
      console.error("Error fetching sponsors:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddSponsor = async (e) => {
    e.preventDefault();
    if (!name || !imageFile) return;

    const formData = new FormData();
    formData.append("name", name);
    formData.append("image", imageFile);

    try {
      setUploading(true);
      await axios.post("/api/sponsors", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setName("");
      setImageFile(null);
      fetchSponsors();
    } catch (error) {
      console.error("Error adding sponsor:", error);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to remove this sponsor?")) return;
    try {
      await axios.delete(`/api/sponsors/${id}`);
      fetchSponsors();
    } catch (error) {
      console.error("Error deleting sponsor:", error);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-stone-900 tracking-tight">Manage Sponsors</h1>
        <p className="text-stone-500 mt-2 font-light">Upload and manage sponsor logos shown on the homepage marquee.</p>
      </div>

      <div className="bg-white p-6 md:p-8 rounded-[2rem] border border-stone-200 shadow-sm">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Add New Sponsor</h2>
        <form onSubmit={handleAddSponsor} className="flex flex-col md:flex-row gap-4 items-start md:items-end">
          <div className="flex-1 w-full">
            <label className="block text-sm font-bold text-stone-700 mb-2">Sponsor Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-stone-900 outline-none transition-all text-sm font-medium"
              placeholder="e.g., TunisAir"
              required
            />
          </div>
          <div className="flex-1 w-full">
            <label className="block text-sm font-bold text-stone-700 mb-2">Logo Image</label>
            <label className="flex items-center justify-center w-full px-4 py-3 bg-stone-50 border border-stone-200 border-dashed rounded-xl cursor-pointer hover:bg-stone-100 transition-all">
              <UploadCloud className="w-5 h-5 text-stone-500 mr-2" />
              <span className="text-sm text-stone-600 truncate">
                {imageFile ? imageFile.name : "Choose logo file..."}
              </span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => setImageFile(e.target.files[0])}
                required
              />
            </label>
          </div>
          <button
            type="submit"
            disabled={uploading}
            className="w-full md:w-auto px-8 py-3.5 bg-gray-900 text-white font-bold rounded-xl hover:bg-stone-800 transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50 text-sm"
          >
            {uploading ? "Uploading..." : <><Plus className="w-4 h-4" /> Add Sponsor</>}
          </button>
        </form>
      </div>

      <div className="bg-white rounded-[2rem] border border-stone-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-stone-500">Loading sponsors...</div>
        ) : sponsors.length === 0 ? (
          <div className="p-8 text-center text-stone-500 font-light">No sponsors added yet.</div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 p-6 md:p-8">
            {sponsors.map((sponsor) => (
              <div key={sponsor._id} className="group relative border border-stone-100 rounded-2xl p-4 flex flex-col items-center justify-center bg-stone-50 hover:shadow-md transition-all">
                <img src={sponsor.imageUrl} alt={sponsor.name} className="h-16 object-contain mb-4 filter grayscale group-hover:grayscale-0 transition-all duration-300" />
                <span className="text-xs font-bold text-stone-600 text-center">{sponsor.name}</span>
                <button
                  onClick={() => handleDelete(sponsor._id)}
                  className="absolute top-2 right-2 p-1.5 bg-white text-rose-500 rounded-full opacity-0 group-hover:opacity-100 shadow-sm border border-stone-200 hover:bg-rose-50 transition-all"
                  title="Remove Sponsor"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageSponsors;