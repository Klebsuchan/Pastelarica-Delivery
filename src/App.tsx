import React, { useState } from 'react';
import { useStore } from './store';
import { Header } from './components/Header';
import { ProductList } from './components/ProductList';
import { CartDrawer } from './components/CartDrawer';
import { AdminPanel } from './components/AdminPanel';
import { PolicyModal } from './components/PolicyModal';
import { CartItem, Product } from './types';
import toast, { Toaster } from 'react-hot-toast';

export default function App() {
  const { 
    products, 
    categories, 
    settings, 
    addProduct, 
    updateProduct, 
    deleteProduct, 
    updateSettings 
  } = useStore();

  const [view, setView] = useState<'home' | 'admin'>('home');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activePolicy, setActivePolicy] = useState<'cookies' | 'privacy' | 'delivery' | null>(null);

  const handleAddToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    
    // Mostra um toast ao invez de abrir o drawer toda vez
    toast.success(`${product.name} adicionado ao carrinho!`, {
      style: {
        background: '#0A0A0A',
        color: '#fff',
        border: '1px solid #1A1A1A',
        borderRadius: '16px',
        fontWeight: 'bold',
      },
      iconTheme: {
        primary: '#FF7A00',
        secondary: '#000',
      },
    });
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCartItems(prev => {
      return prev.map(item => {
        if (item.product.id === productId) {
          const newQty = item.quantity + delta;
          return { ...item, quantity: newQty };
        }
        return item;
      }).filter(item => item.quantity > 0);
    });
  };

  const totalCartItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-black text-white font-sans flex flex-col relative">
      {/* Premium Background Accent */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-900/30 via-black to-black mix-blend-screen transition-opacity duration-1000"></div>
      
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header 
          cartItemCount={totalCartItems} 
          onOpenCart={() => setIsCartOpen(true)} 
          onNavigate={setView}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          showSearch={view === 'home'}
        />

        <main className="flex-1">
          {view === 'home' ? (
            <ProductList 
              categories={categories} 
              products={products.filter(p => 
                p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                (p.description && p.description.toLowerCase().includes(searchQuery.toLowerCase()))
              )} 
              onAddToCart={handleAddToCart} 
            />
          ) : (
            <AdminPanel 
              products={products}
              categories={categories}
              settings={settings}
              onAddProduct={addProduct}
              onUpdateProduct={updateProduct}
              onDeleteProduct={deleteProduct}
              onUpdateSettings={updateSettings}
            />
          )}
        </main>

        <CartDrawer 
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          cartItems={cartItems}
          onUpdateQuantity={handleUpdateQuantity}
          settings={settings}
        />

        <footer className="bg-[#050505] pt-16 pb-[calc(4rem+env(safe-area-inset-bottom))] border-t border-zinc-900 mt-auto relative z-20">
          <div className="max-w-6xl mx-auto px-6 flex flex-col items-center">
            
            {/* Branding & Subtitle */}
            <div className="text-center mb-8">
              <p className="text-zinc-400 font-extrabold text-lg tracking-widest uppercase mb-2">
                Pastela<span className="text-[#FF7A00]">rica</span>
              </p>
              <p className="text-zinc-500 text-xs md:text-sm max-w-sm mx-auto">
                O melhor pastel de Passo Fundo. Crocante por fora, incrivelmente recheado por dentro.
              </p>
            </div>

            {/* Policies Selection */}
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 mb-8 text-zinc-400 text-xs font-semibold uppercase tracking-wider">
              <button 
                onClick={() => setActivePolicy('cookies')} 
                className="hover:text-[#FF7A00] transition-colors cursor-pointer"
              >
                Política de Cookies
              </button>
              <span className="text-zinc-850 hidden sm:inline">•</span>
              <button 
                onClick={() => setActivePolicy('privacy')} 
                className="hover:text-[#FF7A00] transition-colors cursor-pointer"
              >
                Política de Privacidade
              </button>
              <span className="text-zinc-850 hidden sm:inline">•</span>
              <button 
                onClick={() => setActivePolicy('delivery')} 
                className="hover:text-[#FF7A00] transition-colors cursor-pointer"
              >
                Política de Delivery
              </button>
            </div>

            {/* Divider */}
            <div className="w-full max-w-lg h-[1px] bg-zinc-900/60 mb-8" />

            {/* Credits and Copyrights */}
            <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-4xl gap-4 text-center md:text-left text-xs text-zinc-500">
              <div>
                <p>© {new Date().getFullYear()} Pastelarica Delivery. Todos os direitos reservados.</p>
                <p className="mt-1 text-zinc-600">
                  Desenvolvedor{' '}
                  <a 
                    href="https://portfolio-braian-three.vercel.app/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-[#FF7A00] hover:underline font-bold transition-all duration-200"
                  >
                    Braian Kmdc
                  </a>
                </p>
              </div>

              <div>
                <button 
                  onClick={() => setView('admin')} 
                  className="px-4 py-2 bg-zinc-950/80 hover:bg-zinc-900 text-zinc-400 hover:text-[#FF7A00] hover:border-zinc-800 transition-all duration-200 uppercase tracking-widest font-extrabold text-[10px] rounded-lg border border-zinc-900/80"
                >
                  Área do Administrador
                </button>
              </div>
            </div>

          </div>
        </footer>
      </div>

      <PolicyModal type={activePolicy} onClose={() => setActivePolicy(null)} />

      <Toaster position="bottom-center" toastOptions={{ duration: 2500 }} />
    </div>
  );
}
