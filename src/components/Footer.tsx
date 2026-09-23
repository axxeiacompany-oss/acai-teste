import React from 'react';
import { ExternalLink, Heart } from 'lucide-react';
import { STORE_INFO } from '../data/menu';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-amber-500/15 bg-[#07030b] text-stone-400 text-xs py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-stone-800">
          <div className="space-y-1.5 text-left">
            <div className="font-display text-xl font-bold tracking-wider text-amber-200">
              AÇAÍ DO JAPA
            </div>
            <p className="text-stone-400 text-xs max-w-md font-light">
              {STORE_INFO.slogan} · A mais alta sofisticação em açaí artesanal, receitas autorais e atendimento exclusivo em Santa Maria Norte.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs font-medium">
            <a
              href="#cardapio"
              className="text-stone-300 hover:text-amber-300 transition-colors"
            >
              Cardápio
            </a>
            <a
              href="#customizer-section"
              className="text-stone-300 hover:text-amber-300 transition-colors"
            >
              Monte o Seu
            </a>
            <a
              href="#experiencia"
              className="text-stone-300 hover:text-amber-300 transition-colors"
            >
              Qualidade & Origem
            </a>
            <a
              href="#fidelidade"
              className="text-stone-300 hover:text-amber-300 transition-colors"
            >
              Clube Fidelidade
            </a>
            <a
              href={STORE_INFO.yoogaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-amber-400 hover:text-amber-300 transition-colors font-semibold"
            >
              <span>Aplicativo Yooga</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <a
              href={`https://wa.me/${STORE_INFO.phone}?text=Ol%C3%A1%2C%20gostaria%20de%20fazer%20um%20pedido%20no%20A%C3%A7a%C3%AD%20do%20Japa!`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 transition-colors font-semibold"
            >
              <span>Pedir no WhatsApp</span>
            </a>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-stone-500 text-[11px]">
          <div>
            © {new Date().getFullYear()} Açaí do Japa - Santa Maria Norte, DF. Todos os direitos reservados.
          </div>
          <div className="flex items-center gap-2">
            <span>Desenvolvido com carinho para os amantes de açaí</span>
            <Heart className="w-3 h-3 text-red-400 fill-red-400" />
          </div>
        </div>
      </div>
    </footer>
  );
};
