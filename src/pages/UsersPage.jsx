import { useState } from 'react';
import { USERS, ROLES } from '../data/mockData';
import { Card, CardHeader, SectionHeader, Tabs, Modal, Badge, Toggle, Input, Select, BtnPrimary, BtnSecondary } from '../component/layout/ui/index';
import Icon from '../component/layout/ui/Icon';

export default function UsersPage() {
  const [tab, setTab]       = useState("User List");
  const [showAdd, setShowAdd] = useState(false);
  const [roles, setRoles]   = useState(ROLES);
  const [users, setUsers]   = useState(USERS);

  const togglePerm = (roleIdx, perm) => {
    setRoles(prev => prev.map((r, i) => i === roleIdx ? { ...r, [perm]: !r[perm] } : r));
  };
  const toggleUser = (id) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, status: u.status === "active" ? "disabled" : "active" } : u));
  };

  const perms = [
    { key: "stockAccess",     label: "Stock Access" },
    { key: "poApproval",      label: "PO Approval" },
    { key: "invoiceCreation", label: "Invoice Creation" },
    { key: "dispatch",        label: "Dispatch" },
    { key: "reports",         label: "Reports" },
  ];

  return (
    <div className="space-y-4">
      <SectionHeader
        title="Users & Roles"
        subtitle="Manage users across both companies"
        action={
          <BtnPrimary onClick={() => setShowAdd(true)}>
            <Icon name="plus" className="w-3.5 h-3.5" /> Add User
          </BtnPrimary>
        }
      />
      <Tabs tabs={["User List", "Role Matrix"]} active={tab} onChange={setTab} />

      {tab === "User List" && (
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  {["User", "Role", "Company", "Status", "Last Login", "Actions"].map(h => (
                    <th key={h} className={`px-5 py-3 ${h === "User" ? "text-left" : "text-center"}`}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {users.map(u => (
                  <tr key={u.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 ${u.company === "A" ? "bg-indigo-500" : "bg-cyan-500"}`}>
                          {u.name.split(" ").map(n => n[0]).join("")}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-800">{u.name}</p>
                          <p className="text-[11px] text-slate-400">{u.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-center"><Badge label={u.role} variant="default" /></td>
                    <td className="px-4 py-4 text-center">
                      <Badge label={u.company === "A" ? "APX" : "MRD"} variant={u.company === "A" ? "apx" : "mrd"} />
                    </td>
                    <td className="px-4 py-4 text-center"><Badge label={u.status} variant={u.status} /></td>
                    <td className="px-4 py-4 text-center text-xs text-slate-500 font-mono">{u.lastLogin}</td>
                    <td className="px-4 py-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                          <Icon name="edit" className="w-3.5 h-3.5" />
                        </button>
                        <Toggle checked={u.status === "active"} onChange={() => toggleUser(u.id)} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {tab === "Role Matrix" && (
        <Card className="overflow-hidden">
          <CardHeader title="Permission Matrix" subtitle="Toggle permissions per role — changes auto-saved" />
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  <th className="px-5 py-3 text-left">Role</th>
                  {perms.map(p => <th key={p.key} className="px-4 py-3 text-center">{p.label}</th>)}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {roles.map((r, i) => (
                  <tr key={r.role} className="hover:bg-slate-50/40 transition-colors">
                    <td className="px-5 py-4 font-semibold text-slate-700">{r.role}</td>
                    {perms.map(p => (
                      <td key={p.key} className="px-4 py-4 text-center">
                        <div className="flex justify-center">
                          <Toggle checked={r[p.key]} onChange={() => togglePerm(i, p.key)} />
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {showAdd && (
        <Modal title="Add New User" onClose={() => setShowAdd(false)}>
          <div className="space-y-4">
            <Input label="Full Name" placeholder="e.g. Ramesh Gupta" />
            <Input label="Email Address" type="email" placeholder="user@company.in" />
            <Select label="Role" options={ROLES.map(r => r.role)} />
            <Select label="Assign Company" options={[
              { value: "A", label: "Apex Manufacturing Pvt. Ltd." },
              { value: "B", label: "Meridian Traders Ltd." },
            ]} />
            <div className="flex items-center justify-between py-2 border border-slate-100 rounded-lg px-3">
              <span className="text-xs font-semibold text-slate-600">Account Status — Active</span>
              <Toggle checked={true} onChange={() => {}} />
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <BtnSecondary onClick={() => setShowAdd(false)}>Cancel</BtnSecondary>
              <BtnPrimary onClick={() => setShowAdd(false)}>Create User</BtnPrimary>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
