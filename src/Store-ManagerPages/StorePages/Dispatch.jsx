import { useState } from "react";
import {
  FiPlay, FiCheck, FiTruck, FiClock, FiCheckCircle,
} from "react-icons/fi";
import { StatusBadge, Card, CardHeader, Modal } from "../StoreComponent/ui/index";
import { DISPATCHES } from "../data/mockData";

export default function Dispatch() {
  const [dispatches, setDispatches] = useState(DISPATCHES);
  const [prepareModal, setPrepareModal] = useState(null);
  const [confirmModal, setConfirmModal] = useState(null);

  const pending    = dispatches.filter(d => d.status === "pending");
  const prepared   = dispatches.filter(d => d.status === "prepared");
  const dispatched = dispatches.filter(d => d.status === "dispatched");

  const handlePrepare = (item) => {
    setDispatches(prev =>
      prev.map(d => d.id === item.id ? { ...d, status: "prepared", preparedBy: "Store Manager" } : d)
    );
    setPrepareModal(null);
  };

  const handleConfirm = (item) => {
    setDispatches(prev =>
      prev.map(d => d.id === item.id ? { ...d, status: "dispatched" } : d)
    );
    setConfirmModal(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-black text-slate-800 tracking-tight">Dispatch Management</h2>
        <p className="text-xs text-slate-400 mt-0.5">Track and confirm material dispatch</p>
      </div>

      {/* ── STATS ROW ── */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Pending",    count: pending.length,    color: "bg-amber-500",  icon: FiClock },
          { label: "Prepared",   count: prepared.length,   color: "bg-indigo-500", icon: FiCheckCircle },
          { label: "Dispatched", count: dispatched.length, color: "bg-emerald-500",icon: FiTruck },
        ].map(({ label, count, color, icon: Icon }) => (
          <Card key={label} className="p-4 flex items-center gap-4">
            <div className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center flex-shrink-0`}>
              <Icon className="text-white" size={18} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{label}</p>
              <p className="text-2xl font-black text-slate-800">{count}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* ── PENDING TABLE ── */}
      <Card>
        <CardHeader
          title="Pending Dispatch"
          subtitle="Work orders awaiting preparation"
          right={
            pending.length > 0 && (
              <span className="text-[10px] bg-amber-500 text-white font-bold px-2 py-0.5 rounded-full">
                {pending.length} pending
              </span>
            )
          }
        />
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                <th className="px-5 py-3 text-left">Dispatch ID</th>
                <th className="px-4 py-3 text-left">Work Order</th>
                <th className="px-4 py-3 text-left">Customer</th>
                <th className="px-4 py-3 text-left">Item</th>
                <th className="px-4 py-3 text-center">Qty</th>
                <th className="px-4 py-3 text-center">Status</th>
                <th className="px-4 py-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {pending.length === 0 && (
                <tr><td colSpan={7} className="text-center py-10 text-slate-400 text-sm">All pending orders have been prepared ✓</td></tr>
              )}
              {pending.map(d => (
                <tr key={d.id} className="hover:bg-amber-50/20 transition-colors">
                  <td className="px-5 py-3.5 font-mono text-xs font-bold text-slate-700">{d.id}</td>
                  <td className="px-4 py-3.5 font-mono text-xs text-slate-500">{d.workOrder}</td>
                  <td className="px-4 py-3.5 text-xs text-slate-600">{d.customer}</td>
                  <td className="px-4 py-3.5 text-xs text-slate-600 max-w-[120px] truncate">{d.item}</td>
                  <td className="px-4 py-3.5 text-center font-bold text-slate-700">{d.qty}</td>
                  <td className="px-4 py-3.5 text-center"><StatusBadge status={d.status} /></td>
                  <td className="px-4 py-3.5 text-center">
                    <button
                      onClick={() => setPrepareModal(d)}
                      className="flex items-center gap-1.5 mx-auto bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-colors"
                    >
                      <FiPlay size={11} /> Prepare
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* ── PREPARED TABLE ── */}
      <Card>
        <CardHeader
          title="Prepared — Awaiting Dispatch"
          subtitle="Ready to be shipped"
          right={
            prepared.length > 0 && (
              <span className="text-[10px] bg-indigo-500 text-white font-bold px-2 py-0.5 rounded-full">
                {prepared.length} ready
              </span>
            )
          }
        />
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                <th className="px-5 py-3 text-left">Dispatch ID</th>
                <th className="px-4 py-3 text-left">Work Order</th>
                <th className="px-4 py-3 text-left">Customer</th>
                <th className="px-4 py-3 text-left">Item</th>
                <th className="px-4 py-3 text-center">Qty</th>
                <th className="px-4 py-3 text-center">Prepared By</th>
                <th className="px-4 py-3 text-center">Status</th>
                <th className="px-4 py-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {prepared.length === 0 && (
                <tr><td colSpan={8} className="text-center py-10 text-slate-400 text-sm">No items in prepared state</td></tr>
              )}
              {prepared.map(d => (
                <tr key={d.id} className="hover:bg-indigo-50/20 transition-colors">
                  <td className="px-5 py-3.5 font-mono text-xs font-bold text-slate-700">{d.id}</td>
                  <td className="px-4 py-3.5 font-mono text-xs text-slate-500">{d.workOrder}</td>
                  <td className="px-4 py-3.5 text-xs text-slate-600">{d.customer}</td>
                  <td className="px-4 py-3.5 text-xs text-slate-600 max-w-[120px] truncate">{d.item}</td>
                  <td className="px-4 py-3.5 text-center font-bold text-slate-700">{d.qty}</td>
                  <td className="px-4 py-3.5 text-center text-xs text-slate-500">{d.preparedBy || "—"}</td>
                  <td className="px-4 py-3.5 text-center"><StatusBadge status={d.status} /></td>
                  <td className="px-4 py-3.5 text-center">
                    <button
                      onClick={() => setConfirmModal(d)}
                      className="flex items-center gap-1.5 mx-auto bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-colors"
                    >
                      <FiCheck size={11} /> Confirm
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* ── DISPATCHED LOG ── */}
      {dispatched.length > 0 && (
        <Card>
          <CardHeader title="Dispatched" subtitle="Completed dispatch records" />
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  <th className="px-5 py-3 text-left">Dispatch ID</th>
                  <th className="px-4 py-3 text-left">Work Order</th>
                  <th className="px-4 py-3 text-left">Customer</th>
                  <th className="px-4 py-3 text-center">Qty</th>
                  <th className="px-4 py-3 text-center">Prepared By</th>
                  <th className="px-4 py-3 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {dispatched.map(d => (
                  <tr key={d.id} className="hover:bg-emerald-50/20 transition-colors opacity-70">
                    <td className="px-5 py-3.5 font-mono text-xs font-bold text-slate-600">{d.id}</td>
                    <td className="px-4 py-3.5 font-mono text-xs text-slate-400">{d.workOrder}</td>
                    <td className="px-4 py-3.5 text-xs text-slate-500">{d.customer}</td>
                    <td className="px-4 py-3.5 text-center font-bold text-slate-600">{d.qty}</td>
                    <td className="px-4 py-3.5 text-center text-xs text-slate-400">{d.preparedBy || "—"}</td>
                    <td className="px-4 py-3.5 text-center"><StatusBadge status={d.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* ── PREPARE MODAL ── */}
      {prepareModal && (
        <Modal title={`Prepare Dispatch — ${prepareModal.id}`} onClose={() => setPrepareModal(null)}>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Work Order", value: prepareModal.workOrder },
                { label: "Customer",   value: prepareModal.customer },
                { label: "Item",       value: prepareModal.item },
                { label: "Quantity",   value: `${prepareModal.qty} pcs` },
              ].map(({ label, value }) => (
                <div key={label} className="bg-slate-50 rounded-lg p-3">
                  <p className="text-[10px] text-slate-400 uppercase font-bold">{label}</p>
                  <p className="text-sm font-bold text-slate-800 mt-0.5">{value}</p>
                </div>
              ))}
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1.5">Preparation Note</label>
              <textarea rows={2} placeholder="Enter preparation notes..." className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-teal-500" />
            </div>
            <div className="flex justify-end gap-3">
              <button onClick={() => setPrepareModal(null)} className="px-4 py-2 text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors">Cancel</button>
              <button onClick={() => handlePrepare(prepareModal)} className="px-4 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors flex items-center gap-1.5">
                <FiPlay size={11} /> Mark as Prepared
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* ── CONFIRM MODAL ── */}
      {confirmModal && (
        <Modal title={`Confirm Dispatch — ${confirmModal.id}`} onClose={() => setConfirmModal(null)}>
          <div className="space-y-4">
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
              <p className="text-sm font-bold text-emerald-800">Confirm this dispatch?</p>
              <p className="text-xs text-emerald-600 mt-1">This will mark the order as dispatched and update inventory.</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Work Order", value: confirmModal.workOrder },
                { label: "Customer",   value: confirmModal.customer },
                { label: "Item",       value: confirmModal.item },
                { label: "Quantity",   value: confirmModal.qty },
              ].map(({ label, value }) => (
                <div key={label} className="bg-slate-50 rounded-lg p-3">
                  <p className="text-[10px] text-slate-400 uppercase font-bold">{label}</p>
                  <p className="text-sm font-bold text-slate-800 mt-0.5">{value}</p>
                </div>
              ))}
            </div>
            <div className="flex justify-end gap-3">
              <button onClick={() => setConfirmModal(null)} className="px-4 py-2 text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors">Cancel</button>
              <button onClick={() => handleConfirm(confirmModal)} className="px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors flex items-center gap-1.5">
                <FiCheck size={11} /> Confirm Dispatch
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
