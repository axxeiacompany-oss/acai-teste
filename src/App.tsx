import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { InteractiveCustomizer } from './components/InteractiveCustomizer';
import { MenuSection } from './components/MenuSection';
import { FidelityClub } from './components/FidelityClub';
import { ArtisanalStory } from './components/ArtisanalStory';
import { LocationHours } from './components/LocationHours';
import { Footer } from './components/Footer';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { MenuItem, CartItem } from './types';
import { ShoppingBag, MessageCircle } from 'lucide-react';
import { STORE_INFO } from './data/menu';

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('acai_japa_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<MenuItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('acai_japa_cart', JSON.stringify(cartItems));
    } catch {
      // storage unavailable
    }
  }, [cartItems]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const handleAddToCart = (newItem: CartItem) => {
    setCartItems((prev) => {
      // Check if identical item already exists (same name and details)
      const existingIdx = prev.findIndex(
        (item) =>
          item.name === newItem.name &&
          item.sizeName === newItem.sizeName &&
          JSON.stringify(item.customDetails) === JSON.stringify(newItem.customDetails)
      );

      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += newItem.quantity;
        return updated;
      }
      return [...prev, newItem];
    });

    showToast(`✓ "${newItem.name}" adicionado à sacola!`);
  };

  const handleQuickAdd = (menuItem: MenuItem) => {
    const defaultSize = menuItem.sizes && menuItem.sizes.length > 0 ? menuItem.sizes[0] : null;
    const cartItem: CartItem = {
      id: `${menuItem.id}-${Date.now()}`,
      menuItemId: menuItem.id,
      name: menuItem.name,
      sizeName: defaultSize ? defaultSize.name : undefined,
      price: defaultSize ? defaultSize.price : menuItem.price,
      quantity: 1,
      image: menuItem.image,
    };
    handleAddToCart(cartItem);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const scrollToCustomizer = () => {
    const el = document.getElementById('customizer-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToMenu = () => {
    const el = document.getElementById('cardapio');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#0b0512] text-slate-100 flex flex-col selection:bg-amber-400 selection:text-stone-950">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 bg-amber-400 text-stone-950 px-4 py-2.5 rounded-xl shadow-2xl font-bold text-xs flex items-center gap-2 border border-amber-300 animate-bounce">
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Navbar */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onScrollToCustomizer={scrollToCustomizer}
      />

      {/* Main Content Sections */}
      <main className="flex-grow">
        {/* Luxury Hero Showcase */}
        <Hero
          onExploreMenu={scrollToMenu}
          onCustomizerClick={scrollToCustomizer}
        />

        {/* Real-time Interactive Customizer ("Monte o Seu Açaí") */}
        <InteractiveCustomizer onAddToCart={handleAddToCart} />

        {/* Full Signature Luxury Menu */}
        <MenuSection
          onSelectProduct={(item) => setSelectedProduct(item)}
          onQuickAdd={handleQuickAdd}
        />

        {/* Loyalty & Rewards Simulator (Fidelity Club) */}
        <FidelityClub />

        {/* Craftsmanship, Sourcing & Testimonials */}
        <ArtisanalStory />

        {/* Location, Hours & Delivery Coverage */}
        <LocationHours />
      </main>

      {/* Footer */}
      <Footer />

      {/* Tasting / Product Detail Modal */}
      <ProductModal
        item={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Slide-out Cart & Checkout Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Mobile Quick Action Floating Floating Bar (Strictly < 15% height) */}
      <aside aria-label="Ações rápidas" className="md:hidden fixed bottom-4 right-4 z-30 flex items-center gap-2">
        <a
          href={`https://wa.me/${STORE_INFO.phone}?text=Ol%C3%A1%2C%20gostaria%20de%20fazer%20um%20pedido%20no%20A%C3%A7a%C3%AD%20do%20Japa!`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 rounded-full bg-emerald-500 hover:bg-emerald-400 text-stone-950 flex items-center justify-center shadow-2xl border-2 border-white/20 active:scale-95 transition-transform"
          aria-label="Pedir no WhatsApp"
        >
          <MessageCircle className="w-6 h-6 text-stone-950" />
        </a>

        <button
          onClick={() => setIsCartOpen(true)}
          className="relative px-4 h-12 rounded-full bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs flex items-center gap-2 shadow-2xl border-2 border-white/20 active:scale-95 transition-transform cursor-pointer"
          aria-label="Abrir sacola"
        >
          <ShoppingBag className="w-5 h-5 text-stone-950" />
          <span>Sacola</span>
          {totalCartCount > 0 && (
            <span className="bg-stone-950 text-amber-300 px-1.5 py-0.5 rounded-full text-[10px] font-mono">
              {totalCartCount}
            </span>
          )}
        </button>
      </aside>
    </div>
  );
}
