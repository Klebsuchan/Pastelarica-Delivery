# 🥟 Pastelarica Delivery 🚀

> **Pastelarica Delivery** é uma plataforma moderna e responsiva de catálogo online e delivery criada para a **Pastelarica**. O projeto conecta um cardápio interativo e dinâmico diretamente ao WhatsApp do estabelecimento, permitindo que os clientes façam pedidos de forma simples e rápida, enquanto os administradores gerenciam produtos e configurações em tempo real através de um painel de controle integrado com o **Google Firebase**.

---

## 📱 Visualização do Projeto

O design foi concebido com uma estética premium escurecida (black mode), destacando tons vibrantes de laranja e detalhes minimalistas que remetem a alimentos frescos e crocantes.

-   **Site Principal:** Navegação intuitiva, pesquisa dinâmica por pastéis e porções, carrinho interativo e conclusão do pedido.
-   **Painel Admin:** Interface protegida por senha para gerenciamento de estoque, inserção/edição de produtos, alteração de categorias e número de contato do WhatsApp.

---

## ✨ Recursos Principais

-   🛒 **Carrinho de Compras Interativo:** Controle de quantidade em tempo real e cálculo instantâneo do total com efeitos de animação fluidos.
-   💬 **Integração Direta com WhatsApp:** Geração automática da mensagem de pedido estruturada e envio direto para o número de suporte ou delivery configurado.
-   🔍 **Filtro e Busca em Tempo Real:** Barra de pesquisa no cabeçalho inteligente para encontrar recheios, tamanhos ou porções instantaneamente.
-   🔐 **Painel Administrativo Protegecido:** Acesso autenticado para gerenciar os produtos (Adicionar, Alterar, Remover) e as configurações da loja.
-   ⚡ **Sincronização em Tempo Real (Firebase):** Cardápio instantaneamente atualizado para todos os clientes quando o administrador edita um item (utilizando Firestore onSnapshot).
-   🎨 **Animações Fluidas:** Efeitos visuais e micro-interações de rolagem e flutuação alimentados por `motion` (Framer Motion).

---

## 🛠️ Tecnologias Utilizadas

### 💻 **Frontend & Core**
-   **React 19 & TypeScript:** Biblioteca declarativa e forte tipagem estática para robustez e agilidade de desenvolvimento.
-   **Vite:** Bundler de última geração com inicialização ultra-rápida.
-   **Tailwind CSS (V4):** Estilização ágil através de utilitários de classe modernos para layout responsivo.
-   **Motion (Framer Motion):** Para animações de flutuação na página principal, transições de gaveta do carrinho e toasts.
-   **Lucide React:** Coleção rica de ícones consistentes e otimizados para interface do usuário.
-   **React Hot Toast:** Notificações flutuantes e elegantes de ações do usuário.

### 🗄️ **Infraestrutura & Banco de Dados**
-   **Google Cloud Firebase (Firestore):** Armazenamento de dados dinâmico e NoSQL estruturado em coleções (`products`, `categories`, `settings`).
-   **Firebase Auth:** Para autenticação integrada e segurança nas regras de leitura/escrita no banco de dados.

---

## 📁 Estrutura de Diretórios

```bash
├── src
│   ├── components           # Componentes Modulares de UI
│   │   ├── AdminPanel.tsx   # Painel Administrativo de Produtos e Configurações
│   │   ├── CartDrawer.tsx   # Gaveta Lateral com resumo e fechamento de Pedido
│   │   ├── Header.tsx       # Barra Superior com Logan, Busca e Carrinho
│   │   ├── HeroSection.tsx  # Banner de destaque com animações flutuantes de pastéis
│   │   └── ProductList.tsx  # Listagem dinâmica de categorias e produtos
│   ├── types.ts             # Definição das interfaces TypeScript do Domínio
│   ├── store.ts             # Estado global integrado com o Firestore em tempo real
│   ├── firebase.ts          # Arquivo de inicialização do SDK Firebase
│   ├── index.css            # Estilos Globais e importações do Tailwind CSS v4
│   ├── main.tsx             # Ponto de entrada SPA da Aplicação
│   └── App.tsx              # Componente Organizador de Telas e Fluxo Geral
├── public                   # Recursos e imagens públicas estáticas
├── metadata.json            # Metadados de identificação do Applet pela plataforma
├── firebase-blueprint.json  # Esquema básico para setup inicial do Firebase
├── firestore.rules          # Regras de segurança de acesso ao Firestore
├── package.json             # Dependências e gerenciamento de scripts
└── tsconfig.json            # Arquivo de configuração de compilação do TypeScript
```

---

## 🚀 Como Executar o Projeto Localmente

Siga o passo a passo abaixo para rodar e testar o ambiente em sua máquina local:

### 1. Pré-requisitos
Certifique-se de possuir o **Node.js** instalado na sua máquina (versão recomendado `>= 18.x`).

### 2. Instalação das Dependências
Abra o terminal no diretório raiz do projeto e execute:
```bash
npm install
```

### 3. Configurar Variáveis de Ambiente
Crie um arquivo `.env` na raiz do projeto copiando as definições do `.env.example`:
```bash
cp .env.example .env
```
Preencha a variável opcional `GEMINI_API_KEY` se for utilizar funcionalidades com IA:
```env
GEMINI_API_KEY="Sua_Chave_De_Desenvolvedor_Aqui"
```

### 4. Rodar o Servidor de Desenvolvimento
Inicie o servidor de desenvolvimento local executando:
```bash
npm run dev
```
O servidor estará rodando em: `http://localhost:3000`

### 5. Compilação para Produção
Para compilar e otimizar o projeto para ambiente produtivo de distribuição:
```bash
npm run build
```
Os arquivos estáticos compilados e minificados serão gerados no diretório `/dist`.

---

## 🔑 Acesso ao Painel Administrativo

Para acessar o painel de edição do cardápio e alterar as configurações da loja:
1.  Role até a base da página e clique em **Área do Administrador**.
2.  Insira a senha cadastrada no sistema:
    ```text
    pastelarica123
    ```
3.  Uma vez autenticado, você poderá atualizar produtos existentes, desativar temporariamente itens, modificar preços e gerenciar o telefone que recebe os pedidos via WhatsApp.

---

## 🔒 Regras de Segurança do Banco de Dados

O banco de dados é mantido no **Cloud Firestore**. As regras vigentes no arquivo `firestore.rules` garantem que:
-   Qualquer usuário final possa **ler** produtos e configurações para visualizar o menu na web de forma pública.
-   Apenas administradores autenticados possam realizar operações de **escrita**, de forma a manter os dados sempre protegidos contra edições indesejadas.

---

> Desenvolvido com carinho para a **Pastelarica** 🥟✨
