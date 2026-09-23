import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Flame, Star, Clock } from 'lucide-react';
import heroImage from '../assets/images/hero_acai_luxury_ferrero_1790126062162.jpg';
import { STORE_INFO } from '../data/menu';

interface HeroProps {
  onExploreMenu: () => void;
  onCustomizerClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreMenu, onCustomizerClick }) => {
  return (
    <section className="relative overflow-hidden pt-6 pb-16 md:pt-12 md:pb-24">
      {/* Ambient background light glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-purple-900/25 via-amber-600/10 to-transparent blur-3xl pointer-events-none -z-10" />
      <div className="absolute -top-32 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Refined Editorial Copy */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Human unboxed metadata kicker */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold tracking-wider text-amber-300/90 uppercase">
              <span>{STORE_INFO.location}</span>
              <span aria-hidden="true">·</span>
              <span className="text-amber-400">O Melhor da Cidade</span>
              <span aria-hidden="true">·</span>
              <span className="text-stone-400">Gourmet Artesanal</span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-stone-100 leading-[1.1] [text-wrap:balance]">
              O Açaí Mais <span className="gold-gradient-text">Luxuoso & Cremoso</span> de Santa Maria.
            </h1>

            <p className="text-base sm:text-lg text-stone-300/90 leading-relaxed max-w-2xl font-light [text-wrap:pretty]">
              Esqueça o açaí aguado com cristais de gelo. Aqui no <strong className="font-semibold text-amber-200">Açaí do Japa</strong>, 
              trabalhamos apenas com a polpa nobre pura do Pará, batida lentamente na textura aveludada perfeita 
              e combinada com bombons Ferrero Rocher, ganaches nobres e frutas colhidas no dia.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onCustomizerClick}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-stone-950 font-bold text-sm shadow-xl shadow-amber-950/50 hover:shadow-amber-700/30 active:scale-[0.98] transition-all cursor-pointer whitespace-nowrap"
              >
                <Sparkles className="w-4 h-4 text-stone-950" />
                <span>Monte Seu Açaí dos Sonhos</span>
                <ArrowRight className="w-4 h-4 text-stone-950" />
              </button>

              <button
                onClick={onExploreMenu}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl border border-amber-400/30 bg-purple-950/40 hover:bg-purple-900/50 text-amber-200 font-semibold text-sm hover:border-amber-400/60 active:scale-[0.98] transition-all cursor-pointer whitespace-nowrap"
              >
                <span>Ver Cardápio Especial</span>
              </button>
            </div>

            {/* Adjacency Claim-to-Proof Metrics (Clean unboxed statistics) */}
            <div className="pt-6 border-t border-stone-800/80 grid grid-cols-3 gap-4 max-w-xl">
              <div>
                <div className="flex items-center gap-1 text-amber-400 font-mono font-bold text-xl sm:text-2xl tabular-nums">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span>4.9</span>
                </div>
                <p className="text-xs text-stone-400 mt-0.5">
                  Mais de 1.280 avaliações 5 estrelas
                </p>
              </div>

              <div>
                <div className="text-amber-100 font-mono font-bold text-xl sm:text-2xl tabular-nums">
                  100%
                </div>
                <p className="text-xs text-stone-400 mt-0.5">
                  Polpa pura do Pará sem cristais de gelo
                </p>
              </div>

              <div>
                <div className="flex items-center gap-1 text-amber-200 font-mono font-bold text-xl sm:text-2xl tabular-nums">
                  <Clock className="w-4 h-4 text-amber-400" />
                  <span>35 min</span>
                </div>
                <p className="text-xs text-stone-400 mt-0.5">
                  Entrega ultrarrápida térmica
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Anchor (Ferrero Masterpiece) */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer halo */}
              <div className="absolute -inset-1.5 bg-gradient-to-tr from-amber-500/40 via-purple-600/30 to-amber-300/30 rounded-3xl blur-xl opacity-75"></div>
              
              <div className="relative rounded-2xl overflow-hidden border border-amber-500/30 bg-[#150921] shadow-2xl shadow-purple-950/80 group">
                <img
                  src={heroImage}
                  alt="Açaí Supreme Ferrero Rocher do Açaí do Japa em Santa Maria Norte"
                  referrerPolicy="no-referrer"
                  className="w-full h-[380px] sm:h-[440px] object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Scrim overlay for legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none" />

                {/* Floating sensory highlight box */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl backdrop-blur-md bg-stone-950/80 border border-amber-400/30 text-left">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[11px] font-semibold text-amber-400 uppercase tracking-wider">
                      Criação Autoral Exclusiva
                    </span>
                    <span className="font-mono text-sm font-bold text-amber-200 tabular-nums">
                      R$ 28,90
                    </span>
                  </div>
                  <h3 className="font-display text-base font-bold text-stone-100">
                    Açaí Supreme Ferrero Rocher
                  </h3>
                  <p className="text-xs text-stone-300 line-clamp-2 mt-0.5">
                    Nutella farta, bombons Ferrero Rocher originais dourados, avelãs crocantes e açaí denso aveludado.
                  </p>
                  <div className="mt-3 flex items-center justify-between text-[11px] text-amber-300/90 pt-2 border-t border-white/10">
                    <span className="flex items-center gap-1">
                      <Flame className="w-3.5 h-3.5 text-amber-400" />
                      O item mais pedido de Santa Maria
                    </span>
                    <span className="underline font-medium hover:text-amber-200">
                      Disponível hoje
                    </span>
                  </div>
                </div>
              </div>

              {/* Decorative accent pill badge free trust marker */}
              <div className="absolute -bottom-3 -left-3 hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#0e0716] border border-amber-400/40 shadow-xl text-xs text-amber-200">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span className="font-semibold">Embalagem Térmica Anti-Derretimento</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
