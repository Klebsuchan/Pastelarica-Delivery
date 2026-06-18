import React, { useState } from 'react';
import { X, Plus, Minus, Send, Trash2 } from 'lucide-react';
import { CartItem, StoreSettings } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  settings: StoreSettings;
}

export function CartDrawer({ isOpen, onClose, cartItems, onUpdateQuantity, settings }: CartDrawerProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [street, setStreet] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [reference, setReference] = useState('');
  const [payment, setPayment] = useState('Pix');

  const total = cartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (cartItems.length === 0) return;

    let message = `*Novo Pedido - Pastelarica* 🥟\n\n`;
    message += `*Cliente:* ${name}\n`;
    message += `*Telefone:* ${phone}\n\n`;
    message += `*Endereço de Entrega:*\n`;
    message += `*Rua/Número:* ${street}\n`;
    message += `*Bairro:* ${neighborhood}\n`;
    if (reference) {
      message += `*Ponto de Referência:* ${reference}\n`;
    }
    message += `\n*Pagamento:* ${payment}\n\n`;
    message += `*Pedido:*\n`;
    
    cartItems.forEach(item => {
      message += `${item.quantity}x ${item.product.name} - R$ ${(item.product.price * item.quantity).toFixed(2).replace('.', ',')}\n`;
    });

    message += `\n*Total:* R$ ${total.toFixed(2).replace('.', ',')} + taxa de entrega\n`;
    message += `_(A taxa de entrega será combinada com o entregador)_`;

    const encodedMessage = encodeURIComponent(message);
    const waUrl = `https://wa.me/${settings.whatsappNumber}?text=${encodedMessage}`;
    
    window.open(waUrl, '_blank');
  };

  if (!isOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/80 z-40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-[#0A0A0A] z-50 shadow-2xl flex flex-col transform transition-transform overflow-hidden border-l border-[#1A1A1A]">
        <div className="bg-[#050505] text-[#FF7A00] p-5 flex justify-between items-center shrink-0 border-b border-[#1A1A1A]">
          <h2 className="text-xl font-black uppercase flex items-center gap-2">
            Seu Pedido
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-[#111111] rounded-lg transition-colors text-[#6b7280] hover:text-white">
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-6 bg-[#0A0A0A] custom-scroll">
          {cartItems.length === 0 ? (
            <div className="flex-1 flex items-center justify-center text-[#4b5563] flex-col gap-4">
              <ShoppingBagIcon className="w-16 h-16 opacity-50" />
              <p className="font-medium">Seu carrinho está vazio.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {cartItems.map(item => (
                <div key={item.product.id} className="bg-[#111111] p-4 rounded-2xl border border-[#1A1A1A] flex items-center justify-between gap-4">
                  <div className="flex-1">
                    <h4 className="font-bold text-sm text-white">{item.product.name}</h4>
                    <p className="font-black text-[#FF7A00] text-sm mt-1">
                      R$ {(item.product.price * item.quantity).toFixed(2).replace('.', ',')}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-3 bg-[#050505] rounded-xl p-1 border border-[#1A1A1A]">
                    <button 
                      onClick={() => onUpdateQuantity(item.product.id, -1)}
                      className="text-[#6b7280] hover:text-[#FF7A00] hover:bg-[#111111] p-2 rounded-lg transition-colors"
                    >
                      {item.quantity === 1 ? <Trash2 size={16} className="text-red-500 hover:text-red-400" /> : <Minus size={16} />}
                    </button>
                    <span className="font-bold text-sm w-6 text-center text-white">{item.quantity}</span>
                    <button 
                      onClick={() => onUpdateQuantity(item.product.id, 1)}
                      className="text-[#6b7280] hover:text-[#FF7A00] hover:bg-[#111111] p-2 rounded-lg transition-colors"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {cartItems.length > 0 && (
            <form onSubmit={handleCheckout} className="mt-auto bg-[#FF7A00] px-6 pt-6 pb-[calc(1.5rem+env(safe-area-inset-bottom))] rounded-3xl border border-[#FF7A00] text-black shadow-[0_0_40px_rgba(255,122,0,0.2)] shrink-0 relative overflow-hidden">
              <div className="absolute inset-0 bg-black/5"></div>
              <div className="relative z-10">
                <h3 className="font-black text-xl mb-6 italic uppercase underline decoration-black/30 underline-offset-4">Finalizar Pedido</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-black uppercase mb-1 tracking-widest text-black/80">Nome completo</label>
                     <input 
                      required
                      type="text" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-white/90 border-0 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-4 focus:ring-black/10 placeholder-black/40 text-black font-bold transition-all shadow-sm"
                      placeholder="Ex: João Silva"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-[10px] font-black uppercase mb-1 tracking-widest text-black/80">Telefone / WhatsApp</label>
                     <input 
                      required
                      type="text" 
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-white/90 border-0 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-4 focus:ring-black/10 placeholder-black/40 text-black font-bold transition-all shadow-sm"
                      placeholder="(11) 99999-9999"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <label className="block text-[10px] font-black uppercase mb-1 tracking-widest text-black/80">Rua e Número</label>
                      <input 
                        required
                        type="text" 
                        value={street}
                        onChange={(e) => setStreet(e.target.value)}
                        className="w-full bg-white/90 border-0 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-4 focus:ring-black/10 placeholder-black/40 text-black font-bold transition-all shadow-sm"
                        placeholder="Ex: Rua Roberto Dalanana, 332"
                      />
                    </div>
                    
                    <div className="col-span-2">
                      <label className="block text-[10px] font-black uppercase mb-1 tracking-widest text-black/80">Bairro</label>
                      <input 
                        required
                        type="text" 
                        value={neighborhood}
                        onChange={(e) => setNeighborhood(e.target.value)}
                        className="w-full bg-white/90 border-0 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-4 focus:ring-black/10 placeholder-black/40 text-black font-bold transition-all shadow-sm"
                        placeholder="Ex: Boqueirão"
                      />
                    </div>

                    <div className="col-span-2">
                      <label className="block text-[10px] font-black uppercase mb-1 tracking-widest text-black/80">Ponto de Referência (Opcional)</label>
                      <input 
                        type="text" 
                        value={reference}
                        onChange={(e) => setReference(e.target.value)}
                        className="w-full bg-white/90 border-0 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-4 focus:ring-black/10 placeholder-black/40 text-black font-bold transition-all shadow-sm"
                        placeholder="Próximo a..."
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-black uppercase mb-1 tracking-widest text-black/80">Forma de Pagamento</label>
                    <select 
                      value={payment}
                      onChange={(e) => setPayment(e.target.value)}
                      className="w-full bg-white/90 border-0 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-4 focus:ring-black/10 text-black font-bold appearance-none transition-all shadow-sm cursor-pointer"
                    >
                      <option value="Pix">Pix (Desconto 5%)</option>
                      <option value="Cartão de Crédito - Maquininha">Cartão de Crédito - Maquininha</option>
                      <option value="Cartão de Débito - Maquininha">Cartão de Débito - Maquininha</option>
                      <option value="Dinheiro">Dinheiro</option>
                    </select>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-black/10">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-black text-sm uppercase tracking-widest">Subtotal</span>
                    <span className="text-xl font-black">
                      R$ {total.toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mb-6 text-black/60">
                    <span className="font-bold text-[10px] uppercase tracking-widest">+ Taxa de Entrega</span>
                    <span className="font-bold text-[10px] uppercase tracking-widest text-right">A combinar</span>
                  </div>
                  
                  <button 
                    type="submit"
                    className="w-full bg-black text-white px-4 py-4 rounded-2xl font-black flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition-transform uppercase tracking-widest text-sm shadow-xl shadow-black/20"
                  >
                    <Send size={20} />
                    Pedir no WhatsApp
                  </button>
                  <p className="text-[9px] text-center mt-4 text-black/60 font-bold uppercase tracking-widest">Pedido será formatado e enviado no WhatsApp</p>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
}

function ShoppingBagIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
      <path d="M3 6h18" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  )
}
