import { useState } from 'react';
import Sidebar from './component/layout/Sidebar';
import Header  from './component/layout/Header';
import DashboardPage  from './pages/DashboardPage';
import CompaniesPage  from './pages/CompaniesPage';
import UsersPage      from './pages/UsersPage';
import { BucketsPage, ReportsPage, SettingsPage } from './pages/OtherPages';

export default function App() {
  const [activePage, setActivePage] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const sidebarWidth = sidebarOpen ? 224 : 64;

  const pages = {
    dashboard: <DashboardPage />,
    companies: <CompaniesPage />,
    users:     <UsersPage />,
    buckets:   <BucketsPage />,
    reports:   <ReportsPage />,
    settings:  <SettingsPage />,
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Sidebar
        active={activePage}
        onChange={setActivePage}
        open={sidebarOpen}
      />
      <div
        className="flex flex-col min-h-screen transition-all duration-300"
        style={{ marginLeft: sidebarWidth }}
      >
        <Header
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          activePage={activePage}
        />
        <main className="flex-1 p-6">
          {pages[activePage]}
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
