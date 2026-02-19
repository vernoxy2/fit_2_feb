import { useState, useEffect } from "react";
import { FiSearch, FiX } from "react-icons/fi";
import { PRODUCT_CATALOG, PRODUCT_CATEGORIES, searchProducts } from "../data/productCatalog";

export default function ProductCodeSelector({ onSelect, onClose }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [filtered, setFiltered] = useState(PRODUCT_CATALOG);

  useEffect(() => {
    let results = PRODUCT_CATALOG;
    
    // Filter by category
    if (selectedCategory !== "all") {
      results = results.filter(p => p.category === selectedCategory);
    }
    
    // Filter by search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      results = results.filter(
        p => p.code.toLowerCase().includes(q) || 
             p.description.toLowerCase().includes(q)
      );
    }
    
    setFiltered(results);
  }, [searchQuery, selectedCategory]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 flex-shrink-0">
          <h3 className="text-sm font-bold text-slate-800">Select Product Code</h3>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <FiX size={16} />
          </button>
        </div>

        {/* Search & Filter */}
        <div className="px-6 py-4 border-b border-slate-100 space-y-3 flex-shrink-0">
          {/* Search */}
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search by code or description..."
              className="w-full border border-slate-200 rounded-lg pl-10 pr-4 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              autoFocus
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-3 py-1 text-xs font-bold rounded-lg transition-colors ${
                selectedCategory === "all"
                  ? "bg-indigo-600 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              All ({PRODUCT_CATALOG.length})
            </button>
            {PRODUCT_CATEGORIES.map(cat => {
              const count = PRODUCT_CATALOG.filter(p => p.category === cat).length;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 text-xs font-bold rounded-lg transition-colors ${
                    selectedCategory === cat
                      ? "bg-indigo-600 text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {cat} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* Results */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {filtered.length === 0 ? (
            <div className="text-center py-12 text-slate-400">
              <FiSearch size={48} className="mx-auto mb-3 opacity-40" />
              <p className="text-sm font-semibold">No products found</p>
              <p className="text-xs mt-1">Try a different search or category</p>
            </div>
          ) : (
            <div className="space-y-2">
              {filtered.map((product) => (
                <button
                  key={product.code}
                  onClick={() => onSelect(product)}
                  className="w-full text-left p-3 border border-slate-200 rounded-lg hover:border-indigo-400 hover:bg-indigo-50 transition-all group"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-bold text-slate-800 font-mono">{product.code}</p>
                      <p className="text-xs text-slate-600 mt-0.5">{product.description}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1 ml-3">
                      <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-semibold">
                        {product.category}
                      </span>
                      <span className="text-[10px] text-slate-400 font-semibold">Unit: {product.unit}</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-100 flex-shrink-0 bg-slate-50">
          <p className="text-xs text-slate-500 text-center">
            Showing {filtered.length} of {PRODUCT_CATALOG.length} products
          </p>
        </div>
      </div>
    </div>
  );
}
