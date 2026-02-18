import { useState } from 'react';
import Icon from '../layout/ui/Icon';
import { Badge } from '../layout/ui/index';
import { NOTIFICATIONS } from '../../data/mockData';
import { auth } from '../../firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export default function Header({ sidebarOpen, setSidebarOpen, activePage }) {
  const PAGE_LABELS = {
    dashboard: "Dashboard",
    companies: "Companies",
    users:     "Users & Roles",
    buckets:   "Buckets",
    reports:   "Reports",
    settings:  "Settings",
  };
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const critCount = NOTIFICATIONS.filter(n => n.severity === "critical").length;

  const sevStyle = {
    critical: "bg-red-50 border-l-2 border-red-400",
    warning:  "bg-amber-50 border-l-2 border-amber-400",
    info:     "bg-blue-50 border-l-2 border-blue-400",
  };
  const dotColor = { critical: "bg-red-500", warning: "bg-amber-400", info: "bg-blue-400" };
  const navigate = useNavigate();
const handleLogout = async () => {
    await signOut(auth);
    navigate('/login');
  };
  return (
    <header className="h-16 bg-white border-b border-slate-100 flex items-center px-5 gap-4 sticky top-0 z-20 shadow-sm">
      {/* Hamburger */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors flex-shrink-0"
      >
        <Icon name="menu" className="w-5 h-5" />
      </button>

      {/* Title */}
      <div className="flex-1 min-w-0">
        <p className="text-base font-bold text-slate-800">{PAGE_LABELS[activePage]}</p>
        <p className="text-[10px] text-slate-400 hidden sm:block">Multi-Company ERP · Master Admin View</p>
      </div>

      {/* Date */}
      <div className="hidden lg:block text-right">
        <p className="text-xs font-semibold text-slate-600">
          {new Date().toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "short", year: "numeric" })}
        </p>
        <p className="text-[10px] text-slate-400">
          Last sync: {new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
        </p>
      </div>

      {/* Notification Bell */}
      <div className="relative">
        <button
          onClick={() => { setNotifOpen(!notifOpen); setProfileOpen(false); }}
          className="relative p-2 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors"
        >
          <Icon name="bell" className="w-5 h-5" />
          {critCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white" />
          )}
        </button>

        {notifOpen && (
          <div className="absolute right-0 top-full mt-2 w-80 bg-white border border-slate-100 rounded-xl shadow-xl z-50 overflow-hidden">
            <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
              <p className="text-sm font-semibold text-slate-700">Alerts & Notifications</p>
              <span className="text-[10px] bg-red-500 text-white font-bold px-1.5 py-0.5 rounded-full">
                {critCount} critical
              </span>
            </div>
            <div className="divide-y divide-slate-50 max-h-80 overflow-y-auto">
              {NOTIFICATIONS.map(n => (
                <div key={n.id} className={`px-4 py-3 ${sevStyle[n.severity]}`}>
                  <div className="flex items-start gap-2">
                    <span className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${dotColor[n.severity]}`} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <Badge label={n.company} variant={n.company === "APX" ? "apx" : "mrd"} />
                        <Badge label={n.severity} variant={n.severity} />
                      </div>
                      <p className="text-xs text-slate-700">{n.message}</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">{n.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="px-4 py-2.5 border-t border-slate-100">
              <button className="text-xs text-indigo-600 font-semibold hover:text-indigo-800">
                View all notifications →
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
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
            MA
          </div>
          <div className="hidden sm:block text-left">
            <p className="text-xs font-semibold text-slate-700 leading-tight">Master Admin</p>
            <p className="text-[10px] text-slate-400">admin@erp.io</p>
          </div>
          <Icon name="chevron" className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
        </button>

        {profileOpen && (
          <div className="absolute right-0 top-full mt-1 w-44 bg-white border border-slate-100 rounded-xl shadow-xl z-50 overflow-hidden">
            <div className="px-4 py-3 border-b border-slate-100">
              <p className="text-xs font-semibold text-slate-700">Master Admin</p>
              <p className="text-[10px] text-slate-400">admin@erp.io</p>
            </div>
            <button className="w-full flex items-center gap-2 px-4 py-2.5 text-xs text-slate-600 hover:bg-slate-50 transition-colors">
              <Icon name="settings" className="w-4 h-4" /> Profile Settings
            </button>
            <button
             onClick={handleLogout}
            className="w-full flex items-center gap-2 px-4 py-2.5 text-xs text-red-600 hover:bg-red-50 transition-colors border-t border-slate-50">
              <Icon name="logout" className="w-4 h-4" /> Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
