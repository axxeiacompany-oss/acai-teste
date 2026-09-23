import React from 'react';
import { MapPin, Clock, Phone, ExternalLink, Navigation, CheckCircle2 } from 'lucide-react';
import { STORE_INFO } from '../data/menu';

export const LocationHours: React.FC = () => {
  const deliveryAreas = [
    'Santa Maria Norte (Todas as Quadras)',
    'Santa Maria Sul',
    'Total Ville Santa Maria',
    'Residencial Santos Dumont',
    'Condomínio Porto Rico',
    'Polo JK & Regiões Vizinhas',
  ];

  return (
    <section id="localizacao" className="py-16 md:py-24 bg-[#0a0410] border-t border-amber-500/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Details & Delivery Areas */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-amber-400">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>Ponto de Atendimento & Raio de Entrega</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-stone-100">
                Onde Encontrar o Açaí do Japa
              </h2>
              <p className="text-sm text-stone-300 font-light max-w-xl">
                Operamos com atendimento presencial para retirada no balcão e equipe própria de entrega rápida para manter seu açaí gelado e cremoso.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border border-stone-800 bg-[#12071a] space-y-2">
                <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
                  <Clock className="w-4 h-4" />
                  <span>Horário de Funcionamento</span>
                </div>
                <div className="text-sm font-semibold text-stone-100">
                  {STORE_INFO.hours}
                </div>
                <p className="text-xs text-stone-400">
                  Aberto de domingo a domingo, feriados inclusive.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-stone-800 bg-[#12071a] space-y-2">
                <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
                  <MapPin className="w-4 h-4" />
                  <span>Endereço em Santa Maria</span>
                </div>
                <div className="text-sm font-semibold text-stone-100">
                  {STORE_INFO.address}
                </div>
                <p className="text-xs text-stone-400">
                  Fácil acesso e retirada rápida para viagem.
                </p>
              </div>
            </div>

            {/* Delivery Areas */}
            <div className="p-5 rounded-2xl border border-amber-500/20 bg-[#140a1e] space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-300 block">
                Bairros e Regiões Atendidas com Embalagem Térmica
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {deliveryAreas.map((area, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-stone-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{area}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Direct Order & WhatsApp Card */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#160b24] to-[#0f0618] border border-amber-500/30 rounded-2xl p-6 sm:p-8 text-left shadow-2xl space-y-6">
            <div className="space-y-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-amber-400 font-bold block">
                Atendimento Direto & Exclusivo
              </span>
              <h3 className="font-display text-2xl font-bold text-stone-100">
                Pronto para se Deliciar?
              </h3>
              <p className="text-xs text-stone-300 leading-relaxed font-light">
                Monte seu pedido personalizado pelo cardápio digital ou fale diretamente com a nossa equipe no WhatsApp para entrega rápida e atendimento sob medida.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <a
                href="#cardapio"
                className="w-full flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-stone-950 font-bold text-xs shadow-lg shadow-amber-950/40 transition-all cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <Navigation className="w-4 h-4 text-stone-950" />
                  <span>Escolher no Cardápio & Montar</span>
                </div>
                <span className="text-[10px] bg-stone-950 text-amber-300 px-2 py-0.5 rounded font-mono">
                  Online
                </span>
              </a>

              <a
                href={`https://wa.me/${STORE_INFO.phone}?text=Ol%C3%A1%2C%20gostaria%20de%20fazer%20um%20pedido%20no%20A%C3%A7a%C3%AD%20do%20Japa%20Santa%20Maria!`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-between p-4 rounded-xl border border-emerald-500/40 bg-emerald-950/30 hover:bg-emerald-900/40 text-emerald-300 font-semibold text-xs transition-all cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-emerald-400" />
                  <span>Atendimento Direto no WhatsApp</span>
                </div>
                <span className="text-[11px] font-mono">
                  {STORE_INFO.whatsappDisplay}
                </span>
              </a>

              <a
                href="https://maps.google.com/?q=Santa+Maria+Norte+Brasilia+DF"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-between p-4 rounded-xl border border-stone-800 bg-[#12071a] hover:border-amber-400/40 text-stone-300 hover:text-white font-medium text-xs transition-all cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <Navigation className="w-4 h-4 text-amber-400" />
                  <span>Ver Rota no Google Maps</span>
                </div>
                <span className="text-[11px] text-stone-400">
                  Santa Maria Norte
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
