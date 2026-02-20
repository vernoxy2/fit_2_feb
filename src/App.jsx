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
import StoreDashboard from "./Store-ManagerPages/StoreUserPages/Dashboard";
import Stocks from "./Store-ManagerPages/StoreUserPages/Stocks";
import Dispatch from "./Store-ManagerPages/StoreUserPages/Dispatch";
import Challan from "./Store-ManagerPages/StoreUserPages/Challan";
import Returns from "./Store-ManagerPages/StoreUserPages/Returns";
import StoreProducts from "./Store-ManagerPages/StoreUserPages/StoreProducts";

// ── SALES layout (NEW) ────────────────────────────────────────────
// import SalesLayout from "./Sales-ManagerPages/SalesComponent/layout/Layout";
// import SalesDashboard from "./Sales-ManagerPages/SalesPages/Dashboard";
// import WorkOrders from "./Sales-ManagerPages/SalesPages/WorkOrders";
// import CreateWorkOrder from "./Sales-ManagerPages/SalesPages/CreateWorkOrder";
// import WorkOrderDetails from "./Sales-ManagerPages/SalesPages/WorkOrderDetails";
// import TechnicalApproval from "./Sales-ManagerPages/SalesPages/TechnicalApproval";
// import PurchaseOrders from "./Sales-ManagerPages/SalesPages/PurchaseOrders";
// import PODetails from "./Sales-ManagerPages/SalesPages/PODetails";
// import UploadInvoice from "./Sales-ManagerPages/SalesPages/UploadInvoice";
// import UploadWorkOrder from "./Sales-ManagerPages/SalesPages/UploadWorkOrder";
// import UploadPurchaseOrder from "./Sales-ManagerPages/SalesPages/UploadPurchaseOrder";
// import Products from "./Sales-ManagerPages/SalesPages/Products";
import Dashboard from "./Sales-ManagerPages/Sales-Pages/Dashboard";
import CreateChallan from "./Sales-ManagerPages/Sales-Pages/CreateChallan";
import UploadCustomerInvoice from "./Sales-ManagerPages/Sales-Pages/UploadCustomerInvoice";
import CreatePurchaseOrder from "./Sales-ManagerPages/Sales-Pages/CreatePurchaseOrder";
import UploadVendorInvoice from "./Sales-ManagerPages/Sales-Pages/UploadVendorInvoice";
import PurchaseOrderList from "./Sales-ManagerPages/Sales-Pages/PurchaseOrderList";
import SalesLayout from "./Sales-ManagerPages/SalesComponent/layout/Layout";
import UploadWorkOrder from "./Sales-ManagerPages/Sales-Pages/UploadWorkOrder";
import UploadPurchaseOrder from "./Sales-ManagerPages/Sales-Pages/UploadPurchaseOrder";
import Products from "./Sales-ManagerPages/Sales-Pages/Products";
import SalesStock from "./Sales-ManagerPages/Sales-Pages/SalesStock";

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
        <Route path="stock" element={<Stocks />} />
        <Route path="dispatch" element={<Dispatch />} />
        <Route path="challan" element={<Challan />} />
        <Route path="returns" element={<Returns />} />
        <Route path="store-products" element={<StoreProducts />} />
      </Route>
    </Routes>
  );
}

// SALES PANEL (NEW) →  localhost:5173/sales
function SalesShell() {
  return (
    // <Routes>
    //   <Route element={<SalesLayout />}>
    //     <Route index element={<Navigate to="dashboard" replace />} />
    //     <Route path="dashboard" element={<SalesDashboard />} />
    //     <Route path="work-orders" element={<WorkOrders />} />
    //     <Route path="work-orders/create" element={<CreateWorkOrder />} />
    //     <Route path="work-orders/upload" element={<UploadWorkOrder />} />
    //     <Route path="purchase-orders/upload" element={<UploadPurchaseOrder />} />
    //     <Route path="work-orders/:id" element={<WorkOrderDetails />} />
    //     <Route path="purchase-orders" element={<PurchaseOrders />} />
    //     <Route path="purchase-orders/:id" element={<PODetails />} />
    //     <Route path="products" element={<Products />} />
    //     <Route
    //       path="purchase-orders/:id/upload-invoice"
    //       element={<UploadInvoice />}
    //     />
    //   </Route>
    // </Routes>
    // <Routes>
    //   {/* Root redirect */}
    //   <Route path="/" element={<Navigate to="/sales/dashboard" replace />} />
    //   {/* Sales Module Routes */}
    //   <Route path="/sales" element={<SalesLayout />}>
    //     <Route index element={<Navigate to="dashboard" replace />} />
    //     <Route path="dashboard" element={<Dashboard />} />
    //     {/* Work Orders */}
    //     <Route path="work-orders" element={<Dashboard />} />
    //     <Route path="work-orders/upload" element={<UploadWorkOrder />} />
    //     {/* Challans */}
    //     <Route path="challans" element={<Dashboard />} />
    //     <Route path="challans/create" element={<CreateChallan />} />
    //     {/* Customer Invoices */}
    //     <Route path="invoices" element={<Dashboard />} />
    //     <Route path="invoices/upload" element={<UploadCustomerInvoice />} />
    //     {/* Purchase Orders */}
    //     <Route path="sales-stock" element={<SalesStock />} />
    //     <Route path="purchase-orders" element={<PurchaseOrderList />} />
    //     <Route
    //       path="purchase-orders/create"
    //       element={<CreatePurchaseOrder />}
    //     />
    //     <Route
    //       path="purchase-orders/upload-invoice"
    //       element={<UploadVendorInvoice />}
    //     />
    //     <Route path="work-orders/upload" element={<UploadWorkOrder />} />
    //     <Route
    //       path="purchase-orders/upload"
    //       element={<UploadPurchaseOrder />}
    //     />
    //   </Route>
    //   <Route path="products" element={<Products />} />

    //   {/* Catch all */}
    //   <Route path="*" element={<Navigate to="/sales/dashboard" replace />} />
    // </Routes>
    
    <Routes>
      <Route element={<SalesLayout />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="work-orders" element={<Dashboard />} />
        <Route path="work-orders/upload" element={<UploadWorkOrder />} />
        <Route path="challans" element={<Dashboard />} />
        <Route path="challans/create" element={<CreateChallan />} />
        <Route path="invoices" element={<Dashboard />} />
        <Route path="invoices/upload" element={<UploadCustomerInvoice />} />
        <Route path="sales-stock" element={<SalesStock />} />
        <Route path="purchase-orders" element={<PurchaseOrderList />} />
        <Route path="purchase-orders/create" element={<CreatePurchaseOrder />} />
        <Route path="purchase-orders/upload-invoice" element={<UploadVendorInvoice />} />
        <Route path="purchase-orders/upload" element={<UploadPurchaseOrder />} />
        <Route path="products" element={<Products />} />
        <Route path="*" element={<Navigate to="dashboard" replace />} />
      </Route>
    </Routes>
 
  );
}

// TECHNICAL PANEL (NEW) →  localhost:5173/technical
function TechnicalShell() {
  return (
    <Routes>
      <Route element={<SalesLayout />}>
        <Route index element={<Navigate to="approvals" replace />} />
        <Route path="approvals" element={<TechnicalApproval />} />
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

        {/* admin Panel (NEW) */}
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute allowedRole="admin">
              <AdminShell />
            </ProtectedRoute>
          }
        />

        {/* store Panel (NEW) */}
        <Route
          path="/store/*"
          element={
            <ProtectedRoute allowedRole="user" allowedDept="warehouse">
              <StoreShell />
            </ProtectedRoute>
          }
        />

        {/* Sales Panel (NEW) */}
        <Route path="/sales/*" element={<SalesShell />} />

        {/* Technical Panel (NEW) */}
        <Route path="/technical/*" element={<TechnicalShell />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
