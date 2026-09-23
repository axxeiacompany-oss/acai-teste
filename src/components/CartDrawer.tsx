import React, { useState } from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, MessageCircle, ExternalLink, Sparkles, Check } from 'lucide-react';
import { CartItem } from '../types';
import { STORE_INFO } from '../data/menu';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  if (!isOpen) return null;

  const [orderType, setOrderType] = useState<'delivery' | 'retirada'>('delivery');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [couponCode, setCouponCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  const [couponError, setCouponError] = useState('');

  // Calculations
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const isFreeDelivery = subtotal >= STORE_INFO.freeDeliveryThreshold || orderType === 'retirada';
  const deliveryFee = orderType === 'retirada' ? 0 : isFreeDelivery ? 0 : STORE_INFO.deliveryFee;
  const discountAmount = discountApplied ? subtotal * 0.1 : 0;
  const finalTotal = Math.max(0, subtotal - discountAmount + deliveryFee);

  const handleApplyCoupon = () => {
    if (couponCode.trim().toUpperCase() === 'JAPA10') {
      setDiscountApplied(true);
      setCouponError('');
    } else {
      setCouponError('Cupom inválido. Experimente usar JAPA10');
    }
  };

  const handleCheckoutWhatsApp = () => {
    if (items.length === 0) return;

    const itemListText = items
      .map((item, idx) => {
        let text = `${idx + 1}. *${item.name}* (x${item.quantity}) - R$ ${(item.price * item.quantity).toFixed(2).replace('.', ',')}`;
        if (item.customDetails && item.customDetails.length > 0) {
          text += `\n   ${item.customDetails.join('\n   ')}`;
        }
        if (item.specialInstructions) {
          text += `\n   _Obs: ${item.specialInstructions}_`;
        }
        return text;
      })
      .join('\n\n');

    const message = [
      `🍇 *NOVO PEDIDO - AÇAÍ DO JAPA (SANTA MARIA NORTE)* 🍇`,
      `----------------------------------------`,
      `*Cliente:* ${customerName || 'Não informado'}`,
      `*Telefone:* ${customerPhone || 'Não informado'}`,
      `*Modalidade:* ${orderType === 'delivery' ? 'Entrega em Domicílio' : 'Retirada no Balcão'}`,
      orderType === 'delivery' && deliveryAddress ? `*Endereço:* ${deliveryAddress}` : '',
      `----------------------------------------`,
      `*ITENS DO PEDIDO:*`,
      itemListText,
      `----------------------------------------`,
      `*Subtotal:* R$ ${subtotal.toFixed(2).replace('.', ',')}`,
      discountApplied ? `*Desconto Cupom (JAPA10):* - R$ ${discountAmount.toFixed(2).replace('.', ',')}` : '',
      orderType === 'delivery' ? `*Taxa de Entrega:* ${deliveryFee === 0 ? 'GRÁTIS' : `R$ ${deliveryFee.toFixed(2).replace('.', ',')}`}` : '',
      `*VALOR TOTAL:* R$ ${finalTotal.toFixed(2).replace('.', ',')}`,
      `----------------------------------------`,
      `_Agradecemos a preferência! O melhor açaí da cidade._`,
    ]
      .filter(Boolean)
      .join('\n');

    const url = `https://wa.me/${STORE_INFO.phone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#13081e] border-l border-amber-500/20 text-stone-100 flex flex-col shadow-2xl">
          {/* Header */}
          <div className="p-5 border-b border-stone-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-amber-400" />
              <h2 className="font-display text-lg font-bold text-stone-100">
                Sua Sacola Gourmet
              </h2>
              {items.length > 0 && (
                <span className="text-xs bg-amber-400/20 text-amber-300 px-2 py-0.5 rounded font-mono font-bold">
                  {items.length} {items.length === 1 ? 'item' : 'itens'}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              {items.length > 0 && (
                <button
                  onClick={onClearCart}
                  className="text-xs text-stone-400 hover:text-red-400 transition-colors p-1"
                  title="Esvaziar sacola"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer"
                aria-label="Fechar"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Body: Items or Empty */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-stone-900 border border-stone-800 flex items-center justify-center mx-auto text-amber-400/40">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-display text-base font-bold text-stone-200">
                    Sua sacola está vazia
                  </h3>
                  <p className="text-xs text-stone-400 max-w-xs mx-auto">
                    Escolha suas criações favoritas no cardápio ou monte seu açaí artesanal personalizado.
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs cursor-pointer shadow-md"
                >
                  Explorar Sabores Nobres
                </button>
              </div>
            ) : (
              <>
                {/* Order Type Toggle */}
                <div className="grid grid-cols-2 gap-2 p-1 bg-stone-900/80 rounded-xl border border-stone-800 text-xs font-semibold">
                  <button
                    onClick={() => setOrderType('delivery')}
                    className={`py-2 rounded-lg transition-all cursor-pointer ${
                      orderType === 'delivery'
                        ? 'bg-amber-400 text-stone-950 font-bold shadow-sm'
                        : 'text-stone-400 hover:text-stone-200'
                    }`}
                  >
                    🛵 Entrega em Casa
                  </button>
                  <button
                    onClick={() => setOrderType('retirada')}
                    className={`py-2 rounded-lg transition-all cursor-pointer ${
                      orderType === 'retirada'
                        ? 'bg-amber-400 text-stone-950 font-bold shadow-sm'
                        : 'text-stone-400 hover:text-stone-200'
                    }`}
                  >
                    🛍️ Retirada no Balcão
                  </button>
                </div>

                {/* Free delivery tracker banner */}
                {orderType === 'delivery' && (
                  <div className="text-[11px] p-2.5 rounded-lg bg-amber-950/30 border border-amber-500/20 text-amber-200">
                    {subtotal >= STORE_INFO.freeDeliveryThreshold ? (
                      <span className="text-emerald-400 font-semibold flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" /> Parabéns! Você ganhou Entrega Grátis!
                      </span>
                    ) : (
                      <span>
                        Faltam apenas <strong className="font-mono text-amber-300">R$ {(STORE_INFO.freeDeliveryThreshold - subtotal).toFixed(2).replace('.', ',')}</strong> para Entrega Grátis em Santa Maria.
                      </span>
                    )}
                  </div>
                )}

                {/* Item List */}
                <div className="space-y-3">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="p-3.5 rounded-xl border border-stone-800 bg-[#160a22] space-y-2 text-left"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="font-semibold text-xs text-stone-100">
                            {item.name}
                          </div>
                          {item.sizeName && (
                            <span className="text-[11px] text-amber-400 font-medium block">
                              {item.sizeName}
                            </span>
                          )}
                        </div>
                        <span className="font-mono text-xs font-bold text-amber-300 tabular-nums shrink-0">
                          R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}
                        </span>
                      </div>

                      {/* Custom details */}
                      {item.customDetails && item.customDetails.length > 0 && (
                        <div className="text-[10px] text-stone-400 space-y-0.5 border-l-2 border-amber-500/30 pl-2">
                          {item.customDetails.map((detail, dIdx) => (
                            <div key={dIdx}>{detail}</div>
                          ))}
                        </div>
                      )}

                      {item.specialInstructions && (
                        <div className="text-[10px] text-stone-400 italic">
                          Obs: {item.specialInstructions}
                        </div>
                      )}

                      {/* Quantity Stepper & Remove */}
                      <div className="flex items-center justify-between pt-2 border-t border-white/5">
                        <div className="flex items-center border border-stone-700 rounded-md overflow-hidden bg-stone-900">
                          <button
                            onClick={() => onUpdateQuantity(item.id, -1)}
                            className="px-2 py-1 text-stone-400 hover:text-white hover:bg-stone-800 cursor-pointer"
                            aria-label="Diminuir"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2.5 font-mono text-xs font-bold text-stone-200 tabular-nums">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, 1)}
                            className="px-2 py-1 text-stone-400 hover:text-white hover:bg-stone-800 cursor-pointer"
                            aria-label="Aumentar"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-[11px] text-stone-500 hover:text-red-400 transition-colors"
                        >
                          Remover
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Customer Details Form */}
                <div className="p-4 rounded-xl border border-stone-800 bg-[#160a22] space-y-2.5 text-left">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 block">
                    Dados de Entrega / Identificação
                  </span>

                  <input
                    type="text"
                    placeholder="Seu Nome completo *"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg bg-stone-900 border border-stone-800 focus:border-amber-400 focus:outline-none text-stone-100"
                  />

                  <input
                    type="tel"
                    placeholder="Seu WhatsApp (DDD + Número) *"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg bg-stone-900 border border-stone-800 focus:border-amber-400 focus:outline-none text-stone-100"
                  />

                  {orderType === 'delivery' && (
                    <input
                      type="text"
                      placeholder="Endereço em Santa Maria (Quadra, Conjunto, Casa) *"
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-lg bg-stone-900 border border-stone-800 focus:border-amber-400 focus:outline-none text-stone-100"
                    />
                  )}
                </div>

                {/* Coupon Code Box */}
                <div className="p-3.5 rounded-xl border border-stone-800 bg-[#160a22] space-y-2 text-left">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 block">
                    Cupom de Desconto
                  </span>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Código do cupom (ex: JAPA10)"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="flex-1 px-3 py-1.5 text-xs rounded-lg bg-stone-900 border border-stone-800 focus:border-amber-400 focus:outline-none uppercase font-mono text-stone-100"
                    />
                    <button
                      onClick={handleApplyCoupon}
                      className="px-3.5 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-xs font-semibold text-stone-200 cursor-pointer"
                    >
                      Aplicar
                    </button>
                  </div>
                  {discountApplied && (
                    <span className="text-[11px] text-emerald-400 font-semibold block">
                      ✓ Cupom JAPA10 aplicado (10% de desconto)!
                    </span>
                  )}
                  {couponError && (
                    <span className="text-[11px] text-red-400 block">
                      {couponError}
                    </span>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Footer Checkout Module */}
          {items.length > 0 && (
            <div className="p-5 border-t border-stone-800 bg-[#0f0618] space-y-3">
              {/* Financial Breakdown */}
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-stone-400">
                  <span>Subtotal dos Itens:</span>
                  <span className="font-mono tabular-nums text-stone-200">
                    R$ {subtotal.toFixed(2).replace('.', ',')}
                  </span>
                </div>

                {discountApplied && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Desconto (10%):</span>
                    <span className="font-mono tabular-nums">
                      - R$ {discountAmount.toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                )}

                {orderType === 'delivery' && (
                  <div className="flex justify-between text-stone-400">
                    <span>Taxa de Entrega:</span>
                    <span className="font-mono tabular-nums text-stone-200">
                      {deliveryFee === 0 ? 'GRÁTIS' : `R$ ${deliveryFee.toFixed(2).replace('.', ',')}`}
                    </span>
                  </div>
                )}

                <div className="pt-2 border-t border-stone-800 flex justify-between items-baseline font-bold text-sm text-stone-100">
                  <span className="font-display">Total do Pedido:</span>
                  <span className="font-mono text-xl text-amber-300 tabular-nums">
                    R$ {finalTotal.toFixed(2).replace('.', ',')}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                <button
                  onClick={handleCheckoutWhatsApp}
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-stone-950 font-bold text-xs shadow-lg shadow-emerald-950/50 active:scale-98 transition-all cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Enviar Pedido Pronto no WhatsApp</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
