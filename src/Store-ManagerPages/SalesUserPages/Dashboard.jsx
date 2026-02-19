import { useState } from "react";
import {
  FiLayers, FiPackage, FiArchive, FiAlertCircle,
  FiShoppingCart, FiCheckCircle, FiAlertTriangle, FiBell,
} from "react-icons/fi";
import { SummaryCard, StatusBadge, Card, CardHeader, Modal } from "../StoreComponent/ui/index";
import { SKUS, LOW_STOCK, WORK_ORDERS, CHALLANS } from "../data/mockData";

export default function Dashboard() {
  const [reorderItem, setReorderItem] = useState(null);
  const [prepareItem, setPrepareItem] = useState(null);

  const totalSKUs     = SKUS.length;
  const totalAvail    = SKUS.reduce((a, s) => a + s.available, 0);
  const totalReserved = SKUS.reduce((a, s) => a + s.reserved, 0);
  const totalLow      = LOW_STOCK.length;

  const pendingOrders  = WORK_ORDERS.filter(w => w.status === "pending");
  const overdueChallans = CHALLANS.filter(c => c.status === "overdue");

  return (
    <div className="space-y-6">
      {/* Page title */}
      <div>
        <h2 className="text-xl font-black text-slate-800 tracking-tight">Store Dashboard</h2>
        <p className="text-xs text-slate-400 mt-0.5">Live stock and dispatch overview</p>
      </div>

      {/* ── KPI CARDS ── */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        <SummaryCard
          label="Total SKUs"
          value={totalSKUs}
          sub="Registered items"
          icon={FiLayers}
          iconBg="bg-teal-600"
        />
        <SummaryCard
          label="Available Stock"
          value={totalAvail.toLocaleString()}
          sub="Across all buckets"
          icon={FiPackage}
          iconBg="bg-indigo-500"
        />
        <SummaryCard
          label="Reserved Stock"
          value={totalReserved.toLocaleString()}
          sub="Held for work orders"
          icon={FiArchive}
          iconBg="bg-amber-500"
        />
        <SummaryCard
          label="Low Stock Items"
          value={totalLow}
          sub="Needs reorder"
          icon={FiAlertCircle}
          iconBg="bg-red-500"
          critical
        />
      </div>

      {/* ── LOW STOCK TABLE ── */}
      <Card>
        <CardHeader
          title="Low Stock Alerts"
          subtitle={`${totalLow} items below minimum level`}
          right={
            <span className="text-[10px] bg-red-500 text-white font-bold px-2 py-0.5 rounded-full">
              {totalLow} critical
            </span>
          }
        />
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                <th className="px-5 py-3 text-left">SKU Name</th>
                <th className="px-4 py-3 text-left">Bucket</th>
                <th className="px-4 py-3 text-center">Available</th>
                <th className="px-4 py-3 text-center">Min Level</th>
                <th className="px-4 py-3 text-center">Status</th>
                <th className="px-4 py-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {LOW_STOCK.map(item => (
                <tr key={item.id} className="hover:bg-red-50/20 transition-colors">
                  <td className="px-5 py-3.5 font-semibold text-slate-800">{item.name}</td>
                  <td className="px-4 py-3.5 text-slate-500 text-xs">{item.bucket}</td>
                  <td className="px-4 py-3.5 text-center font-bold text-red-600">{item.available}</td>
                  <td className="px-4 py-3.5 text-center text-slate-500">{item.minLevel}</td>
                  <td className="px-4 py-3.5 text-center">
                    <StatusBadge status="low" />
                  </td>
                  <td className="px-4 py-3.5 text-center">
                    <button
                      onClick={() => setReorderItem(item)}
                      className="flex items-center gap-1.5 mx-auto bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors"
                    >
                      <FiShoppingCart size={12} /> Reorder
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* ── PENDING DISPATCH ── */}
        <Card>
          <CardHeader
            title="Pending Dispatch"
            subtitle={`${pendingOrders.length} work orders awaiting preparation`}
          />
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  <th className="px-5 py-3 text-left">Work Order</th>
                  <th className="px-4 py-3 text-left">Customer</th>
                  <th className="px-4 py-3 text-center">Qty</th>
                  <th className="px-4 py-3 text-center">Status</th>
                  <th className="px-4 py-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {WORK_ORDERS.map(wo => (
                  <tr key={wo.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="px-5 py-3.5 font-mono text-xs text-slate-700 font-semibold">{wo.id}</td>
                    <td className="px-4 py-3.5 text-slate-600 text-xs truncate max-w-[120px]">{wo.customer}</td>
                    <td className="px-4 py-3.5 text-center font-bold text-slate-700">{wo.qty}</td>
                    <td className="px-4 py-3.5 text-center"><StatusBadge status={wo.status} /></td>
                    <td className="px-4 py-3.5 text-center">
                      {wo.status === "pending" && (
                        <button
                          onClick={() => setPrepareItem(wo)}
                          className="flex items-center gap-1.5 mx-auto bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors"
                        >
                          <FiCheckCircle size={12} /> Prepare
                        </button>
                      )}
                      {wo.status !== "pending" && (
                        <span className="text-xs text-slate-400">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* ── CHALLAN REMINDERS ── */}
        <Card>
          <CardHeader
            title="Challan Invoice Reminders"
            subtitle="Payment status and due dates"
            right={
              overdueChallans.length > 0 && (
                <span className="flex items-center gap-1 text-[10px] text-red-600 font-bold">
                  <FiBell size={11} /> {overdueChallans.length} overdue
                </span>
              )
            }
          />
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  <th className="px-5 py-3 text-left">Challan No</th>
                  <th className="px-4 py-3 text-left">Customer</th>
                  <th className="px-4 py-3 text-center">Due Date</th>
                  <th className="px-4 py-3 text-center">Days</th>
                  <th className="px-4 py-3 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {CHALLANS.map(ch => (
                  <tr
                    key={ch.id}
                    className={`hover:bg-slate-50/60 transition-colors ${ch.status === "overdue" ? "bg-red-50/20" : ""}`}
                  >
                    <td className="px-5 py-3.5 font-mono text-xs text-slate-700 font-semibold">{ch.id}</td>
                    <td className="px-4 py-3.5 text-slate-600 text-xs truncate max-w-[110px]">{ch.customer}</td>
                    <td className="px-4 py-3.5 text-center text-xs text-slate-500">{ch.dueDate}</td>
                    <td className="px-4 py-3.5 text-center">
                      <span className={`font-bold text-sm flex items-center justify-center gap-1 ${ch.daysLeft < 0 ? "text-red-600" : ch.daysLeft <= 3 ? "text-amber-600" : "text-slate-600"}`}>
                        {ch.daysLeft < 0 && <FiAlertTriangle size={12} />}
                        {ch.daysLeft < 0 ? `${Math.abs(ch.daysLeft)}d ago` : `${ch.daysLeft}d`}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-center"><StatusBadge status={ch.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* ── REORDER MODAL ── */}
      {reorderItem && (
        <Modal title={`Reorder Request — ${reorderItem.name}`} onClose={() => setReorderItem(null)}>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "SKU",         value: reorderItem.name },
                { label: "Bucket",      value: reorderItem.bucket },
                { label: "Available",   value: `${reorderItem.available} ${reorderItem.unit}` },
                { label: "Min Level",   value: `${reorderItem.minLevel} ${reorderItem.unit}` },
                { label: "Shortfall",   value: `${reorderItem.minLevel - reorderItem.available} ${reorderItem.unit}` },
              ].map(({ label, value }) => (
                <div key={label} className="bg-slate-50 rounded-lg p-3">
                  <p className="text-[10px] text-slate-400 uppercase font-bold">{label}</p>
                  <p className="text-sm font-bold text-slate-800 mt-0.5">{value}</p>
                </div>
              ))}
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1.5">Reorder Quantity</label>
              <input
                type="number"
                defaultValue={reorderItem.minLevel * 2}
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1.5">Note (optional)</label>
              <textarea
                rows={2}
                placeholder="Add a note for the purchase team..."
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <div className="flex justify-end gap-3 pt-1">
              <button onClick={() => setReorderItem(null)} className="px-4 py-2 text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors">
                Cancel
              </button>
              <button onClick={() => setReorderItem(null)} className="px-4 py-2 text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 rounded-lg transition-colors flex items-center gap-1.5">
                <FiShoppingCart size={12} /> Send Reorder Request
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* ── PREPARE MODAL ── */}
      {prepareItem && (
        <Modal title={`Prepare Dispatch — ${prepareItem.id}`} onClose={() => setPrepareItem(null)}>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Work Order",  value: prepareItem.id },
                { label: "Customer",    value: prepareItem.customer },
                { label: "Item",        value: prepareItem.item },
                { label: "Quantity",    value: prepareItem.qty },
                { label: "Due Date",    value: prepareItem.dueDate },
              ].map(({ label, value }) => (
                <div key={label} className="bg-slate-50 rounded-lg p-3">
                  <p className="text-[10px] text-slate-400 uppercase font-bold">{label}</p>
                  <p className="text-sm font-bold text-slate-800 mt-0.5">{value}</p>
                </div>
              ))}
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1.5">Remarks</label>
              <textarea
                rows={2}
                placeholder="Add preparation notes..."
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <div className="flex justify-end gap-3 pt-1">
              <button onClick={() => setPrepareItem(null)} className="px-4 py-2 text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors">
                Cancel
              </button>
              <button onClick={() => setPrepareItem(null)} className="px-4 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors flex items-center gap-1.5">
                <FiCheckCircle size={12} /> Mark as Prepared
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
