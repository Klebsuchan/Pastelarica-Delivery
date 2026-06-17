import React from 'react';
import { Product, Category } from '../types';
import { motion } from 'motion/react';
import { HeroSection } from './HeroSection';

interface ProductListProps {
  categories: Category[];
  products: Product[];
  onAddToCart: (product: Product) => void;
}

export function ProductList({ categories, products, onAddToCart }: ProductListProps) {
  return (
    <div className="w-full flex justify-center flex-col">
      <HeroSection />
      
      <div className="max-w-6xl mx-auto p-4 w-full space-y-16 pb-24">
        {categories.map(category => {
          const categoryProducts = products.filter(p => p.categoryId === category.id);
          
          if (categoryProducts.length === 0) return null;

          return (
            <motion.section 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              key={category.id} 
              className="pt-4"
            >
              <h2 className="flex items-center gap-4 mb-8">
                <span className="text-[#FF7A00] font-black uppercase text-xl md:text-2xl tracking-widest pl-2">
                  {category.name}
                </span>
                <div className="h-[2px] flex-1 bg-gradient-to-r from-[#FF7A00]/40 my-auto to-transparent max-w-sm rounded"></div>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {categoryProducts.map((product, idx) => (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.4, delay: 0.05 * (idx % 3) }}
                    key={product.id} 
                    className="bg-[#080808] border border-[#1A1A1A] rounded-[2rem] overflow-hidden flex flex-col justify-between group hover:border-[#FF7A00]/50 transition-all duration-300 hover:shadow-[0_10px_40px_rgba(255,122,0,0.08)] hover:-translate-y-2 relative"
                  >
                    {product.imageUrl ? (
                      <div className="h-56 bg-[#111111] w-full overflow-hidden relative">
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors z-10"></div>
                        <img 
                          src={product.imageUrl} 
                          alt={product.name} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                        />
                      </div>
                    ) : (
                      <div className="h-56 bg-[#111111] flex items-center justify-center text-7xl border-b border-[#1A1A1A] group-hover:bg-[#151515] transition-colors">
                        {category.name.toLowerCase().includes('doce') ? '🍫' : category.name.toLowerCase().includes('bebida') ? '🥤' : category.name.toLowerCase().includes('porç') ? '🍟' : '🥟'}
                      </div>
                    )}
                    <div className="p-6 md:p-8 flex flex-col flex-1 bg-gradient-to-b from-[#080808] to-[#040404]">
                      <h3 className="font-bold text-xl md:text-2xl text-white group-hover:text-[#FF7A00] transition-colors leading-tight">{product.name}</h3>
                      <p className="text-sm text-[#888] flex-1 mt-3 mb-6 line-clamp-3 leading-relaxed">{product.description || 'Delicioso e feito na hora para você. Uma explosão de sabor em cada mordida.'}</p>
                      <div className="flex justify-between items-end mt-auto pt-5 border-t border-[#1A1A1A]">
                        <div className="flex flex-col">
                          <span className="text-[10px] text-[#666] uppercase font-bold tracking-widest mb-1">A partir de</span>
                          <span className="font-black text-2xl md:text-3xl text-[#FF7A00]">
                            R$ {product.price.toFixed(2).replace('.', ',')}
                          </span>
                        </div>
                        <button 
                          onClick={() => onAddToCart(product)}
                          className="bg-[#1A1A1A] text-white w-14 h-14 rounded-2xl font-black text-3xl hover:bg-[#FF7A00] hover:text-black hover:scale-110 active:scale-95 transition-all flex items-center justify-center shadow-lg group-hover:shadow-[0_0_20px_rgba(255,122,0,0.3)] z-10"
                          title="Adicionar ao Carrinho"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          );
        })}
      </div>
    </div>
  );
}

