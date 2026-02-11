
import React, { useState, useMemo, useEffect } from 'react';
import { 
  Search, 
  Plus, 
  Mail, 
  Phone, 
  MapPin, 
  MoreHorizontal, 
  Globe, 
  Navigation, 
  X, 
  ClipboardList, 
  History,
  ChevronRight,
  ArrowRight,
  User,
  CheckCircle2,
  Clock,
  ExternalLink,
  Edit2,
  Trash2,
  AlertTriangle,
  FileText
} from 'lucide-react';
import CustomerForm from './CustomerForm';
import ServiceOrderForm from './ServiceOrderForm';
import AuditTimeline from './AuditTimeline';
import { logService } from '../services/logService';
import { AuditLog } from '../types';

const initialCustomers = [
  { id: '1', name: 'Mercado Central LTDA', email: 'contato@mercadocentral.com', phone: '(11) 98888-7777', city: 'São Paulo', state: 'SP', status: 'Ativo', latitude: -23.5505, longitude: -46.6333, document: '12.345.678/0001-90' },
  { id: '2', name: 'Escola Dom Bosco', email: 'secretaria@dombosco.edu', phone: '(11) 3344-5566', city: 'São Bernardo', state: 'SP', status: 'Ativo', latitude: -23.6944, longitude: -46.5654, document: '98.765.432/0001-10' },
  { id: '3', name: 'Residencial Pinheiros', email: 'sindico@pinheiros.com', phone: '(11) 97777-6666', city: 'São Paulo', state: 'SP', status: 'Inativo', latitude: -23.5596, longitude: -46.6583, document: '55.444.333/0001-55' },
];

const Customers: React.FC = () => {
  const [customers, setCustomers] = useState(initialCustomers);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  const [showDetail, setShowDetail] = useState(false);
  const [activeTab, setActiveTab] = useState<'info' | 'history' | 'audit'>('info');
  const [customerLogs, setCustomerLogs] = useState<AuditLog[]>([]);

  const filteredCustomers = useMemo(() => {
    return customers.filter(c => 
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.document?.includes(searchTerm)
    );
  }, [searchTerm, customers]);

  const handleOpenDetail = (customer: any) => {
    setSelectedCustomer(customer);
    setShowDetail(true);
    setActiveTab('info');
    setCustomerLogs(logService.getLogs(customer.id));
  };

  const handleSaveCustomer = (data: any) => {
    if (selectedCustomer) {
      // Delta tracking simulado
      const old = selectedCustomer;
      const changes: Omit<AuditLog, 'id' | 'created_at' | 'user_id' | 'user_name'>[] = [];
      
      if (data.name !== old.name) changes.push({ target_id: old.id, target_type: 'customer', action: 'Nome alterado', type: 'edit', old_value: old.name, new_value: data.name });
      if (data.email !== old.email) changes.push({ target_id: old.id, target_type: 'customer', action: 'E-mail atualizado', type: 'edit', old_value: old.email, new_value: data.email });
      if (data.status !== old.status) changes.push({ target_id: old.id, target_type: 'customer', action: 'Status alterado', type: 'status', old_value: old.status, new_value: data.status });

      logService.bulkAddLogs(changes);
      setCustomers(prev => prev.map(c => c.id === old.id ? { ...c, ...data } : c));
    } else {
      const id = Date.now().toString();
      logService.addLog({ target_id: id, target_type: 'customer', action: 'Cliente criado no sistema', type: 'system' });
      setCustomers(prev => [{ ...data, id, status: 'Ativo' }, ...prev]);
    }
    setIsFormOpen(false);
    setSelectedCustomer(null);
  };

  if (isFormOpen) {
    return (
      <div className="max-w-4xl mx-auto">
        <CustomerForm 
          initialData={selectedCustomer}
          onClose={() => { setIsFormOpen(false); setSelectedCustomer(null); }} 
          onSave={handleSaveCustomer} 
        />
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500 relative">
      {/* Modal Detalhes do Cliente */}
      {showDetail && selectedCustomer && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
           <div className="bg-white w-full max-w-2xl rounded-[40px] shadow-2xl overflow-hidden border border-gray-100 animate-in zoom-in-95 flex flex-col max-h-[90vh]">
              <div className="p-8 border-b border-gray-50 flex items-center justify-between bg-gray-50/50">
                 <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg">
                      {selectedCustomer.name.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                       <h3 className="text-xl font-black text-gray-900 tracking-tight">{selectedCustomer.name}</h3>
                       <p className="text-xs text-gray-500 font-medium">Cadastrado desde Jan 2024</p>
                    </div>
                 </div>
                 <button onClick={() => setShowDetail(false)} className="p-2 hover:bg-white rounded-full text-gray-400"><X className="w-6 h-6" /></button>
              </div>

              <div className="flex bg-gray-50/50 p-2 gap-2 border-b border-gray-100">
                 <button onClick={() => setActiveTab('info')} className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${activeTab === 'info' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-400'}`}>Informações</button>
                 <button onClick={() => setActiveTab('history')} className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${activeTab === 'history' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-400'}`}>Ordens de Serviço</button>
                 <button onClick={() => { setActiveTab('audit'); setCustomerLogs(logService.getLogs(selectedCustomer.id)); }} className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${activeTab === 'audit' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-400'}`}>Auditoria</button>
              </div>

              <div className="flex-1 overflow-y-auto custom-scrollbar p-8">
                 {activeTab === 'info' && (
                    <div className="space-y-6">
                       <div className="grid grid-cols-2 gap-6">
                          <div className="p-5 bg-gray-50 rounded-3xl space-y-1">
                             <p className="text-[9px] font-black text-gray-400 uppercase">Documento</p>
                             <p className="text-sm font-bold text-gray-800">{selectedCustomer.document}</p>
                          </div>
                          <div className="p-5 bg-gray-50 rounded-3xl space-y-1">
                             <p className="text-[9px] font-black text-gray-400 uppercase">Status</p>
                             <p className="text-sm font-black text-emerald-600 uppercase">{selectedCustomer.status}</p>
                          </div>
                       </div>
                       <div className="p-5 bg-gray-50 rounded-3xl flex items-center justify-between">
                          <div className="flex items-center gap-4">
                             <MapPin className="w-5 h-5 text-blue-600" />
                             <div>
                                <p className="text-sm font-bold text-gray-800">{selectedCustomer.city}, {selectedCustomer.state}</p>
                                <p className="text-xs text-gray-500 font-medium">Localização GPS configurada</p>
                             </div>
                          </div>
                          <button className="p-3 bg-white rounded-xl shadow-sm hover:scale-110 transition-transform"><Navigation className="w-4 h-4 text-blue-600" /></button>
                       </div>
                    </div>
                 )}

                 {activeTab === 'audit' && (
                    <AuditTimeline logs={customerLogs} />
                 )}
                 
                 {activeTab === 'history' && (
                    <div className="space-y-3">
                       {[1, 2].map(i => (
                          <div key={i} className="p-4 bg-gray-50 rounded-2xl flex items-center justify-between group cursor-pointer hover:bg-blue-50 transition-all">
                             <div className="flex items-center gap-4">
                                <span className="text-[10px] font-black text-gray-300">#542{i}</span>
                                <p className="text-sm font-bold text-gray-700">Manutenção Predial Geral</p>
                             </div>
                             <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-blue-600 transition-all" />
                          </div>
                       ))}
                    </div>
                 )}
              </div>
              
              <div className="p-8 border-t border-gray-50 bg-gray-50/50 flex justify-end gap-3">
                 <button onClick={() => { setIsFormOpen(true); setShowDetail(false); }} className="px-6 py-4 bg-white border border-gray-200 text-gray-600 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-gray-50 transition-all">Editar Cadastro</button>
                 <button onClick={() => setShowDetail(false)} className="px-8 py-4 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-blue-100">Fechar</button>
              </div>
           </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-gray-900 tracking-tight">Clientes</h2>
          <p className="text-gray-500 font-medium">Gestão de CRM com histórico completo de alterações.</p>
        </div>
        <button 
          onClick={() => { setSelectedCustomer(null); setIsFormOpen(true); }}
          className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3.5 rounded-2xl font-black text-sm shadow-xl shadow-blue-100 hover:bg-blue-700 transition-all hover:scale-[1.02]"
        >
          <Plus className="w-5 h-5" /> Novo Cliente
        </button>
      </div>

      <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Buscar por nome ou CPF/CNPJ..."
            className="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl text-sm font-medium focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-inner"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredCustomers.map((customer) => (
          <div 
            key={customer.id} 
            onClick={() => handleOpenDetail(customer)}
            className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-500 relative group cursor-pointer"
          >
            <div className="flex items-center gap-5 mb-8">
              <div className="w-16 h-16 rounded-[24px] bg-blue-50 flex items-center justify-center text-blue-600 font-black text-2xl shadow-inner border border-blue-100/50">
                {customer.name.substring(0, 2).toUpperCase()}
              </div>
              <div className="space-y-1">
                <h3 className="font-black text-gray-900 leading-tight group-hover:text-blue-600 transition-colors">{customer.name}</h3>
                <span className={`text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full border ${customer.status === 'Ativo' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-gray-50 text-gray-600 border-gray-100'}`}>
                  {customer.status}
                </span>
              </div>
            </div>

            <div className="space-y-4 text-xs">
              <div className="flex items-center gap-4 text-gray-500">
                <Mail className="w-4 h-4 text-gray-300" />
                <span className="font-bold">{customer.email}</span>
              </div>
              <div className="flex items-center gap-4 text-gray-500">
                <MapPin className="w-4 h-4 text-gray-300" />
                <span className="font-bold">{customer.city}, {customer.state}</span>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-50 flex items-center justify-between">
               <div className="flex items-center gap-2">
                  <History className="w-4 h-4 text-blue-500" />
                  <span className="text-[10px] font-black text-gray-400 uppercase">Ver Histórico</span>
               </div>
               <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Customers;
