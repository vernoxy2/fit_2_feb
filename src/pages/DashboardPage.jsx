import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { COMPANIES, BUCKETS, NOTIFICATIONS } from '../data/mockData';
import { Card, CardHeader, SectionHeader, Badge } from '../component/layout/ui/index';
import Icon from '../component/layout/ui/Icon';

function KPICard({ label, value, sub, color, iconName }) {
  const colors = {
    indigo: "bg-indigo-600", red: "bg-red-500",
    amber:  "bg-amber-500",  slate: "bg-slate-600", cyan: "bg-cyan-600",
  };
  return (
    <Card className="p-5 flex items-start gap-4 hover:shadow-md transition-shadow">
      <div className={`w-10 h-10 rounded-xl ${colors[color]} flex items-center justify-center flex-shrink-0`}>
        <Icon name={iconName} className="w-5 h-5 text-white" />
      </div>
      <div>
        <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">{label}</p>
        <p className="text-2xl font-black text-slate-800 leading-tight mt-0.5">{value}</p>
        {sub && <p className="text-[10px] text-slate-400 mt-0.5">{sub}</p>}
      </div>
    </Card>
  );
}

export default function DashboardPage() {
  const coA = COMPANIES.A;
  const coB = COMPANIES.B;
  const totalSKUs    = coA.totalSKUs + coB.totalSKUs;
  const totalLow     = coA.lowStock + coB.lowStock;
  const totalRes     = coA.reserved + coB.reserved;
  const totalDisp    = coA.pendingDispatch + coB.pendingDispatch;
  const totalOvd     = coA.overdueInvoices + coB.overdueInvoices;

  const compareMetrics = [
    { metric: "Total SKUs",       a: coA.totalSKUs.toLocaleString(), b: coB.totalSKUs.toLocaleString(), critA: false,                       critB: false },
    { metric: "Low Stock Count",  a: coA.lowStock,                   b: coB.lowStock,                   critA: coA.lowStock > 30,           critB: coB.lowStock > 30 },
    { metric: "Reserved Qty",     a: coA.reserved,                   b: coB.reserved,                   critA: false,                       critB: false },
    { metric: "Pending Dispatch", a: coA.pendingDispatch,            b: coB.pendingDispatch,            critA: coA.pendingDispatch > 10,    critB: coB.pendingDispatch > 10 },
    { metric: "Overdue Invoices", a: coA.overdueInvoices,            b: coB.overdueInvoices,            critA: coA.overdueInvoices > 5,     critB: coB.overdueInvoices > 5 },
  ];

  const sevStyle = { critical: "border-l-2 border-red-400 bg-red-50/40", warning: "border-l-2 border-amber-400", info: "border-l-2 border-blue-400" };
  const dotColor = { critical: "bg-red-500", warning: "bg-amber-400", info: "bg-blue-400" };

  return (
    <div className="space-y-6">
      <SectionHeader title="Cross-Company Overview" subtitle="Live summary across Apex & Meridian" />

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <KPICard label="Total SKUs"        value={totalSKUs.toLocaleString()} sub="Combined inventory"    color="indigo" iconName="buckets" />
        <KPICard label="Low Stock Items"   value={totalLow}                   sub={totalLow > 50 ? "⚠ Action needed" : "Within threshold"} color="red" iconName="alert" />
        <KPICard label="Reserved Stock"    value={totalRes}                   sub="Across all buckets"    color="amber"  iconName="reports" />
        <KPICard label="Pending Dispatch"  value={totalDisp}                  sub="Awaiting shipment"     color="slate"  iconName="companies" />
        <KPICard label="Overdue Invoices"  value={totalOvd}                   sub="Escalation needed"     color="cyan"   iconName="reports" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Comparison Table */}
        <Card className="xl:col-span-2 overflow-hidden">
          <CardHeader
            title="Company Comparison"
            subtitle="Side-by-side performance metrics"
            right={<Badge label="Live" variant="active" />}
          />
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  <th className="px-5 py-3 text-left">Metric</th>
                  <th className="px-4 py-3 text-center">
                    <span className="flex items-center justify-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-indigo-500 inline-block" />Apex (APX)
                    </span>
                  </th>
                  <th className="px-4 py-3 text-center">
                    <span className="flex items-center justify-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-cyan-500 inline-block" />Meridian (MRD)
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {compareMetrics.map(({ metric, a, b, critA, critB }) => (
                  <tr key={metric} className="hover:bg-slate-50/60 transition-colors">
                    <td className="px-5 py-3.5 text-sm font-medium text-slate-700">{metric}</td>
                    <td className="px-4 py-3.5 text-center">
                      <span className={`text-sm font-bold ${critA ? "text-red-600" : "text-slate-700"}`}>
                        {critA && <span className="inline-block w-1.5 h-1.5 bg-red-500 rounded-full mr-1 mb-0.5" />}{a}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-center">
                      <span className={`text-sm font-bold ${critB ? "text-red-600" : "text-slate-700"}`}>
                        {critB && <span className="inline-block w-1.5 h-1.5 bg-red-500 rounded-full mr-1 mb-0.5" />}{b}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t border-slate-100 bg-slate-50/50">
                  <td colSpan={3} className="px-5 py-3">
                    <div className="flex gap-3">
                      <button className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-lg transition-colors">
                        View Apex Details →
                      </button>
                      <button className="text-xs font-semibold text-cyan-600 hover:text-cyan-800 bg-cyan-50 hover:bg-cyan-100 px-3 py-1.5 rounded-lg transition-colors">
                        View Meridian Details →
                      </button>
                    </div>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </Card>

        {/* Notification Panel */}
        <Card className="overflow-hidden flex flex-col" style={{ maxHeight: 420 }}>
          <CardHeader
            title="Live Alerts"
            subtitle="Critical & pending"
            right={
              <span className="text-[10px] bg-red-500 text-white font-bold px-1.5 py-0.5 rounded-full">
                {NOTIFICATIONS.filter(n => n.severity === "critical").length} critical
              </span>
            }
          />
          <div className="overflow-y-auto flex-1 divide-y divide-slate-50">
            {NOTIFICATIONS.map(n => (
              <div key={n.id} className={`px-4 py-3 ${sevStyle[n.severity]} hover:brightness-98`}>
                <div className="flex items-start gap-2">
                  <span className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${dotColor[n.severity]}`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <Badge label={n.company} variant={n.company === "APX" ? "apx" : "mrd"} />
                      <Badge label={n.severity} variant={n.severity} />
                    </div>
                    <p className="text-xs text-slate-700 mt-1">{n.message}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">{n.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Bucket Chart */}
      <Card>
        <CardHeader title="Bucket-wise SKU Distribution" subtitle="Apex vs Meridian across all product buckets" />
        <div className="p-5">
          <ResponsiveContainer width="100%" height={240}>
            <BarChart
              data={BUCKETS.map(b => ({ name: b.name, Apex: b.companyA, Meridian: b.companyB }))}
              barCategoryGap="30%" barGap={4}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} width={32} />
              <Tooltip contentStyle={{ borderRadius: 10, border: "1px solid #e2e8f0", fontSize: 12, boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }} cursor={{ fill: "#f8fafc" }} />
              <Legend iconType="square" iconSize={10} wrapperStyle={{ fontSize: 11 }} />
              <Bar dataKey="Apex" fill="#4F46E5" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Meridian" fill="#0891b2" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}
