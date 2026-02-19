import { useParams, useNavigate } from "react-router-dom";
import { FiArrowLeft, FiUpload, FiDownload, FiPackage, FiCheckCircle, FiClock } from "react-icons/fi";
import { Card, CardHeader, StatusBadge, BtnPrimary } from "../SalesComponent/ui/index";
import { PURCHASE_ORDERS, MISMATCH_TYPES } from "../data/poMockData";

export default function PODetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const po = PURCHASE_ORDERS.find(p => p.id === id);

  if (!po) return <div className="text-center py-20 text-slate-400">PO not found</div>;

  const totalOrdered = po.items.reduce((sum, item) => sum + item.orderedQty, 0);
  const totalReceived = po.items.reduce((sum, item) => sum + item.receivedQty, 0);
  const totalPending = po.items.reduce((sum, item) => sum + item.pendingQty, 0);

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate("/sales/purchase-orders")}
          className="flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-800"
        >
          <FiArrowLeft size={16} /> Back to Purchase Orders
        </button>
        {po.status !== "completed" && (
          <BtnPrimary onClick={() => navigate(`/sales/purchase-orders/${po.id}/upload-invoice`)}>
            <FiUpload size={14} /> Upload Invoice
          </BtnPrimary>
        )}
      </div>

      {/* Header */}
      <Card className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-black text-slate-800">{po.id}</h2>
            <p className="text-sm text-slate-500 mt-1">Created on {po.date}</p>
          </div>
          <StatusBadge status={po.status} />
        </div>
      </Card>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="p-5 flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center flex-shrink-0">
            <FiPackage className="text-white" size={18} />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase">Total Ordered</p>
            <p className="text-2xl font-black text-slate-800">{totalOrdered}</p>
            <p className="text-[10px] text-slate-400">units</p>
          </div>
        </Card>
        <Card className="p-5 flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center flex-shrink-0">
            <FiCheckCircle className="text-white" size={18} />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase">Received</p>
            <p className="text-2xl font-black text-emerald-600">{totalReceived}</p>
            <p className="text-[10px] text-slate-400">units</p>
          </div>
        </Card>
        <Card className="p-5 flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center flex-shrink-0">
            <FiClock className="text-white" size={18} />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase">Pending</p>
            <p className="text-2xl font-black text-amber-600">{totalPending}</p>
            <p className="text-[10px] text-slate-400">units</p>
          </div>
        </Card>
      </div>

      {/* Supplier Info */}
      <Card>
        <CardHeader title="Supplier Information" />
        <div className="p-6 grid grid-cols-2 gap-4">
          {[
            { label: "Supplier Name", value: po.supplier },
            { label: "Contact", value: po.supplierContact },
            { label: "PO Date", value: po.date },
            { label: "Expected Delivery", value: po.expectedDelivery },
            { label: "Total Amount", value: `₹${po.totalAmount.toLocaleString("en-IN")}` },
            { label: "Current Status", value: <StatusBadge status={po.status} /> },
          ].map(({ label, value }) => (
            <div key={label}>
              <p className="text-[10px] font-bold text-slate-400 uppercase">{label}</p>
              <p className="text-sm font-semibold text-slate-700 mt-0.5">{value}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Items Table */}
      <Card>
        <CardHeader title="Order Items" subtitle={`${po.items.length} item(s)`} />
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 text-[10px] font-bold text-slate-400 uppercase">
                <th className="px-5 py-3 text-left">SKU</th>
                <th className="px-4 py-3 text-left">Description</th>
                <th className="px-4 py-3 text-center">Ordered</th>
                <th className="px-4 py-3 text-center">Received</th>
                <th className="px-4 py-3 text-center">Pending</th>
                <th className="px-4 py-3 text-center">Unit Price</th>
                <th className="px-4 py-3 text-center">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {po.items.map((item, idx) => (
                <tr key={idx} className={item.pendingQty > 0 ? "bg-amber-50/20" : ""}>
                  <td className="px-5 py-3.5 font-semibold text-slate-700">{item.sku}</td>
                  <td className="px-4 py-3.5 text-xs text-slate-600">{item.description}</td>
                  <td className="px-4 py-3.5 text-center font-bold text-slate-700">{item.orderedQty}</td>
                  <td className="px-4 py-3.5 text-center font-bold text-emerald-600">{item.receivedQty}</td>
                  <td className="px-4 py-3.5 text-center font-bold text-amber-600">{item.pendingQty}</td>
                  <td className="px-4 py-3.5 text-center text-slate-600">₹{item.unitPrice.toLocaleString()}</td>
                  <td className="px-4 py-3.5 text-center font-bold text-slate-700">₹{item.totalPrice.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Receipt History */}
      {po.receiptHistory.length > 0 && (
        <Card>
          <CardHeader title="Receipt History" subtitle={`${po.receiptHistory.length} receipt(s)`} />
          <div className="p-6 space-y-4">
            {po.receiptHistory.map((receipt, idx) => (
              <div key={idx} className="border border-slate-200 rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="text-sm font-bold text-slate-800">Invoice: {receipt.invoiceNumber}</p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Invoice Date: {receipt.invoiceDate} • Uploaded: {receipt.uploadedDate}
                    </p>
                  </div>
                  <StatusBadge status={receipt.status} />
                </div>

                <div className="space-y-2">
                  <p className="text-xs font-bold text-slate-600">Received Items:</p>
                  {receipt.receivedItems.map((item, i) => (
                    <div key={i} className="flex items-center justify-between text-xs p-2 bg-slate-50 rounded">
                      <span className="font-semibold text-slate-700">{item.sku}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-slate-600">Qty: {item.qty}</span>
                        {item.mismatch && MISMATCH_TYPES[item.mismatch] && (
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                            item.mismatch === "exact" ? "bg-emerald-50 text-emerald-700" :
                            item.mismatch === "short" ? "bg-amber-50 text-amber-700" :
                            "bg-red-50 text-red-700"
                          }`}>
                            {MISMATCH_TYPES[item.mismatch].icon} {MISMATCH_TYPES[item.mismatch].label}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {receipt.notes && (
                  <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-xs font-bold text-blue-700 mb-1">Notes:</p>
                    <p className="text-xs text-blue-600">{receipt.notes}</p>
                  </div>
                )}

                <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-500">Acknowledged by: {receipt.acknowledgedBy}</span>
                  {receipt.status === "completed" && (
                    <span className="text-emerald-600 font-semibold">✓ PO Completed</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
