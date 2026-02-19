import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FiBell, FiUser, FiSettings, FiLogOut, FiMenu } from "react-icons/fi";
import { signOut } from 'firebase/auth';
import { auth } from '../../../firebase';

export default function SalesHeader({ sidebarOpen, setSidebarOpen }) {
  const { pathname } = useLocation();
  const PAGE_TITLES = {
    "/sales/dashboard": "Sales Dashboard",
    "/sales/work-orders": "Work Orders",
    "/sales/work-orders/create": "Create Work Order",
    "/sales/purchase-orders": "Purchase Orders",
    "/sales/purchase-orders/upload-invoice": "Upload Invoice",
    "/sales/products": "Product Catalog",
  };
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();
  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };
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
          {PAGE_TITLES[pathname] || "Sales User"}
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
      <button className="relative p-2 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors">
        <FiBell size={20} />
      </button>

      {/* Profile */}
      <div className="relative">
        <button
          onClick={() => setProfileOpen(!profileOpen)}
          className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
        >
          <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white">
            <FiUser size={15} />
          </div>
          <div className="hidden sm:block text-left">
            <p className="text-xs font-bold text-slate-700 leading-tight">
              Sales User
            </p>
            <p className="text-[10px] text-slate-400">sales@erp.io</p>
          </div>
        </button>

        {profileOpen && (
          <div className="absolute right-0 top-full mt-1 w-44 bg-white border border-slate-100 rounded-xl shadow-xl z-50 overflow-hidden">
            <div className="px-4 py-3 border-b border-slate-100">
              <p className="text-xs font-bold text-slate-700">Sales User</p>
              <p className="text-[10px] text-slate-400">sales@erp.io</p>
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
