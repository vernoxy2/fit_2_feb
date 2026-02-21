import { useState, useEffect } from "react";
import { auth, db } from "../../../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useLocation } from "react-router-dom";
import {
  FiBell,
  FiUser,
  FiSettings,
  FiLogOut,
  FiMenu,
  FiAlertTriangle,
  FiAlertCircle,
  FiX,
  FiSave,
  FiGlobe,
  FiBellOff,
} from "react-icons/fi";
import { CHALLANS, LOW_STOCK } from "../../data/mockData";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";

export default function Header({ sidebarOpen, setSidebarOpen }) {
  const PAGE_TITLES = {
    "/store/dashboard": "Dashboard",
    "/store/stock": "Stock Management",
    "/store/dispatch": "Dispatch",
    "/store/challan": "Challan & Invoices",
    "store/returns": "Returns & Adjustments",
    "store/products": "Products Catalog",
  };

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");

  // Settings Modal State
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");

  // Profile tab
  const [editName, setEditName] = useState("");
  const [nameMsg, setNameMsg] = useState("");

  // Theme tab
  const [theme, setTheme] = useState("light");

  // Notification tab
  const [notifSettings, setNotifSettings] = useState({
    lowStock: true,
    invoiceOverdue: true,
    dispatch: true,
  });

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

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (!currentUser) return;
      try {
        const userDoc = await getDoc(doc(db, "user", currentUser.uid));
        if (userDoc.exists()) {
          const data = userDoc.data();
          if (data.name) { setUserName(data.name); setEditName(data.name); }
          if (data.email) setUserEmail(data.email);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  // Save name to Firestore
  const handleSaveName = async () => {
    if (!editName.trim()) return;
    try {
      const currentUser = auth.currentUser;
      await updateDoc(doc(db, "user", currentUser.uid), { name: editName });
      setUserName(editName);
      setNameMsg("✓ Name updated successfully!");
      setTimeout(() => setNameMsg(""), 3000);
    } catch (err) {
      setNameMsg("✗ Error updating name.");
    }
  };



  const tabs = [
    { id: "profile", label: "Profile", icon: <FiUser size={14} /> },
    { id: "theme", label: "Theme ", icon: <FiGlobe size={14} /> },
    { id: "notifications", label: "Notifications", icon: <FiBell size={14} /> },
  ];

  return (
    <>
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
            onClick={() => { setNotifOpen(!notifOpen); setProfileOpen(false); }}
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
                      <FiAlertTriangle size={14} className="text-red-500 mt-0.5 flex-shrink-0" />
                    ) : (
                      <FiAlertCircle size={14} className="text-amber-500 mt-0.5 flex-shrink-0" />
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
            onClick={() => { setProfileOpen(!profileOpen); setNotifOpen(false); }}
            className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-teal-600 flex items-center justify-center text-white">
              <FiUser size={15} />
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-xs font-bold text-slate-700 leading-tight">{userName}</p>
              <p className="text-[10px] text-slate-400">{userEmail}</p>
            </div>
          </button>

          {profileOpen && (
            <div className="absolute right-0 top-full mt-1 w-44 bg-white border border-slate-100 rounded-xl shadow-xl z-50 overflow-hidden">
              <div className="px-4 py-3 border-b border-slate-100">
                <p className="text-xs font-bold text-slate-700">{userName}</p>
                <p className="text-[10px] text-slate-400">{userEmail}</p>
              </div>
              <button
                onClick={() => { setSettingsOpen(true); setProfileOpen(false); setActiveTab("profile"); }}
                className="w-full flex items-center gap-2 px-4 py-2.5 text-xs text-slate-600 hover:bg-slate-50 transition-colors"
              >
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

      {/* ===================== SETTINGS MODAL ===================== */}
      {settingsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl mx-4 overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <p className="text-sm font-bold text-slate-800">Settings</p>
              <button onClick={() => setSettingsOpen(false)} className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors">
                <FiX size={18} />
              </button>
            </div>

            <div className="flex">
              {/* Sidebar Tabs */}
              <div className="w-40 border-r border-slate-100 py-3 flex-shrink-0">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-2 px-4 py-2.5 text-xs transition-colors text-left ${
                      activeTab === tab.id
                        ? "bg-teal-50 text-teal-700 font-semibold border-r-2 border-teal-600"
                        : "text-slate-500 hover:bg-slate-50"
                    }`}
                  >
                    {tab.icon} {tab.label}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="flex-1 p-6">

                {/* Profile Tab */}
                {activeTab === "profile" && (
                  <div className="space-y-4">
                    <p className="text-xs font-bold text-slate-700 mb-3">Edit Profile</p>
                    <div>
                      <label className="text-[10px] text-slate-500 font-semibold uppercase tracking-wide">Name</label>
                      <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="mt-1 w-full border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-400"
                        placeholder="Enter your name"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-500 font-semibold uppercase tracking-wide">Email</label>
                      <input
                        type="text"
                        value={userEmail}
                        disabled
                        className="mt-1 w-full border border-slate-100 rounded-lg px-3 py-2 text-xs text-slate-400 bg-slate-50 cursor-not-allowed"
                      />
                      <p className="text-[10px] text-slate-400 mt-1">Email cannot be changed.</p>
                    </div>
                    {nameMsg && <p className={`text-xs font-medium ${nameMsg.startsWith("✓") ? "text-teal-600" : "text-red-500"}`}>{nameMsg}</p>}
                    <button
                      onClick={handleSaveName}
                      className="flex items-center gap-2 bg-teal-600 text-white text-xs font-semibold px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors"
                    >
                      <FiSave size={13} /> Save Name
                    </button>
                  </div>
                )}

                {/* Theme  Tab */}
                {activeTab === "theme" && (
                  <div className="space-y-5">
                    <p className="text-xs font-bold text-slate-700 mb-3">Theme</p>
                    <div>
                      <label className="text-[10px] text-slate-500 font-semibold uppercase tracking-wide">Theme</label>
                      <div className="mt-2 flex gap-3">
                        {["light", "dark"].map((t) => (
                          <button
                            key={t}
                            onClick={() => setTheme(t)}
                            className={`px-4 py-2 rounded-lg text-xs font-semibold border transition-colors capitalize ${
                              theme === t ? "bg-teal-600 text-white border-teal-600" : "border-slate-200 text-slate-500 hover:bg-slate-50"
                            }`}
                          >
                            {t === "light" ? "☀️ Light" : "🌙 Dark"}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Notifications Tab */}
                {activeTab === "notifications" && (
                  <div className="space-y-4">
                    <p className="text-xs font-bold text-slate-700 mb-3">Notification Preferences</p>
                    {[
                      { key: "lowStock", label: "Low Stock Alerts", desc: "Alert when stock goes below minimum level" },
                      { key: "invoiceOverdue", label: "Overdue Invoice Alerts", desc: "Alert when invoice payment is overdue" },
                      { key: "dispatch", label: "Dispatch Notifications", desc: "Notify on new dispatch orders" },
                    ].map(({ key, label, desc }) => (
                      <div key={key} className="flex items-center justify-between py-2 border-b border-slate-50">
                        <div>
                          <p className="text-xs font-semibold text-slate-700">{label}</p>
                          <p className="text-[10px] text-slate-400">{desc}</p>
                        </div>
                        <button
                          onClick={() => setNotifSettings((prev) => ({ ...prev, [key]: !prev[key] }))}
                          className={`relative w-9 h-5 rounded-full transition-colors ${notifSettings[key] ? "bg-teal-500" : "bg-slate-200"}`}
                        >
                          <span className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${notifSettings[key] ? "translate-x-4" : "translate-x-0"}`} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}