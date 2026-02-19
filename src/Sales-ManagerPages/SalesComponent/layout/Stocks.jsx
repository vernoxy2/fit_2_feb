import { useState, useMemo } from "react";
import {
  FiSearch, FiEye, FiClock, FiFilter,
  FiArrowUp, FiArrowDown, FiAlertCircle,
} from "react-icons/fi";
import { StatusBadge, Card, CardHeader, Modal, SearchInput } from "../StoreComponent/ui/index";
import { SKUS, STOCK_LEDGER } from "../data/mockData";

const BUCKETS = ["All", ...new Set(SKUS.map(s => s.bucket))];

export default function Stocks() {
  const [search, setSearch]       = useState("");
  const [bucket, setBucket]       = useState("All");
  const [filterLow, setFilterLow] = useState(false);
  const [ledgerItem, setLedgerItem] = useState(null);

  const filtered = useMemo(() => {
    return SKUS.filter(s => {
      const matchSearch = s.name.toLowerCase().includes(search.toLowerCase());
      const matchBucket = bucket === "All" || s.bucket === bucket;
      const matchLow    = !filterLow || s.available < s.minLevel;
      return matchSearch && matchBucket && matchLow;
    });
  }, [search, bucket, filterLow]);

  const itemLedger = ledgerItem
    ? STOCK_LEDGER.filter(l => l.sku === ledgerItem.name)
    : [];

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-black text-slate-800 tracking-tight">Stock Management</h2>
        <p className="text-xs text-slate-400 mt-0.5">{SKUS.length} total SKUs registered</p>
      </div>

      {/* ── FILTERS ── */}
      <Card>
        <div className="px-5 py-4 flex flex-wrap items-center gap-3">
          <div className="flex-1 min-w-[180px] max-w-xs">
            <SearchInput
              placeholder="Search SKU name..."
              value={search}
              onChange={setSearch}
              icon={FiSearch}
            />
          </div>
          <div className="flex items-center gap-2">
            <FiFilter size={14} className="text-slate-400" />
            <select
              value={bucket}
              onChange={e => setBucket(e.target.value)}
              className="border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
            >
              {BUCKETS.map(b => <option key={b}>{b}</option>)}
            </select>
          </div>
          <button
            onClick={() => setFilterLow(!filterLow)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold border transition-all ${filterLow ? "bg-red-500 text-white border-red-500" : "bg-white text-slate-600 border-slate-200 hover:border-red-300 hover:text-red-600"}`}
          >
            <FiAlertCircle size={13} /> Low Stock Only
          </button>
          <span className="ml-auto text-xs text-slate-400 font-medium">{filtered.length} results</span>
        </div>
      </Card>

      {/* ── STOCK TABLE ── */}
      <Card>
        <CardHeader title="All Stock Items" subtitle="Click ledger icon to view movement history" />
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                <th className="px-5 py-3 text-left">SKU Name</th>
                <th className="px-4 py-3 text-left">Bucket</th>
                <th className="px-4 py-3 text-center">Available</th>
                <th className="px-4 py-3 text-center">Reserved</th>
                <th className="px-4 py-3 text-center">Min Level</th>
                <th className="px-4 py-3 text-center">Unit</th>
                <th className="px-4 py-3 text-center">Status</th>
                <th className="px-4 py-3 text-center">Ledger</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.map(item => {
                const isLow = item.available < item.minLevel;
                return (
                  <tr
                    key={item.id}
                    className={`hover:bg-slate-50/60 transition-colors ${isLow ? "bg-red-50/10" : ""}`}
                  >
                    <td className="px-5 py-3.5 font-semibold text-slate-800">{item.name}</td>
                    <td className="px-4 py-3.5">
                      <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-medium">
                        {item.bucket}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-center">
                      <span className={`font-bold text-sm ${isLow ? "text-red-600" : "text-slate-700"}`}>
                        {item.available}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-center text-amber-600 font-semibold">{item.reserved}</td>
                    <td className="px-4 py-3.5 text-center text-slate-500">{item.minLevel}</td>
                    <td className="px-4 py-3.5 text-center text-xs text-slate-400 uppercase">{item.unit}</td>
                    <td className="px-4 py-3.5 text-center">
                      <StatusBadge status={isLow ? "low" : "ok"} />
                    </td>
                    <td className="px-4 py-3.5 text-center">
                      <button
                        onClick={() => setLedgerItem(item)}
                        className="flex items-center gap-1 mx-auto text-teal-600 hover:text-teal-800 text-xs font-semibold bg-teal-50 hover:bg-teal-100 px-2.5 py-1.5 rounded-lg transition-colors"
                      >
                        <FiEye size={12} /> View
                      </button>
                    </td>
                  </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr><td colSpan={8} className="text-center py-12 text-slate-400 text-sm">No items match your search</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* ── LEDGER MODAL ── */}
      {ledgerItem && (
        <Modal
          title={`Stock Ledger — ${ledgerItem.name}`}
          onClose={() => setLedgerItem(null)}
          size="lg"
        >
          <div className="space-y-4">
            {/* Item summary */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "Available", value: ledgerItem.available, color: ledgerItem.available < ledgerItem.minLevel ? "text-red-600" : "text-teal-600" },
                { label: "Reserved",  value: ledgerItem.reserved,  color: "text-amber-600" },
                { label: "Min Level", value: ledgerItem.minLevel,   color: "text-slate-700" },
              ].map(({ label, value, color }) => (
                <div key={label} className="bg-slate-50 rounded-lg p-3 text-center">
                  <p className="text-[10px] text-slate-400 uppercase font-bold">{label}</p>
                  <p className={`text-2xl font-black mt-0.5 ${color}`}>{value}</p>
                </div>
              ))}
            </div>

            {/* Movement history */}
            <div>
              <p className="text-xs font-bold text-slate-600 mb-2 flex items-center gap-1.5">
                <FiClock size={13} /> Movement History
              </p>
              {itemLedger.length > 0 ? (
                <div className="space-y-2">
                  {itemLedger.map((l, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-lg border border-slate-100 hover:bg-slate-50">
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${l.type === "IN" ? "bg-emerald-100" : "bg-red-100"}`}>
                        {l.type === "IN"
                          ? <FiArrowDown size={13} className="text-emerald-600" />
                          : <FiArrowUp   size={13} className="text-red-600" />
                        }
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className={`text-xs font-bold ${l.type === "IN" ? "text-emerald-600" : "text-red-600"}`}>
                            {l.type} {l.qty} units
                          </span>
                          <span className="text-[10px] text-slate-400">· Ref: {l.ref}</span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-0.5">Balance: {l.balance} · By: {l.by}</p>
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono whitespace-nowrap">{l.date}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-slate-400">
                  <FiClock size={24} className="mx-auto mb-2 opacity-40" />
                  <p className="text-sm">No movement records found</p>
                </div>
              )}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
