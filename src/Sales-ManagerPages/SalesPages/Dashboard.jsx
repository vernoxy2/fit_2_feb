import { FiFileText, FiClock, FiCheckCircle, FiAlertTriangle } from "react-icons/fi";
import { Card, CardHeader, StatusBadge } from "../SalesComponent/ui/index";
import { WORK_ORDERS } from "../data/mockData";
import { useNavigate } from "react-router-dom";

function KPICard({ label, value, sub, icon: Icon, color }) {
  const colors = {
    indigo: "bg-indigo-600", amber: "bg-amber-500",
    emerald: "bg-emerald-500", red: "bg-red-500",
  };
  return (
    <Card className="p-5 flex items-start gap-4 hover:shadow-md transition-shadow">
      <div className={`w-10 h-10 rounded-xl ${colors[color]} flex items-center justify-center flex-shrink-0`}>
        <Icon className="text-white" size={18} />
      </div>
      <div>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{label}</p>
        <p className="text-2xl font-black text-slate-800">{value}</p>
        {sub && <p className="text-[10px] text-slate-400 mt-0.5">{sub}</p>}
      </div>
    </Card>
  );
}

export default function SalesDashboard() {
  const navigate = useNavigate();
  const totalWO = WORK_ORDERS.length;
  const pending = WORK_ORDERS.filter(w => w.status === "pending_approval").length;
  const approved = WORK_ORDERS.filter(w => w.status === "approved").length;
  const rejected = WORK_ORDERS.filter(w => w.status === "rejected").length;
  const recentWO = WORK_ORDERS.slice(0, 5);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-black text-slate-800">Sales Dashboard</h2>
        <p className="text-xs text-slate-400 mt-0.5">Overview of your work orders</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard label="Total Work Orders" value={totalWO} icon={FiFileText} color="indigo" />
        <KPICard label="Pending Approval" value={pending} sub="Awaiting tech team" icon={FiClock} color="amber" />
        <KPICard label="Approved" value={approved} icon={FiCheckCircle} color="emerald" />
        <KPICard label="Rejected" value={rejected} sub="Needs revision" icon={FiAlertTriangle} color="red" />
      </div>

      {/* Recent Work Orders */}
      <Card>
        <CardHeader title="Recent Work Orders" subtitle="Latest 5 work orders" />
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                <th className="px-5 py-3 text-left">WO Number</th>
                <th className="px-4 py-3 text-left">Customer</th>
                <th className="px-4 py-3 text-center">Priority</th>
                <th className="px-4 py-3 text-center">Status</th>
                <th className="px-4 py-3 text-center">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {recentWO.map(wo => (
                <tr
                  key={wo.id}
                  onClick={() => navigate(`/sales/work-orders/${wo.id}`)}
                  className="hover:bg-slate-50 cursor-pointer transition-colors"
                >
                  <td className="px-5 py-3.5 font-mono text-xs font-bold text-slate-700">{wo.id}</td>
                  <td className="px-4 py-3.5 text-xs text-slate-600">{wo.customer}</td>
                  <td className="px-4 py-3.5 text-center"><StatusBadge status={wo.priority} /></td>
                  <td className="px-4 py-3.5 text-center"><StatusBadge status={wo.status} /></td>
                  <td className="px-4 py-3.5 text-center text-xs text-slate-500">{wo.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
