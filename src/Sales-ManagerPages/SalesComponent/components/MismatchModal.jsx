import { useState } from "react";
import { FiAlertTriangle, FiCheckCircle, FiX, FiAlertCircle } from "react-icons/fi";
import { Modal, BtnPrimary, BtnSecondary, BtnDanger } from "../../SalesComponent/ui/index";
import { MISMATCH_TYPES } from "../../data/poMockData";

export default function MismatchModal({ po, mismatches, onAccept, onReject, onSavePartial }) {
  const [acknowledged, setAcknowledged] = useState(false);
  const [action, setAction] = useState(null); // "accept" | "reject" | "partial"

  const hasExcess = mismatches.some(m => m.type === "excess");
  const hasShort = mismatches.some(m => m.type === "short");
  const allExact = mismatches.every(m => m.type === "exact");

  const handleProceed = () => {
    if (!acknowledged && !allExact) {
      alert("Please acknowledge the quantity mismatch");
      return;
    }

    if (action === "accept") {
      onAccept(mismatches);
    } else if (action === "reject") {
      onReject();
    } else if (action === "partial") {
      onSavePartial(mismatches);
    }
  };

  return (
    <Modal
      title={`Material Receipt Validation — ${po.id}`}
      onClose={onReject}
      size="2xl"
    >
      <div className="space-y-5">
        {/* Alert Banner */}
        {allExact ? (
          <div className="flex items-start gap-3 p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
            <FiCheckCircle size={20} className="text-emerald-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-bold text-emerald-800">Exact Match ✓</p>
              <p className="text-xs text-emerald-600 mt-0.5">
                All received quantities match the purchase order. You can proceed to complete the PO.
              </p>
            </div>
          </div>
        ) : hasExcess ? (
          <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
            <FiAlertTriangle size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-bold text-red-800">Over Supply Detected!</p>
              <p className="text-xs text-red-600 mt-0.5">
                Received quantity exceeds ordered quantity. Please review and decide whether to accept or reject the excess.
              </p>
            </div>
          </div>
        ) : hasShort ? (
          <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <FiAlertCircle size={20} className="text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-bold text-amber-800">Short Supply Detected</p>
              <p className="text-xs text-amber-600 mt-0.5">
                Received quantity is less than ordered. The PO will be marked as "Partially Received" and remain open for future deliveries.
              </p>
            </div>
          </div>
        ) : null}

        {/* PO Info */}
        <div className="grid grid-cols-3 gap-3 p-4 bg-slate-50 rounded-lg">
          {[
            { label: "PO Number", value: po.id },
            { label: "Supplier", value: po.supplier },
            { label: "Expected Delivery", value: po.expectedDelivery },
          ].map(({ label, value }) => (
            <div key={label}>
              <p className="text-[10px] font-bold text-slate-400 uppercase">{label}</p>
              <p className="text-sm font-semibold text-slate-700 mt-0.5">{value}</p>
            </div>
          ))}
        </div>

        {/* Mismatch Table */}
        <div>
          <p className="text-xs font-bold text-slate-600 mb-2">Material Comparison</p>
          <div className="border border-slate-200 rounded-lg overflow-hidden">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-slate-50 text-[10px] font-bold text-slate-400 uppercase">
                  <th className="px-4 py-3 text-left">SKU</th>
                  <th className="px-3 py-3 text-left">Description</th>
                  <th className="px-3 py-3 text-center">Ordered Qty</th>
                  <th className="px-3 py-3 text-center">Received Qty</th>
                  <th className="px-3 py-3 text-center">Difference</th>
                  <th className="px-3 py-3 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {mismatches.map((item, idx) => (
                  <tr
                    key={idx}
                    className={
                      item.type === "exact"
                        ? ""
                        : item.type === "short"
                        ? "bg-amber-50/40"
                        : "bg-red-50/40"
                    }
                  >
                    <td className="px-4 py-3 font-semibold text-slate-700">{item.sku}</td>
                    <td className="px-3 py-3 text-slate-600">{item.description}</td>
                    <td className="px-3 py-3 text-center font-bold text-slate-700">{item.orderedQty}</td>
                    <td className="px-3 py-3 text-center font-bold text-indigo-600">{item.receivedQty}</td>
                    <td className={`px-3 py-3 text-center font-bold ${
                      item.difference === 0
                        ? "text-emerald-600"
                        : item.difference < 0
                        ? "text-amber-600"
                        : "text-red-600"
                    }`}>
                      {item.difference === 0 ? "—" : item.difference > 0 ? `+${item.difference}` : item.difference}
                    </td>
                    <td className="px-3 py-3 text-center">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          item.type === "exact"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : item.type === "short"
                            ? "bg-amber-50 text-amber-700 border border-amber-200"
                            : "bg-red-50 text-red-700 border border-red-200"
                        }`}
                      >
                        {MISMATCH_TYPES[item.type].icon} {MISMATCH_TYPES[item.type].label}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pending Quantities Summary (for short supply) */}
        {hasShort && (
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <p className="text-xs font-bold text-amber-800 mb-2">Pending Quantities:</p>
            <div className="space-y-1">
              {mismatches
                .filter(m => m.pendingQty > 0)
                .map((item, idx) => (
                  <p key={idx} className="text-xs text-amber-700">
                    • <span className="font-semibold">{item.sku}</span>: {item.pendingQty} units pending
                  </p>
                ))}
            </div>
            <p className="text-xs text-amber-600 mt-2">
              You can upload another invoice later to complete this PO.
            </p>
          </div>
        )}

        {/* Acknowledgement Checkbox (if not exact match) */}
        {!allExact && (
          <div className="p-4 border-2 border-slate-200 rounded-lg bg-slate-50">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={acknowledged}
                onChange={e => setAcknowledged(e.target.checked)}
                className="mt-0.5 w-4 h-4 text-indigo-600 rounded focus:ring-2 focus:ring-indigo-500"
              />
              <div>
                <p className="text-sm font-bold text-slate-700">
                  I confirm this quantity mismatch
                </p>
                <p className="text-xs text-slate-500 mt-0.5">
                  {hasExcess
                    ? "I understand the received quantity exceeds the ordered quantity and have reviewed the decision to accept or reject the excess."
                    : "I acknowledge that the received quantity is less than ordered. The PO will remain open for future deliveries."}
                </p>
              </div>
            </label>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-between gap-3 pt-3 border-t border-slate-200">
          <BtnSecondary onClick={onReject}>
            <FiX size={14} /> Cancel
          </BtnSecondary>

          <div className="flex gap-2">
            {hasShort && (
              <BtnSecondary
                onClick={() => {
                  setAction("partial");
                  handleProceed();
                }}
              >
                Save as Partial
              </BtnSecondary>
            )}
            
            {hasExcess && (
              <BtnDanger
                onClick={() => {
                  setAction("reject");
                  handleProceed();
                }}
              >
                <FiX size={14} /> Reject Excess
              </BtnDanger>
            )}

            <BtnPrimary
              onClick={() => {
                setAction("accept");
                handleProceed();
              }}
              disabled={!allExact && !acknowledged}
            >
              <FiCheckCircle size={14} />
              {allExact ? "Complete PO" : hasExcess ? "Accept All" : "Acknowledge & Continue"}
            </BtnPrimary>
          </div>
        </div>
      </div>
    </Modal>
  );
}
