# 🚀 Sistema de Gestão de Vendas MEI - Frontend

Sistema moderno de gestão de vendas para Microempreendedores Individuais (MEI) desenvolvido com React, TypeScript e shadcn/ui.

## ✨ Funcionalidades

### 🔐 Autenticação
- **Login seguro** com JWT
- **Registro de novos usuários**
- **Proteção de rotas** privadas
- **Logout automático** em caso de token expirado

### 📊 Dashboard Executivo
- **Resumo mensal e anual** de vendas
- **Ticket médio** calculado automaticamente
- **Produtos mais vendidos** com ranking
- **Vendas por categoria** com distribuição visual
- **Vendas por dia** do mês atual
- **Exportação de relatórios** em JSON e CSV

### 🛍️ Gestão de Vendas
- **Listagem de vendas** com paginação
- **Cadastro de novas vendas**
- **Filtros por período**
- **Cálculo automático** de valores totais

### 📦 Gestão de Produtos
- **Catálogo de produtos** organizado
- **Cadastro e edição** de produtos
- **Categorização** de produtos
- **Status ativo/inativo**

## 🎨 Design System

### shadcn/ui Components
- **Cards** responsivos e elegantes
- **Buttons** com variantes e estados
- **Inputs** com validação visual
- **Layout** moderno com sidebar
- **Loading states** e feedback visual

### Tema Personalizado
- **Cores primárias** azuis profissionais
- **Modo claro** otimizado para produtividade
- **Tipografia** clara e legível
- **Espaçamentos** consistentes

## 🛠️ Tecnologias

### Core
- **React 19** - Framework principal
- **TypeScript** - Tipagem estática
- **React Router DOM** - Roteamento
- **Axios** - Cliente HTTP

### UI/UX
- **shadcn/ui** - Componentes modernos
- **Tailwind CSS** - Estilização utilitária
- **Radix UI** - Componentes acessíveis
- **Lucide React** - Ícones consistentes

### Desenvolvimento
- **React Scripts** - Build e desenvolvimento
- **ESLint** - Linting de código
- **PostCSS** - Processamento CSS

## 🚀 Como Executar

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn
- API backend rodando na porta 3333

### Instalação
```bash
# Clone o repositório
git clone <url-do-repositorio>

# Entre no diretório
cd vendas-app-frontend

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm start
```

### Configuração da API
O frontend está configurado para conectar com a API em:
```
http://localhost:3333/api
```

Para alterar, edite o arquivo `src/services/api.ts`:
```typescript
const API_BASE_URL = 'http://localhost:3333/api';
```

## 📱 Páginas e Rotas

### Públicas
- `/login` - Página de login
- `/register` - Página de registro

### Privadas (requer autenticação)
- `/dashboard` - Dashboard principal
- `/vendas` - Listagem de vendas
- `/produtos` - Gestão de produtos
- `/venda-form` - Formulário de nova venda

## 🔧 Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── ui/             # Componentes shadcn/ui
│   ├── Layout.tsx      # Layout principal
│   └── ProtectedRoute.tsx
├── pages/              # Páginas da aplicação
│   ├── Dashboard.tsx   # Dashboard principal
│   ├── Login.tsx       # Página de login
│   ├── Register.tsx    # Página de registro
│   └── Vendas.tsx      # Gestão de vendas
├── services/           # Serviços e API
│   └── api.ts          # Cliente HTTP e endpoints
├── lib/                # Utilitários
│   └── utils.ts        # Funções auxiliares
└── context/            # Contextos React
    └── VendaContext.tsx
```

## 🎯 Funcionalidades Implementadas

### ✅ Autenticação Completa
- [x] Login com email e senha
- [x] Registro de novos usuários
- [x] Proteção de rotas
- [x] Interceptors para token JWT
- [x] Logout automático

### ✅ Dashboard Moderno
- [x] Cards de métricas principais
- [x] Produtos mais vendidos
- [x] Vendas por categoria
- [x] Vendas por dia
- [x] Exportação de relatórios
- [x] Loading states

### ✅ Interface Moderna
- [x] Design system shadcn/ui
- [x] Layout responsivo
- [x] Navegação lateral
- [x] Feedback visual
- [x] Estados de loading e erro

### ✅ Integração com API
- [x] Serviços tipados
- [x] Tratamento de erros
- [x] Interceptors HTTP
- [x] Paginação
- [x] Filtros

## 🔮 Próximas Funcionalidades

### 📈 Relatórios Avançados
- [ ] Gráficos interativos com Recharts
- [ ] Comparativos mensais
- [ ] Projeções de vendas
- [ ] Relatórios personalizados

### 🛍️ Gestão Avançada
- [ ] Gestão de estoque
- [ ] Categorias personalizadas
- [ ] Importação/exportação de dados
- [ ] Backup automático

### 🎨 UX/UI
- [ ] Modo escuro
- [ ] Temas personalizáveis
- [ ] Notificações push
- [ ] PWA (Progressive Web App)

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 🆘 Suporte

Para suporte, abra uma issue no GitHub ou entre em contato com a equipe de desenvolvimento.

---

**Desenvolvido com ❤️ para MEIs brasileiros**
