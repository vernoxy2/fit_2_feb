import { useState } from "react";
import { useLocation } from "react-router-dom";
import {
  FiBell,
  FiUser,
  FiSettings,
  FiLogOut,
  FiMenu,
  FiAlertTriangle,
  FiAlertCircle,
} from "react-icons/fi";
import { CHALLANS, LOW_STOCK } from "../../data/mockData";
import { useNavigate } from 'react-router-dom';
import { auth } from '../../../firebase';
import { signOut } from 'firebase/auth';

export default function Header({ sidebarOpen, setSidebarOpen }) {
  const PAGE_TITLES = {
    "/store/dashboard": "Dashboard",
    "/store/stock": "Stock Management",
    "/store/dispatch": "Dispatch",
    "/store/challan": "Challan & Invoices",
    "store/returns":  "Returns & Adjustments",
  };
  const navigate = useNavigate();
  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };
  const { pathname } = useLocation();
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const criticalAlerts = [
    ...CHALLANS.filter((c) => c.status === "overdue").map((c) => ({
      type: "invoice",
      msg: `${c.id} overdue — ₹${c.amount.toLocaleString("en-IN")}`,
    })),
    ...LOW_STOCK.slice(0, 3).map((s) => ({
      type: "stock",
      msg: `${s.name}: ${s.available} units left (min: ${s.minLevel})`,
    })),
  ];

  return (
    <header className="h-16 bg-white border-b border-slate-100 flex items-center px-5 gap-4 sticky top-0 z-20 shadow-sm">
      {/* Hamburger */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors flex-shrink-0"
      >
        <FiMenu size={20} />
      </button>

      {/* Title */}
      <div className="flex-1 min-w-0">
        <p className="text-base font-bold text-slate-800">
          {PAGE_TITLES[pathname] || "Store Manager"}
        </p>
        <p className="text-[10px] text-slate-400 hidden sm:block">
          {new Date().toLocaleDateString("en-IN", {
            weekday: "long",
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </p>
      </div>

      {/* Notification Bell */}
      <div className="relative">
        <button
          onClick={() => {
            setNotifOpen(!notifOpen);
            setProfileOpen(false);
          }}
          className="relative p-2 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors"
        >
          <FiBell size={20} />
          {criticalAlerts.length > 0 && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white" />
          )}
        </button>

        {notifOpen && (
          <div className="absolute right-0 top-full mt-2 w-80 bg-white border border-slate-100 rounded-xl shadow-xl z-50 overflow-hidden">
            <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
              <p className="text-sm font-bold text-slate-700">Alerts</p>
              <span className="text-[10px] bg-red-500 text-white font-bold px-1.5 py-0.5 rounded-full">
                {criticalAlerts.length}
              </span>
            </div>
            <div className="divide-y divide-slate-50 max-h-72 overflow-y-auto">
              {criticalAlerts.map((a, i) => (
                <div
                  key={i}
                  className={`px-4 py-3 flex items-start gap-3 ${a.type === "invoice" ? "bg-red-50/40 border-l-2 border-red-400" : "bg-amber-50/40 border-l-2 border-amber-400"}`}
                >
                  {a.type === "invoice" ? (
                    <FiAlertTriangle
                      size={14}
                      className="text-red-500 mt-0.5 flex-shrink-0"
                    />
                  ) : (
                    <FiAlertCircle
                      size={14}
                      className="text-amber-500 mt-0.5 flex-shrink-0"
                    />
                  )}
                  <p className="text-xs text-slate-700">{a.msg}</p>
                </div>
              ))}
            </div>
            <div className="px-4 py-2.5 border-t border-slate-100">
              <button className="text-xs text-teal-600 font-semibold hover:text-teal-800">
                View all →
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Profile */}
      <div className="relative">
        <button
          onClick={() => {
            setProfileOpen(!profileOpen);
            setNotifOpen(false);
          }}
          className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
        >
          <div className="w-8 h-8 rounded-full bg-teal-600 flex items-center justify-center text-white">
            <FiUser size={15} />
          </div>
          <div className="hidden sm:block text-left">
            <p className="text-xs font-bold text-slate-700 leading-tight">
              Store Manager
            </p>
            <p className="text-[10px] text-slate-400">store@erp.io</p>
          </div>
        </button>

        {profileOpen && (
          <div className="absolute right-0 top-full mt-1 w-44 bg-white border border-slate-100 rounded-xl shadow-xl z-50 overflow-hidden">
            <div className="px-4 py-3 border-b border-slate-100">
              <p className="text-xs font-bold text-slate-700">Store Manager</p>
              <p className="text-[10px] text-slate-400">store@erp.io</p>
            </div>
            <button className="w-full flex items-center gap-2 px-4 py-2.5 text-xs text-slate-600 hover:bg-slate-50 transition-colors">
              <FiSettings size={14} /> Settings
            </button>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2 px-4 py-2.5 text-xs text-red-600 hover:bg-red-50 transition-colors border-t border-slate-50"
            >
              <FiLogOut size={14} /> Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
