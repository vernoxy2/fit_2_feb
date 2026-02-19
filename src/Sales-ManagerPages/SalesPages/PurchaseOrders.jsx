import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiUpload,
  FiEye,
  FiPackage,
  FiClock,
  FiCheckCircle,
  FiAlertTriangle,
} from "react-icons/fi";
import {
  Card,
  CardHeader,
  StatusBadge,
  BtnPrimary,
  Select,
} from "../SalesComponent/ui/index";
import { PURCHASE_ORDERS, PO_STATUSES } from "../data/poMockData";

function KPICard({ label, value, sub, icon: Icon, color }) {
  const colors = {
    indigo: "bg-indigo-600",
    amber: "bg-amber-500",
    emerald: "bg-emerald-500",
    blue: "bg-blue-500",
  };
  return (
    <Card className="p-5 flex items-start gap-4 hover:shadow-md transition-shadow">
      <div
        className={`w-10 h-10 rounded-xl ${colors[color]} flex items-center justify-center flex-shrink-0`}
      >
        <Icon className="text-white" size={18} />
      </div>
      <div>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          {label}
        </p>
        <p className="text-2xl font-black text-slate-800">{value}</p>
        {sub && <p className="text-[10px] text-slate-400 mt-0.5">{sub}</p>}
      </div>
    </Card>
  );
}

export default function PurchaseOrders() {
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = PURCHASE_ORDERS.filter(
    (po) => statusFilter === "all" || po.status === statusFilter,
  );

  const totalPOs = PURCHASE_ORDERS.length;
  const ordered = PURCHASE_ORDERS.filter((p) => p.status === "ordered").length;
  const partiallyReceived = PURCHASE_ORDERS.filter(
    (p) => p.status === "partially_received",
  ).length;
  const completed = PURCHASE_ORDERS.filter(
    (p) => p.status === "completed",
  ).length;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-black text-slate-800">Purchase Orders</h2>
        <p className="text-xs text-slate-400 mt-0.5">
          Manage supplier orders and material receipts
        </p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          label="Total POs"
          value={totalPOs}
          icon={FiPackage}
          color="indigo"
        />
        <KPICard
          label="Ordered"
          value={ordered}
          sub="Awaiting delivery"
          icon={FiClock}
          color="amber"
        />
        <KPICard
          label="Partially Received"
          value={partiallyReceived}
          sub="Pending items"
          icon={FiAlertTriangle}
          color="blue"
        />
        <KPICard
          label="Completed"
          value={completed}
          icon={FiCheckCircle}
          color="emerald"
        />
      </div>
      <div className="flex items-center justify-between">
        <BtnPrimary onClick={() => navigate("/sales/work-orders/upload")}>
          <FiUpload size={14} /> Upload Work Order
        </BtnPrimary>
      </div>
      {/* Filters */}
      <Card>
        <div className="px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 flex-1 max-w-xs">
            <Select
              label="Status Filter"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              options={[
                { value: "all", label: "All Statuses" },
                ...Object.keys(PO_STATUSES).map((k) => ({
                  value: k,
                  label: PO_STATUSES[k].label,
                })),
              ]}
            />
          </div>
          <span className="text-xs text-slate-400">
            {filtered.length} results
          </span>
        </div>
      </Card>

      {/* PO Table */}
      <Card>
        <CardHeader
          title="All Purchase Orders"
          subtitle="Click to view details or upload invoice"
        />
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                <th className="px-5 py-3 text-left">PO Number</th>
                <th className="px-4 py-3 text-left">Date</th>
                <th className="px-4 py-3 text-left">Supplier</th>
                <th className="px-4 py-3 text-center">Items</th>
                <th className="px-4 py-3 text-center">Amount</th>
                <th className="px-4 py-3 text-center">Expected Delivery</th>
                <th className="px-4 py-3 text-center">Status</th>
                <th className="px-4 py-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.map((po) => (
                <tr
                  key={po.id}
                  className={`hover:bg-slate-50 transition-colors ${po.mismatchFlag ? "bg-amber-50/20" : ""}`}
                >
                  <td className="px-5 py-3.5 font-mono text-xs font-bold text-slate-700">
                    {po.id}
                  </td>
                  <td className="px-4 py-3.5 text-xs text-slate-500">
                    {po.date}
                  </td>
                  <td className="px-4 py-3.5 text-xs text-slate-600">
                    {po.supplier}
                  </td>
                  <td className="px-4 py-3.5 text-center font-bold text-slate-700">
                    {po.items.length}
                  </td>
                  <td className="px-4 py-3.5 text-center font-bold text-slate-700">
                    ₹{po.totalAmount.toLocaleString("en-IN")}
                  </td>
                  <td className="px-4 py-3.5 text-center text-xs text-slate-500">
                    {po.expectedDelivery}
                  </td>
                  <td className="px-4 py-3.5 text-center">
                    <StatusBadge status={po.status} />
                  </td>
                  <td className="px-4 py-3.5 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() =>
                          navigate(`/sales/purchase-orders/${po.id}`)
                        }
                        className="flex items-center gap-1 text-indigo-600 hover:text-indigo-800 text-xs font-bold bg-indigo-50 hover:bg-indigo-100 px-2.5 py-1.5 rounded-lg transition-colors"
                      >
                        <FiEye size={12} /> View
                      </button>
                      {po.status !== "completed" && (
                        <button
                          onClick={() =>
                            navigate(
                              `/sales/purchase-orders/${po.id}/upload-invoice`,
                            )
                          }
                          className="flex items-center gap-1 text-emerald-600 hover:text-emerald-800 text-xs font-bold bg-emerald-50 hover:bg-emerald-100 px-2.5 py-1.5 rounded-lg transition-colors"
                        >
                          <FiUpload size={12} /> Upload
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
