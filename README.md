# Trakto - Atendimento Virtual

Interface minimalista para atendimento virtual da Trakto usando IA com suporte a tema claro/escuro.

## 🚀 Início Rápido

### 1. Instalar Dependências

```bash
npm install
```

### 2. Iniciar o Servidor

```bash
npm run dev
```

Acesse: **http://localhost:5173**

## ⚙️ Configuração

### Variáveis de Ambiente (.env)

O arquivo `.env` já está configurado com:
- **API Key**: Credencial OpenRouter
- **Model**: `openai/gpt-oss-20b:free`
- **API URL**: `https://openrouter.ai/api/v1/chat/completions`

⚠️ **IMPORTANTE**: Nunca compartilhe o arquivo `.env` publicamente!

### Instruções do Bot

As instruções do atendente Trakto estão integradas internamente no código:

- ✅ Atendimento B2C focado em suporte
- ✅ Respostas rápidas e objetivas em Markdown
- ✅ Incentivo ao autoatendimento
- ✅ Links diretos para tutoriais do YouTube
- ✅ Não coleta dados sensíveis
- ✅ Não faz vendas

**Principais funções:**
1. Cancelamento de assinatura
2. Como criar eBooks
3. Direcionamento para suporte por e-mail

## 🎨 Funcionalidades

### ✨ Interface Moderna
- ✅ **Tema Claro/Escuro** - Botão de alternância no canto superior direito
- ✅ **AI Input Animado** - Input com animação morphing suave
- ✅ **Perguntas Rápidas** - Botões pré-prontos para perguntas frequentes
- ✅ **Markdown Rendering** - Respostas formatadas com links clicáveis
- ✅ **Design Responsivo** - Funciona em desktop e mobile

### 🎯 Componentes Principais

#### 1. **MorphPanel (AI Input)**
- Botão "Perguntar à IA" que se expande
- Orbe animado colorido
- Atalho ⌘ + Enter para enviar
- Fecha ao clicar fora (ESC)

#### 2. **Theme Toggle**
- Alterna entre tema claro e escuro
- Ícone de Sol/Lua
- Salva preferência no localStorage

#### 3. **Quick Questions**
- 4 perguntas pré-prontas
- Envio automático ao clicar
- Aparecem apenas na tela inicial

#### 4. **Markdown Messages**
- Links formatados e clicáveis
- Negrito e itálico
- Listas ordenadas e não ordenadas
- Code blocks inline

## 🛠️ Tecnologias

- **React 19** - Framework JavaScript
- **TypeScript** - Tipagem estática
- **Vite** - Build tool rápido
- **Tailwind CSS** - Utility-first CSS
- **Shadcn UI** - Componentes reutilizáveis
- **Motion** (Framer Motion) - Animações suaves
- **React Markdown** - Renderização de Markdown
- **Lucide React** - Ícones
- **OpenRouter API** - Backend de IA

## 📦 Estrutura

```
Bot Trakto/
├── src/
│   ├── components/
│   │   └── ui/
│   │       ├── ai-input.tsx      # Input animado com morphing
│   │       ├── button.tsx        # Componente de botão
│   │       ├── card.tsx          # Componente de card
│   │       ├── input.tsx         # Input padrão
│   │       ├── textarea.tsx      # Textarea
│   │       └── theme-toggle.tsx  # Botão de tema
│   ├── contexts/
│   │   └── ThemeContext.tsx      # Contexto de tema
│   ├── lib/
│   │   └── utils.ts              # Utilitários
│   ├── App.tsx                   # Componente principal
│   ├── main.tsx                  # Entry point
│   └── index.css                 # Estilos globais + temas
├── .env                          # Credenciais (não commitar)
├── tailwind.config.js            # Config Tailwind
└── package.json
```

## 🎨 Temas

### Tema Escuro (padrão)
- Fundo: Preto (#0D0D0D)
- Texto: Branco (#FAFAFA)
- Cards: Cinza escuro (#1A1A1A)

### Tema Claro
- Fundo: Branco (#FFFFFF)
- Texto: Preto (#0A0A0A)
- Cards: Cinza claro (#F5F5F5)

O tema é salvo automaticamente no `localStorage` e persiste entre sessões.

## 🔒 Segurança

- Credenciais no `.env`
- `.gitignore` configurado
- Não expõe informações sensíveis
- Validação de inputs

## ⌨️ Atalhos

- **⌘ + Enter** - Enviar mensagem no AI Input
- **ESC** - Fechar AI Input
- **Click nas perguntas** - Envio automático

## 📄 Licença

MIT


The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
