// ─────────────────────────────────────────────
// STORE MANAGER — Mock Data
// ─────────────────────────────────────────────

export const SKUS = [
  { id: 1, name: "Bearing 6205-ZZ",       bucket: "Mechanical",     available: 4,   reserved: 20, minLevel: 50,  unit: "pcs" },
  { id: 2, name: "Copper Wire 1.5mm",      bucket: "Electrical",     available: 12,  reserved: 30, minLevel: 100, unit: "m" },
  { id: 3, name: "Industrial Filter FX-90",bucket: "Consumables",    available: 2,   reserved: 5,  minLevel: 20,  unit: "pcs" },
  { id: 4, name: "Steel Bolt M12x50",      bucket: "Fasteners",      available: 340, reserved: 80, minLevel: 200, unit: "pcs" },
  { id: 5, name: "PVC Pipe 32mm",          bucket: "Plumbing",       available: 60,  reserved: 10, minLevel: 50,  unit: "m" },
  { id: 6, name: "Hydraulic Oil 46",       bucket: "Lubricants",     available: 8,   reserved: 4,  minLevel: 30,  unit: "ltr" },
  { id: 7, name: "Circuit Breaker 32A",    bucket: "Electrical",     available: 15,  reserved: 6,  minLevel: 10,  unit: "pcs" },
  { id: 8, name: "Gasket Sheet 3mm",       bucket: "Seals & Gaskets",available: 110, reserved: 20, minLevel: 50,  unit: "pcs" },
  { id: 9, name: "Allen Key Set 8pc",      bucket: "Tools",          available: 22,  reserved: 5,  minLevel: 10,  unit: "set" },
  { id: 10, name: "Safety Gloves L",       bucket: "Safety",         available: 9,   reserved: 0,  minLevel: 25,  unit: "pair" },
];

export const LOW_STOCK = SKUS.filter(s => s.available < s.minLevel);

export const WORK_ORDERS = [
  { id: "WO-2024-0041", customer: "Tata Steel Ltd.",     qty: 150, item: "Steel Bolt M12x50",    status: "pending",  dueDate: "2026-02-20" },
  { id: "WO-2024-0042", customer: "Larsen & Toubro",     qty: 40,  item: "Bearing 6205-ZZ",      status: "prepared", dueDate: "2026-02-18" },
  { id: "WO-2024-0043", customer: "Bharat Petroleum",    qty: 20,  item: "Hydraulic Oil 46",      status: "pending",  dueDate: "2026-02-19" },
  { id: "WO-2024-0044", customer: "Reliance Industries", qty: 200, item: "PVC Pipe 32mm",         status: "dispatched",dueDate: "2026-02-17" },
  { id: "WO-2024-0045", customer: "ONGC",                qty: 10,  item: "Circuit Breaker 32A",   status: "pending",  dueDate: "2026-02-21" },
];

export const CHALLANS = [
  { id: "CH-2024-0892", customer: "Tata Steel Ltd.",     amount: 124500, dueDate: "2026-02-14", daysLeft: -3,  status: "overdue",  invoiceNo: "APX-INV-1044" },
  { id: "CH-2024-0893", customer: "Larsen & Toubro",     amount: 88200,  dueDate: "2026-02-19", daysLeft: 2,   status: "due_soon", invoiceNo: "APX-INV-1045" },
  { id: "CH-2024-0894", customer: "Bharat Petroleum",    amount: 45000,  dueDate: "2026-02-25", daysLeft: 8,   status: "pending",  invoiceNo: "APX-INV-1046" },
  { id: "CH-2024-0895", customer: "Reliance Industries", amount: 210000, dueDate: "2026-03-01", daysLeft: 12,  status: "pending",  invoiceNo: "APX-INV-1047" },
  { id: "CH-2024-0896", customer: "ONGC",                amount: 67800,  dueDate: "2026-02-13", daysLeft: -4,  status: "overdue",  invoiceNo: "APX-INV-1048" },
];

export const DISPATCHES = [
  { id: "DSP-0041", workOrder: "WO-2024-0041", customer: "Tata Steel Ltd.",     item: "Steel Bolt M12x50",  qty: 150, status: "pending",   preparedBy: null },
  { id: "DSP-0042", workOrder: "WO-2024-0042", customer: "Larsen & Toubro",     item: "Bearing 6205-ZZ",    qty: 40,  status: "prepared",  preparedBy: "Rajesh M." },
  { id: "DSP-0043", workOrder: "WO-2024-0043", customer: "Bharat Petroleum",    item: "Hydraulic Oil 46",   qty: 20,  status: "pending",   preparedBy: null },
  { id: "DSP-0044", workOrder: "WO-2024-0044", customer: "Reliance Industries", item: "PVC Pipe 32mm",      qty: 200, status: "dispatched",preparedBy: "Suresh K." },
  { id: "DSP-0045", workOrder: "WO-2024-0045", customer: "ONGC",                item: "Circuit Breaker 32A",qty: 10,  status: "pending",   preparedBy: null },
];

export const STOCK_LEDGER = [
  { date: "2026-02-17", sku: "Bearing 6205-ZZ",       type: "OUT", qty: 10, balance: 4,  ref: "WO-2024-0038", by: "Rajesh M." },
  { date: "2026-02-16", sku: "Bearing 6205-ZZ",       type: "IN",  qty: 5,  balance: 14, ref: "PO-2024-0122", by: "System" },
  { date: "2026-02-15", sku: "Copper Wire 1.5mm",      type: "OUT", qty: 20, balance: 12, ref: "WO-2024-0036", by: "Priya N." },
  { date: "2026-02-15", sku: "Steel Bolt M12x50",      type: "IN",  qty: 100,balance: 340,ref: "PO-2024-0121", by: "System" },
  { date: "2026-02-14", sku: "Industrial Filter FX-90",type: "OUT", qty: 8,  balance: 2,  ref: "WO-2024-0034", by: "Rajesh M." },
];
