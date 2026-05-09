
import { motion } from 'framer-motion';
import { Check, Shield } from 'lucide-react';

const plans = [
  {
    name: "Otimização Pro",
    price: "R$ 260",
    desc: "Melhor e mais completa otimização para performance extrema.",
    highlight: true,
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
    features: [
      "Otimização para Lines Pro",
      "Suporte em Campeonatos Presenciais",
      "Infraestrutura de Latência Zero",
      "Consultoria de Hardware Enterprise",
      "Suporte VIP 24/7",
      "Treinamento de Staff Técnica"
    ]
  }
];

export const Pricing = () => {
  return (
    <section id="precos" className="py-32 px-6 bg-black relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-7xl font-light tracking-tighter mb-8 text-white leading-none">
            UM <span className="bg-gradient-to-b from-[#00bffa] to-[#005eea] bg-clip-text text-transparent">INVESTIMENTO.</span> <br />NÃO UM GASTO.
          </h2>
          <p className="text-zinc-500 text-xl font-light max-w-2xl mx-auto italic">
            O último upgrade que você precisa. Sem recorrência, sem mensalidades.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {plans.map((item, idx) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`p-10 md:p-16 rounded-[32px] relative overflow-hidden flex flex-col ${item.highlight ? 'bg-zinc-900/50 border border-white/5 shadow-[0_0_60px_rgba(0,191,250,0.05)]' : 'glass-card'}`}
            >
              {item.highlight && (
                <div className="absolute top-8 right-8 text-[#00bffa]">
                  <Shield size={32} />
                </div>
              )}
              
              <h3 className="text-2xl font-light text-white uppercase italic tracking-tight mb-2">{item.name}</h3>
              <p className="text-zinc-500 font-light mb-10 italic">{item.desc}</p>
              
              <div className="mb-12">
                <span className="text-6xl font-thin text-white tracking-tighter italic">{item.price}</span>
                {item.highlight && <span className="text-zinc-500 ml-2 font-light uppercase text-xs">Pagamento Único</span>}
              </div>

              <div className="space-y-4 mb-12 flex-1">
                {item.features.map(f => (
                  <div key={f} className="flex items-center gap-3">
                    <Check size={16} className="text-[#00bffa]" />
                    <span className="text-zinc-300 font-light italic">{f}</span>
                  </div>
                ))}
              </div>

              <a 
                href={item.highlight ? '#agendar' : 'https://instagram.com/renanfilg'} 
                className={item.highlight ? 'btn-elite-primary' : 'btn-elite-glass'}
              >
                {item.highlight ? 'Garantir Minha Vaga' : 'Solicitar Orçamento'}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
