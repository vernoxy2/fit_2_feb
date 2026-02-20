import { useState } from "react";
import { FiSearch, FiPlus, FiPackage, FiEdit, FiTrash2 } from "react-icons/fi";
import { Card, CardHeader, StatusBadge, BtnPrimary, Select, Input, Modal } from "../SalesComponent/ui/index";
import { PRODUCT_CATALOG, PRODUCT_CATEGORIES, searchProducts, getCategoriesWithCounts } from "../data/productCatalog";

function KPICard({ label, value, icon: Icon, color }) {
  const colors = { indigo: "bg-indigo-600", emerald: "bg-emerald-500", amber: "bg-amber-500" };
  return (
    <Card className="p-5 flex items-start gap-4 hover:shadow-md transition-shadow">
      <div className={`w-10 h-10 rounded-xl ${colors[color]} flex items-center justify-center flex-shrink-0`}>
        <Icon className="text-white" size={18} />
      </div>
      <div>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{label}</p>
        <p className="text-2xl font-black text-slate-800">{value}</p>
      </div>
    </Card>
  );
}

export default function Products() {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [addModal, setAddModal] = useState(false);
  
  const filtered = PRODUCT_CATALOG.filter(p => {
    const matchCategory = categoryFilter === "all" || p.category === categoryFilter;
    const matchSearch = !searchQuery || 
      p.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });
  const categoriesWithCounts = getCategoriesWithCounts();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-black text-slate-800">Product Catalog</h2>
        <p className="text-xs text-slate-400 mt-0.5">Manage all product codes and descriptions</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-3 gap-4">
        <KPICard label="Total Products" value={PRODUCT_CATALOG.length} icon={FiPackage} color="indigo" />
        <KPICard label="Categories" value={PRODUCT_CATEGORIES.length} icon={FiPackage} color="emerald" />
        <KPICard label="Showing" value={filtered.length} icon={FiPackage} color="amber" />
      </div>

      {/* Search & Filters */}
      <Card>
        <div className="px-5 py-4 space-y-3">
          <div className="flex items-center gap-3">
            <div className="flex-1 relative">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search by product code or description..."
                className="w-full border border-slate-200 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <BtnPrimary onClick={() => setAddModal(true)}>
              <FiPlus size={14} /> Add Product
            </BtnPrimary>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setCategoryFilter("all")}
              className={`px-3 py-1 text-xs font-bold rounded-lg transition-colors ${
                categoryFilter === "all" ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              All ({PRODUCT_CATALOG.length})
            </button>
            {categoriesWithCounts.map(({ name, count }) => (
              <button
                key={name}
                onClick={() => setCategoryFilter(name)}
                className={`px-3 py-1 text-xs font-bold rounded-lg transition-colors ${
                  categoryFilter === name ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {name} ({count})
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* Products Table */}
      <Card>
        <CardHeader title="All Products" subtitle={`${filtered.length} products`} />
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                <th className="px-5 py-3 text-left">Product Code</th>
                <th className="px-4 py-3 text-left">Description</th>
                <th className="px-4 py-3 text-center">Category</th>
                <th className="px-4 py-3 text-center">Unit</th>
                <th className="px-4 py-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.map((product, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-3.5 font-mono text-xs font-bold text-slate-700">{product.code}</td>
                  <td className="px-4 py-3.5 text-xs text-slate-600">{product.description}</td>
                  <td className="px-4 py-3.5 text-center">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-indigo-50 text-indigo-700 border border-indigo-200">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-center font-semibold text-slate-700">{product.unit}</td>
                  <td className="px-4 py-3.5 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded transition-colors">
                        <FiEdit size={14} />
                      </button>
                      <button className="p-1.5 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded transition-colors">
                        <FiTrash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Add Product Modal */}
      {addModal && (
        <Modal title="Add New Product" onClose={() => setAddModal(false)}>
          <div className="space-y-4">
            <Input label="Product Code" required placeholder="e.g. PCH-50-10" />
            <Input label="Description" required placeholder="e.g. PPCH-FR COMPOSITE PIPE PN10 50MM" />
            <Select
              label="Category"
              required
              options={[{ value: "", label: "-- Select Category --" }, ...PRODUCT_CATEGORIES.map(c => ({ value: c, label: c }))]}
            />
            <Input label="Unit" required placeholder="e.g. m, pcs, roll" />
            <div className="flex justify-end gap-3 pt-3">
              <button
                onClick={() => setAddModal(false)}
                className="px-4 py-2 text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <BtnPrimary onClick={() => { alert("Product added!"); setAddModal(false); }}>
                <FiPlus size={12} /> Add Product
              </BtnPrimary>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
