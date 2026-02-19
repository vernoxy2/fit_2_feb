import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft, FiUpload, FiFile, FiX, FiCheckCircle, FiFileText, FiImage } from "react-icons/fi";

export default function UploadPurchaseOrder() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const [uploaded, setUploaded] = useState(false);

  const handleFile = (selected) => {
    if (!selected) return;
    const allowed = [
      "application/pdf",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "image/png", "image/jpeg", "image/jpg",
    ];
    if (!allowed.includes(selected.type)) {
      alert("Only PDF, Excel, or Image files are allowed.");
      return;
    }
    if (selected.size > 5 * 1024 * 1024) {
      alert("File size must be under 5MB.");
      return;
    }
    setFile(selected);
    setUploaded(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    handleFile(e.dataTransfer.files[0]);
  };

  const handleSubmit = () => {
    if (!file) return;
    setUploaded(true);
  };

  const getFileIcon = (f) => {
    if (!f) return <FiFile size={18} />;
    if (f.type.includes("image")) return <FiImage size={18} />;
    return <FiFileText size={18} />;
  };

  const getFileTypeLabel = (f) => {
    if (!f) return "";
    if (f.type.includes("pdf")) return "PDF";
    if (f.type.includes("image")) return "Image";
    return "Excel";
  };

  return (
    <div className="flex items-center justify-center px-4">
      <div className="w-full max-w-xl">
        {/* Back link */}
        <button
          onClick={() => navigate("/sales/purchase-orders")}
          className="flex items-center gap-1.5 text-slate-400 hover:text-indigo-600 transition-colors mb-4 text-xs font-semibold"
        >
          <FiArrowLeft size={13} /> Back to Work Orders
        </button>

        {/* Card */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          {/* Top accent */}
          <div className="h-1 bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-400" />

          <div className="p-5 space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-slate-800">Upload Purchase Order</p>
                <p className="text-[11px] text-slate-400 mt-0.5">PDF, Excel or Image · Max 5MB</p>
              </div>
              <span className="text-[10px] font-semibold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">Optional</span>
            </div>

            {/* Drop Zone */}
            {!file ? (
              <div
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
                className={`cursor-pointer rounded-xl border-2 border-dashed transition-all duration-200 group
                  ${dragOver ? "border-indigo-400 bg-indigo-50" : "border-slate-200 bg-slate-50 hover:border-indigo-300 hover:bg-indigo-50/40"}`}
              >
                <div className="flex flex-col items-center justify-center py-7 gap-2">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all
                    ${dragOver ? "bg-indigo-100 border-indigo-200" : "bg-white border-slate-200 group-hover:border-indigo-200 group-hover:bg-indigo-50"}`}>
                    <FiUpload size={18} className={`transition-colors ${dragOver ? "text-indigo-500" : "text-slate-400 group-hover:text-indigo-500"}`} />
                  </div>
                  <div className="text-center">
                    <p className="text-xs font-semibold text-slate-700 group-hover:text-indigo-700 transition-colors">
                      {dragOver ? "Drop it here!" : "Click to upload"}
                    </p>
                    <p className="text-[11px] text-slate-400">or drag and drop</p>
                  </div>
                  <div className="flex gap-1">
                    {["PDF", "Excel", "Image"].map(t => (
                      <span key={t} className="text-[10px] font-semibold text-slate-400 bg-white border border-slate-200 px-2 py-0.5 rounded-full">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="rounded-xl border border-indigo-200 bg-indigo-50/60 overflow-hidden">
                <div className="flex items-center gap-3 px-3.5 py-3">
                  <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center flex-shrink-0">
                    <span className="text-white">{getFileIcon(file)}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-slate-800 truncate">{file.name}</p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="text-[10px] font-bold text-indigo-600 bg-indigo-100 px-1.5 py-0.5 rounded">
                        {getFileTypeLabel(file)}
                      </span>
                      <span className="text-[10px] text-slate-400">{(file.size / 1024).toFixed(1)} KB</span>
                    </div>
                  </div>
                  <button
                    onClick={() => { setFile(null); setUploaded(false); }}
                    className="w-6 h-6 rounded-lg flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all"
                  >
                    <FiX size={13} />
                  </button>
                </div>
                <div className="h-0.5 bg-indigo-500/30">
                  <div className="h-full bg-indigo-500 w-full" />
                </div>
              </div>
            )}

            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              accept=".pdf,.xls,.xlsx,.png,.jpg,.jpeg"
              onChange={(e) => handleFile(e.target.files[0])}
            />

            {/* Success */}
            {uploaded && (
              <div className="flex items-center gap-2.5 bg-emerald-50 border border-emerald-200 rounded-xl px-3.5 py-2.5">
                <FiCheckCircle size={14} className="text-emerald-500 flex-shrink-0" />
                <div>
                  <p className="text-xs font-bold text-emerald-800">Uploaded Successfully!</p>
                  <p className="text-[10px] text-emerald-600">Submitted for review.</p>
                </div>
              </div>
            )}

            {/* Buttons */}
            <div className="flex gap-2 pt-1 border-t border-slate-100">
              <button
                onClick={() => navigate("/sales/purchase-orders")}
                className="flex-1 py-2 rounded-lg border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-all mt-3"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={!file || uploaded}
                className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all mt-3
                  ${file && !uploaded
                    ? "bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm hover:shadow-indigo-200 hover:shadow-md active:scale-95"
                    : "bg-slate-200 text-slate-400 cursor-not-allowed"
                  }`}
              >
                {uploaded ? "✓ Done" : "Upload File"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}