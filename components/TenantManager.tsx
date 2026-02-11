
import React, { useState } from 'react';
import { 
  Building2, 
  Search, 
  Filter, 
  MoreVertical, 
  ArrowUpRight, 
  ShieldCheck, 
  AlertTriangle,
  Mail,
  ExternalLink,
  ChevronRight,
  Database,
  Users
} from 'lucide-react';

const mockTenants = [
  { id: '1', name: 'Soluções Hidro', slug: 'solucoes-hidro', plan: 'Business', users: 24, storage: '12.5GB', status: 'active', owner: 'Marcos Oliveira' },
  { id: '2', name: 'Clima Express', slug: 'clima-express', plan: 'Pro', users: 8, storage: '4.2GB', status: 'active', owner: 'Julia Santos' },
  { id: '3', name: 'Segurança Total', slug: 'seg-total', plan: 'Enterprise', users: 56, storage: '48.9GB', status: 'past_due', owner: 'Ricardo Gomes' },
  { id: '4', name: 'Construtora Alfa', slug: 'alfa-con', plan: 'Pro', users: 12, storage: '19.8GB', status: 'active', owner: 'Fabio Lima' },
];

const TenantManager: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-gray-900 tracking-tight">Gerenciamento de Tenants</h2>
          <p className="text-gray-500 font-medium">Controle total sobre as empresas cadastradas no SaaS.</p>
        </div>
        <button className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-indigo-700 shadow-xl shadow-indigo-100 transition-all">
          Convidar Empresa
        </button>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input 
            type="text" 
            placeholder="Buscar por nome, slug ou proprietário..."
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-transparent focus:bg-white focus:border-indigo-500 rounded-xl text-xs font-medium outline-none transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select className="px-4 py-2.5 border border-gray-100 rounded-xl text-xs font-bold bg-white outline-none">
          <option>Todos os Planos</option>
          <option>Starter</option>
          <option>Pro</option>
          <option>Business</option>
          <option>Enterprise</option>
        </select>
      </div>

      <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50/50 border-b border-gray-100">
              <tr>
                <th className="px-8 py-5 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Empresa / Slug</th>
                <th className="px-8 py-5 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Plano</th>
                <th className="px-8 py-5 text-center text-[10px] font-black text-gray-400 uppercase tracking-widest">Uso de Recursos</th>
                <th className="px-8 py-5 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Proprietário</th>
                <th className="px-8 py-5 text-center text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                <th className="px-8 py-5"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {mockTenants.map((tenant) => (
                <tr key={tenant.id} className="hover:bg-indigo-50/30 transition-all group cursor-pointer">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center font-black text-indigo-600 text-xs shadow-sm">
                        {tenant.name.substring(0, 2).toUpperCase()}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-black text-gray-900 group-hover:text-indigo-600 transition-colors">{tenant.name}</span>
                        <span className="text-[10px] font-mono text-gray-400">/{tenant.slug}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 text-[10px] font-black uppercase tracking-widest rounded-lg">
                      {tenant.plan}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex flex-col gap-2 max-w-[140px] mx-auto">
                      <div className="flex justify-between text-[9px] font-bold text-gray-400 uppercase">
                        <span className="flex items-center gap-1"><Users className="w-2.5 h-2.5" /> {tenant.users}</span>
                        <span className="flex items-center gap-1"><Database className="w-2.5 h-2.5" /> {tenant.storage}</span>
                      </div>
                      <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-indigo-500" style={{ width: '65%' }}></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-gray-300" />
                      <span className="text-xs font-medium text-gray-600">{tenant.owner}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-center">
                    <span className={`px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                      tenant.status === 'active' ? 'bg-emerald-100 text-emerald-700' :
                      tenant.status === 'past_due' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {tenant.status === 'active' ? 'Ativo' : tenant.status === 'past_due' ? 'Pendente' : 'Suspenso'}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-gray-300 hover:text-indigo-600 hover:bg-white rounded-xl transition-all">
                        <ExternalLink className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-300 hover:text-gray-600">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-8 py-4 border-t border-gray-100 bg-gray-50/50 flex items-center justify-between">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total: 412 empresas</p>
          <div className="flex gap-2">
            <button disabled className="px-4 py-1.5 border border-gray-200 rounded-xl text-[10px] font-black uppercase tracking-widest disabled:opacity-30">Anterior</button>
            <button className="px-4 py-1.5 bg-white border border-gray-200 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-50 hover:text-indigo-600 transition-all shadow-sm">Próximo</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TenantManager;
