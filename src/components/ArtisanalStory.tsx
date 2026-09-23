import React from 'react';
import { Sparkles, Shield, Heart, Award, Star, Quote } from 'lucide-react';
import cupuacuImage from '../assets/images/acai_creme_cupuacu_pistache_1790126078704.jpg';

export const ArtisanalStory: React.FC = () => {
  const testimonials = [
    {
      name: 'Mariana Silveira',
      role: 'Cliente VIP · Santa Maria Norte',
      text: 'O açaí com Ferrero Rocher e Nutella é surreal! Dá pra sentir de verdade a qualidade da polpa, sem aquela água no fundo ou pedras de gelo. O melhor da cidade sem dúvidas.',
      rating: 5,
    },
    {
      name: 'Thiago Nogueira',
      role: 'Atleta Musculação · Santa Maria Sul',
      text: 'O bowl com Paçoca Growth e Whey Isolado virou meu pré-treino sagrado. Chega super rápido e na temperatura perfeita. Atendimento impecável.',
      rating: 5,
    },
    {
      name: 'Camila & Lucas',
      role: 'Clientes Frequentes · Total Ville',
      text: 'Pedimos a Barca Imperial no final de semana e fomos surpreendidos pelo capricho! Embalagem linda, frutas fresquinhas fatiadas e muito morango com Nutella.',
      rating: 5,
    },
  ];

  return (
    <section id="experiencia" className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Visual Presentation */}
        <div className="lg:col-span-6 relative">
          <div className="relative rounded-2xl overflow-hidden border border-amber-500/30 shadow-2xl bg-stone-950">
            <img
              src={cupuacuImage}
              alt="Açaí artesanal cremoso com cupuaçu do Japa"
              referrerPolicy="no-referrer"
              className="w-full h-[400px] object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0e0716] via-transparent to-black/30" />

            <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl backdrop-blur-md bg-black/70 border border-white/10">
              <span className="text-amber-400 text-xs font-bold uppercase tracking-wider block">
                O Segredo do Ponto Perfeito
              </span>
              <p className="text-xs text-stone-200 mt-1">
                Equilíbrio exato de temperatura e batedura que transforma a fruta amazônica numa seda aveludada.
              </p>
            </div>
          </div>
        </div>

        {/* Right Story Pillars */}
        <div className="lg:col-span-6 space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-amber-400">
              <span>Tradição & Pureza</span>
              <span aria-hidden="true">·</span>
              <span className="text-stone-400">Desde o Primeiro Copo</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-stone-100 [text-wrap:balance]">
              Por Que o Nosso Açaí é Reconhecido Como o Melhor da Cidade?
            </h2>
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-xl border border-stone-800 bg-[#13091e] flex gap-3.5">
              <div className="w-8 h-8 rounded-lg bg-amber-400/20 text-amber-400 flex items-center justify-center shrink-0">
                <Shield className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-semibold text-sm text-stone-100">
                  Polpa Selecionada 100% Paraense
                </h4>
                <p className="text-xs text-stone-300 font-light mt-0.5">
                  Não misturamos água em excesso nem xaropes artificiais de baixa qualidade. O sabor característico da fruta permanece rico, encorpado e nutritivo.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-stone-800 bg-[#13091e] flex gap-3.5">
              <div className="w-8 h-8 rounded-lg bg-amber-400/20 text-amber-400 flex items-center justify-center shrink-0">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-semibold text-sm text-stone-100">
                  Toppings Genuínos de Primeira Linha
                </h4>
                <p className="text-xs text-stone-300 font-light mt-0.5">
                  Nutella legítima Ferrero, bombons Ferrero Rocher originais, Leite Ninho puro Nestlé e Paçoca da Growth Supplements. Sem imitações.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-stone-800 bg-[#13091e] flex gap-3.5">
              <div className="w-8 h-8 rounded-lg bg-amber-400/20 text-amber-400 flex items-center justify-center shrink-0">
                <Heart className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-semibold text-sm text-stone-100">
                  Embalagem Térmica Especial de Delivery
                </h4>
                <p className="text-xs text-stone-300 font-light mt-0.5">
                  Entregamos na sua casa em Santa Maria Norte e regiões adjacentes na consistência ideal para consumir, sem derretimentos.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Customer Testimonials Grid (Claim-to-Proof Adjacency) */}
      <div className="mt-16 pt-12 border-t border-stone-800/80">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-semibold uppercase tracking-widest text-amber-400 block mb-1">
            Depoimentos Reais
          </span>
          <h3 className="font-display text-2xl font-bold text-stone-100">
            A Opinião de Quem Já Provou e Aprovou
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-[#140a1e] border border-amber-500/15 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-stone-300 font-light leading-relaxed italic">
                  &ldquo;{t.text}&rdquo;
                </p>
              </div>
              <div className="pt-3 border-t border-stone-800/80">
                <div className="font-semibold text-xs text-stone-100">{t.name}</div>
                <div className="text-[11px] text-amber-400/80">{t.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
