import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import {
  Search,
  SlidersHorizontal,
  UserCheck,
  UserX,
  Users,
  Trash2,
  X,
  RotateCcw,
  ArrowUpDown,
  Check,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  ShieldAlert,
} from "lucide-react";

const ManageClients = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [counts, setCounts] = useState({ total: 0, active: 0, suspended: 0 });

  // Advanced Filters State
  const [filters, setFilters] = useState({
    search: "",
    status: "", // '', 'active', 'suspended'
    sort: "newest", // 'newest', 'oldest', 'name_asc', 'name_desc'
  });

  // Action Confirmation State (In-Table Prompt)
  // Format: { id: clientId, action: 'activate' | 'suspend' | 'delete' }
  const [confirmAction, setConfirmAction] = useState({
    id: null,
    action: null,
  });
  const [processingId, setProcessingId] = useState(null);

  // Fetch Clients Function
  const fetchClients = useCallback(async () => {
    setLoading(true);
    try {
      const params = {
        page,
        limit: 10,
        sort: filters.sort,
      };

      if (filters.search) params.search = filters.search;
      if (filters.status) params.status = filters.status;

      const res = await axios.get("/api/admin/clients", { params });
      setClients(res.data.clients || []);
      setPages(res.data.pages || 1);
      if (res.data.counts) {
        setCounts(res.data.counts);
      }
    } catch (error) {
      console.error("Failed to fetch clients:", error);
    } finally {
      setLoading(false);
    }
  }, [page, filters]);

  useEffect(() => {
    fetchClients();
  }, [fetchClients]);

  // Handle Filter Change
  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
    setPage(1); // Reset to first page when filtering
  };

  // Reset Filters
  const resetFilters = () => {
    setFilters({
      search: "",
      status: "",
      sort: "newest",
    });
    setPage(1);
  };

  // Trigger Inline Confirmation
  const requestConfirmation = (id, action) => {
    setConfirmAction({ id, action });
  };

  // Cancel Inline Confirmation
  const cancelConfirmation = () => {
    setConfirmAction({ id: null, action: null });
  };

  // Execute Action upon "Yes" click
  const executeAction = async (client) => {
    const { action } = confirmAction;
    if (!action || !client) return;

    setProcessingId(client._id);
    try {
      if (action === "activate" || action === "suspend") {
        await axios.put(`/api/admin/clients/${client._id}`);
      } else if (action === "delete") {
        await axios.delete(`/api/admin/clients/${client._id}`);
      }
      setConfirmAction({ id: null, action: null });
      fetchClients();
    } catch (error) {
      alert(error.response?.data?.message || `Failed to ${action} client`);
    } finally {
      setProcessingId(null);
    }
  };

  const activeFiltersCount =
    (filters.search ? 1 : 0) +
    (filters.status ? 1 : 0) +
    (filters.sort !== "newest" ? 1 : 0);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
            Manage Clients
          </h1>
          <p className="text-stone-500 text-sm mt-1">
            Review client accounts, monitor status, and manage platform
            permissions.
          </p>
        </div>
      </div>

      {/* Stats Summary Widgets */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-stone-200/80 rounded-2xl p-4 flex items-center gap-4 shadow-xs">
          <div className="w-12 h-12 bg-stone-100 rounded-xl flex items-center justify-center text-stone-700 shrink-0">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-stone-500">
              Total Registered
            </p>
            <p className="text-2xl font-black text-stone-900">{counts.total}</p>
          </div>
        </div>

        <div className="bg-white border border-stone-200/80 rounded-2xl p-4 flex items-center gap-4 shadow-xs">
          <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 shrink-0 border border-emerald-100">
            <UserCheck className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-emerald-700">
              Active Accounts
            </p>
            <p className="text-2xl font-black text-stone-900">
              {counts.active}
            </p>
          </div>
        </div>

        <div className="bg-white border border-stone-200/80 rounded-2xl p-4 flex items-center gap-4 shadow-xs">
          <div className="w-12 h-12 bg-rose-50 rounded-xl flex items-center justify-center text-rose-600 shrink-0 border border-rose-100">
            <UserX className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-rose-700">
              Suspended Accounts
            </p>
            <p className="text-2xl font-black text-stone-900">
              {counts.suspended}
            </p>
          </div>
        </div>
      </div>

      {/* Filter Control Bar */}
      <div className="bg-white border border-stone-200/80 rounded-3xl p-4 shadow-xs space-y-3">
        <div className="flex flex-col md:flex-row items-center gap-3">
          {/* Main Search */}
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              placeholder="Search by name, email, or phone..."
              value={filters.search}
              onChange={(e) => handleFilterChange("search", e.target.value)}
              className="w-full bg-stone-50 border border-stone-200 pl-11 pr-10 py-2.5 rounded-2xl text-sm font-medium text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-900 transition"
            />
            {filters.search && (
              <button
                onClick={() => handleFilterChange("search", "")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Quick Filters */}
          <div className="flex items-center gap-2.5 w-full md:w-auto shrink-0 overflow-x-auto">
            {/* Status Dropdown */}
            <select
              value={filters.status}
              onChange={(e) => handleFilterChange("status", e.target.value)}
              className="bg-stone-50 border border-stone-200 rounded-2xl px-3.5 py-2.5 text-xs font-bold text-stone-700 focus:outline-none focus:ring-2 focus:ring-stone-900 cursor-pointer"
            >
              <option value="">All Account Statuses</option>
              <option value="active">Active Only</option>
              <option value="suspended">Suspended Only</option>
            </select>

            {/* Sorting */}
            <div className="flex items-center gap-1.5 bg-stone-50 border border-stone-200 px-3.5 py-2.5 rounded-2xl text-xs font-bold text-stone-700">
              <ArrowUpDown className="w-3.5 h-3.5 text-stone-400" />
              <select
                value={filters.sort}
                onChange={(e) => handleFilterChange("sort", e.target.value)}
                className="bg-transparent focus:outline-none cursor-pointer"
              >
                <option value="newest">Newest Joined</option>
                <option value="oldest">Oldest Joined</option>
                <option value="name_asc">Name (A to Z)</option>
                <option value="name_desc">Name (Z to A)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Active Filter Chips */}
        {activeFiltersCount > 0 && (
          <div className="pt-2 border-t border-stone-100 flex items-center justify-between flex-wrap gap-2 text-xs">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-stone-400 text-[11px] uppercase tracking-wider">
                Active Filters:
              </span>
              {filters.search && (
                <span className="inline-flex items-center gap-1 bg-stone-100 border border-stone-200 px-2.5 py-1 rounded-full text-stone-800 font-semibold">
                  Search: "{filters.search}"
                  <X
                    className="w-3 h-3 text-stone-400 cursor-pointer hover:text-stone-900"
                    onClick={() => handleFilterChange("search", "")}
                  />
                </span>
              )}
              {filters.status && (
                <span className="inline-flex items-center gap-1 bg-stone-100 border border-stone-200 px-2.5 py-1 rounded-full text-stone-800 font-semibold capitalize">
                  Status: {filters.status}
                  <X
                    className="w-3 h-3 text-stone-400 cursor-pointer hover:text-stone-900"
                    onClick={() => handleFilterChange("status", "")}
                  />
                </span>
              )}
            </div>

            <button
              onClick={resetFilters}
              className="inline-flex items-center gap-1 text-rose-600 font-bold hover:text-rose-700 transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset All
            </button>
          </div>
        )}
      </div>

      {/* Table Data Container */}
      {loading ? (
        <div className="bg-white border border-stone-200/80 rounded-3xl p-8 space-y-4 animate-pulse">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-12 bg-stone-100 rounded-xl w-full" />
          ))}
        </div>
      ) : clients.length === 0 ? (
        <div className="bg-white border border-stone-200/80 rounded-3xl p-12 text-center shadow-xs">
          <div className="w-12 h-12 bg-stone-100 text-stone-500 rounded-full flex items-center justify-center mx-auto mb-3">
            <Users className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-stone-900">
            No clients found
          </h3>
          <p className="text-stone-500 text-xs mt-1">
            Try adjusting or clearing your active filters to view results.
          </p>
          {activeFiltersCount > 0 && (
            <button
              onClick={resetFilters}
              className="inline-flex items-center gap-2 mt-4 bg-stone-900 text-white px-4 py-2 rounded-full text-xs font-bold"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset Filters
            </button>
          )}
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-stone-200/80 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-stone-50/80 border-b border-stone-200/80 text-[11px] font-extrabold text-stone-500 uppercase tracking-wider">
                  <th className="py-4 px-6">Client Profile</th>
                  <th className="py-4 px-6">Contact Info</th>
                  <th className="py-4 px-6">Joined Date</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 text-sm">
                {clients.map((client) => {
                  const isConfirmingThisRow = confirmAction.id === client._id;
                  const isProcessing = processingId === client._id;

                  return (
                    <tr
                      key={client._id}
                      className={`transition-colors ${
                        isConfirmingThisRow
                          ? "bg-amber-50/50"
                          : "hover:bg-stone-50/60"
                      }`}
                    >
                      {/* Name & Avatar */}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-stone-900 text-white flex items-center justify-center font-black text-sm uppercase overflow-hidden shrink-0">
                            {client.avatar &&
                            client.avatar !== "default-avatar.png" ? (
                              <img
                                src={client.avatar}
                                alt={client.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              client.name?.charAt(0) || "C"
                            )}
                          </div>
                          <div>
                            <p className="font-bold text-stone-900">
                              {client.name}
                            </p>
                            <p className="text-xs text-stone-400 font-mono">
                              ID: {client._id.slice(-6)}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Contact Info */}
                      <td className="py-4 px-6">
                        <p className="text-stone-700 font-medium">
                          {client.email}
                        </p>
                        <p className="text-xs text-stone-400 mt-0.5">
                          {client.phone && client.phone !== "Not provided"
                            ? client.phone
                            : "Phone N/A"}
                        </p>
                      </td>

                      {/* Joined Date */}
                      <td className="py-4 px-6 text-stone-600 font-medium whitespace-nowrap">
                        {new Date(client.createdAt).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          },
                        )}
                      </td>

                      {/* Status Badge */}
                      <td className="py-4 px-6 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${
                            client.isActive
                              ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                              : "bg-rose-50 text-rose-800 border-rose-200"
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              client.isActive ? "bg-emerald-500" : "bg-rose-500"
                            }`}
                          />
                          {client.isActive ? "Active" : "Suspended"}
                        </span>
                      </td>

                      {/* Dynamic In-Table Actions & "Are You Sure?" Confirmation */}
                      <td className="py-4 px-6 text-right whitespace-nowrap">
                        {isConfirmingThisRow ? (
                          <div className="inline-flex items-center gap-2 bg-stone-900 text-white p-1.5 pl-3 rounded-2xl shadow-md animate-in fade-in zoom-in-95 duration-150">
                            <span className="text-xs font-bold flex items-center gap-1">
                              <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
                              Are you sure you want to {confirmAction.action}?
                            </span>
                            <button
                              disabled={isProcessing}
                              onClick={() => executeAction(client)}
                              className="px-2.5 py-1 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-xs font-black transition flex items-center gap-1"
                            >
                              <Check className="w-3 h-3" />
                              Yes
                            </button>
                            <button
                              disabled={isProcessing}
                              onClick={cancelConfirmation}
                              className="px-2.5 py-1 bg-stone-700 hover:bg-stone-600 text-stone-200 rounded-xl text-xs font-bold transition"
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center justify-end gap-2">
                            {/* Toggle Active Status Button */}
                            <button
                              onClick={() =>
                                requestConfirmation(
                                  client._id,
                                  client.isActive ? "suspend" : "activate",
                                )
                              }
                              className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition ${
                                client.isActive
                                  ? "bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100"
                                  : "bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100"
                              }`}
                            >
                              {client.isActive ? "Suspend" : "Activate"}
                            </button>

                            {/* Delete Button */}
                            <button
                              onClick={() =>
                                requestConfirmation(client._id, "delete")
                              }
                              className="p-1.5 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition"
                              title="Delete Client"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination Bar */}
          {pages > 1 && (
            <div className="p-4 border-t border-stone-100 flex items-center justify-between text-xs font-medium text-stone-500">
              <span>
                Page <strong className="text-stone-900">{page}</strong> of{" "}
                <strong className="text-stone-900">{pages}</strong>
              </span>

              <div className="flex items-center gap-1">
                <button
                  disabled={page === 1}
                  onClick={() => setPage((p) => p - 1)}
                  className="p-2 rounded-xl border border-stone-200 disabled:opacity-40 hover:bg-stone-50 transition"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  disabled={page === pages}
                  onClick={() => setPage((p) => p + 1)}
                  className="p-2 rounded-xl border border-stone-200 disabled:opacity-40 hover:bg-stone-50 transition"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ManageClients;
