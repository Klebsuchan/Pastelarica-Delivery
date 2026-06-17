import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Shield, Activity, Truck } from 'lucide-react';

interface PolicyModalProps {
  type: 'cookies' | 'privacy' | 'delivery' | null;
  onClose: () => void;
}

export function PolicyModal({ type, onClose }: PolicyModalProps) {
  if (!type) return null;

  const getContent = () => {
    switch (type) {
      case 'cookies':
        return {
          icon: <Activity className="w-8 h-8 text-[#FF7A00]" />,
          title: 'Política de Cookies',
          subtitle: 'Transparência e privacidade na sua navegação',
          body: (
            <div className="space-y-4 text-zinc-300 text-sm md:text-base leading-relaxed">
              <p>
                Nós da <strong>Pastelarica</strong> valorizamos a transparência e a privacidade dos nossos clientes. Esta política explica de forma clara como e por que utilizamos cookies em nossa plataforma.
              </p>
              <div className="space-y-2">
                <h4 className="text-white font-semibold text-base mt-4">1. O que são Cookies?</h4>
                <p>
                  Cookies são pequenos arquivos de texto enviados e armazenados no seu dispositivo (computador, celular ou tablet) que servem para memorizar suas preferências e melhorar sua de experiência navegando no site.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="text-white font-semibold text-base mt-4">2. Como utilizamos os Cookies?</h4>
                <p>
                  Utilizamos apenas os cookies estritamente necessários para o funcionamento correto do nosso site. Eles desempenham as seguintes funções básicas:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-zinc-400">
                  <li><strong>Persistência do Carrinho de Compras:</strong> Memorizar os deliciosos pastéis e porções que você adiciona para que eles não sumam caso você atualize a página.</li>
                  <li><strong>Sessão Administrativa:</strong> Manter a segurança da identificação de login temporário se você for o administrador atualizando o cardápio.</li>
                  <li><strong>Preferências de Layout:</strong> Salvar pequenas configurações de interface para garantir maior fluidez e velocidade no carregamento.</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="text-white font-semibold text-base mt-4">3. Rastreamento e Publicidade</h4>
                <p>
                  <strong>Zero Rastreamento Invasivo:</strong> Não operamos cookies de terceiros para publicidade direcionada, rastreamento comportamental ou venda de dados de estatísticas de navegação. Sua privacidade é absoluta.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="text-white font-semibold text-base mt-4">4. Como Gerenciar ou Excluir?</h4>
                <p>
                  Se preferir, você pode limpar os cookies e dados locais do nosso site diretamente limpando o histórico do seu navegador ou desativando os cookies nas configurações internas dele. Note que isso poderá redefinir seu carrinho de compras atual.
                </p>
              </div>
            </div>
          )
        };
      case 'privacy':
        return {
          icon: <Shield className="w-8 h-8 text-[#FF7A00]" />,
          title: 'Política de Privacidade',
          subtitle: 'Segurança absoluta com os seus dados pessoais',
          body: (
            <div className="space-y-4 text-zinc-300 text-sm md:text-base leading-relaxed">
              <p>
                A sua privacidade é uma prioridade na <strong>Pastelarica</strong>. Esta Política de Privacidade descreve como tratamos as suas informações ao utilizar o nosso sistema de delivery online em Passo Fundo.
              </p>
              <div className="space-y-2">
                <h4 className="text-white font-semibold text-base mt-4">1. Coleta de Informações Mínimas</h4>
                <p>
                  Para concluir o seu pedido com sucesso e enviá-lo via WhatsApp à nossa cozinha, solicitamos apenas dados funcionais indispensáveis:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-zinc-400">
                  <li>Seu Nome completo para correta identificação na entrega.</li>
                  <li>Endereço Completo de entrega (Rua, Número, Bairro, Ponto de Referência).</li>
                  <li>Número de Contato / WhatsApp para alinhamentos sobre o pedido.</li>
                  <li>Forma de Pagamento preferencial.</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="text-white font-semibold text-base mt-4">2. Uso e Compartilhamento de Dados</h4>
                <p>
                  Nossos dados de pedidos são repassados de forma direta ao nosso contato comercial do WhatsApp. Não comercializamos, não compartilhamos de forma externa e não divulgamos de forma alguma suas informações pessoais a terceiros ou listas de spam.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="text-white font-semibold text-base mt-4">3. Base Legal e LGPD</h4>
                <p>
                  Suas informações são processadas com base no seu consentimento explícito de compra, respeitando todas as diretrizes da Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018).
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="text-white font-semibold text-base mt-4">4. Alterações e Contato</h4>
                <p>
                  Podemos atualizar esta política de tempos em tempos para acompanhar melhorias em nosso fluxo operacional. Caso reste qualquer dúvida de como tratamos seus dados, faça contato direto conosco via nosso canal de suporte de vendas.
                </p>
              </div>
            </div>
          )
        };
      case 'delivery':
        return {
          icon: <Truck className="w-8 h-8 text-[#FF7A00]" />,
          title: 'Política de Delivery',
          subtitle: 'Prazo, logística e entregas quentinhas',
          body: (
            <div className="space-y-4 text-zinc-300 text-sm md:text-base leading-relaxed">
              <p>
                Garantimos a melhor logística de Passo Fundo para que o seu pastel chegue com aquela casca incrivelmente crocante e o recheio fumegante! Veja como atuamos:
              </p>
              <div className="space-y-2">
                <h4 className="text-white font-semibold text-base mt-4">1. Área de Cobertura</h4>
                <p>
                  Atendemos a cidade de <strong>Passo Fundo - RS</strong>. Entregamos direto nos principais bairros residenciais e comerciais da nossa região urbana.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="text-white font-semibold text-base mt-4">2. Prazos Médios de Entrega</h4>
                <p>
                  Nosso compromisso é de máxima eficiência:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-zinc-400">
                  <li><strong>Dias Úteis:</strong> Tempo médio de 30 a 50 minutos.</li>
                  <li><strong>Finais de Semana e Feriados:</strong> Tempo médio de 45 a 70 minutos (devido ao alto fluxo em nossa pastelaria).</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="text-white font-semibold text-base mt-4">3. Taxas de Entrega</h4>
                <p>
                  As taxas de entrega são calculadas de acordo com as distâncias estabelecidas entre a nossa cozinha operacional e o seu endereço. Os valores exatos serão acordados logo após nosso contato inicial no WhatsApp.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="text-white font-semibold text-base mt-4">4. Embalagens Especiais de Proteção</h4>
                <p>
                  Sabemos que um bom pastel precisa de cuidado no transporte. Por isso, todos os nossos pedidos são acondicionados em caixas térmicas rígidas e embalagens específicas que impedem o acúmulo de umidade, mantendo os fritos secos e crocantes até a sua mesa.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="text-white font-semibold text-base mt-4">5. Confirmação e Rastreabilidade</h4>
                <p>
                  Assim que você encaminha o carrinho selecionado via WhatsApp, nossa equipe confirma o recebimento imediatamente, informa o tempo preciso estimado para o preparo e despacha o motoboy para o seu endereço.
                </p>
              </div>
            </div>
          )
        };
    }
  };

  const content = getContent();

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
        />

        {/* Modal Contatiner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: 'spring', damping: 25, stiffness: 350 }}
          className="relative w-full max-w-2xl bg-[#0C0C0C] border border-zinc-900 rounded-3xl p-6 md:p-8 z-10 shadow-[0_0_50px_rgba(0,0,0,0.8)] max-h-[85vh] flex flex-col"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-zinc-500 hover:text-white transition-colors p-1.5 rounded-full hover:bg-zinc-900"
            aria-label="Fecar modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Header */}
          <div className="flex items-start gap-4 mb-6 border-b border-zinc-900/60 pb-5">
            <div className="p-3 bg-zinc-950/80 rounded-2xl border border-zinc-900 shadow-inner">
              {content.icon}
            </div>
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight leading-none mb-1">
                {content.title}
              </h3>
              <p className="text-zinc-500 text-xs md:text-sm">
                {content.subtitle}
              </p>
            </div>
          </div>

          {/* Scrollable contents */}
          <div className="flex-1 overflow-y-auto pr-2 space-y-4 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent">
            {content.body}
          </div>

          {/* Footer Action */}
          <div className="mt-6 pt-4 border-t border-zinc-900/40 flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2.5 bg-zinc-900 hover:bg-zinc-850 text-white rounded-xl text-sm font-semibold transition-colors duration-200 border border-zinc-800"
            >
              Compreendi e Fechar
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
