import { NavLink } from "react-router-dom";
import {
  FiHome, FiBox, FiTruck, FiFileText, FiChevronLeft, FiChevronRight,
} from "react-icons/fi";

// const NAV_ITEMS = [
//   { to: "/",        label: "Dashboard", icon: FiHome },
//   { to: "/stock",   label: "Stock",     icon: FiBox },
//   { to: "/dispatch",label: "Dispatch",  icon: FiTruck },
//   { to: "/challan", label: "Challan",   icon: FiFileText },
// ];
const NAV_ITEMS = [
  { to: "/store/dashboard", label: "Dashboard" , icon: FiHome },
  { to: "/store/stock",     label: "Stock",     icon: FiBox },
  { to: "/store/dispatch",  label: "Dispatch" , icon: FiTruck },
  { to: "/store/challan",   label: "Challan",   icon: FiFileText },
];

export default function Sidebar({ open, setOpen }) {
  return (
    <aside
      className="fixed top-0 left-0 h-full bg-slate-900 flex flex-col z-30 transition-all duration-300 overflow-hidden"
      style={{ width: open ? 220 : 60 }}
    >
      {/* Logo */}
      <div className={`flex items-center h-16 px-4 border-b border-white/5 flex-shrink-0 ${open ? "gap-3" : "justify-center"}`}>
        <div className="w-8 h-8 rounded-lg bg-teal-600 flex items-center justify-center flex-shrink-0">
          <FiBox className="text-white" size={16} />
        </div>
        {open && (
          <div>
            <p className="text-white text-sm font-bold whitespace-nowrap leading-tight">Store Manager</p>
            <p className="text-slate-500 text-[10px] whitespace-nowrap">ERP Suite</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 overflow-hidden">
        {open && (
          <p className="px-4 text-slate-600 text-[9px] font-bold uppercase tracking-widest mb-2">
            Navigation
          </p>
        )}
        {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
          <div key={to} className="relative group">
            <NavLink
              to={to}
              end={to === "/"}
              className={({ isActive }) =>
                `flex items-center h-10 transition-all gap-3
                ${open ? "px-4" : "justify-center px-0"}
                ${isActive
                  ? "bg-teal-600/20 text-teal-400 border-r-2 border-teal-500"
                  : "text-slate-400 hover:bg-white/5 hover:text-white"
                }`
              }
            >
              <Icon size={18} className="flex-shrink-0" />
              {open && <span className="text-sm font-medium whitespace-nowrap">{label}</span>}
            </NavLink>
            {/* Tooltip when collapsed */}
            {!open && (
              <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 bg-slate-700 text-white text-xs font-medium rounded-md px-2.5 py-1.5 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50 shadow-lg">
                {label}
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* Collapse toggle */}
      <div className={`border-t border-white/5 p-3 flex-shrink-0 ${open ? "flex justify-end" : "flex justify-center"}`}>
        <button
          onClick={() => setOpen(!open)}
          className="p-1.5 rounded-lg text-slate-500 hover:text-white hover:bg-white/10 transition-colors"
          title={open ? "Collapse sidebar" : "Expand sidebar"}
        >
          {open ? <FiChevronLeft size={16} /> : <FiChevronRight size={16} />}
        </button>
      </div>
    </aside>
  );
}
