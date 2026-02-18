import { useState } from "react";
import {
  FiBell, FiAlertTriangle, FiFileText, FiEye,
  FiCheckCircle, FiClock,
} from "react-icons/fi";
import { StatusBadge, Card, CardHeader, Modal } from "../component/ui/index";
import { CHALLANS } from "../data/mockData";

export default function Challan() {
  const [detail, setDetail] = useState(null);

  const overdue   = CHALLANS.filter(c => c.status === "overdue");
  const dueSoon   = CHALLANS.filter(c => c.status === "due_soon");
  const pending   = CHALLANS.filter(c => c.status === "pending");

  const getRowStyle = (status) => {
    if (status === "overdue")  return "bg-red-50/20";
    if (status === "due_soon") return "bg-amber-50/20";
    return "";
  };

  const getDaysDisplay = (ch) => {
    if (ch.daysLeft < 0) {
      return (
        <span className="flex items-center justify-center gap-1 font-bold text-red-600">
          <FiAlertTriangle size={12} />
          {Math.abs(ch.daysLeft)}d overdue
        </span>
      );
    }
    if (ch.daysLeft <= 3) {
      return <span className="font-bold text-amber-600">{ch.daysLeft}d left</span>;
    }
    return <span className="text-slate-500">{ch.daysLeft}d left</span>;
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-black text-slate-800 tracking-tight">Challan & Invoice Reminders</h2>
        <p className="text-xs text-slate-400 mt-0.5">Monitor payment status and upcoming due dates</p>
      </div>

      {/* ── SUMMARY CARDS ── */}
      <div className="grid grid-cols-3 gap-4">
        {[
          {
            label: "Overdue",
            count: overdue.length,
            color: "bg-red-500",
            icon: FiAlertTriangle,
            bg: "bg-red-50 border-red-200",
            text: "text-red-700",
          },
          {
            label: "Due Soon",
            count: dueSoon.length,
            color: "bg-amber-500",
            icon: FiClock,
            bg: "bg-amber-50 border-amber-200",
            text: "text-amber-700",
          },
          {
            label: "On Track",
            count: pending.length,
            color: "bg-teal-500",
            icon: FiCheckCircle,
            bg: "bg-teal-50 border-teal-200",
            text: "text-teal-700",
          },
        ].map(({ label, count, color, icon: Icon, bg, text }) => (
          <div key={label} className={`rounded-xl border p-4 flex items-center gap-4 ${bg}`}>
            <div className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center flex-shrink-0`}>
              <Icon className="text-white" size={18} />
            </div>
            <div>
              <p className={`text-[10px] font-bold uppercase tracking-widest ${text}`}>{label}</p>
              <p className={`text-2xl font-black ${text}`}>{count}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── OVERDUE ALERT BANNER ── */}
      {overdue.length > 0 && (
        <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-xl">
          <FiBell size={18} className="text-red-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-bold text-red-800">
              {overdue.length} challan{overdue.length > 1 ? "s" : ""} overdue
            </p>
            <p className="text-xs text-red-600 mt-0.5">
              {overdue.map(c => c.id).join(", ")} — Please follow up with customers immediately.
            </p>
          </div>
        </div>
      )}

      {/* ── CHALLAN TABLE ── */}
      <Card>
        <CardHeader
          title="All Challans"
          subtitle="Click View to see full details"
          right={
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <FiFileText size={13} />
              {CHALLANS.length} challans
            </div>
          }
        />
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                <th className="px-5 py-3 text-left">Challan No</th>
                <th className="px-4 py-3 text-left">Invoice No</th>
                <th className="px-4 py-3 text-left">Customer</th>
                <th className="px-4 py-3 text-center">Amount</th>
                <th className="px-4 py-3 text-center">Due Date</th>
                <th className="px-4 py-3 text-center">Days</th>
                <th className="px-4 py-3 text-center">Status</th>
                <th className="px-4 py-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {CHALLANS.map(ch => (
                <tr
                  key={ch.id}
                  className={`hover:brightness-98 transition-colors ${getRowStyle(ch.status)}`}
                >
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-1.5">
                      {ch.status === "overdue" && <FiBell size={12} className="text-red-500 flex-shrink-0" />}
                      <span className="font-mono text-xs font-bold text-slate-700">{ch.id}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 font-mono text-xs text-slate-500">{ch.invoiceNo}</td>
                  <td className="px-4 py-3.5 text-xs text-slate-600">{ch.customer}</td>
                  <td className="px-4 py-3.5 text-center text-sm font-bold text-slate-700">
                    ₹{ch.amount.toLocaleString("en-IN")}
                  </td>
                  <td className="px-4 py-3.5 text-center text-xs text-slate-500">{ch.dueDate}</td>
                  <td className="px-4 py-3.5 text-center text-sm">
                    {getDaysDisplay(ch)}
                  </td>
                  <td className="px-4 py-3.5 text-center">
                    <StatusBadge status={ch.status} />
                  </td>
                  <td className="px-4 py-3.5 text-center">
                    <button
                      onClick={() => setDetail(ch)}
                      className="flex items-center gap-1 mx-auto text-teal-600 hover:text-teal-800 text-xs font-bold bg-teal-50 hover:bg-teal-100 px-2.5 py-1.5 rounded-lg transition-colors"
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

      {/* ── DETAIL MODAL ── */}
      {detail && (
        <Modal
          title={`Challan Details — ${detail.id}`}
          onClose={() => setDetail(null)}
          size="md"
        >
          <div className="space-y-4">
            {/* Status banner */}
            <div className={`p-3 rounded-lg border flex items-center gap-2 ${detail.status === "overdue" ? "bg-red-50 border-red-200" : detail.status === "due_soon" ? "bg-amber-50 border-amber-200" : "bg-teal-50 border-teal-200"}`}>
              {detail.status === "overdue"
                ? <FiAlertTriangle size={15} className="text-red-500 flex-shrink-0" />
                : detail.status === "due_soon"
                ? <FiClock size={15} className="text-amber-500 flex-shrink-0" />
                : <FiCheckCircle size={15} className="text-teal-500 flex-shrink-0" />
              }
              <p className={`text-xs font-bold ${detail.status === "overdue" ? "text-red-700" : detail.status === "due_soon" ? "text-amber-700" : "text-teal-700"}`}>
                {detail.status === "overdue"
                  ? `This challan is ${Math.abs(detail.daysLeft)} day(s) overdue`
                  : detail.status === "due_soon"
                  ? `Payment due in ${detail.daysLeft} day(s)`
                  : `Payment due in ${detail.daysLeft} day(s) — On track`
                }
              </p>
            </div>

            {/* Details grid */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Challan No",   value: detail.id },
                { label: "Invoice No",   value: detail.invoiceNo },
                { label: "Customer",     value: detail.customer },
                { label: "Amount",       value: `₹${detail.amount.toLocaleString("en-IN")}` },
                { label: "Due Date",     value: detail.dueDate },
                { label: "Status",       value: detail.status.replace("_", " ").toUpperCase() },
              ].map(({ label, value }) => (
                <div key={label} className="bg-slate-50 rounded-lg p-3">
                  <p className="text-[10px] text-slate-400 uppercase font-bold">{label}</p>
                  <p className="text-sm font-bold text-slate-800 mt-0.5">{value}</p>
                </div>
              ))}
            </div>

            {/* Reminder note */}
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1.5">
                <FiBell size={12} className="inline mr-1" />
                Send Reminder Note
              </label>
              <textarea
                rows={2}
                placeholder="Type a reminder message to send to the customer..."
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div className="flex justify-end gap-3">
              <button onClick={() => setDetail(null)} className="px-4 py-2 text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors">
                Close
              </button>
              <button onClick={() => setDetail(null)} className="px-4 py-2 text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 rounded-lg transition-colors flex items-center gap-1.5">
                <FiBell size={12} /> Send Reminder
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
