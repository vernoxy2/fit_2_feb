// ═══════════════════════════════════════════════════════════════════
// PURCHASE ORDERS & INVOICES — Mock Data with Receipt History
// ═══════════════════════════════════════════════════════════════════

export const SUPPLIERS = [
  { id: 1, name: "SKF Bearings Ltd.", contact: "+91 98765 11111", email: "orders@skf.in" },
  { id: 2, name: "ABC Steel Suppliers", contact: "+91 98765 22222", email: "sales@abcsteel.com" },
  { id: 3, name: "PVC Industries", contact: "+91 98765 33333", email: "purchase@pvcindustries.in" },
  { id: 4, name: "Filter Technologies", contact: "+91 98765 44444", email: "orders@filtertech.com" },
  { id: 5, name: "Copper Wire Co.", contact: "+91 98765 55555", email: "sales@copperwire.in" },
];

export const PURCHASE_ORDERS = [
  // ── COMPLETED PO (Exact Match) ────────────────────────────────────
  {
    id: "PO-2024-0121",
    date: "2026-02-10",
    supplier: "ABC Steel Suppliers",
    supplierContact: "+91 98765 22222",
    expectedDelivery: "2026-02-15",
    status: "completed",
    totalAmount: 125000,
    mismatchFlag: false,
    acknowledgementRequired: false,
    items: [
      {
        sku: "Steel Bolt M12x50",
        description: "Hex head bolt with nut",
        orderedQty: 100,
        receivedQty: 100,
        pendingQty: 0,
        unit: "pcs",
        unitPrice: 500,
        totalPrice: 50000,
      },
      {
        sku: "Gasket Sheet 3mm",
        description: "Non-asbestos gasket sheet",
        orderedQty: 150,
        receivedQty: 150,
        pendingQty: 0,
        unit: "pcs",
        unitPrice: 500,
        totalPrice: 75000,
      },
    ],
    receiptHistory: [
      {
        invoiceNumber: "INV-2024-5501",
        invoiceDate: "2026-02-15",
        uploadedDate: "2026-02-15",
        receivedItems: [
          { sku: "Steel Bolt M12x50", qty: 100, mismatch: "exact" },
          { sku: "Gasket Sheet 3mm", qty: 150, mismatch: "exact" },
        ],
        status: "completed",
        acknowledgedBy: "Store Manager",
      },
    ],
  },

  // ── PARTIALLY RECEIVED PO (Short Supply) ──────────────────────────
  {
    id: "PO-2024-0122",
    date: "2026-02-12",
    supplier: "SKF Bearings Ltd.",
    supplierContact: "+91 98765 11111",
    expectedDelivery: "2026-02-18",
    status: "partially_received",
    totalAmount: 85000,
    mismatchFlag: true,
    acknowledgementRequired: true,
    items: [
      {
        sku: "Bearing 6205-ZZ",
        description: "Deep groove ball bearing",
        orderedQty: 100,
        receivedQty: 85,
        pendingQty: 15,
        unit: "pcs",
        unitPrice: 850,
        totalPrice: 85000,
      },
    ],
    receiptHistory: [
      {
        invoiceNumber: "INV-2024-5502",
        invoiceDate: "2026-02-17",
        uploadedDate: "2026-02-17",
        receivedItems: [
          { sku: "Bearing 6205-ZZ", qty: 85, mismatch: "short" },
        ],
        status: "partially_received",
        acknowledgedBy: "Store Manager",
        notes: "Supplier confirmed remaining 15 units will be delivered by 2026-02-22",
      },
    ],
  },

  // ── PENDING PO (Not Yet Received) ─────────────────────────────────
  {
    id: "PO-2024-0123",
    date: "2026-02-14",
    supplier: "PVC Industries",
    supplierContact: "+91 98765 33333",
    expectedDelivery: "2026-02-20",
    status: "ordered",
    totalAmount: 30000,
    mismatchFlag: false,
    acknowledgementRequired: false,
    items: [
      {
        sku: "PVC Pipe 32mm",
        description: "Schedule 40 PVC pipe",
        orderedQty: 50,
        receivedQty: 0,
        pendingQty: 50,
        unit: "m",
        unitPrice: 600,
        totalPrice: 30000,
      },
    ],
    receiptHistory: [],
  },

  // ── OVER SUPPLY EXAMPLE (For Demo) ────────────────────────────────
  {
    id: "PO-2024-0124",
    date: "2026-02-13",
    supplier: "Filter Technologies",
    supplierContact: "+91 98765 44444",
    expectedDelivery: "2026-02-19",
    status: "ordered",
    totalAmount: 40000,
    mismatchFlag: false,
    acknowledgementRequired: false,
    items: [
      {
        sku: "Industrial Filter FX-90",
        description: "High efficiency filter",
        orderedQty: 20,
        receivedQty: 0,
        pendingQty: 20,
        unit: "pcs",
        unitPrice: 2000,
        totalPrice: 40000,
      },
    ],
    receiptHistory: [],
  },

  // ── MULTI-ITEM PO (Mixed Mismatch Scenario) ───────────────────────
  {
    id: "PO-2024-0125",
    date: "2026-02-11",
    supplier: "Copper Wire Co.",
    supplierContact: "+91 98765 55555",
    expectedDelivery: "2026-02-17",
    status: "ordered",
    totalAmount: 96000,
    mismatchFlag: false,
    acknowledgementRequired: false,
    items: [
      {
        sku: "Copper Wire 1.5mm",
        description: "Single core copper conductor",
        orderedQty: 200,
        receivedQty: 0,
        pendingQty: 200,
        unit: "m",
        unitPrice: 180,
        totalPrice: 36000,
      },
      {
        sku: "Circuit Breaker 32A",
        description: "MCB single pole",
        orderedQty: 40,
        receivedQty: 0,
        pendingQty: 40,
        unit: "pcs",
        unitPrice: 1500,
        totalPrice: 60000,
      },
    ],
    receiptHistory: [],
  },
];

export const PO_STATUSES = {
  ordered: { label: "Ordered", color: "amber" },
  partially_received: { label: "Partially Received", color: "blue" },
  completed: { label: "Completed", color: "emerald" },
  cancelled: { label: "Cancelled", color: "red" },
};

export const MISMATCH_TYPES = {
  exact: { label: "Exact Match", color: "emerald", icon: "✓" },
  short: { label: "Short Supply", color: "amber", icon: "⚠" },
  excess: { label: "Over Supply", color: "red", icon: "!" },
};

// Validation helper functions
export const validateInvoiceItems = (poItems, invoiceItems) => {
  const mismatches = [];
  
  poItems.forEach(poItem => {
    const invoiceItem = invoiceItems.find(item => item.sku === poItem.sku);
    
    if (!invoiceItem) {
      mismatches.push({
        sku: poItem.sku,
        description: poItem.description,
        orderedQty: poItem.orderedQty,
        receivedQty: 0,
        difference: -poItem.orderedQty,
        type: "short",
        pendingQty: poItem.orderedQty,
      });
      return;
    }
    
    const diff = invoiceItem.qty - poItem.orderedQty;
    
    if (diff === 0) {
      mismatches.push({
        sku: poItem.sku,
        description: poItem.description,
        orderedQty: poItem.orderedQty,
        receivedQty: invoiceItem.qty,
        difference: 0,
        type: "exact",
        pendingQty: 0,
      });
    } else if (diff < 0) {
      mismatches.push({
        sku: poItem.sku,
        description: poItem.description,
        orderedQty: poItem.orderedQty,
        receivedQty: invoiceItem.qty,
        difference: diff,
        type: "short",
        pendingQty: Math.abs(diff),
      });
    } else {
      mismatches.push({
        sku: poItem.sku,
        description: poItem.description,
        orderedQty: poItem.orderedQty,
        receivedQty: invoiceItem.qty,
        difference: diff,
        type: "excess",
        pendingQty: 0,
      });
    }
  });
  
  return mismatches;
};

export const getOverallMismatchType = (mismatches) => {
  const hasExcess = mismatches.some(m => m.type === "excess");
  const hasShort = mismatches.some(m => m.type === "short");
  const allExact = mismatches.every(m => m.type === "exact");
  
  if (allExact) return "exact";
  if (hasExcess) return "excess"; // Excess is highest priority
  if (hasShort) return "short";
  return "mixed";
};
