import { useState, useEffect } from "react";
import axios from "axios";
import { ImagePlus, Trash2, Loader2 } from "lucide-react";

const ManageBanner = () => {
  const [currentBanner, setCurrentBanner] = useState(null);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchBanner();
  }, []);

  const fetchBanner = async () => {
    try {
      const res = await axios.get("/api/banners");
      setCurrentBanner(res.data);
    } catch (error) {
      console.error("Error fetching banner:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await axios.post("/api/banners", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setCurrentBanner(res.data);
      setFile(null);
      setPreview(null);
    } catch (error) {
      console.error("Upload failed", error);
      alert("Failed to upload banner");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to remove the current banner?")) return;
    
    setDeleting(true);
    try {
      await axios.delete(`/api/banners/${currentBanner._id}`);
      setCurrentBanner(null);
    } catch (error) {
      console.error("Delete failed", error);
      alert("Failed to delete banner");
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-stone-400" />
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-stone-900 tracking-tight">
            Manage Promotional Banner
          </h1>
          <p className="text-stone-500 mt-2">
            Upload a high-quality banner to display on the home page below Featured Properties.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm">
        {/* Upload Form */}
        <form onSubmit={handleUpload} className="mb-10 space-y-6">
          <div>
            <label className="block text-sm font-bold text-stone-700 mb-2">
              Select New Banner Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="block w-full text-sm text-stone-500 file:mr-4 file:py-3 file:px-6 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-stone-100 file:text-stone-700 hover:file:bg-stone-200 transition-colors"
            />
          </div>

          {preview && (
            <div className="space-y-3">
              <p className="text-sm font-bold text-stone-700">Preview:</p>
              <img src={preview} alt="Preview" className="w-full max-h-64 object-cover rounded-2xl border border-stone-200" />
            </div>
          )}

          <button
            type="submit"
            disabled={!file || uploading}
            className="flex items-center gap-2 px-6 py-3 bg-stone-900 text-white rounded-full font-bold hover:bg-stone-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {uploading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <ImagePlus className="w-5 h-5" />
            )}
            {uploading ? "Uploading..." : "Upload Banner"}
          </button>
        </form>

        <hr className="border-stone-100 my-8" />

        {/* Current Active Banner */}
        <div>
          <h2 className="text-xl font-bold text-stone-900 mb-4">Current Active Banner</h2>
          {currentBanner ? (
            <div className="relative group rounded-2xl overflow-hidden border border-stone-200">
              <img
                src={currentBanner.imageUrl}
                alt="Active Banner"
                className="w-full max-h-[400px] object-cover"
              />
              <div className="absolute inset-0 bg-stone-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
                <button
                  onClick={handleDelete}
                  disabled={deleting}
                  className="flex items-center gap-2 px-6 py-3 bg-rose-600 text-white rounded-full font-bold hover:bg-rose-700 transition-all shadow-lg"
                >
                  {deleting ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Trash2 className="w-5 h-5" />
                  )}
                  {deleting ? "Removing..." : "Remove Banner"}
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-stone-50 border border-dashed border-stone-300 rounded-2xl p-12 text-center text-stone-500">
              No active banner is currently set.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageBanner;