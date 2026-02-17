// ─────────────────────────────────────────────
// MOCK DATA — ERP Master Admin Panel
// ─────────────────────────────────────────────

export const COMPANIES = {
  A: {
    id: "A", name: "Apex Manufacturing Pvt. Ltd.", code: "APX",
    gstin: "27AAPFU0939F1ZV", currency: "INR", region: "North India",
    invoicePrefix: "APX-INV", challPrefix: "APX-CH",
    totalSKUs: 1480, lowStock: 34, reserved: 210,
    pendingDispatch: 12, overdueInvoices: 8,
    color: "#4F46E5",
  },
  B: {
    id: "B", name: "Meridian Traders Ltd.", code: "MRD",
    gstin: "29AABCT1332L1ZH", currency: "INR", region: "West India",
    invoicePrefix: "MRD-INV", challPrefix: "MRD-CH",
    totalSKUs: 1020, lowStock: 57, reserved: 145,
    pendingDispatch: 19, overdueInvoices: 14,
    color: "#0891b2",
  },
};

export const BUCKETS = [
  { id: 1, name: "Electronics",    companyA: 320, companyB: 210, lowA: 6,  lowB: 12, status: "active" },
  { id: 2, name: "Mechanical",     companyA: 280, companyB: 190, lowA: 8,  lowB: 18, status: "active" },
  { id: 3, name: "Consumables",    companyA: 240, companyB: 175, lowA: 5,  lowB: 9,  status: "active" },
  { id: 4, name: "Packaging",      companyA: 190, companyB: 145, lowA: 3,  lowB: 7,  status: "active" },
  { id: 5, name: "Raw Material",   companyA: 210, companyB: 160, lowA: 7,  lowB: 6,  status: "active" },
  { id: 6, name: "Finished Goods", companyA: 150, companyB: 90,  lowA: 4,  lowB: 4,  status: "active" },
  { id: 7, name: "Spares",         companyA: 90,  companyB: 50,  lowA: 1,  lowB: 1,  status: "inactive" },
];

export const USERS = [
  { id: 1, name: "Rajesh Mehta",   email: "rajesh@apex.in",     role: "Company Admin",    company: "A", status: "active",   lastLogin: "Today, 09:12" },
  { id: 2, name: "Priya Nair",     email: "priya@apex.in",      role: "Stock Manager",    company: "A", status: "active",   lastLogin: "Today, 11:45" },
  { id: 3, name: "Vikram Singh",   email: "vikram@meridian.in", role: "Invoice Manager",  company: "B", status: "active",   lastLogin: "Yesterday" },
  { id: 4, name: "Anita Sharma",   email: "anita@meridian.in",  role: "Dispatch Manager", company: "B", status: "disabled", lastLogin: "3 days ago" },
  { id: 5, name: "Suresh Kumar",   email: "suresh@apex.in",     role: "Reports Viewer",   company: "A", status: "active",   lastLogin: "Today, 08:30" },
  { id: 6, name: "Meera Joshi",    email: "meera@meridian.in",  role: "Stock Manager",    company: "B", status: "active",   lastLogin: "2 hrs ago" },
];

export const NOTIFICATIONS = [
  { id: 1, type: "invoice",  severity: "warning",  company: "APX", message: "Challan #APX-CH-0892 overdue by 3 days — ₹1,24,500", time: "10 min ago" },
  { id: 2, type: "stock",    severity: "critical", company: "MRD", message: "Bearing 6205-ZZ: Only 4 units remaining (min: 50)", time: "22 min ago" },
  { id: 3, type: "stock",    severity: "critical", company: "MRD", message: "Copper Wire 1.5mm: Below reorder level — 12 units left", time: "45 min ago" },
  { id: 4, type: "invoice",  severity: "warning",  company: "APX", message: "Challan #APX-CH-0887 pending approval for 48h", time: "1 hr ago" },
  { id: 5, type: "dispatch", severity: "info",     company: "APX", message: "Order #ORD-4421 dispatched — ₹88,200", time: "2 hr ago" },
  { id: 6, type: "stock",    severity: "critical", company: "APX", message: "Industrial Filter FX-90: Stock critically low — 2 units", time: "3 hr ago" },
];

export const ROLES = [
  { role: "Company Admin",    stockAccess: true,  poApproval: true,  invoiceCreation: true,  dispatch: true,  reports: true  },
  { role: "Stock Manager",    stockAccess: true,  poApproval: false, invoiceCreation: false, dispatch: false, reports: true  },
  { role: "Invoice Manager",  stockAccess: false, poApproval: false, invoiceCreation: true,  dispatch: false, reports: true  },
  { role: "Dispatch Manager", stockAccess: false, poApproval: false, invoiceCreation: false, dispatch: true,  reports: false },
  { role: "Reports Viewer",   stockAccess: false, poApproval: false, invoiceCreation: false, dispatch: false, reports: true  },
];
