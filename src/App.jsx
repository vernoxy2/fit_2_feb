// import { useState } from 'react';
// import Sidebar from './component/layout/Sidebar';
// import Header  from './component/layout/Header';
// import DashboardPage  from './pages/DashboardPage';
// import CompaniesPage  from './pages/CompaniesPage';
// import UsersPage      from './pages/UsersPage';
// import { BucketsPage, ReportsPage, SettingsPage } from './pages/OtherPages';
// import Dashboard from'./Store-ManagerPages/StorePages/Dashboard';
// import Stock from './Store-ManagerPages/StorePages/Stock';
// import Dispatch from './Store-ManagerPages/StorePages/Dispatch';
// import Challan from './Store-ManagerPages/StorePages/Challan';

// export default function App() {
//   const [activePage, setActivePage] = useState('dashboard');
//   const [sidebarOpen, setSidebarOpen] = useState(true);

//   const sidebarWidth = sidebarOpen ? 224 : 64;

//   const pages = {
//     dashboard: <DashboardPage />,
//     companies: <CompaniesPage />,
//     users:     <UsersPage />,
//     buckets:   <BucketsPage />,
//     reports:   <ReportsPage />,
//     settings:  <SettingsPage />,
//   };

//   const StorePages = {
//     dashboard: <Dashboard />,
//     stock:     <Stock />,
//     dispatch:  <Dispatch />,
//     challan:   <Challan />,
//   }

//   return (
//     <div className="min-h-screen bg-slate-50 text-slate-900">
//       <Sidebar
//         active={activePage}
//         onChange={setActivePage}
//         open={sidebarOpen}
//       />
//       <div
//         className="flex flex-col min-h-screen transition-all duration-300"
//         style={{ marginLeft: sidebarWidth }}
//       >
//         <Header
//           sidebarOpen={sidebarOpen}
//           setSidebarOpen={setSidebarOpen}
//           activePage={activePage}
//         />
//         <main className="flex-1 p-6">
//           {pages[activePage]}
//         </main>
//         <footer className="px-6 py-3 border-t border-slate-100 bg-white">
//           <p className="text-[10px] text-slate-400 text-center">
//             ERP Suite Master Admin Panel · v2.1.0 · © 2026 All rights reserved
//           </p>
//         </footer>
//       </div>
//     </div>
//   );
// }

import { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";

// -------Authntication---------
import Login from "./authntication/login";
import ProtectedRoute from "./authntication/ProtectedRoute";

// ── ADMIN layout — src/component/layout/ ─────────────────────────────────────
import AdminSidebar from "./component/layout/Sidebar";
import AdminHeader from "./component/layout/Header";
import DashboardPage from "./pages/DashboardPage";
import CompaniesPage from "./pages/CompaniesPage";
import UsersPage from "./pages/UsersPage";
import { BucketsPage, ReportsPage, SettingsPage } from "./pages/OtherPages";

// ── STORE layout — src/Store-ManagerPages/StoreComponent/layout/ ──────────────
import StoreLayout from "./Store-ManagerPages/StoreComponent/layout/Layout";
import StoreDashboard from "./Store-ManagerPages/StorePages/Dashboard";
import Stock from "./Store-ManagerPages/StorePages/Stock";
import Dispatch from "./Store-ManagerPages/StorePages/Dispatch";
import Challan from "./Store-ManagerPages/StorePages/Challan";

// ── Admin sidebar nav mapping ─────────────────────────────────────────────────
const ADMIN_ROUTES = {
  "/admin": "dashboard",
  "/admin/companies": "companies",
  "/admin/users": "users",
  "/admin/buckets": "buckets",
  "/admin/reports": "reports",
  "/admin/settings": "settings",
};

// ADMIN PANEL  →  localhost:5173/admin
function AdminShell() {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const sidebarWidth = sidebarOpen ? 224 : 64;
  const activePage = ADMIN_ROUTES[location.pathname] ?? "dashboard";
  const handleChange = (page) => {
    const path =
      Object.keys(ADMIN_ROUTES).find((k) => ADMIN_ROUTES[k] === page) ??
      "/admin";
    navigate(path);
  };
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <AdminSidebar
        active={activePage}
        onChange={handleChange}
        open={sidebarOpen}
      />
      <div
        className="flex flex-col min-h-screen transition-all duration-300"
        style={{ marginLeft: sidebarWidth }}
      >
        <AdminHeader
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          activePage={activePage}
        />
        <main className="flex-1 p-6">
          <Routes>
            <Route index element={<DashboardPage />} />
            <Route path="companies" element={<CompaniesPage />} />
            <Route path="users" element={<UsersPage />} />
            <Route path="buckets" element={<BucketsPage />} />
            <Route path="reports" element={<ReportsPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Routes>
        </main>
        <footer className="px-6 py-3 border-t border-slate-100 bg-white">
          <p className="text-[10px] text-slate-400 text-center">
            ERP Suite Master Admin Panel · v2.1.0 · © 2026 All rights reserved
          </p>
        </footer>
      </div>
    </div>
  );
}
// STORE PANEL  →  localhost:5173/store
function StoreShell() {
  return (
    <Routes>
      <Route element={<StoreLayout />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<StoreDashboard />} />
        <Route path="stock" element={<Stock />} />
        <Route path="dispatch" element={<Dispatch />} />
        <Route path="challan" element={<Challan />} />
      </Route>
    </Routes>
  );
}
// ─────────────────────────────────────────────────────────────────────────────
// ROOT APP
// ─────────────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/admin/*"
          element={
            <ProtectedRoute allowedRole="admin">
              <AdminShell />
            </ProtectedRoute>
          }
        />

        <Route
          path="/store/*"
          element={
            <ProtectedRoute allowedRole="user" allowedDept="warehouse">
              <StoreShell />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
