/**
 * app.js - Funções Principais
 * Navegação, sidebar, views
 */

// Variáveis globais
let transacoes = [];
let metas = [];

/**
 * Atualizar tudo (métricas, tabelas, etc)
 */
function atualizarTudo() {
  atualizarMetricas();
  atualizarTabela();
  atualizarMetas();
  atualizarCategorias();
}

/**
 * Abrir sidebar
 */
function abrirSidebar() {
  document.getElementById('sidebar').classList.add('active');
  document.getElementById('overlay').classList.add('active');
}

/**
 * Fechar sidebar
 */
function fecharSidebar() {
  document.getElementById('sidebar').classList.remove('active');
  document.getElementById('overlay').classList.remove('active');
}

/**
 * Mudar aba/view
 */
function mudarAba(aba) {
  // Esconder todas
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  document.querySelectorAll('.menu-item').forEach(m => m.classList.remove('active'));

  // Mostrar selecionada
  document.getElementById(aba).classList.add('active');
  event.target.closest('.menu-item').classList.add('active');

  fecharSidebar();

  // Atualizar dados específicos
  if (aba === 'metas') atualizarMetas();
  if (aba === 'categorias') atualizarCategorias();
}

/**
 * Atualizar categorias
 */
function atualizarCategorias() {
  const categorias = {};
  transacoes.forEach(t => {
    if (!categorias[t.categoria]) {
      categorias[t.categoria] = { valor: 0, quantidade: 0 };
    }
    categorias[t.categoria].valor += t.valor;
    categorias[t.categoria].quantidade++;
  });

  const container = document.getElementById('categoriasContainer');

  if (Object.keys(categorias).length === 0) {
    container.innerHTML = `
      <div class="empty-state" style="grid-column: 1 / -1;">
        <div class="empty-state-icon"><i class="fas fa-tags"></i></div>
        <p>Nenhuma transação</p>
      </div>
    `;
    return;
  }

  const sorted = Object.entries(categorias).sort((a, b) => b[1].valor - a[1].valor);

  container.innerHTML = sorted.map(([cat, dados]) => `
    <div class="category-card">
      <div class="category-name">${cat}</div>
      <div class="category-value">${formatarMoeda(dados.valor)}</div>
      <div class="category-count">${dados.quantidade} transação(ões)</div>
    </div>
  `).join('');
}
