import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  Plus,
  Pencil,
  Trash2,
  Building,
  Sparkles,
  ImageOff,
  MapPin,
  AlertTriangle,
} from "lucide-react";

const ManageProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const res = await axios.get("/api/properties?limit=100");
      setProperties(res.data.properties || []);
    } catch (error) {
      console.error("Failed to fetch properties:", error);
    } finally {
      setLoading(false);
    }
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    try {
      await axios.delete(`/api/properties/${deleteId}`);
      setProperties((prev) => prev.filter((p) => p._id !== deleteId));
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete property. Please try again.");
    } finally {
      setDeleteId(null);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="flex justify-between items-center">
          <div className="h-8 w-48 bg-stone-200 rounded-full" />
          <div className="h-10 w-36 bg-stone-200 rounded-full" />
        </div>
        <div className="bg-white border border-stone-200 rounded-3xl p-6 space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-16 bg-stone-100 rounded-2xl w-full" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase text-stone-500 bg-white border border-stone-200 px-3 py-1.5 rounded-full shadow-sm mb-2">
            <Sparkles className="w-3.5 h-3.5 text-stone-700" />
            Admin Panel
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
            Manage Properties
          </h1>
          <p className="text-stone-500 text-sm mt-1 font-light">
            Add, update, or remove residences listed across Tunisia.
          </p>
        </div>

        <Link
          to="/admin/properties/new"
          className="inline-flex items-center justify-center gap-2 bg-stone-900 hover:bg-stone-800 text-white px-5 py-3 rounded-full text-sm font-bold shadow-sm transition-all shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Property</span>
        </Link>
      </div>

      {/* Properties Table Container */}
      {properties.length === 0 ? (
        <div className="bg-white border border-stone-200/80 rounded-3xl p-12 text-center shadow-sm">
          <div className="w-14 h-14 bg-stone-100 text-stone-600 rounded-full flex items-center justify-center mx-auto mb-4 border border-stone-200">
            <Building className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-stone-900">
            No properties found
          </h3>
          <p className="text-stone-500 text-sm mt-1 max-w-sm mx-auto font-light">
            Get started by adding your first residence to the platform.
          </p>
          <Link
            to="/admin/properties/new"
            className="inline-flex items-center gap-2 mt-5 bg-stone-900 hover:bg-stone-800 text-white px-5 py-2.5 rounded-full text-sm font-bold transition shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Add Property</span>
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-stone-200/80 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-stone-50 border-b border-stone-200/80 text-[11px] font-extrabold text-stone-500 uppercase tracking-wider">
                  <th className="py-4 px-6">Image</th>
                  <th className="py-4 px-6">Title & Location</th>
                  <th className="py-4 px-6">Type</th>
                  <th className="py-4 px-6">Price (TND)</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 text-sm">
                {properties.map((prop) => {
                  // Safe numeric extraction preventing undefined.toLocaleString() crashes
                  const displayPrice = prop.pricePerNight ?? prop.price ?? 0;
                  const imageUrl = prop.images?.[0]?.url || prop.images?.[0];

                  return (
                    <tr
                      key={prop._id}
                      className="hover:bg-stone-50/60 transition-colors"
                    >
                      {/* Image */}
                      <td className="py-4 px-6 shrink-0">
                        <div className="w-14 h-12 rounded-xl bg-stone-100 border border-stone-200/80 overflow-hidden flex items-center justify-center shrink-0">
                          {imageUrl ? (
                            <img
                              src={imageUrl}
                              alt={prop.title || "Property"}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <ImageOff className="w-5 h-5 text-stone-400" />
                          )}
                        </div>
                      </td>

                      {/* Title & Location */}
                      <td className="py-4 px-6 min-w-[200px]">
                        <p className="font-bold text-stone-900 truncate">
                          {prop.title || "Untitled Property"}
                        </p>
                        {prop.location && (
                          <p className="text-xs text-stone-500 flex items-center gap-1 mt-0.5">
                            <MapPin className="w-3 h-3 text-stone-400" />
                            <span>{prop.location}</span>
                          </p>
                        )}
                      </td>

                      {/* Residence Type */}
                      <td className="py-4 px-6 font-medium text-stone-600">
                        {prop.type || "N/A"}
                      </td>

                      {/* Safe Price Rendering */}
                      <td className="py-4 px-6 font-bold text-stone-900">
                        {displayPrice.toLocaleString()} TND
                        <span className="text-xs text-stone-400 font-normal ml-1">
                          / night
                        </span>
                      </td>

                      {/* Status */}
                      <td className="py-4 px-6">
                        <span
                          className={`inline-flex px-2.5 py-1 rounded-full text-xs font-bold border ${
                            prop.status === "Available" ||
                            prop.status === "Per Night"
                              ? "bg-emerald-50 text-emerald-800 border-emerald-200/80"
                              : "bg-stone-100 text-stone-700 border-stone-200"
                          }`}
                        >
                          {prop.status || "Active"}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            to={`/admin/properties/${prop._id}/edit`}
                            className="p-2 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-xl transition-all"
                            title="Edit Property"
                          >
                            <Pencil className="w-4 h-4" />
                          </Link>
                          <button
                            onClick={() => setDeleteId(prop._id)}
                            className="p-2 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-xl transition-all"
                            title="Delete Property"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-md animate-fade-in">
          <div
            className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full border border-stone-200 shadow-2xl space-y-6 text-center"
            role="dialog"
            aria-modal="true"
          >
            <div className="w-14 h-14 bg-rose-50 rounded-full flex items-center justify-center mx-auto text-rose-600 border border-rose-100">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-extrabold text-stone-900 tracking-tight">
                Delete Residence?
              </h3>
              <p className="text-sm text-stone-500 font-light leading-relaxed">
                This action cannot be undone. This property listing will be
                permanently removed.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => setDeleteId(null)}
                className="w-full py-3 px-4 bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold rounded-full text-sm transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="w-full py-3 px-4 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-full text-sm transition-colors shadow-md"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageProperties;
