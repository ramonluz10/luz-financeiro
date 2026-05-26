# 🎨 Guia de Customização - Luz Financeiro

Como fazer alterações no app para seu gosto pessoal.

## 🌈 Mudar Cores

### 1. Cores Principais (Gradiente)

Procure por esta seção no início do `<style>`:

```css
:root {
  --primary: #667eea;      /* Roxo - Mude aqui */
  --secondary: #764ba2;    /* Roxo escuro - Mude aqui */
  --success: #10b981;      /* Verde (receita) */
  --danger: #ef4444;       /* Vermelho (despesa) */
  --warning: #f59e0b;      /* Amarelo */
}
```

### Exemplos de Cores

**Azul Claro:**
```css
--primary: #3b82f6;
--secondary: #1e40af;
```

**Verde Moderno:**
```css
--primary: #10b981;
--secondary: #059669;
```

**Rosa/Magenta:**
```css
--primary: #ec4899;
--secondary: #be185d;
```

**Laranja:**
```css
--primary: #f97316;
--secondary: #ea580c;
```

**Usar Colors Online:**
- https://colorhexa.com
- https://coolors.co
- https://colordot.it

---

## 📝 Mudar Texto

### Título do App

Procure por:
```html
<div class="header-title">
  Luz Financeiro
</div>
```

Mude "Luz Financeiro" para seu nome.

### Descrição Meta Tag

Procure por:
```html
<meta name="description" content="Luz Financeiro - Dashboard de controle financeiro pessoal">
```

---

## 📂 Adicionar Novas Categorias

### Opção 1: Adicionar Categorias na Seleção

Procure por:
```html
<select id="categoria">
  <option value="">Categoria *</option>
  <option value="Salário">Salário</option>
  <option value="Freelance">Freelance</option>
  <!-- ... outras opções ... -->
</select>
```

Adicione:
```html
<option value="NovaCategoria">Nova Categoria</option>
```

### Opção 2: Permitir Categorias Customizadas

Mude o `<select>` para `<input>`:

```html
<!-- Antes -->
<select id="categoria">
  <option value="">Categoria *</option>
  ...
</select>

<!-- Depois -->
<input type="text" id="categoria" placeholder="Categoria *" maxlength="30">
```

---

## 🔤 Mudar Idioma

### Tradução Completa

Procure por cada texto e mude:

```html
<!-- Header -->
<div class="header-title">Dashboard Financeiro</div>
<!-- Mude para seu idioma -->

<!-- Menu Items -->
<div class="menu-item">Dashboard</div>
<!-- Mude para: Painel, etc -->

<!-- Seções -->
<div class="section-title">
  <i class="fas fa-plus-circle"></i>Adicionar transação
</div>
<!-- Mude para: Agregar transación, Add Transaction, etc -->
```

### Lista Completa de Textos a Traduzir

```
Dashboard        → Painel / Consola
Receita          → Entrada / Ingresos
Despesa          → Saída / Gastos
Saldo            → Balance / Saldo
Transações       → Operaciones / Transações
Adicionar        → Agregar / Add
Deletar          → Borrar / Delete
Categorias       → Categorías / Categories
Metas            → Objetivos / Goals
Relatórios       → Reportes / Reports
Configurações    → Opciones / Settings
```

---

## 🎯 Mudar Categorias Padrão

### Pré-definir Categorias Específicas

Se você trabalha com categorias diferentes, customize:

```html
<select id="categoria">
  <option value="">Categoria *</option>
  <option value="Clientes">Clientes</option>
  <option value="Fornecedores">Fornecedores</option>
  <option value="Investimentos">Investimentos</option>
  <option value="Impostos">Impostos</option>
  <option value="Marketing">Marketing</option>
</select>
```

---

## 📊 Mudar Gráficos

### Tipo de Gráfico

Procure por:
```javascript
chartReceitas = new Chart(ctx, {
  type: 'doughnut',  // Mude para 'pie', 'bar', 'line'
  ...
});
```

**Tipos disponíveis:**
- `doughnut` - Gráfico de rosca (padrão)
- `pie` - Gráfico de pizza
- `bar` - Gráfico de barras
- `line` - Gráfico de linha
- `radar` - Gráfico de radar

### Cores dos Gráficos

Procure por:
```javascript
backgroundColor: ['#10b981', '#34d399', '#6ee7b7', '#a7f3d0', '#d1fae5']
```

Mude as cores (format: #RRGGBB ou rgb(r,g,b))

---

## 💾 Mudar Moeda

### De Real para Dólar

Procure por:
```javascript
{ style: 'currency', currency: 'BRL' }
```

Mude para:
```javascript
{ style: 'currency', currency: 'USD' }  // Dólar
{ style: 'currency', currency: 'EUR' }  // Euro
{ style: 'currency', currency: 'GBP' }  // Libra
```

**Códigos de Moeda:**
- USD - Dólar americano
- EUR - Euro
- GBP - Libra esterlina
- JPY - Iene japonês
- AUD - Dólar australiano
- CAD - Dólar canadense
- CHF - Franco suíço
- CNY - Yuan chinês
- INR - Rupia indiana
- BRL - Real brasileiro

---

## 🔧 Modificações de Layout

### Largura da Sidebar

Procure por:
```css
.sidebar {
  width: 300px;  /* Mude aqui */
}
```

Aumentar:
```css
width: 350px;  /* Mais larga */
```

Diminuir:
```css
width: 250px;  /* Mais estreita */
```

### Espaçamento de Padding

Procure por:
```css
.content {
  padding: 30px;  /* Mude aqui */
}
```

Maior espaçamento:
```css
padding: 50px;
```

Menor espaçamento:
```css
padding: 20px;
```

### Tamanho da Fonte

Procure por:
```css
.section-title {
  font-size: 20px;  /* Mude aqui */
}
```

---

## 🎨 Adicionar Logo Customizada

### Mudar Logo da Sidebar

Procure por:
```html
<div class="logo-icon">💡</div>
```

Mude o emoji:
```html
<div class="logo-icon">💰</div>  <!-- Dinheiro -->
<div class="logo-icon">📊</div>  <!-- Gráfico -->
<div class="logo-icon">🏦</div>  <!-- Banco -->
```

Ou adicione um `<img>`:
```html
<div class="logo-icon">
  <img src="sua-logo.png" style="width: 100%; height: 100%; border-radius: 8px;">
</div>
```

### Mudar Logo do Header

Procure por:
```html
<div class="logo-header">L$</div>
```

Mude para:
```html
<div class="logo-header">💡</div>
```

---

## ✏️ Mudar Validações

### Mínimo de Caracteres na Descrição

Procure por:
```javascript
if (descricao.length < 3) {  // Mude de 3
```

Aumentar para 5:
```javascript
if (descricao.length < 5) {
```

### Máximo de Valor

Procure por:
```javascript
if (parseFloat(valor) > 999999.99) {
```

Mude o limite:
```javascript
if (parseFloat(valor) > 50000.00) {
```

---

## 🎵 Adicionar Som

### Quando Adiciona Transação

Procure por `function adicionarTransacao()` e adicione:

```javascript
// Toque um som ao adicionar
const audio = new Audio('data:audio/wav;base64,UklGRiYAAABXQVZFZm10IBAAAAABAAEAQB8AAAB9AAACABAAZGF0YQIAAAAAAA==');
audio.play();
```

---

## 🌙 Modo Escuro (Avançado)

### Adicionar Botão de Modo Escuro

Adicione na sidebar:
```html
<button class="btn-sidebar" onclick="alternarModoEscuro()">
  <i class="fas fa-moon"></i>
  Modo Escuro
</button>
```

E no JavaScript:
```javascript
function alternarModoEscuro() {
  document.body.classList.toggle('dark-mode');
  localStorage.setItem('dark-mode', document.body.classList.contains('dark-mode'));
}

// Verificar ao carregar
if (localStorage.getItem('dark-mode') === 'true') {
  document.body.classList.add('dark-mode');
}
```

E no CSS:
```css
body.dark-mode {
  background: #1a1a1a !important;
}

body.dark-mode .section {
  background: #2a2a2a;
  color: white;
}
```

---

## 🔐 Adicionar Senha Simples

Adicione no início do JavaScript:

```javascript
// Solicitar senha ao abrir
const senha = prompt('Senha do app:');
if (senha !== 'sua-senha-aqui') {
  alert('Senha incorreta!');
  location.href = 'about:blank';
}
```

---

## 📝 Customizações Populares

### 1. Tema Para Casal
```css
--primary: #ff69b4;      /* Rosa */
--secondary: #ff1493;    /* Rosa escuro */
```

### 2. Tema Corporativo
```css
--primary: #003399;      /* Azul escuro */
--secondary: #003366;
```

### 3. Tema Eco
```css
--primary: #228b22;      /* Verde floresta */
--secondary: #1a6b1a;
```

### 4. Tema Minimalista
```css
--primary: #333333;      /* Cinza escuro */
--secondary: #666666;
```

---

## ✅ Teste suas Alterações

1. Abra o arquivo no navegador
2. Use F12 para abrir DevTools
3. Console mostra erros em vermelho
4. Teste todas as funcionalidades
5. Exporte dados em CSV para backup

---

## 🆘 Problemas Comuns

### "Variável não encontrada"
- Certifique-se de editar a grafia exatamente
- Use Ctrl+F para procurar no arquivo

### "CSS não muda"
- Recarregue a página: Ctrl+F5
- Limpe cache: Ctrl+Shift+Delete

### "JavaScript quebrado"
- Procure pelo erro no Console (F12)
- Reverta sua última alteração

### "Cores estranhas"
- Use hex válido: #RRGGBB
- Teste em https://colorhexa.com

---

## 🎓 Recursos Úteis

- **CSS Tutorial:** https://www.w3schools.com/css/
- **JavaScript Tutorial:** https://www.w3schools.com/js/
- **HTML Editor Online:** https://www.w3schools.com/tryit/
- **Color Picker:** https://htmlcolorcodes.com/
- **Icon Picker:** https://fontawesome.com/icons

---

## 📞 Precisa de Ajuda?

Peça ao Claude para:
1. Mudar cores
2. Adicionar features
3. Traduzir para outro idioma
4. Customizar layout
5. Adicionar sons/animações

**Tudo é possível!** 🚀

---

**Divirta-se customizando! ✨**