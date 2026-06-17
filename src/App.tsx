import React, { useState } from 'react';
import { useStore } from './store';
import { Header } from './components/Header';
import { ProductList } from './components/ProductList';
import { CartDrawer } from './components/CartDrawer';
import { AdminPanel } from './components/AdminPanel';
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

        <footer className="bg-[#050505] py-12 text-center border-t border-[#1A1A1A] mt-auto">
          <p className="text-zinc-600 font-bold text-sm tracking-widest uppercase mb-4">Pastela<span className="text-[#FF7A00]">rica</span></p>
          <p className="text-[#4b5563] font-medium pb-2 text-xs">© {new Date().getFullYear()} Todos os direitos reservados.</p>
          <button 
            onClick={() => setView('admin')} 
            className="text-xs text-[#4b5563] hover:text-[#FF7A00] mt-4 transition-colors uppercase tracking-widest font-bold"
          >
            Área do Administrador
          </button>
        </footer>
      </div>

      <Toaster position="bottom-center" toastOptions={{ duration: 2500 }} />
    </div>
  );
}
