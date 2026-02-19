import { useState } from "react";
import {
  FiRotateCcw, FiAlertTriangle, FiTrash2, FiPlus,
  FiCheckCircle, FiClock, FiEye, FiX, FiFileText,
} from "react-icons/fi";
import { StatusBadge, Card, CardHeader, Modal, SummaryCard } from "../StoreComponent/ui/index";
import {
  CREDIT_NOTES, DEBIT_NOTES, DAMAGED_GOODS, SKUS,
  RETURN_REASONS, DAMAGE_REASONS, DISPOSAL_METHODS,
} from "../data/mockData";

export default function Returns() {
  const [tab, setTab] = useState("credit");
  const [viewModal, setViewModal] = useState(null);
  const [addCreditModal, setAddCreditModal] = useState(false);
  const [addDebitModal, setAddDebitModal] = useState(false);
  const [addDamageModal, setAddDamageModal] = useState(false);

  const pendingCredit = CREDIT_NOTES.filter(cn => cn.status === "pending").length;
  const pendingDebit = DEBIT_NOTES.filter(dn => dn.status === "raised").length;
  const pendingDamage = DAMAGED_GOODS.filter(d => d.status === "under_review").length;

  const totalCreditValue = CREDIT_NOTES.reduce((a, cn) => a + cn.amount, 0);
  const totalDebitValue = DEBIT_NOTES.reduce((a, dn) => a + dn.amount, 0);
  const totalDamageLoss = DAMAGED_GOODS.reduce((a, d) => a + d.estimatedLoss, 0);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-black text-slate-800 tracking-tight">Returns & Adjustments</h2>
        <p className="text-xs text-slate-400 mt-0.5">Manage credit notes, debit notes, and damaged goods</p>
      </div>

      {/* ── SUMMARY CARDS ── */}
      <div className="grid grid-cols-3 gap-4">
        <SummaryCard
          label="Credit Notes"
          value={CREDIT_NOTES.length}
          sub={`₹${totalCreditValue.toLocaleString("en-IN")} total value`}
          icon={FiRotateCcw}
          iconBg="bg-emerald-500"
        />
        <SummaryCard
          label="Debit Notes"
          value={DEBIT_NOTES.length}
          sub={`₹${totalDebitValue.toLocaleString("en-IN")} claimed`}
          icon={FiFileText}
          iconBg="bg-amber-500"
        />
        <SummaryCard
          label="Damaged Goods"
          value={DAMAGED_GOODS.length}
          sub={`₹${totalDamageLoss.toLocaleString("en-IN")} estimated loss`}
          icon={FiTrash2}
          iconBg="bg-red-500"
          critical={totalDamageLoss > 10000}
        />
      </div>

      {/* ── TAB NAVIGATION ── */}
      <div className="flex items-center justify-between">
        <div className="flex gap-1 p-1 bg-slate-100 rounded-lg">
          {[
            { id: "credit", label: "Credit Notes", count: pendingCredit },
            { id: "debit",  label: "Debit Notes",  count: pendingDebit },
            { id: "damage", label: "Damaged Goods",count: pendingDamage },
          ].map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-4 py-2 text-xs font-bold rounded-md transition-all flex items-center gap-2 ${tab === t.id ? "bg-white text-slate-800 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
            >
              {t.label}
              {t.count > 0 && (
                <span className="bg-red-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">{t.count}</span>
              )}
            </button>
          ))}
        </div>
        <button
          onClick={() => {
            if (tab === "credit") setAddCreditModal(true);
            if (tab === "debit")  setAddDebitModal(true);
            if (tab === "damage") setAddDamageModal(true);
          }}
          className="flex items-center gap-1.5 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors"
        >
          <FiPlus size={13} />
          {tab === "credit" ? "New Credit Note" : tab === "debit" ? "New Debit Note" : "Report Damage"}
        </button>
      </div>

      {/* ── CREDIT NOTES TAB ── */}
      {tab === "credit" && (
        <Card>
          <CardHeader
            title="Credit Notes"
            subtitle="Material returns with credit adjustments"
            right={
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <FiRotateCcw size={13} />
                {CREDIT_NOTES.length} notes
              </div>
            }
          />
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  <th className="px-5 py-3 text-left">Credit Note</th>
                  <th className="px-4 py-3 text-left">Date</th>
                  <th className="px-4 py-3 text-left">Type</th>
                  <th className="px-4 py-3 text-left">Party</th>
                  <th className="px-4 py-3 text-left">SKU</th>
                  <th className="px-4 py-3 text-center">Qty</th>
                  <th className="px-4 py-3 text-center">Amount</th>
                  <th className="px-4 py-3 text-center">Status</th>
                  <th className="px-4 py-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {CREDIT_NOTES.map(cn => (
                  <tr key={cn.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="px-5 py-3.5 font-mono text-xs font-bold text-slate-700">{cn.id}</td>
                    <td className="px-4 py-3.5 text-xs text-slate-500">{cn.date}</td>
                    <td className="px-4 py-3.5">
                      <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-semibold uppercase">
                        {cn.type.replace("_", " ")}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-xs text-slate-600 max-w-[120px] truncate">
                      {cn.customer || cn.supplier}
                    </td>
                    <td className="px-4 py-3.5 text-xs text-slate-600 max-w-[110px] truncate">{cn.sku}</td>
                    <td className="px-4 py-3.5 text-center font-bold text-slate-700">{cn.qty}</td>
                    <td className="px-4 py-3.5 text-center font-bold text-emerald-600">
                      ₹{cn.amount.toLocaleString("en-IN")}
                    </td>
                    <td className="px-4 py-3.5 text-center">
                      <StatusBadge status={cn.status} />
                    </td>
                    <td className="px-4 py-3.5 text-center">
                      <button
                        onClick={() => setViewModal({ type: "credit", data: cn })}
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
      )}

      {/* ── DEBIT NOTES TAB ── */}
      {tab === "debit" && (
        <Card>
          <CardHeader
            title="Debit Notes"
            subtitle="Supplier shortages and quality issues"
            right={
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <FiFileText size={13} />
                {DEBIT_NOTES.length} notes
              </div>
            }
          />
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  <th className="px-5 py-3 text-left">Debit Note</th>
                  <th className="px-4 py-3 text-left">Date</th>
                  <th className="px-4 py-3 text-left">Type</th>
                  <th className="px-4 py-3 text-left">Supplier</th>
                  <th className="px-4 py-3 text-left">SKU</th>
                  <th className="px-4 py-3 text-center">Issue Qty</th>
                  <th className="px-4 py-3 text-center">Amount</th>
                  <th className="px-4 py-3 text-center">Status</th>
                  <th className="px-4 py-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {DEBIT_NOTES.map(dn => (
                  <tr key={dn.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="px-5 py-3.5 font-mono text-xs font-bold text-slate-700">{dn.id}</td>
                    <td className="px-4 py-3.5 text-xs text-slate-500">{dn.date}</td>
                    <td className="px-4 py-3.5">
                      <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-semibold uppercase">
                        {dn.type.replace("supplier_", "")}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-xs text-slate-600 max-w-[120px] truncate">{dn.supplier}</td>
                    <td className="px-4 py-3.5 text-xs text-slate-600 max-w-[110px] truncate">{dn.sku}</td>
                    <td className="px-4 py-3.5 text-center font-bold text-red-600">
                      {dn.shortageQty || dn.damagedQty || dn.rejectedQty}
                    </td>
                    <td className="px-4 py-3.5 text-center font-bold text-amber-600">
                      ₹{dn.amount.toLocaleString("en-IN")}
                    </td>
                    <td className="px-4 py-3.5 text-center">
                      <StatusBadge status={dn.status} />
                    </td>
                    <td className="px-4 py-3.5 text-center">
                      <button
                        onClick={() => setViewModal({ type: "debit", data: dn })}
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
      )}

      {/* ── DAMAGED GOODS TAB ── */}
      {tab === "damage" && (
        <Card>
          <CardHeader
            title="Damaged Goods Register"
            subtitle="Track and manage damaged inventory"
            right={
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <FiTrash2 size={13} />
                {DAMAGED_GOODS.length} records
              </div>
            }
          />
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  <th className="px-5 py-3 text-left">Damage ID</th>
                  <th className="px-4 py-3 text-left">Date</th>
                  <th className="px-4 py-3 text-left">SKU</th>
                  <th className="px-4 py-3 text-center">Qty</th>
                  <th className="px-4 py-3 text-left">Location</th>
                  <th className="px-4 py-3 text-left">Reason</th>
                  <th className="px-4 py-3 text-center">Est. Loss</th>
                  <th className="px-4 py-3 text-center">Status</th>
                  <th className="px-4 py-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {DAMAGED_GOODS.map(dmg => (
                  <tr
                    key={dmg.id}
                    className={`hover:bg-slate-50/60 transition-colors ${dmg.status === "under_review" ? "bg-amber-50/20" : ""}`}
                  >
                    <td className="px-5 py-3.5 font-mono text-xs font-bold text-slate-700">{dmg.id}</td>
                    <td className="px-4 py-3.5 text-xs text-slate-500">{dmg.date}</td>
                    <td className="px-4 py-3.5 text-xs text-slate-600 max-w-[110px] truncate">{dmg.sku}</td>
                    <td className="px-4 py-3.5 text-center font-bold text-red-600">{dmg.qty}</td>
                    <td className="px-4 py-3.5 text-xs text-slate-500 max-w-[100px] truncate">{dmg.location}</td>
                    <td className="px-4 py-3.5 text-xs text-slate-600 max-w-[110px] truncate">{dmg.reason}</td>
                    <td className="px-4 py-3.5 text-center font-bold text-red-600">
                      ₹{dmg.estimatedLoss.toLocaleString("en-IN")}
                    </td>
                    <td className="px-4 py-3.5 text-center">
                      <StatusBadge status={dmg.status.replace("_", " ")} />
                    </td>
                    <td className="px-4 py-3.5 text-center">
                      <button
                        onClick={() => setViewModal({ type: "damage", data: dmg })}
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
      )}

      {/* ── VIEW DETAIL MODAL ── */}
      {viewModal && (
        <Modal
          title={
            viewModal.type === "credit" ? `Credit Note — ${viewModal.data.id}` :
            viewModal.type === "debit"  ? `Debit Note — ${viewModal.data.id}` :
            `Damaged Goods — ${viewModal.data.id}`
          }
          onClose={() => setViewModal(null)}
          size="lg"
        >
          {viewModal.type === "credit" && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Credit Note No", value: viewModal.data.id },
                  { label: "Date", value: viewModal.data.date },
                  { label: "Type", value: viewModal.data.type.replace("_", " ") },
                  { label: "Reference Doc", value: viewModal.data.referenceDoc },
                  { label: viewModal.data.customer ? "Customer" : "Supplier", value: viewModal.data.customer || viewModal.data.supplier },
                  { label: "SKU", value: viewModal.data.sku },
                  { label: "Quantity", value: `${viewModal.data.qty} units` },
                  { label: "Amount", value: `₹${viewModal.data.amount.toLocaleString("en-IN")}` },
                  { label: "Status", value: viewModal.data.status },
                  { label: "Created By", value: viewModal.data.createdBy },
                  { label: "Approved By", value: viewModal.data.approvedBy || "Pending" },
                ].map(({ label, value }) => (
                  <div key={label} className="bg-slate-50 rounded-lg p-3">
                    <p className="text-[10px] text-slate-400 uppercase font-bold">{label}</p>
                    <p className="text-sm font-bold text-slate-800 mt-0.5">{value}</p>
                  </div>
                ))}
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1.5">Reason</label>
                <p className="text-sm text-slate-700 bg-slate-50 rounded-lg p-3">{viewModal.data.reason}</p>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1.5">Notes</label>
                <p className="text-sm text-slate-700 bg-slate-50 rounded-lg p-3">{viewModal.data.notes}</p>
              </div>
            </div>
          )}

          {viewModal.type === "debit" && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Debit Note No", value: viewModal.data.id },
                  { label: "Date", value: viewModal.data.date },
                  { label: "Type", value: viewModal.data.type.replace("supplier_", "") },
                  { label: "Reference Doc", value: viewModal.data.referenceDoc },
                  { label: "Supplier", value: viewModal.data.supplier },
                  { label: "SKU", value: viewModal.data.sku },
                  { label: "Ordered Qty", value: viewModal.data.orderedQty },
                  { label: "Received Qty", value: viewModal.data.receivedQty },
                  {
                    label: "Issue Qty",
                    value: viewModal.data.shortageQty || viewModal.data.damagedQty || viewModal.data.rejectedQty,
                    critical: true,
                  },
                  { label: "Amount", value: `₹${viewModal.data.amount.toLocaleString("en-IN")}` },
                  { label: "Status", value: viewModal.data.status },
                  { label: "Created By", value: viewModal.data.createdBy },
                ].map(({ label, value, critical }) => (
                  <div key={label} className={`rounded-lg p-3 ${critical ? "bg-red-50 border border-red-200" : "bg-slate-50"}`}>
                    <p className="text-[10px] text-slate-400 uppercase font-bold">{label}</p>
                    <p className={`text-sm font-bold mt-0.5 ${critical ? "text-red-600" : "text-slate-800"}`}>{value}</p>
                  </div>
                ))}
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1.5">Notes</label>
                <p className="text-sm text-slate-700 bg-slate-50 rounded-lg p-3">{viewModal.data.notes}</p>
              </div>
            </div>
          )}

          {viewModal.type === "damage" && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Damage ID", value: viewModal.data.id },
                  { label: "Date", value: viewModal.data.date },
                  { label: "SKU", value: viewModal.data.sku },
                  { label: "Quantity", value: `${viewModal.data.qty} units`, critical: true },
                  { label: "Location", value: viewModal.data.location },
                  { label: "Reported By", value: viewModal.data.reportedBy },
                  { label: "Status", value: viewModal.data.status.replace("_", " ") },
                  { label: "Disposal Method", value: viewModal.data.disposalMethod || "Not yet disposed" },
                  { label: "Est. Loss", value: `₹${viewModal.data.estimatedLoss.toLocaleString("en-IN")}`, critical: true },
                ].map(({ label, value, critical }) => (
                  <div key={label} className={`rounded-lg p-3 ${critical ? "bg-red-50 border border-red-200" : "bg-slate-50"}`}>
                    <p className="text-[10px] text-slate-400 uppercase font-bold">{label}</p>
                    <p className={`text-sm font-bold mt-0.5 ${critical ? "text-red-600" : "text-slate-800"}`}>{value}</p>
                  </div>
                ))}
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1.5">Reason</label>
                <p className="text-sm text-slate-700 bg-slate-50 rounded-lg p-3">{viewModal.data.reason}</p>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1.5">Notes</label>
                <p className="text-sm text-slate-700 bg-slate-50 rounded-lg p-3">{viewModal.data.notes}</p>
              </div>
            </div>
          )}
        </Modal>
      )}

      {/* ── ADD CREDIT NOTE MODAL ── */}
      {addCreditModal && (
        <Modal title="Create Credit Note" onClose={() => setAddCreditModal(false)}>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1.5">Type</label>
                <select className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white">
                  <option>Customer Return</option>
                  <option>Supplier Return</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1.5">Reference Doc</label>
                <input placeholder="e.g. CH-2024-0890" className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1.5">Customer/Supplier</label>
              <input placeholder="Enter name" className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1.5">SKU</label>
              <select className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white">
                {SKUS.map(s => <option key={s.id}>{s.name}</option>)}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1.5">Quantity</label>
                <input type="number" placeholder="0" className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1.5">Amount (₹)</label>
                <input type="number" placeholder="0.00" className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1.5">Reason</label>
              <select className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white">
                {RETURN_REASONS.map(r => <option key={r}>{r}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1.5">Notes</label>
              <textarea rows={2} placeholder="Additional details..." className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-teal-500" />
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <button onClick={() => setAddCreditModal(false)} className="px-4 py-2 text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors">Cancel</button>
              <button onClick={() => setAddCreditModal(false)} className="px-4 py-2 text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 rounded-lg transition-colors flex items-center gap-1.5">
                <FiCheckCircle size={12} /> Create Credit Note
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* ── ADD DEBIT NOTE MODAL ── */}
      {addDebitModal && (
        <Modal title="Create Debit Note" onClose={() => setAddDebitModal(false)}>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1.5">Type</label>
                <select className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white">
                  <option>Supplier Shortage</option>
                  <option>Supplier Damaged</option>
                  <option>Supplier Quality Issue</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1.5">Reference PO</label>
                <input placeholder="e.g. PO-2024-0121" className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1.5">Supplier</label>
              <input placeholder="Supplier name" className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1.5">SKU</label>
              <select className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white">
                {SKUS.map(s => <option key={s.id}>{s.name}</option>)}
              </select>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1.5">Ordered Qty</label>
                <input type="number" placeholder="0" className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1.5">Received Qty</label>
                <input type="number" placeholder="0" className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1.5">Issue Qty</label>
                <input type="number" placeholder="0" className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm bg-red-50 border-red-200 focus:ring-red-500" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1.5">Claim Amount (₹)</label>
              <input type="number" placeholder="0.00" className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1.5">Notes</label>
              <textarea rows={2} placeholder="Details of the issue..." className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-teal-500" />
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <button onClick={() => setAddDebitModal(false)} className="px-4 py-2 text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors">Cancel</button>
              <button onClick={() => setAddDebitModal(false)} className="px-4 py-2 text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 rounded-lg transition-colors flex items-center gap-1.5">
                <FiCheckCircle size={12} /> Raise Debit Note
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* ── ADD DAMAGED GOODS MODAL ── */}
      {addDamageModal && (
        <Modal title="Report Damaged Goods" onClose={() => setAddDamageModal(false)}>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1.5">SKU</label>
              <select className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white">
                {SKUS.map(s => <option key={s.id}>{s.name}</option>)}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1.5">Quantity Damaged</label>
                <input type="number" placeholder="0" className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm bg-red-50 border-red-200 focus:ring-red-500" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1.5">Est. Loss (₹)</label>
                <input type="number" placeholder="0.00" className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1.5">Location</label>
              <input placeholder="e.g. Warehouse A - Rack 12" className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1.5">Reason</label>
              <select className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white">
                {DAMAGE_REASONS.map(r => <option key={r}>{r}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1.5">Disposal Method (optional)</label>
              <select className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white">
                <option value="">— Not yet decided —</option>
                {DISPOSAL_METHODS.map(d => <option key={d}>{d}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1.5">Notes</label>
              <textarea rows={2} placeholder="Describe the damage..." className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-teal-500" />
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <button onClick={() => setAddDamageModal(false)} className="px-4 py-2 text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors">Cancel</button>
              <button onClick={() => setAddDamageModal(false)} className="px-4 py-2 text-xs font-bold text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors flex items-center gap-1.5">
                <FiAlertTriangle size={12} /> Report Damage
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
