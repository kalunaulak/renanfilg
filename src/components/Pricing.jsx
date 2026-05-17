import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Shield } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { OrganizationModal } from './OrganizationModal';
import { parseGlossaryTerms, HoverHelper } from './TechnicalTooltip';

export const Pricing = () => {
  const { language } = useLanguage();
  const [isOrgModalOpen, setIsOrgModalOpen] = useState(false);

  const t = {
    pt: {
      title: 'NÃO UM GASTO.',
      title_grad: 'UM INVESTIMENTO.',
      subtitle: 'A otimização definitiva projetada tanto para quem busca o máximo de FPS e fluidez em jogos competitivos quanto para aceleração extrema em fluxos de trabalho e produtividade profissional. Sem recorrência, sem mensalidades.',
      plans: [
        {
          name: "Otimização Pro",
          price: "R$ 260",
          desc: "Melhor e mais completa otimização para performance extrema.",
          highlight: true,
          badge: "Pagamento Único",
          cta: "Garantir Minha Vaga",
          features: [
            "Deep BIOS Tuning & Undervolt",
            "Windows Customizado (Zero Bloat)",
            "Redução Extrema de Input Lag",
            "Análise de Hardware ao Vivo",
            "Suporte via TeamViewer",
            "Protocolo de Cuidados Vitalícios"
          ]
        },
        {
          name: "Organizações",
          price: "Consultar",
          desc: "Exclusivo para empresas, tal como feito para LOUD e Team Liquid.",
          highlight: false,
          badge: "",
          cta: "Solicitar Orçamento",
          features: [
            "Otimização para Lines Pro",
            "Suporte em Campeonatos Presenciais",
            "Infraestrutura de Latência Zero",
            "Consultoria de Hardware Enterprise",
            "Suporte VIP 24/7",
            "Treinamento de Staff Técnica"
          ]
        }
      ]
    },
    en: {
      title: 'NOT AN EXPENSE.',
      title_grad: 'AN INVESTMENT.',
      subtitle: 'The ultimate optimization engineered both for maximum FPS and smoothness in competitive games and extreme acceleration in professional work and productivity. No recurrence, no monthly fees.',
      plans: [
        {
          name: "Pro Optimization",
          price: "$ 50",
          desc: "The best and most complete optimization for extreme performance.",
          highlight: true,
          badge: "One-time Payment",
          cta: "Secure My Spot",
          features: [
            "Deep BIOS Tuning & Undervolt",
            "Custom Windows (Zero Bloat)",
            "Extreme Input Lag Reduction",
            "Live Hardware Analysis",
            "Support via TeamViewer",
            "Lifetime Care Protocol"
          ]
        },
        {
          name: "Organizations",
          price: "Contact Us",
          desc: "Exclusive for teams, as done for LOUD and Team Liquid.",
          highlight: false,
          badge: "",
          cta: "Request Quote",
          features: [
            "Optimization for Pro Lines",
            "On-site Championship Support",
            "Zero Latency Infrastructure",
            "Enterprise Hardware Consulting",
            "24/7 VIP Support",
            "Technical Staff Training"
          ]
        }
      ]
    }
  }[language || 'pt'];

  return (
    <section id="precos" className="py-16 md:py-32 px-6 md:px-8 bg-black relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 md:mb-24">
          <h2 className="text-4xl md:text-7xl font-light tracking-tighter mb-8 text-white leading-none">
            {t.title} <br />
            <span className="bg-gradient-to-b from-[#00bffa] to-[#005eea] bg-clip-text text-transparent">{t.title_grad}</span>
          </h2>
          <p className="text-zinc-500 text-xl font-light max-w-3xl mx-auto italic leading-relaxed">
            {t.subtitle}
          </p>
          <HoverHelper centered />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {t.plans.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`p-8 md:p-16 rounded-[32px] relative overflow-hidden flex flex-col ${item.highlight ? 'bg-zinc-900/50 border border-white/5 shadow-[0_0_60px_rgba(0,191,250,0.05)]' : 'glass-card'}`}
            >
              {item.highlight && (
                <div className="absolute top-8 right-8 text-[#00bffa]">
                  <Shield size={32} />
                </div>
              )}
              
              <h3 className="text-2xl font-light text-white uppercase italic tracking-tight mb-2">{item.name}</h3>
              <p className="text-zinc-500 font-light mb-10 italic">{item.desc}</p>
              
              <div className="mb-12 flex items-baseline">
                <span className={`text-5xl md:text-6xl font-[Helvetica,Arial,sans-serif] font-medium tracking-tighter ${item.highlight ? 'text-[#00bffa]' : 'text-white'}`}>{item.price}</span>
                {item.badge && <span className="text-zinc-500 ml-3 font-light uppercase text-[10px] md:text-xs tracking-widest">{item.badge}</span>}
              </div>

              <div className="space-y-4 mb-12 flex-1">
                {item.features.map(f => (
                  <div key={f} className="flex items-center gap-3">
                    <Check size={16} className="text-[#00bffa]" />
                    <span className="text-zinc-300 font-light italic">{parseGlossaryTerms(f)}</span>
                  </div>
                ))}
              </div>

              {item.highlight ? (
                <button 
                  onClick={(e) => { e.preventDefault(); document.getElementById('agendar')?.scrollIntoView({ behavior: 'smooth' }); }}
                  className="btn-elite-primary text-center w-full"
                >
                  {item.cta}
                </button>
              ) : (
                <button 
                  onClick={(e) => { e.preventDefault(); setIsOrgModalOpen(true); }}
                  className="btn-elite-glass text-center w-full"
                >
                  {item.cta}
                </button>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      <OrganizationModal 
        isOpen={isOrgModalOpen} 
        onClose={() => setIsOrgModalOpen(false)} 
      />
    </section>
  );
};
