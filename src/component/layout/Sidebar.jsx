import Icon from '../layout/ui/Icon';

const NAV = [
  { id: "dashboard", label: "Dashboard" },
  { id: "companies", label: "Companies" },
  { id: "users",     label: "Users" },
  { id: "buckets",   label: "Buckets" },
  { id: "reports",   label: "Reports" },
  { id: "settings",  label: "Settings" },
];

export default function Sidebar({ active, onChange, open }) {
  return (
    <aside
      className={`fixed top-0 left-0 h-full bg-slate-900 flex flex-col z-30 transition-all duration-300 overflow-hidden`}
      style={{ width: open ? 224 : 64 }}
    >
      {/* Logo */}
      <div className={`flex items-center h-16 px-4 border-b border-white/5 flex-shrink-0 ${open ? "gap-3" : "justify-center"}`}>
        <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center flex-shrink-0">
          <span className="text-white font-black text-sm">E</span>
        </div>
        {open && (
          <div>
            <p className="text-white text-sm font-bold whitespace-nowrap">ERP Suite</p>
            <p className="text-slate-500 text-[10px] whitespace-nowrap">Master Admin</p>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 py-3 overflow-hidden">
        <p className={`text-slate-600 text-[9px] font-bold uppercase tracking-widest mb-2 ${open ? "px-4" : "text-center"}`}>
          {open ? "Navigation" : "·"}
        </p>
        {NAV.map(({ id, label }) => {
          const isActive = active === id;
          return (
            <div key={id} className="relative group">
              <button
                onClick={() => onChange(id)}
                className={`w-full flex items-center h-10 transition-all
                  ${open ? "gap-3 px-4" : "justify-center px-0"}
                  ${isActive
                    ? "bg-indigo-600/20 text-indigo-400 border-r-2 border-indigo-500"
                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                  }`}
              >
                <Icon name={id} className="w-[18px] h-[18px] flex-shrink-0" />
                {open && <span className="text-sm font-medium whitespace-nowrap">{label}</span>}
              </button>
              {!open && (
                <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 bg-slate-700 text-white text-xs font-medium rounded-md px-2.5 py-1.5 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50 shadow-lg">
                  {label}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* User info */}
      <div className={`border-t border-white/5 p-4 flex-shrink-0 ${!open ? "flex justify-center" : ""}`}>
        <div className={`flex items-center ${open ? "gap-3" : ""}`}>
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-purple-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
            MA
          </div>
          {open && (
            <div className="min-w-0">
              <p className="text-white text-xs font-semibold truncate">Master Admin</p>
              <p className="text-slate-500 text-[10px] truncate">admin@erp.io</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
