import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { BUCKETS, ROLES } from '../data/mockData';
import { Card, CardHeader, SectionHeader, Modal, Badge, Toggle, Input, Select, BtnPrimary, BtnSecondary, Tabs } from '../component/layout/ui/index';

// ─────────────────────────────────────────────
// BUCKETS PAGE
// ─────────────────────────────────────────────
export function BucketsPage() {
  const [selected, setSelected] = useState(null);

  return (
    <div className="space-y-6">
      <SectionHeader title="Product Buckets" subtitle="7 categories across both companies — click a row to view analytics" />

      <Card className="overflow-hidden">
        <CardHeader title="All Buckets" subtitle="Combined view — Apex & Meridian" />
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                {["Bucket", "Apex SKUs", "Meridian SKUs", "APX Low Stock", "MRD Low Stock", "Status"].map(h => (
                  <th key={h} className={`px-5 py-3 ${h === "Bucket" ? "text-left" : "text-center"}`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {BUCKETS.map(b => {
                const isCrit = b.lowA > 6 || b.lowB > 10;
                return (
                  <tr
                    key={b.id}
                    onClick={() => setSelected(b)}
                    className={`hover:bg-indigo-50/30 transition-colors cursor-pointer ${isCrit ? "bg-red-50/10" : ""}`}
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-indigo-400 inline-block" />
                        <span className="font-semibold text-slate-800">{b.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-center font-semibold text-slate-700">{b.companyA}</td>
                    <td className="px-4 py-4 text-center font-semibold text-slate-700">{b.companyB}</td>
                    <td className="px-4 py-4 text-center">
                      <span className={`font-bold text-sm ${b.lowA > 6 ? "text-red-600" : "text-slate-600"}`}>{b.lowA}</span>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <span className={`font-bold text-sm ${b.lowB > 10 ? "text-red-600" : "text-slate-600"}`}>{b.lowB}</span>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <Badge label={b.status} variant={b.status === "active" ? "active" : "disabled"} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {selected && (
        <Modal title={`Bucket Analytics — ${selected.name}`} onClose={() => setSelected(null)} size="lg">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Apex SKUs",     value: selected.companyA, color: "text-indigo-600" },
                { label: "Meridian SKUs", value: selected.companyB, color: "text-cyan-600" },
                { label: "APX Low Stock", value: selected.lowA,     color: selected.lowA > 6  ? "text-red-600" : "text-slate-700" },
                { label: "MRD Low Stock", value: selected.lowB,     color: selected.lowB > 10 ? "text-red-600" : "text-slate-700" },
                { label: "APX Low %",     value: `${((selected.lowA / selected.companyA) * 100).toFixed(1)}%`, color: "text-slate-700" },
                { label: "MRD Low %",     value: `${((selected.lowB / selected.companyB) * 100).toFixed(1)}%`, color: "text-slate-700" },
              ].map(({ label, value, color }) => (
                <div key={label} className="bg-slate-50 rounded-lg p-3">
                  <p className="text-[10px] text-slate-400 uppercase font-semibold">{label}</p>
                  <p className={`text-2xl font-black mt-0.5 ${color}`}>{value}</p>
                </div>
              ))}
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-600 mb-2">Comparison Chart</p>
              <ResponsiveContainer width="100%" height={150}>
                <BarChart data={[
                  { name: "Apex",     Total: selected.companyA, Low: selected.lowA },
                  { name: "Meridian", Total: selected.companyB, Low: selected.lowB },
                ]}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} width={28} />
                  <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid #e2e8f0", fontSize: 11 }} />
                  <Bar dataKey="Total" fill="#4F46E5" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="Low"   fill="#ef4444" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
// REPORTS PAGE
// ─────────────────────────────────────────────
export function ReportsPage() {
  const [activeReport, setActiveReport] = useState("Stock Report");
  const reportTypes = ["Stock Report", "Dispatch Report", "Invoice Aging Report", "Purchase Report", "Inventory Valuation"];

  const stockData = BUCKETS.map(b => ({
    name:            b.name,
    "Apex Total":    b.companyA,
    "Meridian Total":b.companyB,
    "APX Low":       b.lowA,
    "MRD Low":       b.lowB,
  }));

  return (
    <div className="space-y-6">
      <SectionHeader title="Reports" subtitle="Cross-company analytics and exportable reports" />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Sidebar */}
        <Card className="p-4 lg:col-span-1 h-fit">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Report Types</p>
          <div className="space-y-1 mb-4">
            {reportTypes.map(r => (
              <button key={r} onClick={() => setActiveReport(r)}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-xs font-medium transition-all ${activeReport === r ? "bg-indigo-600 text-white" : "text-slate-600 hover:bg-slate-100"}`}>
                {r}
              </button>
            ))}
          </div>
          <div className="space-y-3 pt-3 border-t border-slate-100">
            <Select label="Company" options={["Both", "Apex (APX)", "Meridian (MRD)"]} />
            <Select label="Bucket"  options={["All", ...BUCKETS.map(b => b.name)]} />
            <Input  label="From Date" type="date" />
            <Input  label="To Date"   type="date" />
            <BtnPrimary className="w-full justify-center">Generate Report</BtnPrimary>
          </div>
        </Card>

        {/* Main Report */}
        <div className="lg:col-span-3 space-y-4">
          <Card>
            <CardHeader
              title={activeReport}
              subtitle="Company: Both · Bucket: All"
              right={<BtnSecondary>Export CSV</BtnSecondary>}
            />
            <div className="p-5">
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={stockData} barCategoryGap="28%" barGap={4}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis dataKey="name" tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} width={28} />
                  <Tooltip contentStyle={{ borderRadius: 10, border: "1px solid #e2e8f0", fontSize: 11 }} />
                  <Legend iconType="square" iconSize={10} wrapperStyle={{ fontSize: 11 }} />
                  <Bar dataKey="Apex Total"     fill="#4F46E5" radius={[3, 3, 0, 0]} />
                  <Bar dataKey="Meridian Total" fill="#0891b2" radius={[3, 3, 0, 0]} />
                  <Bar dataKey="APX Low"        fill="#f59e0b" radius={[3, 3, 0, 0]} />
                  <Bar dataKey="MRD Low"        fill="#ef4444" radius={[3, 3, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="overflow-hidden">
            <CardHeader title="Report Summary Table" />
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    <th className="px-5 py-3 text-left">Bucket</th>
                    <th className="px-4 py-3 text-center">APX Total</th>
                    <th className="px-4 py-3 text-center">MRD Total</th>
                    <th className="px-4 py-3 text-center">APX Low</th>
                    <th className="px-4 py-3 text-center">MRD Low</th>
                    <th className="px-4 py-3 text-center">Alert</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {BUCKETS.map(b => {
                    const isCrit = b.lowA > 6 || b.lowB > 10;
                    return (
                      <tr key={b.id} className={`hover:bg-slate-50/60 transition-colors ${isCrit ? "bg-red-50/20" : ""}`}>
                        <td className="px-5 py-3 font-semibold text-slate-700">{b.name}</td>
                        <td className="px-4 py-3 text-center text-slate-600">{b.companyA}</td>
                        <td className="px-4 py-3 text-center text-slate-600">{b.companyB}</td>
                        <td className="px-4 py-3 text-center">
                          <span className={`font-bold ${b.lowA > 6 ? "text-red-600" : "text-slate-600"}`}>{b.lowA}</span>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <span className={`font-bold ${b.lowB > 10 ? "text-red-600" : "text-slate-600"}`}>{b.lowB}</span>
                        </td>
                        <td className="px-4 py-3 text-center">
                          {isCrit ? <Badge label="Critical" variant="critical" /> : <Badge label="OK" variant="active" />}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// SETTINGS PAGE
// ─────────────────────────────────────────────
export function SettingsPage() {
  const [tab, setTab]   = useState("Global ERP Settings");
  const [coTab, setCoTab] = useState("A");
  const [notif, setNotif] = useState({ emailAlerts: true, smsAlerts: false, escalation: true });
  const tabs = ["Global ERP Settings", "Company Settings", "Notification Settings", "Security Settings"];

  const COMPANIES_LABELS = {
    A: { code: "APX", name: "Apex",     invoicePrefix: "APX-INV", challPrefix: "APX-CH", gstin: "27AAPFU0939F1ZV" },
    B: { code: "MRD", name: "Meridian", invoicePrefix: "MRD-INV", challPrefix: "MRD-CH", gstin: "29AABCT1332L1ZH" },
  };

  return (
    <div className="space-y-5">
      <SectionHeader title="Settings" subtitle="Global ERP configuration and company-level overrides" />
      <Tabs tabs={tabs} active={tab} onChange={setTab} />

      {tab === "Global ERP Settings" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <Card>
            <CardHeader title="Invoice & Challan Format" />
            <div className="p-5 space-y-4">
              <Input label="Invoice Number Format" placeholder="{PREFIX}-INV-{YYYY}-{NNNN}" />
              <Input label="Challan Number Format"  placeholder="{PREFIX}-CH-{YYYY}-{NNNN}" />
              <Input label="Default Reminder Days"  type="number" placeholder="3" />
              <Input label="Min Stock Threshold"    type="number" placeholder="10" />
              <BtnPrimary>Save Global Settings</BtnPrimary>
            </div>
          </Card>
          <Card>
            <CardHeader title="System Preferences" />
            <div className="p-5 space-y-0">
              {[
                { label: "Auto-escalate overdue invoices", desc: "After 7 days unpaid" },
                { label: "Enable stock reservation",       desc: "For confirmed purchase orders" },
                { label: "Require dual approval for POs",  desc: "Above ₹1,00,000 value" },
                { label: "Auto-generate challan on dispatch", desc: "Enabled system-wide" },
              ].map(({ label, desc }) => (
                <div key={label} className="flex items-center justify-between py-3 border-b border-slate-50 last:border-0">
                  <div>
                    <p className="text-sm font-medium text-slate-700">{label}</p>
                    <p className="text-[11px] text-slate-400">{desc}</p>
                  </div>
                  <Toggle checked={true} onChange={() => {}} />
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {tab === "Company Settings" && (
        <div className="space-y-4">
          <div className="flex gap-2">
            {["A", "B"].map(id => (
              <button key={id} onClick={() => setCoTab(id)}
                className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${coTab === id ? (id === "A" ? "bg-indigo-600 text-white" : "bg-cyan-600 text-white") : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>
                {COMPANIES_LABELS[id].code} — {COMPANIES_LABELS[id].name}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <Card>
              <CardHeader title={`${COMPANIES_LABELS[coTab].name} — Invoice Configuration`} />
              <div className="p-5 space-y-4">
                <Input label="Invoice Prefix"  placeholder={COMPANIES_LABELS[coTab].invoicePrefix} />
                <Input label="Challan Prefix"  placeholder={COMPANIES_LABELS[coTab].challPrefix} />
                <Select label="Currency" options={["INR", "USD", "EUR"]} />
                <Input label="GST Number" placeholder={COMPANIES_LABELS[coTab].gstin} />
                <BtnPrimary>Save Company Settings</BtnPrimary>
              </div>
            </Card>
            <Card>
              <CardHeader title="Workflow Rules" />
              <div className="p-5 space-y-0">
                {[
                  "Require PO approval before dispatch",
                  "Auto-notify on low stock",
                  "Allow partial invoice",
                  "Enable credit limit enforcement",
                ].map(rule => (
                  <div key={rule} className="flex items-center justify-between py-3 border-b border-slate-50 last:border-0">
                    <span className="text-sm text-slate-700">{rule}</span>
                    <Toggle checked={true} onChange={() => {}} />
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      )}

      {tab === "Notification Settings" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <Card>
            <CardHeader title="Alert Thresholds" />
            <div className="p-5 space-y-4">
              <Input label="Low Stock Alert Threshold (units)" type="number" placeholder="10" />
              <Input label="Invoice Reminder Days Before Due"  type="number" placeholder="3" />
              <Select label="Escalation After (days)" options={["3", "5", "7", "14"]} />
              <BtnPrimary>Save Thresholds</BtnPrimary>
            </div>
          </Card>
          <Card>
            <CardHeader title="Channel Settings" />
            <div className="p-5 space-y-0">
              {[
                { label: "Email Alerts",             key: "emailAlerts", desc: "Send to company admins" },
                { label: "SMS Alerts",               key: "smsAlerts",   desc: "For critical stock only" },
                { label: "Escalation Notifications", key: "escalation",  desc: "Notify master admin if unresolved" },
              ].map(({ label, key, desc }) => (
                <div key={key} className="flex items-center justify-between py-3 border-b border-slate-50 last:border-0">
                  <div>
                    <p className="text-sm font-medium text-slate-700">{label}</p>
                    <p className="text-[11px] text-slate-400">{desc}</p>
                  </div>
                  <Toggle checked={notif[key]} onChange={v => setNotif(p => ({ ...p, [key]: v }))} />
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {tab === "Security Settings" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <Card>
            <CardHeader title="Password Policy" />
            <div className="p-5 space-y-4">
              <Select label="Minimum Password Length" options={["8 characters", "10 characters", "12 characters"]} />
              <Select label="Password Expiry"         options={["30 days", "60 days", "90 days", "Never"]} />
              {["Require uppercase & lowercase", "Require numbers", "Require special characters"].map(rule => (
                <div key={rule} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
                  <span className="text-sm text-slate-700">{rule}</span>
                  <Toggle checked={true} onChange={() => {}} />
                </div>
              ))}
            </div>
          </Card>
          <Card>
            <CardHeader title="Session & Access" />
            <div className="p-5 space-y-4">
              <Select label="Session Timeout" options={["15 minutes", "30 minutes", "1 hour", "4 hours"]} />
              {[
                { label: "Allow role edits by company admin", desc: "Restricted to Master Admin only" },
                { label: "Two-factor authentication",         desc: "Required for all admin accounts" },
                { label: "Audit all permission changes",      desc: "Logged with timestamp + user" },
              ].map(({ label, desc }) => (
                <div key={label} className="flex items-center justify-between py-3 border-b border-slate-50 last:border-0">
                  <div>
                    <p className="text-sm font-medium text-slate-700">{label}</p>
                    <p className="text-[11px] text-slate-400">{desc}</p>
                  </div>
                  <Toggle checked={true} onChange={() => {}} />
                </div>
              ))}
              <BtnPrimary>Save Security Settings</BtnPrimary>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
