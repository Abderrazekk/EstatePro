import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  TrendingUp,
  Building,
  Users,
  MessageSquare,
  Plus,
  Eye,
  CheckCircle2,
  Clock,
  XCircle,
  Sparkles,
  ArrowUpRight,
  ShieldAlert,
  Award,
  Calendar,
  Filter,
} from "lucide-react";

const AdminDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [period, setPeriod] = useState("all"); // 'all', 'year', 'month', 'week'

  useEffect(() => {
    fetchDashboardData(period);
  }, [period]);

  const fetchDashboardData = async (selectedPeriod) => {
    try {
      setLoading(true);
      const res = await axios.get(`/api/admin/stats?period=${selectedPeriod}`);
      setData(res.data);
    } catch (err) {
      console.error("Failed to load dashboard data", err);
      setError("Failed to synchronize dashboard metrics.");
    } finally {
      setLoading(false);
    }
  };

  const resolveImageUrl = (imageObj) => {
    if (!imageObj) return "";
    const path = typeof imageObj === "string" ? imageObj : imageObj.url || "";
    if (path.startsWith("http")) return path;
    const cleanPath = path.replace(/\\/g, "/").replace(/^\//, "");
    return `http://localhost:5000/${cleanPath}`;
  };

  const periodLabels = {
    all: "All-Time",
    year: "This Year",
    month: "This Month",
    week: "This Week",
  };

  if (loading && !data) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 border-4 border-stone-900 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-sm font-bold text-stone-500 uppercase tracking-widest">
          Loading Analytics Portal...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-rose-50 border border-rose-200 rounded-3xl text-rose-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <ShieldAlert className="w-6 h-6 text-rose-600" />
          <p className="font-semibold text-sm">{error}</p>
        </div>
        <button
          onClick={() => fetchDashboardData(period)}
          className="px-4 py-2 bg-rose-600 text-white rounded-xl text-xs font-bold hover:bg-rose-700 transition"
        >
          Retry
        </button>
      </div>
    );
  }

  const { stats, recentEnquiries, topProperties, propertyTypeAgg } = data || {};

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Dashboard Top Header & Period Filter Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-white p-6 sm:p-8 rounded-3xl border border-stone-200/80 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-stone-100 text-stone-700 rounded-full text-xs font-extrabold uppercase tracking-wider border border-stone-200">
              Overview
            </span>
            <span className="text-xs text-stone-400 font-medium">
              Real-Time Metrics
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight mt-2">
            Administrative Control Panel
          </h1>
          <p className="text-sm text-stone-500 font-normal mt-1">
            Monitor real-time revenue, reservations, property listings, and
            client metrics.
          </p>
        </div>

        {/* Global Controls & Period Filter Bar */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Filter Period Buttons */}
          <div className="flex items-center bg-stone-100 p-1 rounded-2xl border border-stone-200">
            <div className="px-2 text-stone-400">
              <Filter className="w-3.5 h-3.5" />
            </div>
            {[
              { id: "all", label: "All Time" },
              { id: "year", label: "Year" },
              { id: "month", label: "Month" },
              { id: "week", label: "Week" },
            ].map((btn) => (
              <button
                key={btn.id}
                onClick={() => setPeriod(btn.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 ${
                  period === btn.id
                    ? "bg-white text-stone-900 shadow-sm border border-stone-200"
                    : "text-stone-500 hover:text-stone-900"
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>

          <Link
            to="/admin/properties"
            className="flex items-center gap-2 px-5 py-3 bg-stone-900 hover:bg-stone-800 text-white font-bold rounded-2xl text-xs tracking-wide shadow-md transition-all duration-200"
          >
            <Plus className="w-4 h-4" />
            <span>Add Property</span>
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Dynamic Filtered Revenue Card */}
        <div className="bg-stone-950 text-white p-6 rounded-3xl border border-stone-800 shadow-xl flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute -right-4 -bottom-4 w-28 h-28 bg-stone-800/40 rounded-full blur-2xl group-hover:bg-stone-700/50 transition-all"></div>
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-stone-400" />
                Revenue ({periodLabels[period]})
              </span>
              <div className="p-2.5 bg-stone-800/80 rounded-2xl border border-stone-700">
                <TrendingUp className="w-5 h-5 text-emerald-400" />
              </div>
            </div>
            <p className="text-3xl font-black tracking-tight mt-4 text-white">
              {stats?.periodRevenue ? stats.periodRevenue.toLocaleString() : 0}{" "}
              <span className="text-sm text-stone-400 font-bold">Euro</span>
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-stone-800/80 flex items-center justify-between text-xs text-stone-400">
            <span>All-Time Base</span>
            <span className="text-stone-300 font-bold">
              {stats?.allTimeRevenue
                ? stats.allTimeRevenue.toLocaleString()
                : 0}{" "}
              Euro
            </span>
          </div>
        </div>

        {/* Total Properties Card */}
        <div className="bg-white p-6 rounded-3xl border border-stone-200/80 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-stone-400 uppercase tracking-wider">
                Listed Properties
              </span>
              <div className="p-2.5 bg-stone-100 rounded-2xl border border-stone-200">
                <Building className="w-5 h-5 text-stone-800" />
              </div>
            </div>
            <p className="text-3xl font-black text-stone-900 tracking-tight mt-4">
              {stats?.totalProperties || 0}
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              {stats?.availableProperties || 0} Available
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              {stats?.maintenanceProperties || 0} Maint.
            </span>
          </div>
        </div>

        {/* Total Enquiries Card */}
        <div className="bg-white p-6 rounded-3xl border border-stone-200/80 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-stone-400 uppercase tracking-wider">
                Total Enquiries
              </span>
              <div className="p-2.5 bg-stone-100 rounded-2xl border border-stone-200">
                <MessageSquare className="w-5 h-5 text-stone-800" />
              </div>
            </div>
            <p className="text-3xl font-black text-stone-900 tracking-tight mt-4">
              {stats?.totalEnquiries || 0}
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
            <span className="text-amber-600 font-bold">
              {stats?.pendingEnquiries || 0} Pending
            </span>
            <span className="text-emerald-600 font-bold">
              {stats?.confirmedEnquiries || 0} Confirmed
            </span>
          </div>
        </div>

        {/* Registered Clients Card */}
        <div className="bg-white p-6 rounded-3xl border border-stone-200/80 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-stone-400 uppercase tracking-wider">
                Client Accounts
              </span>
              <div className="p-2.5 bg-stone-100 rounded-2xl border border-stone-200">
                <Users className="w-5 h-5 text-stone-800" />
              </div>
            </div>
            <p className="text-3xl font-black text-stone-900 tracking-tight mt-4">
              {stats?.totalClients || 0}
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
            <span>{stats?.activeClients || 0} Active</span>
            <span className="text-stone-400">
              {stats?.totalSponsors || 0} Sponsors
            </span>
          </div>
        </div>
      </div>

      {/* Reservation Status & Property Types Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Reservation Status */}
        <div className="bg-white p-6 rounded-3xl border border-stone-200/80 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-extrabold text-stone-900 text-base">
                Reservation Breakdown
              </h3>
              <Sparkles className="w-4 h-4 text-stone-400" />
            </div>

            <div className="space-y-4">
              {/* Pending Bar */}
              <div>
                <div className="flex justify-between text-xs font-bold mb-1.5">
                  <span className="flex items-center gap-1.5 text-amber-700">
                    <Clock className="w-3.5 h-3.5" /> Pending
                  </span>
                  <span className="text-stone-900">
                    {stats?.pendingEnquiries || 0}
                  </span>
                </div>
                <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-amber-500 h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${
                        stats?.totalEnquiries
                          ? (
                              (stats.pendingEnquiries / stats.totalEnquiries) *
                              100
                            ).toFixed(0)
                          : 0
                      }%`,
                    }}
                  ></div>
                </div>
              </div>

              {/* Confirmed Bar */}
              <div>
                <div className="flex justify-between text-xs font-bold mb-1.5">
                  <span className="flex items-center gap-1.5 text-emerald-700">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Confirmed
                  </span>
                  <span className="text-stone-900">
                    {stats?.confirmedEnquiries || 0}
                  </span>
                </div>
                <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${
                        stats?.totalEnquiries
                          ? (
                              (stats.confirmedEnquiries /
                                stats.totalEnquiries) *
                              100
                            ).toFixed(0)
                          : 0
                      }%`,
                    }}
                  ></div>
                </div>
              </div>

              {/* Refused Bar */}
              <div>
                <div className="flex justify-between text-xs font-bold mb-1.5">
                  <span className="flex items-center gap-1.5 text-rose-700">
                    <XCircle className="w-3.5 h-3.5" /> Refused
                  </span>
                  <span className="text-stone-900">
                    {stats?.refusedEnquiries || 0}
                  </span>
                </div>
                <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-rose-500 h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${
                        stats?.totalEnquiries
                          ? (
                              (stats.refusedEnquiries / stats.totalEnquiries) *
                              100
                            ).toFixed(0)
                          : 0
                      }%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <Link
            to="/admin/enquiries"
            className="mt-6 flex items-center justify-between text-xs font-bold text-stone-900 bg-stone-50 hover:bg-stone-100 p-3 rounded-2xl border border-stone-200/80 transition"
          >
            <span>Manage All Enquiries</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Portfolio Breakdown by Property Type */}
        <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-stone-200/80 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-extrabold text-stone-900 text-base">
                  Portfolio Breakdown by Property Type
                </h3>
                <p className="text-xs text-stone-400 mt-0.5">
                  Distribution of listed accommodation options
                </p>
              </div>
              <Award className="w-5 h-5 text-stone-400" />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {propertyTypeAgg && propertyTypeAgg.length > 0 ? (
                propertyTypeAgg.map((item) => (
                  <div
                    key={item._id}
                    className="p-4 bg-stone-50/80 rounded-2xl border border-stone-100 flex flex-col justify-between"
                  >
                    <span className="text-xs font-bold text-stone-500 truncate">
                      {item._id || "Uncategorized"}
                    </span>
                    <p className="text-2xl font-black text-stone-900 mt-2">
                      {item.count}
                    </p>
                  </div>
                ))
              ) : (
                <div className="col-span-full py-8 text-center text-xs text-stone-400 font-medium">
                  No property categories logged.
                </div>
              )}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
            <span>
              Featured Listings:{" "}
              <strong className="text-stone-900">
                {stats?.featuredProperties || 0}
              </strong>
            </span>
            <Link
              to="/admin/properties"
              className="text-stone-900 font-bold hover:underline"
            >
              View Listings →
            </Link>
          </div>
        </div>
      </div>

      {/* Tables Section: Recent Reservations & Top Viewed Properties */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Reservations Table */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-stone-200/80 shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 border-b border-stone-100 flex items-center justify-between">
            <div>
              <h3 className="font-extrabold text-stone-900 text-base">
                Recent Reservation Requests
              </h3>
              <p className="text-xs text-stone-400 mt-0.5">
                Latest client inquiries requiring action
              </p>
            </div>
            <Link
              to="/admin/enquiries"
              className="text-xs font-bold text-stone-900 hover:text-stone-600 underline"
            >
              View All
            </Link>
          </div>

          <div className="overflow-x-auto flex-1">
            {!recentEnquiries || recentEnquiries.length === 0 ? (
              <div className="p-8 text-center text-stone-400 text-xs font-medium">
                No recent enquiries available.
              </div>
            ) : (
              <table className="w-full text-left text-xs">
                <thead className="bg-stone-50/80 text-stone-400 uppercase font-bold text-[10px] tracking-wider border-b border-stone-100">
                  <tr>
                    <th className="p-4">Client</th>
                    <th className="p-4">Property</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 font-medium">
                  {recentEnquiries.map((enq) => (
                    <tr
                      key={enq._id}
                      className="hover:bg-stone-50/50 transition"
                    >
                      <td className="p-4">
                        <p className="font-bold text-stone-900">
                          {enq.client?.name || "Guest Client"}
                        </p>
                        <p className="text-[11px] text-stone-400">
                          {enq.client?.email}
                        </p>
                      </td>
                      <td className="p-4">
                        <p className="text-stone-800 font-semibold truncate max-w-[160px]">
                          {enq.property?.title || "Property Listing"}
                        </p>
                        <p className="text-[10px] text-stone-400">
                          {enq.property?.location}
                        </p>
                      </td>
                      <td className="p-4">
                        <span
                          className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                            enq.status === "pending"
                              ? "bg-amber-100 text-amber-800"
                              : enq.status === "confirmed"
                                ? "bg-emerald-100 text-emerald-800"
                                : "bg-rose-100 text-rose-800"
                          }`}
                        >
                          {enq.status}
                        </span>
                      </td>
                      <td className="p-4 text-right font-black text-stone-900">
                        {enq.totalPrice ? enq.totalPrice.toLocaleString() : 0}{" "}
                        Euro
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Top Viewed Properties List */}
        <div className="bg-white rounded-3xl border border-stone-200/80 shadow-sm p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-extrabold text-stone-900 text-base">
                  Top Viewed Properties
                </h3>
                <p className="text-xs text-stone-400 mt-0.5">
                  Highest engagement listings
                </p>
              </div>
              <Eye className="w-4 h-4 text-stone-400" />
            </div>

            <div className="space-y-4">
              {!topProperties || topProperties.length === 0 ? (
                <p className="text-center text-stone-400 text-xs py-6">
                  No properties logged yet.
                </p>
              ) : (
                topProperties.map((prop) => (
                  <div
                    key={prop._id}
                    className="flex items-center justify-between p-3 rounded-2xl bg-stone-50/60 border border-stone-100 hover:border-stone-200 transition"
                  >
                    <div className="flex items-center gap-3 overflow-hidden">
                      {prop.images?.[0] ? (
                        <img
                          src={resolveImageUrl(prop.images[0])}
                          alt={prop.title}
                          className="w-10 h-10 rounded-xl object-cover shrink-0 border border-stone-200"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-xl bg-stone-200 shrink-0 flex items-center justify-center text-stone-400 font-bold text-xs">
                          Dar
                        </div>
                      )}
                      <div className="overflow-hidden">
                        <p className="text-xs font-bold text-stone-900 truncate">
                          {prop.title}
                        </p>
                        <p className="text-[10px] text-stone-400 truncate">
                          {prop.location}
                        </p>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <p className="text-xs font-black text-stone-900 flex items-center justify-end gap-1">
                        <Eye className="w-3 h-3 text-stone-400" />
                        {prop.views || 0}
                      </p>
                      <span className="text-[10px] font-bold text-stone-500">
                        {prop.pricePerNight} Euro / night
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <Link
            to="/admin/properties"
            className="mt-6 block text-center text-xs font-bold text-stone-900 hover:text-stone-600 bg-stone-100 py-3 rounded-2xl transition"
          >
            Manage All Listings
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
