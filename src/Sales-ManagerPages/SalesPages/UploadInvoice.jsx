import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FiUpload, FiFile, FiX, FiCheckCircle, FiArrowLeft } from "react-icons/fi";
import { Card, FormSection, Input, FileUpload, BtnPrimary, BtnSecondary } from "../SalesComponent/ui/index";
import { PURCHASE_ORDERS, validateInvoiceItems, getOverallMismatchType } from "../data/poMockData";
import MismatchModal from "../SalesComponent/components/MismatchModal";

export default function UploadInvoice() {
  const { id } = useParams();
  const navigate = useNavigate();
  const po = PURCHASE_ORDERS.find(p => p.id === id);

  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [invoiceDate, setInvoiceDate] = useState("");
  const [invoiceFile, setInvoiceFile] = useState(null);
  const [receivedItems, setReceivedItems] = useState(
    po?.items.map(item => ({
      sku: item.sku,
      qty: item.orderedQty - item.receivedQty, // Default to pending qty
    })) || []
  );
  
  const [showMismatchModal, setShowMismatchModal] = useState(false);
  const [validationResult, setValidationResult] = useState(null);

  if (!po) return <div className="text-center py-20 text-slate-400">PO not found</div>;

  const handleQtyChange = (idx, value) => {
    const newItems = [...receivedItems];
    newItems[idx].qty = parseInt(value) || 0;
    setReceivedItems(newItems);
  };

  const handleValidate = () => {
    if (!invoiceNumber || !invoiceDate) {
      alert("Please fill in invoice number and date");
      return;
    }

    // Validate quantities
    const mismatches = validateInvoiceItems(po.items, receivedItems);
    const overallType = getOverallMismatchType(mismatches);

    setValidationResult({ mismatches, overallType });
    setShowMismatchModal(true);
  };

  const handleAccept = (mismatches) => {
    console.log("Accepting receipt:", {
      poId: po.id,
      invoiceNumber,
      invoiceDate,
      mismatches,
    });

    const allExact = mismatches.every(m => m.type === "exact");
    const newStatus = allExact ? "completed" : "partially_received";

    alert(`Invoice processed successfully!\nPO Status: ${newStatus.replace("_", " ").toUpperCase()}\nStock updated for received quantities.`);
    navigate(`/sales/purchase-orders/${po.id}`);
  };

  const handleReject = () => {
    setShowMismatchModal(false);
    setValidationResult(null);
  };

  const handleSavePartial = (mismatches) => {
    console.log("Saving partial receipt:", {
      poId: po.id,
      invoiceNumber,
      invoiceDate,
      mismatches,
    });

    alert("Partial receipt saved!\nPO Status: PARTIALLY RECEIVED\nYou can upload another invoice later to complete this PO.");
    navigate(`/sales/purchase-orders/${po.id}`);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <button
            onClick={() => navigate(`/sales/purchase-orders/${po.id}`)}
            className="flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-800 mb-2"
          >
            <FiArrowLeft size={16} /> Back to PO
          </button>
          <h2 className="text-xl font-black text-slate-800">Upload Invoice — {po.id}</h2>
          <p className="text-xs text-slate-400 mt-0.5">Record material receipt and validate quantities</p>
        </div>
      </div>

      {/* PO Summary */}
      <Card className="p-5">
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "Supplier", value: po.supplier },
            { label: "PO Date", value: po.date },
            { label: "Expected Delivery", value: po.expectedDelivery },
          ].map(({ label, value }) => (
            <div key={label}>
              <p className="text-[10px] font-bold text-slate-400 uppercase">{label}</p>
              <p className="text-sm font-semibold text-slate-700 mt-0.5">{value}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Invoice Details */}
      <FormSection title="Invoice Details">
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Invoice Number"
            required
            value={invoiceNumber}
            onChange={e => setInvoiceNumber(e.target.value)}
            placeholder="e.g. INV-2024-5501"
          />
          <Input
            label="Invoice Date"
            type="date"
            required
            value={invoiceDate}
            onChange={e => setInvoiceDate(e.target.value)}
          />
        </div>
        <FileUpload
          label="Upload Invoice Document"
          file={invoiceFile}
          onChange={e => setInvoiceFile(e.target.files[0])}
          onRemove={() => setInvoiceFile(null)}
        />
      </FormSection>

      {/* Received Quantities */}
      <FormSection title="Received Quantities">
        <div className="overflow-x-auto border border-slate-200 rounded-lg">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 text-[10px] font-bold text-slate-400 uppercase">
                <th className="px-4 py-3 text-left">SKU</th>
                <th className="px-3 py-3 text-left">Description</th>
                <th className="px-3 py-3 text-center">Ordered Qty</th>
                <th className="px-3 py-3 text-center">Already Received</th>
                <th className="px-3 py-3 text-center">Pending</th>
                <th className="px-3 py-3 text-center">Received Now</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {po.items.map((item, idx) => {
                const pending = item.orderedQty - item.receivedQty;
                return (
                  <tr key={idx}>
                    <td className="px-4 py-3 font-semibold text-slate-700">{item.sku}</td>
                    <td className="px-3 py-3 text-xs text-slate-600">{item.description}</td>
                    <td className="px-3 py-3 text-center font-bold text-slate-700">{item.orderedQty}</td>
                    <td className="px-3 py-3 text-center text-slate-500">{item.receivedQty}</td>
                    <td className="px-3 py-3 text-center font-bold text-amber-600">{pending}</td>
                    <td className="px-3 py-3 text-center">
                      <input
                        type="number"
                        min="0"
                        value={receivedItems[idx]?.qty || 0}
                        onChange={e => handleQtyChange(idx, e.target.value)}
                        className="w-20 text-center border border-slate-200 rounded px-2 py-1 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-xs text-blue-700">
          <p className="font-bold mb-1">📝 Note:</p>
          <p>
            Enter the actual quantities received as per the supplier invoice. The system will automatically validate against the PO and handle:
          </p>
          <ul className="mt-2 space-y-1 ml-4">
            <li>• <strong>Exact Match</strong> → PO will be completed</li>
            <li>• <strong>Short Supply</strong> → PO marked as "Partially Received"</li>
            <li>• <strong>Over Supply</strong> → You'll be asked to accept or reject excess</li>
          </ul>
        </div>
      </FormSection>

      {/* Action Buttons */}
      <div className="flex items-center gap-3 justify-end sticky bottom-0 bg-white p-4 border-t border-slate-200 rounded-xl shadow-lg">
        <BtnSecondary onClick={() => navigate(`/sales/purchase-orders/${po.id}`)}>
          <FiX size={14} /> Cancel
        </BtnSecondary>
        <BtnPrimary onClick={handleValidate}>
          <FiCheckCircle size={14} /> Validate & Process
        </BtnPrimary>
      </div>

      {/* Mismatch Modal */}
      {showMismatchModal && validationResult && (
        <MismatchModal
          po={po}
          mismatches={validationResult.mismatches}
          onAccept={handleAccept}
          onReject={handleReject}
          onSavePartial={handleSavePartial}
        />
      )}
    </div>
  );
}
