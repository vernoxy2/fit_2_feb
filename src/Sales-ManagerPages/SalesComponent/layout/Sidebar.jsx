import React from "react";
import { NavLink } from "react-router-dom";
import { FiHome, FiPackage, FiTruck, FiFileText, FiShoppingCart, FiUpload, FiDollarSign } from "react-icons/fi";

export default function Sidebar() {
  const navItems = [
    { to: "/sales/dashboard", icon: FiHome, label: "Dashboard" },
    { to: "/sales/work-orders", icon: FiPackage, label: "Work Orders" },
    { to: "/sales/work-orders/upload", icon: FiUpload, label: "Upload WO Excel" },
    { to: "/sales/challans", icon: FiTruck, label: "Challans" },
    { to: "/sales/challans/create", icon: FiTruck, label: "Create Challan" },
    { to: "/sales/invoices", icon: FiFileText, label: "Customer Invoices" },
    { to: "/sales/invoices/upload", icon: FiUpload, label: "Upload Invoice" },
    { to: "/sales/purchase-orders", icon: FiShoppingCart, label: "Purchase Orders" },
    { to: "/sales/purchase-orders/create", icon: FiShoppingCart, label: "Create PO" },
    { to: "/sales/purchase-orders/upload-invoice", icon: FiDollarSign, label: "Vendor Invoice" },
    { to: "/sales/products", icon: FiFileText, label: "Products" },
    { to: "/sales/sales-stock", icon: FiFileText, label: "Sales Stock" },

  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col">
      {/* Logo */}
      <div className="h-16 border-b border-slate-200 flex items-center px-5">
        <div>
          <h1 className="text-lg font-black text-indigo-600">ERP System</h1>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Sales Module</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-sm ${
                isActive
                  ? 'bg-indigo-50 text-indigo-600 font-bold'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-800'
              }`
            }
          >
            <item.icon size={18} />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* User Info */}
      <div className="p-4 border-t border-slate-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
            <span className="text-sm font-bold text-indigo-600">SP</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-slate-800 truncate">Sales Person</p>
            <p className="text-xs text-slate-400 truncate">sales@company.com</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
