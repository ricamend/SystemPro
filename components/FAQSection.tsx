
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

const faqs = [
  { q: 'O ServiçoPro funciona sem internet?', a: 'Sim! Nosso app mobile foi projetado para funcionar totalmente offline. Os técnicos podem preencher checklists e tirar fotos, e os dados serão sincronizados automaticamente assim que houver conexão.' },
  { q: 'Quantas empresas (tenants) posso gerenciar?', a: 'Cada conta admin gerencia uma empresa. Se você é um franqueador ou tem filiais, o plano Business permite a gestão multi-filial com dados consolidados.' },
  { q: 'Como funciona a integração com pagamentos?', a: 'Utilizamos o Stripe para processar pagamentos. Você pode gerar links de pagamento diretamente da OS e receber por cartão ou boleto com conciliação automática.' },
  { q: 'Posso customizar os relatórios?', a: 'Com certeza! Nosso ReportBuilder permite que você arraste e solte métricas para criar dashboards únicos para sua operação.' }
];

const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 max-w-4xl mx-auto px-6">
      <div className="text-center mb-16 space-y-4">
        <h3 className="text-sm font-bold text-blue-600 uppercase tracking-widest flex items-center justify-center gap-2">
          <HelpCircle className="w-4 h-4" /> Dúvidas Frequentes
        </h3>
        <h4 className="text-4xl font-black text-gray-900 tracking-tight">Tudo o que você precisa saber.</h4>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, idx) => (
          <div key={idx} className="bg-white border border-gray-100 rounded-[24px] overflow-hidden transition-all hover:shadow-lg">
            <button 
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              className="w-full flex items-center justify-between p-6 text-left"
            >
              <span className="text-lg font-bold text-gray-900 leading-tight">{faq.q}</span>
              <div className={`p-2 rounded-full ${openIndex === idx ? 'bg-blue-50 text-blue-600' : 'bg-gray-50 text-gray-400'}`}>
                {openIndex === idx ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </div>
            </button>
            <div className={`overflow-hidden transition-all duration-500 ${openIndex === idx ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
              <p className="p-6 pt-0 text-gray-500 leading-relaxed font-medium">{faq.a}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQSection;
