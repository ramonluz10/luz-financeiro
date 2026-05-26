/**
 * transacoes.js - Gerenciamento de Transações
 * Adiciona, edita, deleta transações
 */

// Variável global
let transacoes = [];

/**
 * Adicionar nova transação
 */
function adicionarTransacao() {
  const descricao = document.getElementById('descricao').value.trim();
  const valor = parseFloat(document.getElementById('valor').value);
  const tipo = document.getElementById('tipo').value;
  const categoria = document.getElementById('categoria').value;
  const data = document.getElementById('data').value;

  // Validar
  if (!descricao || !valor || !tipo || !categoria || !data) {
    mostrarNotificacao('Preencha todos os campos', 'error');
    return;
  }

  if (valor <= 0) {
    mostrarNotificacao('O valor deve ser maior que zero', 'error');
    return;
  }

  // Criar transação
  const transacao = {
    id: Date.now(),
    descricao,
    valor: Math.round(valor * 100) / 100,
    tipo,
    categoria,
    data,
    criada: new Date().toLocaleString('pt-BR')
  };

  // Adicionar ao array
  transacoes.push(transacao);

  // Salvar
  salvarDados();

  // Limpar formulário
  document.getElementById('descricao').value = '';
  document.getElementById('valor').value = '';
  document.getElementById('tipo').value = '';
  document.getElementById('categoria').value = '';
  document.getElementById('data').valueAsDate = new Date();

  mostrarNotificacao('✓ Transação adicionada!', 'success');
  atualizarTudo();
}

/**
 * Atualizar métricas
 */
function atualizarMetricas() {
  const receitas = transacoes
    .filter(t => t.tipo === 'receita')
    .reduce((acc, t) => acc + t.valor, 0);
  
  const despesas = transacoes
    .filter(t => t.tipo === 'despesa')
    .reduce((acc, t) => acc + t.valor, 0);
  
  const saldo = receitas - despesas;

  document.getElementById('totalReceita').textContent = formatarMoeda(receitas);
  document.getElementById('totalDespesa').textContent = formatarMoeda(despesas);
  document.getElementById('saldo').textContent = formatarMoeda(saldo);
  document.getElementById('totalTransacoes').textContent = transacoes.length;
}

/**
 * Atualizar tabela de histórico
 */
function atualizarTabela() {
  const tbody = document.getElementById('tbody-transacoes');
  const sorted = [...transacoes].sort((a, b) => new Date(b.data) - new Date(a.data));

  if (sorted.length === 0) {
    tbody.innerHTML = '<tr><td colspan="4" style="text-align: center; padding: 40px; color: #999;">Nenhuma transação</td></tr>';
    return;
  }

  tbody.innerHTML = sorted.map(t => `
    <tr>
      <td>${t.descricao}</td>
      <td><span style="background: #f0f2f5; padding: 4px 8px; border-radius: 6px; font-size: 12px;">${t.categoria}</span></td>
      <td>${new Date(t.data).toLocaleDateString('pt-BR')}</td>
      <td style="text-align: right; color: ${t.tipo === 'receita' ? '#10b981' : '#ef4444'}; font-weight: 600;">
        ${t.tipo === 'receita' ? '+' : '-'} ${formatarMoeda(t.valor)}
      </td>
    </tr>
  `).join('');
}

/**
 * Obter total de receitas
 */
function getTotalReceitas() {
  return transacoes
    .filter(t => t.tipo === 'receita')
    .reduce((acc, t) => acc + t.valor, 0);
}

/**
 * Obter total de despesas
 */
function getTotalDespesas() {
  return transacoes
    .filter(t => t.tipo === 'despesa')
    .reduce((acc, t) => acc + t.valor, 0);
}

/**
 * Obter saldo
 */
function getSaldo() {
  return getTotalReceitas() - getTotalDespesas();
}
