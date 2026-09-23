import React, { useState } from 'react';
import { X, Plus, Minus, ShoppingBag, Flame, Sparkles, Check } from 'lucide-react';
import { MenuItem, CartItem } from '../types';

interface ProductModalProps {
  item: MenuItem | null;
  onClose: () => void;
  onAddToCart: (cartItem: CartItem) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({ item, onClose, onAddToCart }) => {
  if (!item) return null;

  const [selectedSize, setSelectedSize] = useState(
    item.sizes && item.sizes.length > 0 ? item.sizes[0] : null
  );
  const [quantity, setQuantity] = useState(1);
  const [extraNutella, setExtraNutella] = useState(false);
  const [extraNinho, setExtraNinho] = useState(false);
  const [extraFerrero, setExtraFerrero] = useState(false);
  const [userNote, setUserNote] = useState('');
  const [added, setAdded] = useState(false);

  // Calculate current unit price
  const basePrice = selectedSize ? selectedSize.price : item.price;
  let unitPrice = basePrice;
  if (extraNutella) unitPrice += 5.5;
  if (extraNinho) unitPrice += 3.0;
  if (extraFerrero) unitPrice += 4.5;
  const totalPrice = unitPrice * quantity;

  const handleConfirm = () => {
    const customDetails: string[] = [];
    if (selectedSize) customDetails.push(`Tamanho: ${selectedSize.name} (${selectedSize.volume})`);
    if (extraNutella) customDetails.push('+ Adicional Nutella Pura (+R$ 5,50)');
    if (extraNinho) customDetails.push('+ Adicional Leite Ninho Farto (+R$ 3,00)');
    if (extraFerrero) customDetails.push('+ 1x Bombom Ferrero Rocher Dourado (+R$ 4,50)');

    const cartItem: CartItem = {
      id: `${item.id}-${Date.now()}`,
      menuItemId: item.id,
      name: item.name,
      sizeName: selectedSize ? selectedSize.name : undefined,
      price: unitPrice,
      quantity,
      image: item.image,
      customDetails,
      specialInstructions: userNote,
    };

    onAddToCart(cartItem);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div 
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#13081e] border border-amber-500/30 rounded-2xl shadow-2xl text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-stone-950/70 hover:bg-stone-900 text-stone-300 hover:text-white transition-colors cursor-pointer border border-white/10"
          aria-label="Fechar modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Product Visual Banner */}
        <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-stone-950">
          <img
            src={item.image}
            alt={item.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#13081e] via-transparent to-black/40" />

          {item.badge && (
            <div className="absolute top-4 left-4">
              <span className="text-xs font-bold px-3 py-1 rounded bg-amber-400 text-stone-950 shadow-md">
                {item.badge}
              </span>
            </div>
          )}

          <div className="absolute bottom-4 left-6 right-6">
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-300/90 block">
              {item.tagline}
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-stone-100">
              {item.name}
            </h2>
          </div>
        </div>

        {/* Details Content */}
        <div className="p-6 space-y-6">
          <p className="text-sm text-stone-300 leading-relaxed font-light">
            {item.description}
          </p>

          {/* Highlights & Ingredients */}
          <div className="bg-[#1a0c28] border border-amber-500/15 rounded-xl p-4 space-y-2">
            <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block">
              Composição & Ingredientes Nobres
            </span>
            <div className="flex flex-wrap gap-1.5 text-xs text-stone-300">
              {item.ingredients.map((ing, idx) => (
                <span key={idx} className="bg-stone-900/60 px-2.5 py-1 rounded border border-white/5">
                  {ing}
                </span>
              ))}
            </div>
            {item.highlight && (
              <div className="pt-2 text-xs text-amber-200/90 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>{item.highlight}</span>
              </div>
            )}
          </div>

          {/* Size Selector (if available) */}
          {item.sizes && item.sizes.length > 0 && (
            <div className="space-y-2">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
                Escolha o Tamanho
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {item.sizes.map((sz) => {
                  const isSelected = selectedSize?.name === sz.name;
                  return (
                    <button
                      key={sz.name}
                      onClick={() => setSelectedSize(sz)}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'border-amber-400 bg-amber-950/30 text-amber-200 ring-1 ring-amber-400'
                          : 'border-stone-800 bg-stone-900/50 text-stone-300 hover:border-stone-700'
                      }`}
                    >
                      <div className="font-semibold text-xs text-stone-100">{sz.name}</div>
                      <div className="text-[11px] text-stone-400">{sz.volume}</div>
                      <div className="font-mono text-xs font-bold text-amber-300 mt-1 tabular-nums">
                        R$ {sz.price.toFixed(2).replace('.', ',')}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Optional Gourmet Add-ons */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
              Adicionais Recomendados pelo Japa
            </span>
            <div className="space-y-2">
              <label className="flex items-center justify-between p-3 rounded-xl border border-stone-800 bg-[#170924] cursor-pointer hover:border-amber-400/40">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={extraFerrero}
                    onChange={(e) => setExtraFerrero(e.target.checked)}
                    className="rounded border-stone-700 text-amber-500 focus:ring-amber-400 w-4 h-4 accent-amber-500"
                  />
                  <span className="text-xs text-stone-200">
                    + 1x Bombom Ferrero Rocher Original Dourado
                  </span>
                </div>
                <span className="font-mono text-xs text-amber-300 font-bold tabular-nums">
                  + R$ 4,50
                </span>
              </label>

              <label className="flex items-center justify-between p-3 rounded-xl border border-stone-800 bg-[#170924] cursor-pointer hover:border-amber-400/40">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={extraNutella}
                    onChange={(e) => setExtraNutella(e.target.checked)}
                    className="rounded border-stone-700 text-amber-500 focus:ring-amber-400 w-4 h-4 accent-amber-500"
                  />
                  <span className="text-xs text-stone-200">
                    + Camada Extra Farta de Nutella Pura
                  </span>
                </div>
                <span className="font-mono text-xs text-amber-300 font-bold tabular-nums">
                  + R$ 5,50
                </span>
              </label>

              <label className="flex items-center justify-between p-3 rounded-xl border border-stone-800 bg-[#170924] cursor-pointer hover:border-amber-400/40">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={extraNinho}
                    onChange={(e) => setExtraNinho(e.target.checked)}
                    className="rounded border-stone-700 text-amber-500 focus:ring-amber-400 w-4 h-4 accent-amber-500"
                  />
                  <span className="text-xs text-stone-200">
                    + Dose Generosa de Leite Ninho em Pó
                  </span>
                </div>
                <span className="font-mono text-xs text-amber-300 font-bold tabular-nums">
                  + R$ 3,00
                </span>
              </label>
            </div>
          </div>

          {/* Observations */}
          <div>
            <label className="text-xs font-semibold text-stone-300 block mb-1">
              Observações Especiais
            </label>
            <input
              type="text"
              placeholder="Ex: pouco leite condensado, frutas no fundo..."
              value={userNote}
              onChange={(e) => setUserNote(e.target.value)}
              className="w-full px-3.5 py-2 text-xs rounded-xl bg-stone-900/80 border border-stone-800 focus:border-amber-400 focus:outline-none text-stone-100"
            />
          </div>

          {/* Quantity & Add to Cart Footer */}
          <div className="pt-4 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-xs text-stone-400">Quantidade:</span>
              <div className="flex items-center border border-stone-700 rounded-lg overflow-hidden bg-stone-900">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1.5 text-stone-300 hover:text-white hover:bg-stone-800 cursor-pointer"
                  aria-label="Diminuir"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="px-3 font-mono text-xs font-bold text-stone-100 tabular-nums">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1.5 text-stone-300 hover:text-white hover:bg-stone-800 cursor-pointer"
                  aria-label="Aumentar"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="flex items-center gap-4 w-full sm:w-auto justify-end">
              <div className="text-right">
                <span className="text-[10px] text-stone-400 block">Subtotal</span>
                <span className="font-mono text-lg font-bold text-amber-300 tabular-nums">
                  R$ {totalPrice.toFixed(2).replace('.', ',')}
                </span>
              </div>

              <button
                onClick={handleConfirm}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-stone-950 font-bold text-xs shadow-lg shadow-amber-950/40 active:scale-95 transition-all cursor-pointer whitespace-nowrap"
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4 text-stone-950" />
                    <span>Adicionado à Sacola!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4 text-stone-950" />
                    <span>Adicionar à Sacola</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
