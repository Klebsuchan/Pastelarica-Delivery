import React, { useState } from 'react';
import { Product, Category, StoreSettings } from '../types';
import { Plus, Edit2, Trash2, Save, X, LogIn, FileDown } from 'lucide-react';
import toast from 'react-hot-toast';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface AdminPanelProps {
  products: Product[];
  categories: Category[];
  settings: StoreSettings;
  onAddProduct: (product: Product) => void;
  onUpdateProduct: (product: Product) => void;
  onDeleteProduct: (id: string) => void;
  onUpdateSettings: (settings: StoreSettings) => void;
}

export function AdminPanel({
  products,
  categories,
  settings,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
  onUpdateSettings
}: AdminPanelProps) {
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [whatsapp, setWhatsapp] = useState(settings.whatsappNumber);
  const [formData, setFormData] = useState<Partial<Product>>({});
  
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('admin_auth') === 'true';
  });
  const [password, setPassword] = useState('');
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'pastelarica123') {
      setIsAuthenticated(true);
      sessionStorage.setItem('admin_auth', 'true');
      toast.success('Login efetuado com sucesso!');
    } else {
      toast.error('Senha incorreta.');
    }
  };

  const generatePDF = async () => {
    setIsGeneratingPDF(true);
    toast.loading('Gerando catálogo em PDF...', { id: 'pdf-toast' });
    
    try {
      const pdf = new jsPDF('p', 'mm', 'a4');
      let yPos = 20;
      const pageWidth = pdf.internal.pageSize.getWidth();

      // Title
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(24);
      pdf.text('Cardápio Digital', pageWidth / 2, yPos, { align: 'center' });
      yPos += 15;

      categories.forEach((category) => {
        const categoryProducts = products.filter(p => p.categoryId === category.id);
        if (categoryProducts.length === 0) return;

        // Category header
        pdf.setFont('helvetica', 'bold');
        pdf.setFontSize(16);
        pdf.setTextColor(255, 122, 0); // Orange color
        pdf.text(category.name.toUpperCase(), 20, yPos);
        yPos += 10;
        
        pdf.setTextColor(0, 0, 0);
        pdf.setFont('helvetica', 'normal');
        pdf.setFontSize(12);

        categoryProducts.forEach(product => {
          if (yPos > 270) {
            pdf.addPage();
            yPos = 20;
          }
          
          pdf.setFont('helvetica', 'bold');
          pdf.text(product.name, 20, yPos);
          
          const priceText = `R$ ${product.price.toFixed(2).replace('.', ',')}`;
          pdf.text(priceText, pageWidth - 20, yPos, { align: 'right' });
          
          if (product.description) {
            yPos += 5;
            pdf.setFont('helvetica', 'normal');
            pdf.setFontSize(10);
            pdf.setTextColor(100, 100, 100);
            
            const splitDesc = pdf.splitTextToSize(product.description, pageWidth - 40);
            pdf.text(splitDesc, 20, yPos);
            yPos += (splitDesc.length * 5);
            pdf.setFontSize(12);
            pdf.setTextColor(0, 0, 0);
          }
          
          yPos += 8;
        });
        yPos += 5;
      });

      pdf.save('cardapio.pdf');
      toast.success('PDF gerado com sucesso!', { id: 'pdf-toast' });
    } catch (error) {
      console.error(error);
      toast.error('Erro ao gerar PDF', { id: 'pdf-toast' });
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const handleSaveSettings = () => {
    onUpdateSettings({ ...settings, whatsappNumber: whatsapp });
    toast.success('Configurações salvas!');
  };

  const openAdd = () => {
    setFormData({
      id: Date.now().toString(),
      name: '',
      price: 0,
      categoryId: categories[0]?.id || '',
      description: '',
      imageUrl: ''
    });
    setIsAdding(true);
    setEditingProduct(null);
  };

  const openEdit = (product: Product) => {
    setFormData(product);
    setEditingProduct(product);
    setIsAdding(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isAdding) {
      onAddProduct(formData as Product);
      setIsAdding(false);
      toast.success('Produto adicionado!');
    } else if (editingProduct) {
      onUpdateProduct(formData as Product);
      setEditingProduct(null);
      toast.success('Produto atualizado!');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto p-4 py-16 flex flex-col items-center justify-center space-y-6">
        <h2 className="text-3xl font-black text-white italic tracking-tighter uppercase text-center">Acesso Restrito</h2>
        <p className="text-[#9ca3af] text-center">Digite a senha para acessar o painel administrativo.</p>
        
        <form onSubmit={handleLogin} className="w-full space-y-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Senha secreta"
            className="w-full bg-[#111111] border border-[#1A1A1A] rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-[#FF7A00]/50 font-mono text-white transition-all shadow-inner text-center"
          />
          <button 
            type="submit"
            className="w-full bg-[#FF7A00] text-black px-8 py-4 rounded-xl font-black flex items-center justify-center gap-3 hover:scale-105 active:scale-95 transition-all shadow-lg uppercase tracking-widest text-sm"
          >
            <LogIn size={20} />
            Entrar
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 py-8 space-y-8 bg-black text-white">
      <div className="flex items-center justify-between border-b pb-4 border-zinc-900 flex-wrap gap-4">
        <h2 className="text-3xl font-black text-white italic tracking-tighter uppercase">Painel <span className="text-[#FF7A00]">Admin</span></h2>
        <button
          onClick={generatePDF}
          disabled={isGeneratingPDF}
          className="bg-white/10 hover:bg-white/20 text-white px-4 py-2.5 rounded-xl font-bold transition-all flex items-center gap-2 text-xs uppercase tracking-widest disabled:opacity-50"
        >
          <FileDown size={16} />
          {isGeneratingPDF ? 'Gerando...' : 'Gerar Catálogo PDF'}
        </button>
      </div>

      {/* Settings Section */}
      <div className="bg-[#0A0A0A] p-6 rounded-3xl border border-[#1A1A1A] shadow-sm">
        <h3 className="font-bold text-lg mb-4 text-white uppercase tracking-widest text-sm">Configurações</h3>
        <div className="flex gap-4 items-end flex-wrap md:flex-nowrap">
          <div className="flex-1 w-full">
            <label className="block text-xs font-black text-[#FF7A00] uppercase mb-2 tracking-widest">WhatsApp (apenas números)</label>
            <input 
              type="text" 
              value={whatsapp}
              onChange={e => setWhatsapp(e.target.value)}
              className="w-full bg-[#111111] border-none rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-[#FF7A00]/50 font-mono text-white transition-all shadow-inner"
              placeholder="Ex: 5511999999999"
            />
          </div>
          <button 
            onClick={handleSaveSettings}
            className="w-full md:w-auto bg-[#FF7A00] text-black px-6 py-3.5 rounded-xl font-black transition-all flex items-center justify-center gap-2 hover:scale-105 active:scale-95 shadow-lg uppercase tracking-widest text-xs"
          >
            <Save size={18} />
            Salvar
          </button>
        </div>
      </div>

      {/* Products Management */}
      <div className="bg-[#0A0A0A] p-6 rounded-3xl border border-[#1A1A1A] shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold text-lg text-white uppercase tracking-widest text-sm">Cardápio</h3>
          <button 
            onClick={openAdd}
            className="bg-[#111111] hover:bg-[#151515] text-[#FF7A00] px-4 py-2.5 rounded-xl font-bold transition-all flex items-center gap-2 border border-[#FF7A00]/20 hover:border-[#FF7A00]/40 text-xs uppercase tracking-widest"
          >
            <Plus size={16} />
            Novo
          </button>
        </div>

        {/* Form Modal */}
        {(isAdding || editingProduct) && (
          <div className="mb-8 bg-[#111111] p-6 rounded-2xl border border-[#FF7A00]/20 shadow-inner">
            <div className="flex justify-between items-center mb-6 border-b border-[#1A1A1A] pb-4">
              <h4 className="font-black text-lg text-[#FF7A00] uppercase tracking-widest flex items-center gap-2">
                {isAdding ? <><Plus size={20}/> Adicionar</> : <><Edit2 size={20}/> Editar</>}
              </h4>
              <button onClick={() => { setIsAdding(false); setEditingProduct(null); }} className="p-2 hover:bg-black rounded-lg text-zinc-400 border border-transparent hover:border-[#1A1A1A]">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-black text-[#9ca3af] uppercase mb-2 tracking-widest">Nome do Produto</label>
                  <input 
                    required
                    type="text" 
                    value={formData.name || ''}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-[#050505] border border-[#1A1A1A] rounded-xl px-4 py-3.5 text-white focus:outline-none focus:ring-2 focus:ring-[#FF7A00]/50 transition-all font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-black text-[#9ca3af] uppercase mb-2 tracking-widest">Preço (R$)</label>
                  <input 
                    required
                    type="number" 
                    step="0.01"
                    value={formData.price || ''}
                    onChange={e => setFormData({...formData, price: parseFloat(e.target.value)})}
                    className="w-full bg-[#050505] border border-[#1A1A1A] rounded-xl px-4 py-3.5 text-white focus:outline-none focus:ring-2 focus:ring-[#FF7A00]/50 transition-all font-black text-[#FF7A00]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-black text-[#9ca3af] uppercase mb-2 tracking-widest">Categoria</label>
                  <select 
                    required
                    value={formData.categoryId || ''}
                    onChange={e => setFormData({...formData, categoryId: e.target.value})}
                    className="w-full bg-[#050505] border border-[#1A1A1A] rounded-xl px-4 py-3.5 text-white focus:outline-none focus:ring-2 focus:ring-[#FF7A00]/50 transition-all font-bold"
                  >
                    {categories.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-black text-[#9ca3af] uppercase mb-2 tracking-widest">URL da Imagem</label>
                  <input 
                    type="url" 
                    value={formData.imageUrl || ''}
                    onChange={e => setFormData({...formData, imageUrl: e.target.value})}
                    placeholder="https://..."
                    className="w-full bg-[#050505] border border-[#1A1A1A] rounded-xl px-4 py-3.5 text-white focus:outline-none focus:ring-2 focus:ring-[#FF7A00]/50 transition-all"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-black text-[#9ca3af] uppercase mb-2 tracking-widest">Descrição detalhada</label>
                  <textarea 
                    value={formData.description || ''}
                    onChange={e => setFormData({...formData, description: e.target.value})}
                    className="w-full bg-[#050505] border border-[#1A1A1A] rounded-xl px-4 py-3.5 text-white focus:outline-none focus:ring-2 focus:ring-[#FF7A00]/50 transition-all resize-none h-24"
                  />
                </div>
              </div>
              <div className="flex justify-end pt-4 border-t border-[#1A1A1A]">
                <button type="submit" className="bg-[#FF7A00] text-black px-8 py-3.5 rounded-xl font-black flex items-center gap-2 hover:scale-105 active:scale-95 transition-all uppercase tracking-widest text-sm shadow-[0_0_15px_rgba(255,122,0,0.3)]">
                  <Save size={18} />
                  {isAdding ? 'Salvar Novo' : 'Salvar Alterações'}
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#1A1A1A] text-[#6b7280] text-xs uppercase tracking-widest">
                <th className="pb-4 px-3 font-black bg-transparent">Produto</th>
                <th className="pb-4 px-3 font-black bg-transparent">Categoria</th>
                <th className="pb-4 px-3 font-black bg-transparent">Preço</th>
                <th className="pb-4 px-3 font-black bg-transparent text-right">Ações</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => {
                const category = categories.find(c => c.id === product.categoryId);
                return (
                  <tr key={product.id} className="border-b border-[#1A1A1A] hover:bg-[#111111] transition-colors group">
                    <td className="py-4 px-3 font-bold text-white">
                      <div className="flex items-center gap-4">
                        {product.imageUrl ? (
                          <img src={product.imageUrl} alt={product.name} className="w-12 h-12 rounded-xl object-cover border border-[#1A1A1A]" />
                        ) : (
                          <div className="w-12 h-12 bg-[#050505] border border-[#1A1A1A] rounded-xl shrink-0 flex items-center justify-center text-xl">🥟</div>
                        )}
                        <span className="line-clamp-1 group-hover:text-[#FF7A00] transition-colors">{product.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-3 text-[#9ca3af] text-sm font-medium">{category?.name || '-'}</td>
                    <td className="py-4 px-3 font-black text-[#FF7A00]">R$ {product.price.toFixed(2).replace('.', ',')}</td>
                    <td className="py-4 px-3">
                      <div className="flex items-center justify-end gap-2 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => openEdit(product)}
                          className="p-2 text-[#9ca3af] hover:text-[#FF7A00] hover:bg-black rounded-lg transition-all"
                          title="Editar"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button 
                          onClick={() => {
                            if (confirm(`Deseja realmente excluir "${product.name}"?`)) {
                              onDeleteProduct(product.id);
                              toast.success('Produto excluído.');
                            }
                          }}
                          className="p-2 text-red-500 hover:text-white hover:bg-red-500/20 rounded-lg transition-all"
                          title="Excluir"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {products.length === 0 && (
            <div className="text-center py-12 text-[#6b7280] font-medium">
              Nenhum produto cadastrado ainda.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
