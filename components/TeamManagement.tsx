
import React, { useState } from 'react';
import { Users, Search, Plus, UserPlus, MoreVertical, Shield, ShieldCheck, Mail, ArrowLeft, ChevronRight, X, UserCog } from 'lucide-react';

const TeamManagement: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [showInvite, setShowInvite] = useState(false);
  const [users] = useState([
    { id: '1', name: 'João Silva', email: 'joao@admin.com', role: 'Admin', status: 'Ativo', avatar: 'JS' },
    { id: '2', name: 'Carlos Lima', email: 'carlos@tech.com', role: 'Técnico', status: 'Ativo', avatar: 'CL' },
    { id: '3', name: 'Ana Souza', email: 'ana@tech.com', role: 'Técnico', status: 'Em Campo', avatar: 'AS' },
    { id: '4', name: 'Julia Reis', email: 'julia@suporte.com', role: 'Suporte', status: 'Ativo', avatar: 'JR' },
  ]);

  return (
    <div className="space-y-8 animate-in slide-in-from-right-4 duration-300">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-xl transition-all">
            <ArrowLeft className="w-6 h-6 text-gray-400" />
          </button>
          <div>
            <h2 className="text-2xl font-black text-gray-900 tracking-tight">Gestão de Equipe</h2>
            <p className="text-gray-500 font-medium">Controle acessos e permissões dos seus colaboradores.</p>
          </div>
        </div>
        <button onClick={() => setShowInvite(true)} className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-blue-100 hover:bg-blue-700 transition-all">
          <UserPlus className="w-4 h-4" /> Convidar Membro
        </button>
      </div>

      <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-50 bg-gray-50/30">
          <div className="relative max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input type="text" placeholder="Buscar por nome ou e-mail..." className="w-full pl-11 pr-4 py-3 bg-white border border-gray-100 rounded-xl text-xs font-bold outline-none focus:ring-2 focus:ring-blue-500 shadow-sm" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50/50">
              <tr>
                <th className="px-8 py-5 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Colaborador</th>
                <th className="px-8 py-5 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Função</th>
                <th className="px-8 py-5 text-center text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                <th className="px-8 py-5"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {users.map((user) => (
                <tr key={user.id} className="group hover:bg-blue-50/30 transition-all">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-black text-xs shadow-lg">
                        {user.avatar}
                      </div>
                      <div>
                        <p className="text-sm font-black text-gray-900 leading-tight">{user.name}</p>
                        <p className="text-[10px] font-medium text-gray-400">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2">
                      <Shield className={`w-3.5 h-3.5 ${user.role === 'Admin' ? 'text-blue-600' : 'text-gray-400'}`} />
                      <span className="text-xs font-bold text-gray-700">{user.role}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-center">
                    <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                      user.status === 'Ativo' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-blue-50 text-blue-700 border-blue-100'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                       <button className="p-2 text-gray-300 hover:text-blue-600 rounded-lg hover:bg-white transition-all"><UserCog className="w-4 h-4" /></button>
                       <button className="p-2 text-gray-300 hover:text-gray-600"><MoreVertical className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showInvite && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-md rounded-[40px] shadow-2xl overflow-hidden border border-gray-100 animate-in zoom-in-95">
             <div className="p-8 border-b border-gray-50 flex items-center justify-between bg-gray-50/50">
                <div className="flex items-center gap-3">
                   <div className="p-3 bg-blue-600 rounded-2xl text-white shadow-lg"><UserPlus className="w-6 h-6" /></div>
                   <h3 className="text-xl font-black text-gray-900 tracking-tight">Convidar Membro</h3>
                </div>
                <button onClick={() => setShowInvite(false)} className="p-2 hover:bg-white rounded-full text-gray-400"><X className="w-6 h-6" /></button>
             </div>
             <div className="p-8 space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">E-mail do Colaborador</label>
                  <input type="email" placeholder="email@empresa.com.br" className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl text-sm font-bold outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Nível de Acesso</label>
                  <select className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl text-sm font-bold outline-none appearance-none">
                     <option>Técnico de Campo</option>
                     <option>Administrador</option>
                     <option>Suporte Operacional</option>
                  </select>
                </div>
                <button onClick={() => setShowInvite(false)} className="w-full py-5 bg-blue-600 text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl hover:bg-blue-700 transition-all">Enviar Convite</button>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamManagement;
