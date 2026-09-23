import React, { useState, useMemo } from 'react';
import { Search, Sparkles, Plus, Eye, Flame, ArrowUpRight } from 'lucide-react';
import { MENU_ITEMS } from '../data/menu';
import { MenuItem, CategoryId, CartItem } from '../types';

interface MenuSectionProps {
  onSelectProduct: (item: MenuItem) => void;
  onQuickAdd: (item: MenuItem) => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({ onSelectProduct, onQuickAdd }) => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('todos');
  const [searchQuery, setSearchQuery] = useState('');

  const categories: { id: CategoryId; label: string }[] = [
    { id: 'todos', label: 'Todos os Nobres' },
    { id: 'especiais', label: 'Assinaturas Gourmet' },
    { id: 'mix', label: 'Açaí Puro & Mixes' },
    { id: 'cremes', label: 'Cremes Nobres de Frutas' },
    { id: 'barcas', label: 'Barcas & Taças Especiais' },
    { id: 'fit', label: 'Linha Fit & Growth' },
  ];

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      const matchCategory = selectedCategory === 'todos' || item.category === selectedCategory;
      const matchSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tagline.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <section id="cardapio" className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Editorial Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-amber-500/20 gap-6">
        <div className="text-left space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-amber-400">
            <span>Cardápio Autoral</span>
            <span aria-hidden="true">·</span>
            <span className="text-stone-400">Edição 2026</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-stone-100">
            Criações de Alta Gastronomia
          </h2>
          <p className="text-sm text-stone-300 font-light max-w-xl">
            Cada taça é preparada com açaí artesanal fresco, ingredientes importados e nacionais de primeira linha.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar sabor, ninho, ferrero..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-[#140a1e] border border-amber-500/20 focus:border-amber-400 focus:outline-none text-xs text-stone-100 placeholder-stone-400 shadow-inner"
          />
        </div>
      </div>

      {/* Category Tabs (Segmented Buttons) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all whitespace-nowrap cursor-pointer ${
              selectedCategory === cat.id
                ? 'bg-amber-400 text-stone-950 font-bold shadow-md shadow-amber-950/50'
                : 'bg-[#140a1e] text-stone-300 border border-stone-800 hover:border-amber-400/40 hover:text-white'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Product Grid (3-column on desktop) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="group flex flex-col rounded-2xl overflow-hidden border border-amber-500/20 bg-[#140a1e] hover:border-amber-400/50 hover:shadow-xl hover:shadow-purple-950/60 transition-all duration-300 hover:-translate-y-1 text-left"
          >
            {/* Visual Header (Lead with imagery 65%-75% ratio) */}
            <div 
              className="relative h-56 w-full overflow-hidden bg-stone-950 cursor-pointer"
              onClick={() => onSelectProduct(item)}
            >
              <img
                src={item.image}
                alt={item.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#140a1e] via-transparent to-black/30 pointer-events-none" />

              {/* Badge (Single text badge, no pill sandwich) */}
              {item.badge && (
                <div className="absolute top-3 left-3">
                  <span className="text-[10px] font-bold tracking-wider px-2.5 py-1 rounded bg-stone-950/90 text-amber-300 border border-amber-400/30 backdrop-blur-sm shadow-sm">
                    {item.badge}
                  </span>
                </div>
              )}

              {/* Quick View Hover Cue */}
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectProduct(item);
                  }}
                  className="p-2 rounded-lg bg-stone-950/80 text-amber-300 hover:text-white transition-colors cursor-pointer border border-white/10 shadow-lg"
                  aria-label="Ver detalhes e degustação"
                >
                  <Eye className="w-3.5 h-3.5" />
                </button>
              </div>

              {item.caloriesEstimate && (
                <div className="absolute bottom-2 right-3 text-[11px] font-mono text-stone-300/80 bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm">
                  {item.caloriesEstimate}
                </div>
              )}
            </div>

            {/* Content Area */}
            <div className="p-5 flex flex-col flex-1 justify-between space-y-4">
              <div className="space-y-1.5">
                {/* Clean unboxed category kicker */}
                <div className="text-[11px] uppercase tracking-wider font-semibold text-amber-400/80">
                  {item.tagline}
                </div>

                <h3 
                  onClick={() => onSelectProduct(item)}
                  className="font-display text-lg font-bold text-stone-100 group-hover:text-amber-200 transition-colors cursor-pointer"
                >
                  {item.name}
                </h3>

                <p className="text-xs text-stone-300 line-clamp-2 font-light leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Price baseline & buy action */}
              <div className="pt-3 border-t border-stone-800/80 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-stone-400 block">
                    {item.sizes && item.sizes.length > 1 ? 'A partir de' : 'Preço'}
                  </span>
                  <span className="font-mono text-base sm:text-lg font-bold text-amber-300 tabular-nums">
                    R$ {item.price.toFixed(2).replace('.', ',')}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onSelectProduct(item)}
                    className="px-3 py-1.5 text-xs text-stone-300 hover:text-amber-200 border border-stone-700 hover:border-amber-400/40 rounded-lg transition-colors cursor-pointer"
                  >
                    Detalhes
                  </button>

                  <button
                    onClick={() => onQuickAdd(item)}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs shadow-md shadow-amber-950/40 active:scale-95 transition-all cursor-pointer whitespace-nowrap"
                    aria-label={`Adicionar ${item.name}`}
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Adicionar</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-12 text-stone-400">
          <p className="text-sm">Nenhum açaí encontrado para &ldquo;{searchQuery}&rdquo;.</p>
          <button
            onClick={() => {
              setSelectedCategory('todos');
              setSearchQuery('');
            }}
            className="mt-3 text-xs text-amber-300 underline cursor-pointer"
          >
            Limpar filtros
          </button>
        </div>
      )}
    </section>
  );
};
