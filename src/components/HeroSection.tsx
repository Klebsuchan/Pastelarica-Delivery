import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

const FLAVORS = ['🥟', '🧀', '🍗', '🍫', '🍟', '🍕', '🥓'];

export function HeroSection() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 150]);
  const y2 = useTransform(scrollY, [0, 500], [0, -100]);
  
  const [dimensions, setDimensions] = useState({ width: 1000, height: 800 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setDimensions({ width: window.innerWidth, height: window.innerHeight });
    setMounted(true);
    
    const handleResize = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="relative w-full overflow-hidden min-h-[70vh] flex items-center justify-center">
      {/* Background Falling Items */}
      {mounted && (
        <div className="absolute inset-0 pointer-events-none flex justify-center w-full z-0 overflow-hidden">
          <div className="relative w-full max-w-7xl h-full">
            {[...Array(30)].map((_, i) => {
              const startX = Math.random() * 100; // percentage
              const duration = 12 + Math.random() * 20;
              const delay = Math.random() * -25; // negative delay so they start already on screen
              const size = 25 + Math.random() * 45; // emoji size
              
              return (
                <motion.div
                  key={i}
                  initial={{ y: -150, x: `${startX}vw`, rotate: 0 }}
                  animate={{ y: dimensions.height + 250, rotate: 360 }}
                  transition={{ 
                    duration: duration, 
                    repeat: Infinity, 
                    ease: "linear",
                    delay: delay
                  }}
                  className="absolute opacity-30 select-none pointer-events-none drop-shadow-md"
                  style={{ fontSize: size }}
                >
                  {FLAVORS[i % FLAVORS.length]}
                </motion.div>
              );
            })}
          </div>
        </div>
      )}

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-black/20 via-black to-black z-0 pointer-events-none"></div>
      
      {/* Content */}
      <motion.div 
        style={{ y: y1 }}
        className="text-center py-16 md:py-24 px-4 flex flex-col items-center justify-center relative z-10 w-full max-w-4xl mx-auto"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FF7A00]/10 border border-[#FF7A00]/30 text-[#FF7A00] text-xs font-black uppercase tracking-widest mb-8 backdrop-blur-sm shadow-[0_0_15px_rgba(255,122,0,0.2)]">
          <span className="w-2 h-2 rounded-full bg-[#FF7A00] animate-pulse shadow-[0_0_8px_rgba(255,122,0,0.8)]"></span>
          DELIVERY ABERTO
        </div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-5xl sm:text-6xl md:text-8xl font-black italic tracking-tighter uppercase text-white mb-6 drop-shadow-2xl leading-[0.9]"
        >
          Sabor de <span className="text-[#FF7A00]">Verdade</span> <br /> Na Sua Casa
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-[#9ca3af] font-medium max-w-2xl mx-auto text-lg md:text-2xl leading-relaxed tracking-wide mb-10 drop-shadow-lg"
        >
          Descubra os melhores pastéis e porções com entrega rápida. Faça seu pedido e conclua direto pelo WhatsApp!
        </motion.p>
      </motion.div>
    </div>
  );
}
