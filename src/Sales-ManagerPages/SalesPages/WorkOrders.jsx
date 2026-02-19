import { useState } from "react";
import { useNavigate } from "react-router-dom";
// NEW (add FiUpload)
import { FiPlus, FiEye, FiFilter, FiUpload } from "react-icons/fi";
import {
  Card,
  CardHeader,
  StatusBadge,
  BtnPrimary,
  Select,
} from "../SalesComponent/ui/index";
import { WORK_ORDERS, WO_STATUSES } from "../data/mockData";

export default function WorkOrders() {
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");

  const filtered = WORK_ORDERS.filter((wo) => {
    const matchStatus = statusFilter === "all" || wo.status === statusFilter;
    const matchPriority =
      priorityFilter === "all" || wo.priority === priorityFilter;
    return matchStatus && matchPriority;
  });

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-black text-slate-800">Work Orders</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            {WORK_ORDERS.length} total work orders
          </p>
        </div>
        <div className="flex gap-5">
          <BtnPrimary onClick={() => navigate("/sales/work-orders/upload")}>
            <FiUpload size={14} /> Upload Work Order
          </BtnPrimary>
          <BtnPrimary onClick={() => navigate("/sales/work-orders/create")}>
            <FiPlus size={14} /> Create Work Order
          </BtnPrimary>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <div className="px-5 py-4 flex items-center gap-3">
          <FiFilter size={14} className="text-slate-400" />
          <div className="flex-1 grid grid-cols-2 gap-3 max-w-md">
            <Select
              label="Status"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              options={[
                { value: "all", label: "All Statuses" },
                ...Object.keys(WO_STATUSES).map((k) => ({
                  value: k,
                  label: WO_STATUSES[k].label,
                })),
              ]}
            />
            <Select
              label="Priority"
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              options={[
                { value: "all", label: "All Priorities" },
                { value: "normal", label: "Normal" },
                { value: "high", label: "High" },
                { value: "urgent", label: "Urgent" },
              ]}
            />
          </div>
          <span className="text-xs text-slate-400 ml-auto">
            {filtered.length} results
          </span>
        </div>
      </Card>

      {/* Work Orders Table */}
      <Card>
        <CardHeader title="All Work Orders" subtitle="Click to view details" />
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                <th className="px-5 py-3 text-left">WO Number</th>
                <th className="px-4 py-3 text-left">Date</th>
                <th className="px-4 py-3 text-left">Customer</th>
                <th className="px-4 py-3 text-center">Priority</th>
                <th className="px-4 py-3 text-center">Mode</th>
                <th className="px-4 py-3 text-center">Items</th>
                <th className="px-4 py-3 text-center">Status</th>
                <th className="px-4 py-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.map((wo) => (
                <tr key={wo.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-3.5 font-mono text-xs font-bold text-slate-700">
                    {wo.id}
                  </td>
                  <td className="px-4 py-3.5 text-xs text-slate-500">
                    {wo.date}
                  </td>
                  <td className="px-4 py-3.5 text-xs text-slate-600 max-w-[150px] truncate">
                    {wo.customer}
                  </td>
                  <td className="px-4 py-3.5 text-center">
                    <StatusBadge status={wo.priority} />
                  </td>
                  <td className="px-4 py-3.5 text-center">
                    <StatusBadge status={wo.mode} />
                  </td>
                  <td className="px-4 py-3.5 text-center font-bold text-slate-700">
                    {wo.items.length}
                  </td>
                  <td className="px-4 py-3.5 text-center">
                    <StatusBadge status={wo.status} />
                  </td>
                  <td className="px-4 py-3.5 text-center">
                    <button
                      onClick={() => navigate(`/sales/work-orders/${wo.id}`)}
                      className="flex items-center gap-1 mx-auto text-indigo-600 hover:text-indigo-800 text-xs font-bold bg-indigo-50 hover:bg-indigo-100 px-2.5 py-1.5 rounded-lg transition-colors"
                    >
                      <FiEye size={12} /> View
                    </button>
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
