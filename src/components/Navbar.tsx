import React, { useState } from 'react';
import { ShoppingBag, ExternalLink, Menu, X, Sparkles, MapPin } from 'lucide-react';
import { STORE_INFO } from '../data/menu';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onScrollToCustomizer: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onScrollToCustomizer,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#0e0716]/90 border-b border-amber-500/20 transition-all">
      {/* Subtle top operational announcement */}
      <div className="bg-gradient-to-r from-purple-950 via-[#1a0826] to-purple-950 text-amber-200/90 text-[11px] py-1 px-4 text-center border-b border-amber-500/10 flex items-center justify-center gap-2">
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
        <span className="font-medium tracking-wide">Aberto agora para Delivery & Retirada em Santa Maria Norte</span>
        <span className="text-amber-400/50">·</span>
        <span className="text-amber-300 font-semibold">Cupom JAPA10 para 10% OFF</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Zone 1: Brand Wordmark (Single text element as required) */}
        <a 
          href="#" 
          className="flex items-center gap-2.5 group"
        >
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-amber-400 via-amber-600 to-amber-700 flex items-center justify-center shadow-lg shadow-amber-950/50 border border-amber-300/40 group-hover:scale-105 transition-transform">
            <span className="text-stone-950 font-display font-black text-lg">J</span>
          </div>
          <div className="flex flex-col">
            <span className="font-display text-xl font-bold tracking-wider text-amber-100 group-hover:text-amber-300 transition-colors">
              AÇAÍ DO JAPA
            </span>
            <span className="text-[10px] text-amber-400/70 tracking-widest uppercase font-semibold">
              Santa Maria Norte
            </span>
          </div>
        </a>

        {/* Zone 2: Clean text navigation links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-300">
          <a href="#cardapio" className="hover:text-amber-300 transition-colors">
            Cardápio Nobre
          </a>
          <button 
            onClick={onScrollToCustomizer}
            className="hover:text-amber-300 transition-colors flex items-center gap-1.5 cursor-pointer text-amber-400 font-semibold"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Monte o Seu</span>
          </button>
          <a href="#experiencia" className="hover:text-amber-300 transition-colors">
            O Segredo do Japa
          </a>
          <a href="#fidelidade" className="hover:text-amber-300 transition-colors">
            Clube Fidelidade VIP
          </a>
          <a href="#localizacao" className="hover:text-amber-300 transition-colors">
            Localização
          </a>
        </nav>

        {/* Zone 3: Primary Actions */}
        <div className="flex items-center gap-3">
          {/* WhatsApp Direct Order Button */}
          <a
            href={`https://wa.me/${STORE_INFO.phone}?text=Ol%C3%A1%2C%20gostaria%20de%20fazer%20um%20pedido%20no%20A%C3%A7a%C3%AD%20do%20Japa!`}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-emerald-300 border border-emerald-500/40 rounded-lg bg-emerald-950/30 hover:bg-emerald-900/40 hover:border-emerald-400/60 transition-all"
            title="Fazer pedido direto pelo WhatsApp"
          >
            <span className="whitespace-nowrap">Pedir no WhatsApp</span>
          </a>

          {/* Cart Bag Button */}
          <button
            onClick={onOpenCart}
            aria-label="Abrir sacola de compras"
            className="relative flex items-center gap-2 px-3.5 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-xs shadow-md shadow-amber-900/30 active:scale-95 transition-all cursor-pointer whitespace-nowrap"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Sacola</span>
            {cartCount > 0 && (
              <span className="ml-0.5 bg-stone-950 text-amber-300 font-black text-[11px] px-1.5 py-0.2 rounded-full font-mono">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-stone-300 hover:text-amber-300 transition-colors"
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#13091e] border-b border-amber-500/20 px-6 py-5 space-y-4">
          <a
            href="#cardapio"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-medium text-stone-200 hover:text-amber-300"
          >
            Cardápio Nobre
          </a>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onScrollToCustomizer();
            }}
            className="block w-full text-left text-base font-medium text-amber-400 hover:text-amber-300"
          >
            ✦ Monte Seu Açaí dos Sonhos
          </button>
          <a
            href="#experiencia"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-medium text-stone-200 hover:text-amber-300"
          >
            O Segredo do Japa (Qualidade)
          </a>
          <a
            href="#fidelidade"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-medium text-stone-200 hover:text-amber-300"
          >
            Clube Fidelidade & Prêmios
          </a>
          <a
            href="#localizacao"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-medium text-stone-200 hover:text-amber-300"
          >
            Localização & Horários
          </a>

          <div className="pt-3 border-t border-purple-900/50 flex flex-col gap-2">
            <a
              href={`https://wa.me/${STORE_INFO.phone}?text=Ol%C3%A1%2C%20gostaria%20de%20fazer%20um%20pedido%20no%20A%C3%A7a%C3%AD%20do%20Japa!`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg border border-emerald-500/40 text-emerald-300 text-sm font-semibold bg-emerald-950/20"
            >
              Pedir pelo WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
