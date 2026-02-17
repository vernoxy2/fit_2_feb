import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { COMPANIES, BUCKETS, USERS } from '../data/mockData';
import { Card, SectionHeader, Modal, Tabs, Badge, BtnPrimary } from '../component/layout/ui/index';

function CompanyCard({ co, onView }) {
  const metrics = [
    { label: "Total SKUs",       value: co.totalSKUs.toLocaleString(), crit: false },
    { label: "Low Stock",        value: co.lowStock,                   crit: co.lowStock > 30 },
    { label: "Reserved",         value: co.reserved,                   crit: false },
    { label: "Pending Dispatch", value: co.pendingDispatch,            crit: co.pendingDispatch > 10 },
    { label: "Overdue Invoices", value: co.overdueInvoices,            crit: co.overdueInvoices > 5 },
  ];
  return (
    <Card className="hover:shadow-md transition-shadow overflow-hidden">
      <div className="h-1.5" style={{ background: co.color }} />
      <div className="p-5">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-sm font-bold" style={{ background: co.color }}>
              {co.code}
            </div>
            <div>
              <p className="text-sm font-bold text-slate-800">{co.name}</p>
              <p className="text-[11px] text-slate-400">{co.region} · {co.gstin}</p>
            </div>
          </div>
          <Badge label="Active" variant="active" />
        </div>
        <div className="grid grid-cols-2 gap-3 mb-4">
          {metrics.map(({ label, value, crit }) => (
            <div key={label} className={`rounded-lg p-3 ${crit ? "bg-red-50 border border-red-100" : "bg-slate-50"}`}>
              <p className="text-[10px] text-slate-400 uppercase tracking-wide font-semibold">{label}</p>
              <p className={`text-xl font-black mt-0.5 ${crit ? "text-red-600" : "text-slate-800"}`}>{value}</p>
            </div>
          ))}
        </div>
        <BtnPrimary onClick={() => onView(co)} className="w-full justify-center">
          View Company Details →
        </BtnPrimary>
      </div>
    </Card>
  );
}

function CompanyDetailModal({ co, onClose }) {
  const [tab, setTab] = useState("Overview");
  const tabs = ["Overview", "Users", "Buckets", "Stock Summary", "Activity Logs"];
  const companyBuckets = BUCKETS.map(b => ({
    ...b,
    total:    co.id === "A" ? b.companyA : b.companyB,
    lowStock: co.id === "A" ? b.lowA : b.lowB,
  }));
  const companyUsers = USERS.filter(u => u.company === co.id);

  const activityLogs = [
    { time: "10:42 AM", action: `Challan ${co.challPrefix}-0892 marked overdue`, user: "System" },
    { time: "09:15 AM", action: "Stock updated: Bearing 6205-ZZ (−46 units)", user: "Rajesh M." },
    { time: "Yesterday", action: `Invoice ${co.invoicePrefix}-1044 approved`, user: "Priya N." },
    { time: "Yesterday", action: "PO #4231 created for Electronics bucket", user: "Rajesh M." },
    { time: "2 days ago", action: "User enabled by Master Admin", user: "Master Admin" },
  ];

  return (
    <Modal title={`${co.name} — Company Details`} onClose={onClose} size="xl">
      <div className="space-y-5">
        <Tabs tabs={tabs} active={tab} onChange={setTab} />

        {tab === "Overview" && (
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "Invoice Prefix", value: co.invoicePrefix },
                { label: "Currency",       value: co.currency },
                { label: "GST Number",     value: co.gstin },
              ].map(({ label, value }) => (
                <div key={label} className="bg-slate-50 rounded-lg p-3">
                  <p className="text-[10px] text-slate-400 font-semibold uppercase">{label}</p>
                  <p className="text-sm font-semibold text-slate-800 mt-0.5 font-mono">{value}</p>
                </div>
              ))}
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-600 mb-2">Bucket Distribution</p>
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={companyBuckets.map(b => ({ name: b.name, SKUs: b.total, Low: b.lowStock }))}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis dataKey="name" tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} width={28} />
                  <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid #e2e8f0", fontSize: 11 }} />
                  <Bar dataKey="SKUs" fill={co.color} radius={[3, 3, 0, 0]} />
                  <Bar dataKey="Low"  fill="#ef4444"  radius={[3, 3, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {tab === "Users" && (
          <div className="space-y-2">
            {companyUsers.map(u => (
              <div key={u.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 text-xs font-bold">
                    {u.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-800">{u.name}</p>
                    <p className="text-[11px] text-slate-400">{u.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge label={u.role}   variant="default" />
                  <Badge label={u.status} variant={u.status} />
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === "Buckets" && (
          <div className="space-y-2">
            {companyBuckets.map(b => (
              <div key={b.id} className="flex items-center justify-between p-3 rounded-lg border border-slate-100 hover:bg-slate-50">
                <p className="text-sm font-semibold text-slate-700">{b.name}</p>
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-slate-600">
                    <span className="font-bold">{b.total}</span>
                    <span className="text-slate-400 text-xs ml-1">SKUs</span>
                  </span>
                  <span className={b.lowStock > 8 ? "text-red-600 font-bold" : "text-slate-600"}>
                    <span className="font-bold">{b.lowStock}</span>
                    <span className="text-xs font-normal text-slate-400 ml-1">low</span>
                  </span>
                  <Badge label={b.status} variant={b.status === "active" ? "active" : "disabled"} />
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === "Stock Summary" && (
          <div className="grid grid-cols-2 gap-3">
            {companyBuckets.map(b => (
              <div key={b.id} className="p-3 rounded-lg border border-slate-100">
                <p className="text-xs font-semibold text-slate-600">{b.name}</p>
                <div className="mt-2 flex gap-3">
                  <div><p className="text-[10px] text-slate-400">Total</p><p className="text-lg font-black text-slate-800">{b.total}</p></div>
                  <div><p className="text-[10px] text-slate-400">Low</p><p className={`text-lg font-black ${b.lowStock > 8 ? "text-red-600" : "text-slate-600"}`}>{b.lowStock}</p></div>
                  <div><p className="text-[10px] text-slate-400">%</p><p className="text-lg font-black text-slate-600">{((b.lowStock / b.total) * 100).toFixed(0)}%</p></div>
                </div>
                <div className="mt-1.5 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full rounded-full bg-red-500 transition-all" style={{ width: `${Math.min(100, (b.lowStock / b.total) * 300)}%` }} />
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === "Activity Logs" && (
          <div className="space-y-1.5">
            {activityLogs.map((log, i) => (
              <div key={i} className="flex items-start gap-3 py-2.5 border-b border-slate-50 last:border-0">
                <span className="text-[10px] text-slate-400 font-mono whitespace-nowrap mt-0.5 w-20 flex-shrink-0">{log.time}</span>
                <p className="text-xs text-slate-700 flex-1">{log.action}</p>
                <span className="text-[10px] text-slate-400 whitespace-nowrap">{log.user}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </Modal>
  );
}

export default function CompaniesPage() {
  const [selected, setSelected] = useState(null);
  return (
    <div>
      <SectionHeader title="Companies" subtitle="2 fixed companies — monitoring and configuration only" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {Object.values(COMPANIES).map(co => (
          <CompanyCard key={co.id} co={co} onView={setSelected} />
        ))}
      </div>
      {selected && <CompanyDetailModal co={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
