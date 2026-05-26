# 💡 Luz Financeiro - Dashboard Financeiro Pessoal

Aplicação web para controle financeiro pessoal com gráficos, categorias, metas e relatórios.

## 📁 Estrutura da Pasta

```
luz-financeiro/
├── index.html              # Arquivo principal (renomear de luz-financeiro-final.html)
├── README.md               # Este arquivo
├── CUSTOMIZACAO.md         # Guia de como customizar
├── logo-luz-financeiro.svg # Logo em SVG (opcional)
└── DEPLOY.md               # Guia de deployment
```

## 🚀 Como Usar

### 1. Localmente
1. Baixe o arquivo `index.html`
2. Abra em qualquer navegador (Chrome, Firefox, Safari, Edge)
3. Comece a adicionar suas transações!

### 2. Online (GitHub Pages)
Veja `DEPLOY.md` para instruções completas

## ✨ Funcionalidades

### Dashboard
- Visão geral com métricas: receita, despesa, saldo
- Total de transações
- Gráficos em tempo real

### Transações
- Adicionar/deletar transações
- Categorias pré-definidas
- Data automática
- Validações completas
- Histórico ordenado

### Categorias
- 10 categorias pré-definidas
- Análise de gastos por categoria
- Atualização automática

### Metas
- Criar metas financeiras
- Acompanhamento visual
- Data de vencimento

### Relatórios
- Exportar em CSV
- Múltiplos formatos
- Download automático

### Busca
- Buscar por descrição ou categoria
- Resultados em tempo real
- Modal interativo

### Configurações
- Informações do app
- Tamanho de dados
- Limpar cache

## 🎨 Customização

Veja `CUSTOMIZACAO.md` para:
- Mudar cores
- Adicionar categorias
- Modificar layout
- Alterar idioma

## 💾 Dados

### Armazenamento
- Dados salvos em `localStorage` do navegador
- 100% privado (sem envio para servidor)
- Persiste entre sessões

### Exportação
- Baixe dados em CSV
- Compatível com Excel, Google Sheets, etc
- Sempre faça backup!

### Backup
```
Menu → Exportar → Salve o arquivo CSV
```

## 🔐 Segurança

✅ Dados privados no seu navegador
✅ Nenhum servidor externo
✅ Nenhum rastreamento
✅ Sem login necessário
✅ Funciona offline

## 🛠️ Desenvolvimento

### Estrutura do Código

```javascript
// DADOS GLOBAIS
let transacoes = [];
let metas = [];

// FUNÇÕES PRINCIPAIS
function adicionarTransacao() { ... }
function deletarTransacao(id) { ... }
function atualizarDados() { ... }
function formatarMoeda(valor) { ... }

// SIDEBAR
function abrirSidebar() { ... }
function fecharSidebar() { ... }
function mudarAbaSidebar(aba) { ... }

// GRÁFICOS
function atualizarGraficos() { ... }
function atualizarGraficoReceitas(dados) { ... }

// MODALS
function mostrarModalLimpar() { ... }
function fecharModal() { ... }

// VALIDAÇÕES
function validarFormulario() { ... }
function mostrarErro(id, msg) { ... }
```

### Variáveis de Cor (CSS)

```css
:root {
  --primary: #667eea;      /* Roxo principal */
  --secondary: #764ba2;    /* Roxo secundário */
  --success: #10b981;      /* Verde (receita) */
  --danger: #ef4444;       /* Vermelho (despesa) */
  --warning: #f59e0b;      /* Amarelo (aviso) */
  --light: #f8f9fa;        /* Cinza claro */
  --dark: #1a202c;         /* Cinza escuro */
}
```

## 🔧 Modificações Comuns

### Mudar Cor Principal
Encontre na seção CSS:
```css
:root {
  --primary: #667eea;  /* Mude para sua cor */
}
```

### Adicionar Categoria
Procure por:
```html
<option value="NovaCategoria">Nova Categoria</option>
```

### Mudar Título
Procure por:
```html
<div class="header-title">
  Luz Financeiro  <!-- Mude aqui -->
</div>
```

### Mudar Moeda
Procure por:
```javascript
{ style: 'currency', currency: 'BRL' }  // Mude BRL para USD, EUR, etc
```

## 📊 Dados Salvos

### localStorage Keys
- `luz-transacoes` - Array de transações
- `luz-metas` - Array de metas

### Estrutura de Transação
```javascript
{
  id: 1234567890,        // Timestamp único
  descricao: "Salário",  // Descrição
  valor: 5000.00,        // Valor em R$
  tipo: "receita",       // "receita" ou "despesa"
  categoria: "Salário",  // Categoria selecionada
  data: "2024-01-15",    // Data YYYY-MM-DD
  criada: "15/01/2024..."// Data de criação
}
```

### Estrutura de Meta
```javascript
{
  id: 1234567890,
  nome: "Férias",
  valorAlvo: 5000.00,
  data: "2024-12-31",
  criada: "15/01/2024..."
}
```

## 🐛 Troubleshooting

### Dados sumiram
- **Causa:** Limpou cache do navegador
- **Solução:** Sempre exporte antes de limpar
- **Evitar:** Use backup regular

### Gráficos não aparecem
- **Causa:** Sem transações
- **Solução:** Adicione pelo menos uma transação

### App lento
- **Causa:** Muitos dados (>1000 transações)
- **Solução:** Exporte e limpe dados antigos

### Não funciona offline
- **Nota:** Gráficos precisam da biblioteca Chart.js (CDN)
- **Solução:** Primeira carga online, depois funciona offline

## 📱 Compatibilidade

✅ Chrome/Chromium
✅ Firefox
✅ Safari
✅ Edge
✅ Mobile (iOS/Android)

Requerimentos:
- JavaScript ativado
- localStorage disponível
- Navegador moderno (2020+)

## 🚀 Deploy

### GitHub Pages (Grátis)
```
1. Crie repositório
2. Faça upload de index.html
3. Ative GitHub Pages
4. Acesse: https://username.github.io/luz-financeiro
```

Veja `DEPLOY.md` para detalhes

### Alternativas
- Netlify (grátis)
- Vercel (grátis)
- Seu próprio servidor
- Servidor compartilhado

## 📦 Dependências Externas

Apenas HTML/CSS/JavaScript vanilla com:
- **Chart.js** - Gráficos (CDN)
- **Font Awesome** - Ícones (CDN)

Sem frameworks pesados! ⚡

## 📄 Licença

Uso livre - Customize como quiser!

## 🤝 Contribuições

Quer melhorias? Peça ao Claude! Sugestões:
- Sincronizar com Google Sheets
- Backup automático
- Previsão com IA
- Modo escuro
- Multi-idioma

## 📞 Suporte

### Documentação
- `CUSTOMIZACAO.md` - Como customizar
- `DEPLOY.md` - Como colocar online

### Código Comentado
- Cada função tem documentação
- Variáveis descritivas
- Estrutura organizada

## ✅ Checklist de Primeiro Uso

- [ ] Baixe o arquivo `index.html`
- [ ] Abra no navegador
- [ ] Teste adicionando uma transação
- [ ] Exporte dados em CSV (backup)
- [ ] Compartilhe com amigos (se online)
- [ ] Customize cores se desejar

## 🎯 Próximas Melhorias Sugeridas

1. **Sincronização em Nuvem**
   - Google Sheets
   - Dropbox
   - OneDrive

2. **Inteligência Artificial**
   - Previsão de gastos
   - Categorização automática
   - Alertas de gasto

3. **Interface**
   - Modo escuro
   - Mais gráficos
   - Print-friendly

4. **Segurança**
   - Senha/PIN
   - Backup automático
   - Criptografia

5. **Internacionalização**
   - Português
   - Inglês
   - Espanhol

---

**Aproveite! 💰✨**

Para más dúvidas ou sugestões, converse com o Claude! 🚀