# AposentAI Frontend

Frontend do sistema AposentAI desenvolvido com Vite, React, TypeScript e ShadCN/UI.

## 🚀 Tecnologias

- **React 18** - Biblioteca JavaScript para interface de usuário
- **TypeScript** - Superset do JavaScript com tipagem estática
- **Vite** - Build tool e dev server rápido
- **ShadCN/UI** - Componentes de UI baseados em Radix
- **Tailwind CSS** - Framework CSS utilitário
- **TanStack Query** - Gerenciamento de estado assíncrono
- **React Router** - Roteamento
- **Axios** - Cliente HTTP

## 🛠️ Configuração do Ambiente

### Pré-requisitos

- Node.js 18+ 
- npm ou yarn

### Instalação

```bash
# Instalar dependências
npm install

# Executar em modo desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview do build
npm run preview
```

## 🔧 Configuração da API

O frontend está configurado para se comunicar com o backend FastAPI:

- **URL do Backend**: `http://localhost:8000`
- **API Base**: `/api/v1`
- **Proxy de Desenvolvimento**: Configurado no Vite para redirecionar `/api` para o backend

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
VITE_API_URL=http://localhost:8000/api/v1
VITE_BACKEND_URL=http://localhost:8000
VITE_ENVIRONMENT=development
VITE_APP_NAME=AposentAI
```

## 🏗️ Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── ui/             # Componentes base do ShadCN
│   ├── dashboard/      # Componentes do dashboard
│   ├── layout/         # Componentes de layout
│   └── ...
├── pages/              # Páginas da aplicação
├── hooks/              # Hooks customizados
├── lib/                # Utilitários e configurações
│   ├── api.ts          # Cliente da API
│   └── utils.ts        # Funções utilitárias
└── assets/             # Assets estáticos
```

## 🔐 Autenticação

O sistema de autenticação está integrado com o backend FastAPI:

- **Login**: `/auth/login`
- **Registro**: `/auth/register`
- **Token JWT**: Armazenado no localStorage
- **Interceptor**: Adiciona automaticamente o token nas requisições

## 🐳 Docker

```bash
# Build da imagem Docker
docker build -t aposentai-frontend .

# Executar container
docker run -p 80:80 aposentai-frontend
```

## 📱 Funcionalidades Principais

- ✅ Dashboard principal
- ✅ Autenticação e autorização
- ✅ Gestão de clientes
- ✅ Análise de perfil
- ✅ Simulação de aposentadoria
- ✅ Upload de documentos
- ✅ Geração de relatórios
- ✅ Configurações de usuário
- ✅ Sistema de assinaturas

## 🔄 Integração com Backend

O frontend se conecta automaticamente com o backend FastAPI através de:

1. **Proxy de desenvolvimento** no Vite
2. **Cliente API** com Axios
3. **Interceptors** para autenticação
4. **TanStack Query** para cache e sincronização

## 🚧 Scripts Disponíveis

- `npm run dev` - Servidor de desenvolvimento
- `npm run build` - Build para produção
- `npm run preview` - Preview do build
- `npm run lint` - Linting do código

## 📝 Notas Importantes

- O frontend está configurado para rodar na porta **5173**
- O backend deve estar rodando na porta **8000**
- Todas as rotas da API são automaticamente redirecionadas através do proxy
- O sistema usa JWT para autenticação
- Os tokens são automaticamente incluídos nas requisições

## 🤝 Desenvolvimento

Para desenvolvimento local:

1. Certifique-se de que o backend FastAPI esteja rodando
2. Execute `npm run dev`
3. Acesse `http://localhost:5173`

O frontend irá automaticamente se conectar com o backend através do proxy configurado.