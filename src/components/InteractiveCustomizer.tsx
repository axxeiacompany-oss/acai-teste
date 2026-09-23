import React, { useState, useMemo } from 'react';
import { Sparkles, Plus, Check, Trash2, ShoppingBag, MessageCircle, HelpCircle } from 'lucide-react';
import { CUSTOMIZER_DATA, STORE_INFO } from '../data/menu';
import { CartItem } from '../types';

interface InteractiveCustomizerProps {
  onAddToCart: (item: CartItem) => void;
}

export const InteractiveCustomizer: React.FC<InteractiveCustomizerProps> = ({ onAddToCart }) => {
  // Selection states
  const [selectedSize, setSelectedSize] = useState(CUSTOMIZER_DATA.sizes[1]); // 400ml default
  const [selectedBase, setSelectedBase] = useState(CUSTOMIZER_DATA.bases[0]); // puro
  const [selectedCreams, setSelectedCreams] = useState<typeof CUSTOMIZER_DATA.creams>([]);
  const [selectedFruits, setSelectedFruits] = useState<typeof CUSTOMIZER_DATA.fruits>([]);
  const [selectedToppings, setSelectedToppings] = useState<typeof CUSTOMIZER_DATA.toppings>([]);
  const [selectedSyrup, setSelectedSyrup] = useState(CUSTOMIZER_DATA.syrups[0]);
  const [specialNote, setSpecialNote] = useState('');
  const [activeCategoryTab, setActiveCategoryTab] = useState<'tamanho' | 'base' | 'recheios' | 'frutas' | 'toppings'>('tamanho');
  const [addedSuccess, setAddedSuccess] = useState(false);

  // Total price calculation
  const totalPrice = useMemo(() => {
    let total = selectedSize.basePrice;
    selectedCreams.forEach((c) => (total += c.price));
    selectedFruits.forEach((f) => (total += f.price));
    selectedToppings.forEach((t) => (total += t.price));
    if (selectedSyrup) total += selectedSyrup.price;
    return total;
  }, [selectedSize, selectedCreams, selectedFruits, selectedToppings, selectedSyrup]);

  // Toggle helper
  const toggleCream = (cream: typeof CUSTOMIZER_DATA.creams[0]) => {
    if (selectedCreams.some((c) => c.id === cream.id)) {
      setSelectedCreams(selectedCreams.filter((c) => c.id !== cream.id));
    } else {
      setSelectedCreams([...selectedCreams, cream]);
    }
  };

  const toggleFruit = (fruit: typeof CUSTOMIZER_DATA.fruits[0]) => {
    if (selectedFruits.some((f) => f.id === fruit.id)) {
      setSelectedFruits(selectedFruits.filter((f) => f.id !== fruit.id));
    } else {
      setSelectedFruits([...selectedFruits, fruit]);
    }
  };

  const toggleTopping = (topping: typeof CUSTOMIZER_DATA.toppings[0]) => {
    if (selectedToppings.some((t) => t.id === topping.id)) {
      setSelectedToppings(selectedToppings.filter((t) => t.id !== topping.id));
    } else {
      setSelectedToppings([...selectedToppings, topping]);
    }
  };

  const handleReset = () => {
    setSelectedCreams([]);
    setSelectedFruits([]);
    setSelectedToppings([]);
    setSelectedSyrup(CUSTOMIZER_DATA.syrups[0]);
    setSpecialNote('');
  };

  const handleAddCustomToCart = () => {
    const customDetails: string[] = [
      `Base: ${selectedBase.name}`,
      ...selectedCreams.map((c) => `+ ${c.name}`),
      ...selectedFruits.map((f) => `+ ${f.name}`),
      ...selectedToppings.map((t) => `+ ${t.name}`),
      selectedSyrup && selectedSyrup.id !== 'sem-calda' ? `Calda: ${selectedSyrup.name}` : '',
    ].filter(Boolean);

    const cartItem: CartItem = {
      id: `custom-${Date.now()}`,
      name: `Açaí Customizado Nobre (${selectedSize.volume})`,
      sizeName: selectedSize.name,
      price: totalPrice,
      quantity: 1,
      customDetails,
      specialInstructions: specialNote,
    };

    onAddToCart(cartItem);
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 2400);
  };

  const handleOrderDirectWhatsApp = () => {
    const details = [
      `*NOVO PEDIDO PERSONALIZADO - AÇAÍ DO JAPA*`,
      `*Tamanho:* ${selectedSize.name}`,
      `*Base:* ${selectedBase.name}`,
      selectedCreams.length > 0 ? `*Recheios:* ${selectedCreams.map((c) => c.name).join(', ')}` : '',
      selectedFruits.length > 0 ? `*Frutas:* ${selectedFruits.map((f) => f.name).join(', ')}` : '',
      selectedToppings.length > 0 ? `*Toppings:* ${selectedToppings.map((t) => t.name).join(', ')}` : '',
      selectedSyrup && selectedSyrup.id !== 'sem-calda' ? `*Calda:* ${selectedSyrup.name}` : '',
      specialNote ? `*Observações:* ${specialNote}` : '',
      `*Valor Total:* R$ ${totalPrice.toFixed(2).replace('.', ',')}`,
      `_Feito através do site de apresentação do Japa_`,
    ]
      .filter(Boolean)
      .join('\n');

    const encoded = encodeURIComponent(details);
    window.open(`https://wa.me/${STORE_INFO.phone}?text=${encoded}`, '_blank');
  };

  return (
    <section id="customizer-section" className="py-16 md:py-24 relative overflow-hidden bg-[#0d0615] border-t border-b border-amber-500/10">
      {/* Decorative subtle aura */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-purple-900/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-amber-400">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Experiência Interativa em Tempo Real</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-100 [text-wrap:balance]">
            Monte o Seu Açaí dos Sonhos
          </h2>
          <p className="text-sm sm:text-base text-stone-300 font-light max-w-xl mx-auto">
            Escolha sua base favorita, adicione cremes nobres, frutas frescas e bombons. 
            Veja a montagem visual da sua taça em tempo real com cálculo instantâneo.
          </p>
        </div>

        {/* Studio Workspace Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Glass Cup Visualizer (Desktop Sticky) */}
          <div className="lg:col-span-5 bg-[#140a1e] border border-amber-500/20 rounded-2xl p-6 shadow-2xl relative lg:sticky lg:top-24">
            <div className="flex items-center justify-between pb-4 border-b border-stone-800">
              <div className="text-left">
                <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block">
                  Pré-visualização da Taça
                </span>
                <span className="text-xs text-stone-400">
                  {selectedSize.name} · {selectedBase.name}
                </span>
              </div>
              <button
                onClick={handleReset}
                className="flex items-center gap-1 text-[11px] text-stone-400 hover:text-red-400 transition-colors cursor-pointer"
                title="Limpar adições"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Limpar</span>
              </button>
            </div>

            {/* Cup Graphic Simulation */}
            <div className="py-8 flex flex-col items-center justify-center min-h-[340px] relative">
              {/* Luxury Glass Outer Vessel */}
              <div className="relative w-48 sm:w-56 h-72 rounded-b-3xl border-2 border-white/20 bg-gradient-to-b from-white/5 to-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-sm overflow-hidden flex flex-col justify-end p-2">
                {/* Top Garnish Layer (Fruits & Toppings Display) */}
                <div className="absolute top-2 left-2 right-2 flex flex-wrap gap-1 justify-center z-20">
                  {selectedToppings.map((t) => (
                    <span
                      key={t.id}
                      className="text-[10px] font-bold bg-amber-400 text-stone-950 px-1.5 py-0.5 rounded shadow-sm animate-bounce"
                    >
                      {t.id === 'ferrero' ? '👑 Ferrero' : t.name.split(' ')[0]}
                    </span>
                  ))}
                  {selectedFruits.map((f) => (
                    <span key={f.id} className="text-sm">
                      {f.icon}
                    </span>
                  ))}
                </div>

                {/* Drizzle & Syrup Top Coat */}
                {selectedSyrup && selectedSyrup.id !== 'sem-calda' && (
                  <div className="w-full h-4 bg-amber-300/60 rounded-t-lg mb-1 animate-pulse" />
                )}

                {/* Cream Interlayer (If any selected) */}
                {selectedCreams.map((cream) => (
                  <div
                    key={cream.id}
                    className="w-full h-6 rounded-md mb-1 transition-all duration-500 border-t border-white/20 shadow-inner flex items-center justify-center text-[10px] font-semibold text-stone-900 tracking-tight"
                    style={{ backgroundColor: cream.color }}
                  >
                    {cream.name}
                  </div>
                ))}

                {/* Main Açaí Base Layer */}
                <div
                  className="w-full flex-1 rounded-b-2xl transition-colors duration-500 flex flex-col items-center justify-center text-center p-2 relative overflow-hidden"
                  style={{ backgroundColor: selectedBase.color }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
                  <span className="font-display font-bold text-amber-200 text-xs tracking-wider relative z-10">
                    AÇAÍ DO JAPA
                  </span>
                  <span className="text-[10px] text-amber-300/80 font-mono relative z-10">
                    {selectedSize.volume}
                  </span>
                </div>
              </div>

              {/* Cup Pedestal Shadow */}
              <div className="w-36 h-3 bg-black/60 rounded-full blur-sm mt-3" />
            </div>

            {/* Price & Summary Card */}
            <div className="mt-4 pt-4 border-t border-stone-800 space-y-3">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-xs text-stone-400 block">Total do Seu Açaí</span>
                  <span className="text-xs text-amber-400/80">
                    {selectedCreams.length + selectedFruits.length + selectedToppings.length} itens adicionados
                  </span>
                </div>
                <div className="text-right">
                  <span className="font-mono text-2xl sm:text-3xl font-bold text-amber-300 tabular-nums">
                    R$ {totalPrice.toFixed(2).replace('.', ',')}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                <button
                  onClick={handleAddCustomToCart}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-stone-950 font-bold text-xs shadow-lg shadow-amber-950/40 active:scale-95 transition-all cursor-pointer whitespace-nowrap"
                >
                  {addedSuccess ? (
                    <>
                      <Check className="w-4 h-4 text-stone-950" />
                      <span>Adicionado!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4 text-stone-950" />
                      <span>Adicionar à Sacola</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleOrderDirectWhatsApp}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-emerald-500/40 bg-emerald-950/30 hover:bg-emerald-900/40 text-emerald-300 font-semibold text-xs active:scale-95 transition-all cursor-pointer whitespace-nowrap"
                  title="Enviar personalização para o WhatsApp"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <span>Pedir no WhatsApp</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Customizer Selector Tabs & Controls */}
          <div className="lg:col-span-7 space-y-6">
            {/* Category Sub-Navigation Segmented Control */}
            <div className="flex items-center gap-1.5 p-1.5 bg-[#12071a] rounded-xl border border-amber-500/20 overflow-x-auto no-scrollbar">
              {[
                { id: 'tamanho', label: '1. Tamanho' },
                { id: 'base', label: '2. Base' },
                { id: 'recheios', label: '3. Recheios' },
                { id: 'frutas', label: '4. Frutas' },
                { id: 'toppings', label: '5. Toppings' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveCategoryTab(tab.id as any)}
                  className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                    activeCategoryTab === tab.id
                      ? 'bg-amber-400 text-stone-950 shadow-md font-bold'
                      : 'text-stone-300 hover:text-white hover:bg-stone-800/40'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Step 1: Tamanho */}
            {activeCategoryTab === 'tamanho' && (
              <div className="space-y-4">
                <div className="text-left">
                  <h3 className="font-display text-lg font-bold text-stone-100">
                    Escolha a Medida Perfeita
                  </h3>
                  <p className="text-xs text-stone-400">
                    Desde porções individuais até nossa consagrada Barca Imperial para comemorações.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {CUSTOMIZER_DATA.sizes.map((size) => {
                    const isSelected = selectedSize.id === size.id;
                    return (
                      <button
                        key={size.id}
                        onClick={() => setSelectedSize(size)}
                        className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                          isSelected
                            ? 'border-amber-400 bg-amber-950/20 ring-1 ring-amber-400 shadow-md'
                            : 'border-stone-800 bg-[#140a1e] hover:border-amber-400/40'
                        }`}
                      >
                        <div>
                          <div className="font-semibold text-sm text-stone-100">
                            {size.name}
                          </div>
                          <span className="text-xs text-stone-400">
                            Volume: {size.volume}
                          </span>
                        </div>
                        <div className="font-mono font-bold text-amber-300 tabular-nums text-sm">
                          R$ {size.basePrice.toFixed(2).replace('.', ',')}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Step 2: Base do Açaí */}
            {activeCategoryTab === 'base' && (
              <div className="space-y-4">
                <div className="text-left">
                  <h3 className="font-display text-lg font-bold text-stone-100">
                    Escolha a Base do Seu Açaí
                  </h3>
                  <p className="text-xs text-stone-400">
                    Polpa pura do Pará com batedura aveludada exclusiva ou misturas de frutas naturais.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {CUSTOMIZER_DATA.bases.map((base) => {
                    const isSelected = selectedBase.id === base.id;
                    return (
                      <button
                        key={base.id}
                        onClick={() => setSelectedBase(base)}
                        className={`p-4 rounded-xl border text-left transition-all cursor-pointer relative overflow-hidden ${
                          isSelected
                            ? 'border-amber-400 bg-amber-950/20 ring-1 ring-amber-400'
                            : 'border-stone-800 bg-[#140a1e] hover:border-amber-400/40'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className="w-5 h-5 rounded-full border border-white/20 shadow-sm shrink-0"
                            style={{ backgroundColor: base.color }}
                          />
                          <div>
                            <div className="font-semibold text-sm text-stone-100">
                              {base.name}
                            </div>
                            <span className="text-xs text-stone-400 block mt-0.5">
                              {base.description}
                            </span>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Step 3: Recheios & Caldas */}
            {activeCategoryTab === 'recheios' && (
              <div className="space-y-4">
                <div className="text-left">
                  <h3 className="font-display text-lg font-bold text-stone-100">
                    Cremes & Recheios Nobres
                  </h3>
                  <p className="text-xs text-stone-400">
                    Intercalados em camadas ricas no interior da sua taça.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {CUSTOMIZER_DATA.creams.map((cream) => {
                    const isSelected = selectedCreams.some((c) => c.id === cream.id);
                    return (
                      <button
                        key={cream.id}
                        onClick={() => toggleCream(cream)}
                        className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                          isSelected
                            ? 'border-amber-400 bg-amber-950/20 ring-1 ring-amber-400'
                            : 'border-stone-800 bg-[#140a1e] hover:border-amber-400/40'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <div
                            className="w-4 h-4 rounded-full border border-white/20 shrink-0"
                            style={{ backgroundColor: cream.color }}
                          />
                          <span className="font-medium text-sm text-stone-100">
                            {cream.name}
                          </span>
                        </div>
                        <span className="font-mono text-xs font-semibold text-amber-300 tabular-nums">
                          + R$ {cream.price.toFixed(2).replace('.', ',')}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Calda Selector */}
                <div className="pt-4 border-t border-stone-800 text-left">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block mb-2">
                    Calda de Finalização
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {CUSTOMIZER_DATA.syrups.map((syrup) => {
                      const isSelected = selectedSyrup?.id === syrup.id;
                      return (
                        <button
                          key={syrup.id}
                          onClick={() => setSelectedSyrup(syrup)}
                          className={`p-3 rounded-lg border text-left transition-all cursor-pointer flex items-center justify-between text-xs ${
                            isSelected
                              ? 'border-amber-400 bg-amber-950/20 text-amber-200'
                              : 'border-stone-800 bg-[#140a1e] text-stone-300 hover:border-amber-400/40'
                          }`}
                        >
                          <span>{syrup.name}</span>
                          <span className="font-mono tabular-nums text-amber-300">
                            {syrup.price > 0 ? `+ R$ ${syrup.price.toFixed(2).replace('.', ',')}` : 'Grátis'}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Frutas Frescas */}
            {activeCategoryTab === 'frutas' && (
              <div className="space-y-4">
                <div className="text-left">
                  <h3 className="font-display text-lg font-bold text-stone-100">
                    Frutas Frescas Selecionadas
                  </h3>
                  <p className="text-xs text-stone-400">
                    Higienizadas e fatiadas exclusivamente na hora do preparo.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {CUSTOMIZER_DATA.fruits.map((fruit) => {
                    const isSelected = selectedFruits.some((f) => f.id === fruit.id);
                    return (
                      <button
                        key={fruit.id}
                        onClick={() => toggleFruit(fruit)}
                        className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                          isSelected
                            ? 'border-amber-400 bg-amber-950/20 ring-1 ring-amber-400'
                            : 'border-stone-800 bg-[#140a1e] hover:border-amber-400/40'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{fruit.icon}</span>
                          <span className="font-medium text-sm text-stone-100">
                            {fruit.name}
                          </span>
                        </div>
                        <span className="font-mono text-xs font-semibold text-amber-300 tabular-nums">
                          + R$ {fruit.price.toFixed(2).replace('.', ',')}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Step 5: Toppings & Chocolates */}
            {activeCategoryTab === 'toppings' && (
              <div className="space-y-4">
                <div className="text-left">
                  <h3 className="font-display text-lg font-bold text-stone-100">
                    Toppings, Chocolates & Paçoca Growth
                  </h3>
                  <p className="text-xs text-stone-400">
                    A coroa da sua sobremesa: bombons inteiros, crocâncias e suplementos.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {CUSTOMIZER_DATA.toppings.map((topping) => {
                    const isSelected = selectedToppings.some((t) => t.id === topping.id);
                    return (
                      <button
                        key={topping.id}
                        onClick={() => toggleTopping(topping)}
                        className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                          isSelected
                            ? 'border-amber-400 bg-amber-950/20 ring-1 ring-amber-400'
                            : 'border-stone-800 bg-[#140a1e] hover:border-amber-400/40'
                        }`}
                      >
                        <div>
                          <div className="font-medium text-sm text-stone-100 flex items-center gap-1.5">
                            {topping.id === 'ferrero' && <span>👑</span>}
                            {topping.id === 'pacoca-growth' && <span>💪</span>}
                            <span>{topping.name}</span>
                          </div>
                          {topping.id === 'pacoca-growth' && (
                            <span className="text-[10px] text-emerald-400 block">
                              Oficial Growth Supplements 23g
                            </span>
                          )}
                        </div>
                        <span className="font-mono text-xs font-semibold text-amber-300 tabular-nums">
                          + R$ {topping.price.toFixed(2).replace('.', ',')}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Special Instructions Input */}
            <div className="pt-4 border-t border-stone-800 text-left">
              <label htmlFor="custom-notes" className="text-xs font-semibold text-stone-300 block mb-1.5">
                Observações Especiais para a Cozinha do Japa (opcional)
              </label>
              <input
                id="custom-notes"
                type="text"
                placeholder="Ex: pouco leite condensado, morangos no fundo, enviar colheres extras..."
                value={specialNote}
                onChange={(e) => setSpecialNote(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-[#12071a] border border-stone-800 focus:border-amber-400 focus:outline-none text-xs text-stone-200 placeholder-stone-500"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
