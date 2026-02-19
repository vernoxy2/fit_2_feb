// // ─────────────────────────────────────────────
// // STORE MANAGER — Mock Data
// // ─────────────────────────────────────────────

// export const SKUS = [
//   { id: 1, name: "Bearing 6205-ZZ",       bucket: "Mechanical",     available: 4,   reserved: 20, minLevel: 50,  unit: "pcs" },
//   { id: 2, name: "Copper Wire 1.5mm",      bucket: "Electrical",     available: 12,  reserved: 30, minLevel: 100, unit: "m" },
//   { id: 3, name: "Industrial Filter FX-90",bucket: "Consumables",    available: 2,   reserved: 5,  minLevel: 20,  unit: "pcs" },
//   { id: 4, name: "Steel Bolt M12x50",      bucket: "Fasteners",      available: 340, reserved: 80, minLevel: 200, unit: "pcs" },
//   { id: 5, name: "PVC Pipe 32mm",          bucket: "Plumbing",       available: 60,  reserved: 10, minLevel: 50,  unit: "m" },
//   { id: 6, name: "Hydraulic Oil 46",       bucket: "Lubricants",     available: 8,   reserved: 4,  minLevel: 30,  unit: "ltr" },
//   { id: 7, name: "Circuit Breaker 32A",    bucket: "Electrical",     available: 15,  reserved: 6,  minLevel: 10,  unit: "pcs" },
//   { id: 8, name: "Gasket Sheet 3mm",       bucket: "Seals & Gaskets",available: 110, reserved: 20, minLevel: 50,  unit: "pcs" },
//   { id: 9, name: "Allen Key Set 8pc",      bucket: "Tools",          available: 22,  reserved: 5,  minLevel: 10,  unit: "set" },
//   { id: 10, name: "Safety Gloves L",       bucket: "Safety",         available: 9,   reserved: 0,  minLevel: 25,  unit: "pair" },
// ];

// export const LOW_STOCK = SKUS.filter(s => s.available < s.minLevel);

// export const WORK_ORDERS = [
//   { id: "WO-2024-0041", customer: "Tata Steel Ltd.",     qty: 150, item: "Steel Bolt M12x50",    status: "pending",  dueDate: "2026-02-20" },
//   { id: "WO-2024-0042", customer: "Larsen & Toubro",     qty: 40,  item: "Bearing 6205-ZZ",      status: "prepared", dueDate: "2026-02-18" },
//   { id: "WO-2024-0043", customer: "Bharat Petroleum",    qty: 20,  item: "Hydraulic Oil 46",      status: "pending",  dueDate: "2026-02-19" },
//   { id: "WO-2024-0044", customer: "Reliance Industries", qty: 200, item: "PVC Pipe 32mm",         status: "dispatched",dueDate: "2026-02-17" },
//   { id: "WO-2024-0045", customer: "ONGC",                qty: 10,  item: "Circuit Breaker 32A",   status: "pending",  dueDate: "2026-02-21" },
// ];

// export const CHALLANS = [
//   { id: "CH-2024-0892", customer: "Tata Steel Ltd.",     amount: 124500, dueDate: "2026-02-14", daysLeft: -3,  status: "overdue",  invoiceNo: "APX-INV-1044" },
//   { id: "CH-2024-0893", customer: "Larsen & Toubro",     amount: 88200,  dueDate: "2026-02-19", daysLeft: 2,   status: "due_soon", invoiceNo: "APX-INV-1045" },
//   { id: "CH-2024-0894", customer: "Bharat Petroleum",    amount: 45000,  dueDate: "2026-02-25", daysLeft: 8,   status: "pending",  invoiceNo: "APX-INV-1046" },
//   { id: "CH-2024-0895", customer: "Reliance Industries", amount: 210000, dueDate: "2026-03-01", daysLeft: 12,  status: "pending",  invoiceNo: "APX-INV-1047" },
//   { id: "CH-2024-0896", customer: "ONGC",                amount: 67800,  dueDate: "2026-02-13", daysLeft: -4,  status: "overdue",  invoiceNo: "APX-INV-1048" },
// ];

// export const DISPATCHES = [
//   { id: "DSP-0041", workOrder: "WO-2024-0041", customer: "Tata Steel Ltd.",     item: "Steel Bolt M12x50",  qty: 150, status: "pending",   preparedBy: null },
//   { id: "DSP-0042", workOrder: "WO-2024-0042", customer: "Larsen & Toubro",     item: "Bearing 6205-ZZ",    qty: 40,  status: "prepared",  preparedBy: "Rajesh M." },
//   { id: "DSP-0043", workOrder: "WO-2024-0043", customer: "Bharat Petroleum",    item: "Hydraulic Oil 46",   qty: 20,  status: "pending",   preparedBy: null },
//   { id: "DSP-0044", workOrder: "WO-2024-0044", customer: "Reliance Industries", item: "PVC Pipe 32mm",      qty: 200, status: "dispatched",preparedBy: "Suresh K." },
//   { id: "DSP-0045", workOrder: "WO-2024-0045", customer: "ONGC",                item: "Circuit Breaker 32A",qty: 10,  status: "pending",   preparedBy: null },
// ];

// export const STOCK_LEDGER = [
//   { date: "2026-02-17", sku: "Bearing 6205-ZZ",       type: "OUT", qty: 10, balance: 4,  ref: "WO-2024-0038", by: "Rajesh M." },
//   { date: "2026-02-16", sku: "Bearing 6205-ZZ",       type: "IN",  qty: 5,  balance: 14, ref: "PO-2024-0122", by: "System" },
//   { date: "2026-02-15", sku: "Copper Wire 1.5mm",      type: "OUT", qty: 20, balance: 12, ref: "WO-2024-0036", by: "Priya N." },
//   { date: "2026-02-15", sku: "Steel Bolt M12x50",      type: "IN",  qty: 100,balance: 340,ref: "PO-2024-0121", by: "System" },
//   { date: "2026-02-14", sku: "Industrial Filter FX-90",type: "OUT", qty: 8,  balance: 2,  ref: "WO-2024-0034", by: "Rajesh M." },
// ];

// ─────────────────────────────────────────────
// STORE MANAGER — Mock Data (Updated with Returns Module)
// ─────────────────────────────────────────────

export const SKUS = [{
    id: 1,
    name: "Bearing 6205-ZZ",
    bucket: "Mechanical",
    available: 4,
    reserved: 20,
    minLevel: 50,
    unit: "pcs"
  },
  {
    id: 2,
    name: "Copper Wire 1.5mm",
    bucket: "Electrical",
    available: 12,
    reserved: 30,
    minLevel: 100,
    unit: "m"
  },
  {
    id: 3,
    name: "Industrial Filter FX-90",
    bucket: "Consumables",
    available: 2,
    reserved: 5,
    minLevel: 20,
    unit: "pcs"
  },
  {
    id: 4,
    name: "Steel Bolt M12x50",
    bucket: "Fasteners",
    available: 340,
    reserved: 80,
    minLevel: 200,
    unit: "pcs"
  },
  {
    id: 5,
    name: "PVC Pipe 32mm",
    bucket: "Plumbing",
    available: 60,
    reserved: 10,
    minLevel: 50,
    unit: "m"
  },
  {
    id: 6,
    name: "Hydraulic Oil 46",
    bucket: "Lubricants",
    available: 8,
    reserved: 4,
    minLevel: 30,
    unit: "ltr"
  },
  {
    id: 7,
    name: "Circuit Breaker 32A",
    bucket: "Electrical",
    available: 15,
    reserved: 6,
    minLevel: 10,
    unit: "pcs"
  },
  {
    id: 8,
    name: "Gasket Sheet 3mm",
    bucket: "Seals & Gaskets",
    available: 110,
    reserved: 20,
    minLevel: 50,
    unit: "pcs"
  },
  {
    id: 9,
    name: "Allen Key Set 8pc",
    bucket: "Tools",
    available: 22,
    reserved: 5,
    minLevel: 10,
    unit: "set"
  },
  {
    id: 10,
    name: "Safety Gloves L",
    bucket: "Safety",
    available: 9,
    reserved: 0,
    minLevel: 25,
    unit: "pair"
  },
  {
    id: 11,
    name: "Pipes",
    bucket: "plumbing",
    available: 6,
    reserved: 0,
    minLevel: 10,
    unit: "m"
  },
];

export const LOW_STOCK = SKUS.filter(s => s.available < s.minLevel);

export const WORK_ORDERS = [{
    id: "WO-2024-0041",
    customer: "Tata Steel Ltd.",
    qty: 150,
    item: "Steel Bolt M12x50",
    status: "pending",
    dueDate: "2026-02-20"
  },
  {
    id: "WO-2024-0042",
    customer: "Larsen & Toubro",
    qty: 40,
    item: "Bearing 6205-ZZ",
    status: "prepared",
    dueDate: "2026-02-18"
  },
  {
    id: "WO-2024-0043",
    customer: "Bharat Petroleum",
    qty: 20,
    item: "Hydraulic Oil 46",
    status: "pending",
    dueDate: "2026-02-19"
  },
  {
    id: "WO-2024-0044",
    customer: "Reliance Industries",
    qty: 200,
    item: "PVC Pipe 32mm",
    status: "dispatched",
    dueDate: "2026-02-17"
  },
  {
    id: "WO-2024-0045",
    customer: "ONGC",
    qty: 10,
    item: "Circuit Breaker 32A",
    status: "pending",
    dueDate: "2026-02-21"
  },
];

export const CHALLANS = [{
    id: "CH-2024-0892",
    customer: "Tata Steel Ltd.",
    amount: 124500,
    dueDate: "2026-02-14",
    daysLeft: -3,
    status: "overdue",
    invoiceNo: "APX-INV-1044"
  },
  {
    id: "CH-2024-0893",
    customer: "Larsen & Toubro",
    amount: 88200,
    dueDate: "2026-02-19",
    daysLeft: 2,
    status: "due_soon",
    invoiceNo: "APX-INV-1045"
  },
  {
    id: "CH-2024-0894",
    customer: "Bharat Petroleum",
    amount: 45000,
    dueDate: "2026-02-25",
    daysLeft: 8,
    status: "pending",
    invoiceNo: "APX-INV-1046"
  },
  {
    id: "CH-2024-0895",
    customer: "Reliance Industries",
    amount: 210000,
    dueDate: "2026-03-01",
    daysLeft: 12,
    status: "pending",
    invoiceNo: "APX-INV-1047"
  },
  {
    id: "CH-2024-0896",
    customer: "ONGC",
    amount: 67800,
    dueDate: "2026-02-13",
    daysLeft: -4,
    status: "overdue",
    invoiceNo: "APX-INV-1048"
  },
];

export const DISPATCHES = [{
    id: "DSP-0041",
    workOrder: "WO-2024-0041",
    customer: "Tata Steel Ltd.",
    item: "Steel Bolt M12x50",
    qty: 150,
    status: "pending",
    preparedBy: null
  },
  {
    id: "DSP-0042",
    workOrder: "WO-2024-0042",
    customer: "Larsen & Toubro",
    item: "Bearing 6205-ZZ",
    qty: 40,
    status: "prepared",
    preparedBy: "Rajesh M."
  },
  {
    id: "DSP-0043",
    workOrder: "WO-2024-0043",
    customer: "Bharat Petroleum",
    item: "Hydraulic Oil 46",
    qty: 20,
    status: "pending",
    preparedBy: null
  },
  {
    id: "DSP-0044",
    workOrder: "WO-2024-0044",
    customer: "Reliance Industries",
    item: "PVC Pipe 32mm",
    qty: 200,
    status: "dispatched",
    preparedBy: "Suresh K."
  },
  {
    id: "DSP-0045",
    workOrder: "WO-2024-0045",
    customer: "ONGC",
    item: "Circuit Breaker 32A",
    qty: 10,
    status: "pending",
    preparedBy: null
  },
];

export const STOCK_LEDGER = [{
    date: "2026-02-17",
    sku: "Bearing 6205-ZZ",
    type: "OUT",
    qty: 10,
    balance: 4,
    ref: "WO-2024-0038",
    by: "Rajesh M."
  },
  {
    date: "2026-02-16",
    sku: "Bearing 6205-ZZ",
    type: "IN",
    qty: 5,
    balance: 14,
    ref: "PO-2024-0122",
    by: "System"
  },
  {
    date: "2026-02-15",
    sku: "Copper Wire 1.5mm",
    type: "OUT",
    qty: 20,
    balance: 12,
    ref: "WO-2024-0036",
    by: "Priya N."
  },
  {
    date: "2026-02-15",
    sku: "Steel Bolt M12x50",
    type: "IN",
    qty: 100,
    balance: 340,
    ref: "PO-2024-0121",
    by: "System"
  },
  {
    date: "2026-02-14",
    sku: "Industrial Filter FX-90",
    type: "OUT",
    qty: 8,
    balance: 2,
    ref: "WO-2024-0034",
    by: "Rajesh M."
  },
];

// ─────────────────────────────────────────────
// NEW: RETURNS & ADJUSTMENTS MODULE
// ─────────────────────────────────────────────

export const CREDIT_NOTES = [{
    id: "CN-2024-0012",
    date: "2026-02-16",
    type: "customer_return",
    referenceDoc: "CH-2024-0890",
    customer: "Tata Steel Ltd.",
    sku: "Steel Bolt M12x50",
    qty: 25,
    reason: "Over-supplied in dispatch",
    amount: 12500,
    status: "approved",
    createdBy: "Store Manager",
    approvedBy: "Admin",
    notes: "Customer returned excess material in good condition",
  },
  {
    id: "CN-2024-0013",
    date: "2026-02-15",
    type: "supplier_return",
    referenceDoc: "PO-2024-0118",
    supplier: "SKF Bearings Ltd.",
    sku: "Bearing 6205-ZZ",
    qty: 10,
    reason: "Quality issue - surface rust detected",
    amount: 8500,
    status: "pending",
    createdBy: "Store Manager",
    approvedBy: null,
    notes: "Defective batch - needs replacement",
  },
  {
    id: "CN-2024-0014",
    date: "2026-02-14",
    type: "customer_return",
    referenceDoc: "CH-2024-0885",
    customer: "Larsen & Toubro",
    sku: "Circuit Breaker 32A",
    qty: 3,
    reason: "Wrong specification ordered",
    amount: 6750,
    status: "approved",
    createdBy: "Store Manager",
    approvedBy: "Admin",
    notes: "Customer mistakenly ordered 32A instead of 40A",
  },
];

export const DEBIT_NOTES = [{
    id: "DN-2024-0008",
    date: "2026-02-17",
    type: "supplier_shortage",
    referenceDoc: "PO-2024-0121",
    supplier: "ABC Steel Suppliers",
    sku: "Steel Bolt M12x50",
    orderedQty: 100,
    receivedQty: 95,
    shortageQty: 5,
    amount: 2500,
    status: "raised",
    createdBy: "Store Manager",
    notes: "Short supply in purchase order - 5 units missing",
  },
  {
    id: "DN-2024-0009",
    date: "2026-02-16",
    type: "supplier_damaged",
    referenceDoc: "PO-2024-0119",
    supplier: "PVC Industries",
    sku: "PVC Pipe 32mm",
    orderedQty: 50,
    receivedQty: 50,
    damagedQty: 8,
    amount: 4800,
    status: "approved",
    createdBy: "Store Manager",
    notes: "8 pipes arrived with cracks - marked as damaged",
  },
  {
    id: "DN-2024-0010",
    date: "2026-02-13",
    type: "supplier_quality",
    referenceDoc: "PO-2024-0115",
    supplier: "Filter Technologies",
    sku: "Industrial Filter FX-90",
    orderedQty: 20,
    receivedQty: 20,
    rejectedQty: 4,
    amount: 8000,
    status: "approved",
    createdBy: "Store Manager",
    notes: "Quality check failed - filters not meeting specs",
  },
];

export const DAMAGED_GOODS = [{
    id: "DMG-2024-0021",
    date: "2026-02-17",
    sku: "Bearing 6205-ZZ",
    qty: 2,
    location: "Warehouse A - Rack 12",
    reason: "Handling damage during internal movement",
    reportedBy: "Rajesh M.",
    status: "written_off",
    disposalMethod: "Scrap sale",
    estimatedLoss: 1700,
    notes: "Dropped during forklift operation",
  },
  {
    id: "DMG-2024-0022",
    date: "2026-02-16",
    sku: "PVC Pipe 32mm",
    qty: 8,
    location: "Receiving Area",
    reason: "Received damaged from supplier",
    reportedBy: "Store Manager",
    status: "pending_supplier_claim",
    disposalMethod: null,
    estimatedLoss: 4800,
    notes: "Linked to DN-2024-0009 - supplier claim in progress",
  },
  {
    id: "DMG-2024-0023",
    date: "2026-02-15",
    sku: "Safety Gloves L",
    qty: 5,
    location: "Warehouse B - Safety Section",
    reason: "Water damage - roof leak",
    reportedBy: "Suresh K.",
    status: "written_off",
    disposalMethod: "Disposed",
    estimatedLoss: 750,
    notes: "Contaminated due to water seepage - unusable",
  },
  {
    id: "DMG-2024-0024",
    date: "2026-02-14",
    sku: "Hydraulic Oil 46",
    qty: 2,
    location: "Storage Tank Area",
    reason: "Container leak - oil spilled",
    reportedBy: "Priya N.",
    status: "written_off",
    disposalMethod: "Hazmat disposal",
    estimatedLoss: 3600,
    notes: "Defective container seal - 2 liters lost",
  },
  {
    id: "DMG-2024-0025",
    date: "2026-02-12",
    sku: "Gasket Sheet 3mm",
    qty: 12,
    location: "Warehouse A - Rack 8",
    reason: "Expired stock - passed shelf life",
    reportedBy: "Store Manager",
    status: "under_review",
    disposalMethod: null,
    estimatedLoss: 2400,
    notes: "Quality check flagged - awaiting disposal approval",
  },
];

// Dropdown options
export const RETURN_REASONS = [
  "Over-supplied in dispatch",
  "Wrong specification ordered",
  "Quality issue detected",
  "Customer cancellation",
  "Duplicate order",
  "Damaged during transit",
  "Other",
];

export const DAMAGE_REASONS = [
  "Handling damage during internal movement",
  "Received damaged from supplier",
  "Water damage",
  "Fire damage",
  "Expired stock",
  "Quality deterioration",
  "Container/packaging failure",
  "Theft/pilferage",
  "Other",
];

export const DISPOSAL_METHODS = [
  "Scrap sale",
  "Disposed",
  "Hazmat disposal",
  "Return to supplier",
  "Donated",
  "Recycled",
];