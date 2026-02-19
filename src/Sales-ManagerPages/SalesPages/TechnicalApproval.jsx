import { useState } from "react";
import { FiCheck, FiX, FiEye } from "react-icons/fi";
import { Card, CardHeader, StatusBadge, Modal, BtnPrimary, BtnDanger, Textarea } from "../SalesComponent/ui/index";
import { WORK_ORDERS } from "../data/mockData";

export default function TechnicalApproval() {
  const [reviewModal, setReviewModal] = useState(null);
  const [comment, setComment] = useState("");

  const pendingWOs = WORK_ORDERS.filter(w => w.status === "pending_approval").sort((a, b) => {
    const priorityOrder = { urgent: 1, high: 2, normal: 3 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });

  const handleApprove = () => {
    alert(`Work Order ${reviewModal.id} approved!`);
    setReviewModal(null);
    setComment("");
  };

  const handleReject = () => {
    if (!comment.trim()) {
      alert("Please add a rejection reason");
      return;
    }
    alert(`Work Order ${reviewModal.id} rejected with comment: ${comment}`);
    setReviewModal(null);
    setComment("");
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-black text-slate-800">Technical Approval Queue</h2>
        <p className="text-xs text-slate-400 mt-0.5">{pendingWOs.length} work orders pending approval</p>
      </div>

      {pendingWOs.length === 0 ? (
        <Card className="p-12 text-center">
          <FiCheck size={48} className="text-emerald-500 mx-auto mb-3 opacity-40" />
          <p className="text-sm text-slate-600 font-semibold">All caught up!</p>
          <p className="text-xs text-slate-400 mt-1">No pending work orders for approval</p>
        </Card>
      ) : (
        <Card>
          <CardHeader title="Pending Work Orders" subtitle="Review and approve/reject work orders" />
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  <th className="px-5 py-3 text-left">WO Number</th>
                  <th className="px-4 py-3 text-left">Customer</th>
                  <th className="px-4 py-3 text-center">Priority</th>
                  <th className="px-4 py-3 text-center">Total Items</th>
                  <th className="px-4 py-3 text-center">Requested Date</th>
                  <th className="px-4 py-3 text-left">Sales Person</th>
                  <th className="px-4 py-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {pendingWOs.map(wo => (
                  <tr
                    key={wo.id}
                    className={`hover:bg-slate-50 transition-colors ${wo.priority === "urgent" ? "bg-red-50/30" : ""}`}
                  >
                    <td className="px-5 py-3.5 font-mono text-xs font-bold text-slate-700">{wo.id}</td>
                    <td className="px-4 py-3.5 text-xs text-slate-600">{wo.customer}</td>
                    <td className="px-4 py-3.5 text-center"><StatusBadge status={wo.priority} /></td>
                    <td className="px-4 py-3.5 text-center font-bold text-slate-700">{wo.items.length}</td>
                    <td className="px-4 py-3.5 text-center text-xs text-slate-500">{wo.date}</td>
                    <td className="px-4 py-3.5 text-xs text-slate-600">{wo.salesPerson}</td>
                    <td className="px-4 py-3.5 text-center">
                      <button
                        onClick={() => setReviewModal(wo)}
                        className="flex items-center gap-1 mx-auto text-indigo-600 hover:text-indigo-800 text-xs font-bold bg-indigo-50 hover:bg-indigo-100 px-2.5 py-1.5 rounded-lg transition-colors"
                      >
                        <FiEye size={12} /> Review
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Review Modal */}
      {reviewModal && (
        <Modal title={`Review Work Order — ${reviewModal.id}`} onClose={() => setReviewModal(null)} size="2xl">
          <div className="space-y-5">
            {/* Status badges */}
            <div className="flex items-center gap-2">
              <StatusBadge status={reviewModal.priority} />
              <StatusBadge status={reviewModal.mode} />
            </div>

            {/* Customer Info */}
            <div className="grid grid-cols-2 gap-4 p-4 bg-slate-50 rounded-lg">
              {[
                { label: "Customer", value: reviewModal.customer },
                { label: "Contact", value: reviewModal.customerContact },
                { label: "Sales Person", value: reviewModal.salesPerson },
                { label: "Delivery Date", value: reviewModal.deliveryDate },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">{label}</p>
                  <p className="text-sm font-semibold text-slate-700 mt-0.5">{value}</p>
                </div>
              ))}
            </div>

            {/* Items Table */}
            <div>
              <p className="text-xs font-bold text-slate-600 mb-2">Product Items ({reviewModal.items.length})</p>
              <div className="border border-slate-200 rounded-lg overflow-hidden">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-slate-50 text-[10px] font-bold text-slate-400 uppercase">
                      <th className="px-3 py-2 text-left">SKU</th>
                      <th className="px-3 py-2 text-center">Required</th>
                      <th className="px-3 py-2 text-center">Available</th>
                      <th className="px-3 py-2 text-center">Status</th>
                      <th className="px-3 py-2 text-left">Remarks</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {reviewModal.items.map((item, idx) => {
                      const sufficient = item.stock >= item.qty;
                      return (
                        <tr key={idx} className={sufficient ? "" : "bg-red-50/40"}>
                          <td className="px-3 py-2.5 font-semibold text-slate-700">{item.sku}</td>
                          <td className="px-3 py-2.5 text-center font-bold">{item.qty}</td>
                          <td className={`px-3 py-2.5 text-center font-bold ${sufficient ? "text-emerald-600" : "text-red-600"}`}>
                            {item.stock}
                          </td>
                          <td className="px-3 py-2.5 text-center">
                            {sufficient ? (
                              <span className="text-emerald-600 text-xs font-bold">✓ OK</span>
                            ) : (
                              <span className="text-red-600 text-xs font-bold">⚠ Short</span>
                            )}
                          </td>
                          <td className="px-3 py-2.5 text-slate-500">{item.remarks || "—"}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Instructions */}
            {(reviewModal.specialInstructions || reviewModal.technicalNotes) && (
              <div className="space-y-3">
                {reviewModal.specialInstructions && (
                  <div>
                    <p className="text-xs font-bold text-slate-600 mb-1.5">Special Instructions</p>
                    <p className="text-sm text-slate-700 bg-slate-50 rounded-lg p-3">{reviewModal.specialInstructions}</p>
                  </div>
                )}
                {reviewModal.technicalNotes && (
                  <div>
                    <p className="text-xs font-bold text-slate-600 mb-1.5">Technical Notes from Sales</p>
                    <p className="text-sm text-slate-700 bg-amber-50 rounded-lg p-3 border border-amber-200">{reviewModal.technicalNotes}</p>
                  </div>
                )}
              </div>
            )}

            {/* Comment Box */}
            <Textarea
              label="Add Comment (Required for rejection, optional for approval)"
              value={comment}
              onChange={e => setComment(e.target.value)}
              placeholder="Add your technical review comments..."
              rows={3}
            />

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200">
              <button
                onClick={() => setReviewModal(null)}
                className="px-4 py-2 text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <BtnDanger onClick={handleReject}>
                <FiX size={14} /> Reject Work Order
              </BtnDanger>
              <BtnPrimary onClick={handleApprove}>
                <FiCheck size={14} /> Approve Work Order
              </BtnPrimary>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
