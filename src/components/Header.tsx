import React from 'react';
import { ShoppingBag, Settings, Search } from 'lucide-react';

const logoUrl = '/pastelarica.png';

interface HeaderProps {
  cartItemCount: number;
  onOpenCart: () => void;
  onNavigate: (view: 'home' | 'admin') => void;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  showSearch?: boolean;
}

export function Header({ cartItemCount, onOpenCart, onNavigate, searchQuery, onSearchChange, showSearch }: HeaderProps) {
  return (
    <header className="bg-black/90 backdrop-blur-md px-4 pb-4 pt-[calc(1rem+env(safe-area-inset-top))] sticky top-0 z-40 border-b border-[#1A1A1A] shadow-xl">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex w-full md:w-auto justify-between items-center">
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => onNavigate('home')}
          >
            <div className="h-10 w-10 md:h-12 md:w-12 shrink-0">
              <img 
                src={logoUrl} 
                alt="Pastelarica Logo" 
                className="h-full w-full object-contain transition-transform group-hover:scale-105"
              />
            </div>
            <div className="text-2xl md:text-3xl font-black italic tracking-tighter uppercase text-white group-hover:text-[#FF7A00] transition-colors">
              PASTELA<span className="text-[#FF7A00] group-hover:text-white transition-colors">RICA</span>
            </div>
          </div>
          
          <div className="md:hidden flex items-center gap-4">
            <button 
              onClick={() => onNavigate('admin')}
              className="text-zinc-500 hover:text-white transition-opacity"
              title="Painel Admin"
            >
              <Settings size={24} />
            </button>
            <button 
              onClick={onOpenCart}
              className="relative p-2.5 bg-[#FF7A00] text-black rounded-xl hover:scale-105 active:scale-95 transition-all shadow-lg"
            >
              <ShoppingBag size={22} strokeWidth={2} />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-white text-black border-2 border-[#FF7A00] text-xs font-black w-6 h-6 flex items-center justify-center rounded-full shadow-sm">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {showSearch && (
          <div className="w-full md:flex-1 md:max-w-xs mx-auto md:mx-4 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => onSearchChange?.(e.target.value)}
              placeholder="Buscar pastéis ou porções..." 
              className="w-full bg-[#111111] border border-[#222222] rounded-full pl-11 pr-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#FF7A00]/50 focus:border-[#FF7A00]/50 transition-all font-medium placeholder:text-zinc-600"
            />
          </div>
        )}
        
        <div className="hidden md:flex items-center gap-4 md:gap-6 shrink-0">
          <span className="bg-black text-[#FF7A00] border border-[#FF7A00]/20 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest">
            Aberto
          </span>

          <button 
            onClick={() => onNavigate('admin')}
            className="text-zinc-500 hover:text-white transition-opacity"
            title="Painel Admin"
          >
            <Settings size={24} />
          </button>
          
          <button 
            onClick={onOpenCart}
            className="relative p-3 bg-[#FF7A00] text-black rounded-xl hover:scale-105 active:scale-95 transition-all shadow-lg"
          >
            <ShoppingBag size={24} strokeWidth={2} />
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-white text-black border-2 border-[#FF7A00] text-xs font-black w-6 h-6 flex items-center justify-center rounded-full shadow-sm">
                {cartItemCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
