// PLACEHOLDER - Full 400+ line file with complete form will be in ZIP
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiSave, FiSend, FiX, FiPlus, FiTrash2 } from "react-icons/fi";
import { FormSection, Input, Select, Textarea, Toggle, FileUpload, BtnPrimary, BtnSecondary } from "../SalesComponent/ui/index";
import { SKUS, CUSTOMERS, PRIORITIES } from "../data/mockData";

export default function CreateWorkOrder() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    woNumber: "WO-2024-AUTO",
    date: new Date().toISOString().split("T")[0],
    customer: "",
    customerContact: "",
    salesPerson: "Current User",
    priority: "normal",
    deliveryDate: "",
    approvalRequired: true,
    specialInstructions: "",
    technicalNotes: "",
    attachment: null,
  });
  
  const [items, setItems] = useState([
    { sku: "", description: "", qty: 0, unit: "", stock: 0, remarks: "" }
  ]);

  const addRow = () => setItems([...items, { sku: "", description: "", qty: 0, unit: "", stock: 0, remarks: "" }]);
  const removeRow = (idx) => setItems(items.filter((_, i) => i !== idx));
  
  const handleSKUChange = (idx, skuName) => {
    const sku = SKUS.find(s => s.name === skuName);
    const newItems = [...items];
    newItems[idx] = {
      ...newItems[idx],
      sku: skuName,
      description: sku?.description || "",
      unit: sku?.unit || "",
      stock: sku?.stock || 0,
    };
    setItems(newItems);
  };

  const handleSubmit = (isDraft) => {
    console.log("Submit:", { ...form, items, status: isDraft ? "draft" : form.approvalRequired ? "pending_approval" : "approved" });
    alert(isDraft ? "Saved as draft!" : "Work order submitted!");
    navigate("/sales/work-orders");
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-black text-slate-800">Create Work Order</h2>
          <p className="text-xs text-slate-400 mt-0.5">Manual Entry</p>
        </div>
        <button onClick={() => navigate("/sales/work-orders")} className="text-sm text-slate-500 hover:text-slate-700">
          <FiX size={20} />
        </button>
      </div>

      {/* SECTION 1: Basic Details */}
      <FormSection title="1. Basic Details">
        <div className="grid grid-cols-2 gap-4">
          <Input label="Work Order No" value={form.woNumber} readOnly />
          <Input label="Date" type="date" value={form.date} onChange={e => setForm({...form, date: e.target.value})} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Select
            label="Customer"
            required
            value={form.customer}
            onChange={e => {
              const cust = CUSTOMERS.find(c => c.name === e.target.value);
              setForm({...form, customer: e.target.value, customerContact: cust?.contact || ""});
            }}
            options={[{ value: "", label: "-- Select Customer --" }, ...CUSTOMERS.map(c => c.name)]}
          />
          <Input label="Customer Contact" value={form.customerContact} readOnly />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <Input label="Sales Person" value={form.salesPerson} readOnly />
          <Select label="Priority" value={form.priority} onChange={e => setForm({...form, priority: e.target.value})} options={PRIORITIES.map(p => ({ value: p, label: p.charAt(0).toUpperCase() + p.slice(1) }))} />
          <Input label="Expected Delivery" type="date" required value={form.deliveryDate} onChange={e => setForm({...form, deliveryDate: e.target.value})} />
        </div>
        <Toggle label="Approval Required?" checked={form.approvalRequired} onChange={v => setForm({...form, approvalRequired: v})} />
        {form.approvalRequired && (
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-700">
            ⚠ This work order will be submitted to Technical Team for approval.
          </div>
        )}
      </FormSection>

      {/* SECTION 2: Product Details */}
      <FormSection title="2. Product Details">
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-slate-50 text-[10px] font-bold text-slate-400 uppercase">
                <th className="px-3 py-2 text-left border border-slate-200">SKU</th>
                <th className="px-3 py-2 text-left border border-slate-200">Description</th>
                <th className="px-3 py-2 text-center border border-slate-200">Available Stock</th>
                <th className="px-3 py-2 text-center border border-slate-200 w-24">Required Qty</th>
                <th className="px-3 py-2 text-center border border-slate-200">Unit</th>
                <th className="px-3 py-2 text-left border border-slate-200">Remarks</th>
                <th className="px-3 py-2 text-center border border-slate-200 w-16">Action</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, idx) => (
                <tr key={idx}>
                  <td className="px-2 py-2 border border-slate-200">
                    <select className="w-full text-xs border-none focus:ring-1 focus:ring-indigo-500 rounded" value={item.sku} onChange={e => handleSKUChange(idx, e.target.value)}>
                      <option value="">-- Select --</option>
                      {SKUS.map(s => <option key={s.id}>{s.name}</option>)}
                    </select>
                  </td>
                  <td className="px-2 py-2 border border-slate-200 text-xs text-slate-600">{item.description}</td>
                  <td className={`px-2 py-2 border border-slate-200 text-center text-xs font-bold ${item.stock < item.qty ? "text-red-600" : "text-emerald-600"}`}>
                    {item.stock || "—"}
                  </td>
                  <td className="px-2 py-2 border border-slate-200">
                    <input type="number" className="w-full text-xs text-center border-none focus:ring-1 focus:ring-indigo-500 rounded" value={item.qty} onChange={e => { const newItems = [...items]; newItems[idx].qty = +e.target.value; setItems(newItems); }} />
                  </td>
                  <td className="px-2 py-2 border border-slate-200 text-xs text-center">{item.unit || "—"}</td>
                  <td className="px-2 py-2 border border-slate-200">
                    <input type="text" className="w-full text-xs border-none focus:ring-1 focus:ring-indigo-500 rounded" value={item.remarks} onChange={e => { const newItems = [...items]; newItems[idx].remarks = e.target.value; setItems(newItems); }} />
                  </td>
                  <td className="px-2 py-2 border border-slate-200 text-center">
                    {items.length > 1 && (
                      <button onClick={() => removeRow(idx)} className="p-1 text-red-500 hover:bg-red-50 rounded transition-colors">
                        <FiTrash2 size={12} />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button onClick={addRow} className="flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100 px-3 py-2 rounded-lg transition-colors">
          <FiPlus size={12} /> Add Row
        </button>
      </FormSection>

      {/* SECTION 3: Additional Details */}
      <FormSection title="3. Additional Details">
        <Textarea label="Special Instructions" value={form.specialInstructions} onChange={e => setForm({...form, specialInstructions: e.target.value})} placeholder="Any special delivery or handling instructions..." />
        <Textarea label="Notes for Technical Team" value={form.technicalNotes} onChange={e => setForm({...form, technicalNotes: e.target.value})} placeholder="Technical specifications, quality requirements, etc..." />
        <FileUpload
          label="Attachment (Optional)"
          file={form.attachment}
          onChange={e => setForm({...form, attachment: e.target.files[0]})}
          onRemove={() => setForm({...form, attachment: null})}
        />
      </FormSection>

      {/* Action Buttons */}
      <div className="flex items-center gap-3 justify-end sticky bottom-0 bg-white p-4 border-t border-slate-200 rounded-xl shadow-lg">
        <BtnSecondary onClick={() => navigate("/sales/work-orders")}>
          <FiX size={14} /> Cancel
        </BtnSecondary>
        <BtnSecondary onClick={() => handleSubmit(true)}>
          <FiSave size={14} /> Save as Draft
        </BtnSecondary>
        <BtnPrimary onClick={() => handleSubmit(false)}>
          <FiSend size={14} /> Submit Work Order
        </BtnPrimary>
      </div>
    </div>
  );
}
