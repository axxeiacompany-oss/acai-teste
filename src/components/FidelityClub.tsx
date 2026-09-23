import React, { useState } from 'react';
import { Gift, Award, Check, Copy, Sparkles, ExternalLink, ArrowRight } from 'lucide-react';
import { FIDELITY_LEVELS, STORE_INFO } from '../data/menu';

export const FidelityClub: React.FC = () => {
  const [simulatedPoints, setSimulatedPoints] = useState(120);
  const [copiedCoupon, setCopiedCoupon] = useState(false);

  const handleCopyCoupon = () => {
    navigator.clipboard.writeText('JAPA10');
    setCopiedCoupon(true);
    setTimeout(() => setCopiedCoupon(false), 2000);
  };

  return (
    <section id="fidelidade" className="py-16 md:py-24 bg-[#0d0515] border-t border-amber-500/15 relative overflow-hidden">
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-80 h-80 bg-purple-900/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Program Intro */}
          <div className="lg:col-span-5 text-left space-y-5">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-amber-400">
              <Gift className="w-3.5 h-3.5 text-amber-400" />
              <span>Clube Fidelidade Exclusivo do Japa</span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl font-bold text-stone-100 [text-wrap:balance]">
              Peça, Pontue & Conquiste Cortesias
            </h2>

            <p className="text-sm text-stone-300 leading-relaxed font-light">
              No atendimento oficial do <strong>Açaí do Japa</strong>, cada pedido acumula pontos automáticos vinculados ao seu número de WhatsApp.
              Troque seus pontos por adicionais nobres, açaís completos e barcas monumentais!
            </p>

            {/* Exclusive Welcome Coupon Card */}
            <div className="p-4 rounded-xl border border-amber-400/40 bg-gradient-to-r from-amber-950/40 to-purple-950/40 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-amber-300 uppercase tracking-wider">
                  Cupom de Primeira Compra
                </span>
                <span className="text-[11px] text-stone-400">Válido no Delivery & Balcão</span>
              </div>
              <div className="flex items-center justify-between bg-black/50 p-2.5 rounded-lg border border-amber-500/20">
                <span className="font-mono text-base font-black text-amber-400 tracking-wider">
                  JAPA10
                </span>
                <button
                  onClick={handleCopyCoupon}
                  className="flex items-center gap-1.5 px-3 py-1 rounded bg-amber-400 hover:bg-amber-300 text-stone-950 text-xs font-bold transition-all cursor-pointer"
                >
                  {copiedCoupon ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-stone-950" />
                      <span>Copiado!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copiar Código</span>
                    </>
                  )}
                </button>
              </div>
              <p className="text-[11px] text-stone-400">
                Receba 10% de desconto imediato no seu primeiro açaí gourmet aqui no cardápio.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-1">
              <a
                href={STORE_INFO.yoogaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 text-xs font-bold transition-all shadow-md"
              >
                <span>Acessar Pontos no App Yooga</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <a
                href="#cardapio"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-stone-800 hover:border-amber-400/40 text-xs font-semibold text-stone-200 transition-colors"
              >
                <span>Pedir no Cardápio</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Rewards Tier Simulator */}
          <div className="lg:col-span-7 bg-[#140a1e] border border-amber-500/20 rounded-2xl p-6 sm:p-8 text-left shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-stone-800 pb-4">
              <div>
                <h3 className="font-display text-lg font-bold text-stone-100">
                  Simulador de Recompensas
                </h3>
                <span className="text-xs text-stone-400">
                  Arraste para ver quais prêmios você desbloqueia
                </span>
              </div>
              <div className="text-right">
                <span className="font-mono text-2xl font-bold text-amber-300 tabular-nums">
                  {simulatedPoints}
                </span>
                <span className="text-xs text-stone-400 block -mt-1">pontos</span>
              </div>
            </div>

            {/* Slider */}
            <div className="space-y-2">
              <input
                type="range"
                min="0"
                max="400"
                step="10"
                value={simulatedPoints}
                onChange={(e) => setSimulatedPoints(Number(e.target.value))}
                className="w-full accent-amber-400 cursor-pointer h-2 bg-stone-800 rounded-lg"
              />
              <div className="flex justify-between text-[11px] font-mono text-stone-500">
                <span>0 pts</span>
                <span>100 pts</span>
                <span>200 pts</span>
                <span>350+ pts</span>
              </div>
            </div>

            {/* Tiers List */}
            <div className="space-y-3">
              {FIDELITY_LEVELS.map((tier) => {
                const isUnlocked = simulatedPoints >= tier.points;
                return (
                  <div
                    key={tier.points}
                    className={`p-4 rounded-xl border transition-all flex items-center justify-between ${
                      isUnlocked
                        ? 'border-amber-400/60 bg-amber-950/20 shadow-sm shadow-amber-950/30'
                        : 'border-stone-800/80 bg-stone-900/30 opacity-60'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-9 h-9 rounded-lg flex items-center justify-center font-bold text-xs ${
                          isUnlocked
                            ? 'bg-amber-400 text-stone-950'
                            : 'bg-stone-800 text-stone-400'
                        }`}
                      >
                        <Award className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-xs text-stone-200">
                            {tier.reward}
                          </span>
                        </div>
                        <span className="text-[11px] text-amber-400 font-medium">
                          {tier.tag} · {tier.points} pontos necessários
                        </span>
                      </div>
                    </div>

                    <div>
                      {isUnlocked ? (
                        <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                          Desbloqueado
                        </span>
                      ) : (
                        <span className="text-[10px] text-stone-500 font-mono tabular-nums">
                          Faltam {tier.points - simulatedPoints} pts
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
