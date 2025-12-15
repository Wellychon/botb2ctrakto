# Como Integrar o Bot Trakto em seu Site

## Opção 1: Via iframe (Mais Simples)

Adicione este código no final do seu HTML, antes do `</body>`:

```html
<!-- Widget Trakto Bot -->
<div id="trakto-bot-widget"></div>
<script>
  (function() {
    // Criar iframe
    const iframe = document.createElement('iframe');
    iframe.src = 'http://localhost:5173'; // Altere para URL do bot em produção
    iframe.style.cssText = 'position:fixed;bottom:0;right:0;width:100%;height:100%;border:none;z-index:9999;pointer-events:none;';
    iframe.setAttribute('allow', 'cross-origin');
    
    // Container
    const container = document.getElementById('trakto-bot-widget');
    container.appendChild(iframe);
    
    // Permitir cliques apenas no widget
    iframe.style.pointerEvents = 'auto';
  })();
</script>
```

## Opção 2: Script Direto (Recomendado para Produção)

### 1. Build do projeto
```bash
npm run build
```

### 2. Hospedar os arquivos
Faça upload dos arquivos da pasta `dist/` para seu servidor ou CDN.

### 3. Adicionar no seu site
```html
<!-- No <head> do seu site -->
<link rel="stylesheet" href="https://seu-dominio.com/bot-trakto/assets/index.css">

<!-- Antes do </body> -->
<div id="trakto-bot-root"></div>
<script type="module" src="https://seu-dominio.com/bot-trakto/assets/index.js"></script>
```

## Opção 3: Usando NPM (Para sites React/Vue/Angular)

### Instalar dependências
```bash
npm install react react-dom react-markdown
```

### Copiar o componente App.tsx
Copie o arquivo `src/App.tsx` para seu projeto e importe:

```jsx
import TraktoBot from './TraktoBot'

function MeuSite() {
  return (
    <div>
      <h1>Meu Site</h1>
      {/* Seu conteúdo */}
      
      <TraktoBot />
    </div>
  )
}
```

## Variáveis de Ambiente

Não esqueça de configurar as variáveis de ambiente:

```env
VITE_API_KEY=sua-chave-api
VITE_MODEL=nome-do-modelo
VITE_API_URL=url-da-api
```

## Personalização

### Mudar posição do widget
Edite as classes CSS em `App.tsx`:
- `bottom-6 right-6` - Canto inferior direito (padrão)
- `bottom-6 left-6` - Canto inferior esquerdo
- `top-6 right-6` - Canto superior direito

### Mudar cores
O widget usa apenas preto e branco. Para mudar:
- `bg-black` → `bg-blue-600` (exemplo)
- `border-black` → `border-blue-600`

### Mudar tamanho
Na linha do widget pop-up, altere:
- `w-96` - Largura (pode ser `w-80`, `w-full`, etc)
- `h-[500px]` - Altura

## Teste Local

O servidor está rodando em: http://localhost:5173/

Você já pode ver o widget funcionando como pop-up no canto da tela!
