/**
 * metas.js - Gerenciamento de Metas Inteligentes
 * Cria metas, calcula sugestões, adiciona valores
 */

// Variável global
let metas = [];

/**
 * Adicionar nova meta
 */
function adicionarMeta() {
  const nome = document.getElementById('nomeMeta').value.trim();
  const valor = parseFloat(document.getElementById('valorMeta').value);
  const data = document.getElementById('dataMeta').value;
  const prioridade = document.getElementById('prioridadeMeta').value;

  // Validar
  if (!nome || !valor || !data) {
    mostrarNotificacao('Preencha todos os campos', 'error');
    return;
  }

  if (valor <= 0) {
    mostrarNotificacao('O valor deve ser maior que zero', 'error');
    return;
  }

  // Criar meta
  const meta = {
    id: Date.now(),
    nome,
    valorAlvo: Math.round(valor * 100) / 100,
    data,
    prioridade,
    valorAdicionado: 0,
    criada: new Date().toLocaleString('pt-BR')
  };

  // Adicionar ao array
  metas.push(meta);

  // Salvar
  salvarDados();

  // Limpar formulário
  document.getElementById('nomeMeta').value = '';
  document.getElementById('valorMeta').value = '';
  document.getElementById('dataMeta').value = '';
  document.getElementById('prioridadeMeta').value = 'baixa';

  mostrarNotificacao('✓ Meta criada!', 'success');
  atualizarMetas();
}

/**
 * Atualizar visualização de metas
 */
function atualizarMetas() {
  const container = document.getElementById('metasContainer');

  if (metas.length === 0) {
    container.innerHTML = `
      <div class="empty-state" style="grid-column: 1 / -1;">
        <div class="empty-state-icon"><i class="fas fa-target"></i></div>
        <p>Nenhuma meta criada</p>
      </div>
    `;
    return;
  }

  container.innerHTML = metas.map(meta => {
    const sugestao = calcularSugestao(meta);
    const progresso = (meta.valorAdicionado / meta.valorAlvo) * 100;
    const faltante = meta.valorAlvo - meta.valorAdicionado;

    return `
      <div class="meta-card priority-${meta.prioridade}">
        <div class="meta-header">
          <div class="meta-title">
            <span class="priority-badge ${meta.prioridade}"></span>
            <strong>${meta.nome}</strong>
          </div>
          <div class="meta-value">${formatarMoeda(meta.valorAlvo)}</div>
        </div>

        <div class="meta-info">
          <div>
            <strong style="color: #667eea;">Adicionado:</strong><br>
            ${formatarMoeda(meta.valorAdicionado)}
          </div>
          <div>
            <strong style="color: #667eea;">Faltam:</strong><br>
            ${formatarMoeda(faltante)}
          </div>
        </div>

        <div class="progress-section">
          <div class="progress-label">
            <span>Progresso</span>
            <strong>${Math.round(progresso)}%</strong>
          </div>
          <div class="progress-bar">
            <div class="progress-fill" style="width: ${progresso}%"></div>
          </div>
        </div>

        <div class="suggestion-box">
          <strong>💡 Sugestão:</strong> ${sugestao}
        </div>

        <div class="add-value-input">
          <input type="number" id="valor-meta-${meta.id}" placeholder="Adicionar valor..." step="0.01" min="0.01">
          <button onclick="adicionarValorMeta(${meta.id})">Adicionar</button>
        </div>
      </div>
    `;
  }).join('');
}

/**
 * Adicionar valor à meta
 */
function adicionarValorMeta(metaId) {
  const input = document.getElementById(`valor-meta-${metaId}`);
  const valor = parseFloat(input.value);

  if (!valor || valor <= 0) {
    mostrarNotificacao('Digite um valor válido', 'error');
    return;
  }

  const meta = metas.find(m => m.id === metaId);
  if (meta) {
    meta.valorAdicionado = Math.round((meta.valorAdicionado + valor) * 100) / 100;
    
    // Não ultrapassar o valor alvo
    if (meta.valorAdicionado > meta.valorAlvo) {
      meta.valorAdicionado = meta.valorAlvo;
    }
    
    salvarDados();
    input.value = '';
    atualizarMetas();
    mostrarNotificacao('✓ Valor adicionado!', 'success');
  }
}

/**
 * Calcular sugestão inteligente
 * Com base em despesas recentes
 */
function calcularSugestao(meta) {
  // Pegar últimas 30 despesas
  const despesasRecentes = transacoes
    .filter(t => t.tipo === 'despesa')
    .slice(-30);

  // Calcular média diária
  const mediaDiaria = despesasRecentes.length > 0
    ? despesasRecentes.reduce((acc, t) => acc + t.valor, 0) / 30
    : 100;

  // Sugerir economia de 10% da média (mínimo R$10)
  const economiaDiaria = Math.max(10, mediaDiaria * 0.1);
  
  // Calcular dias até atingir a meta
  const faltante = meta.valorAlvo - meta.valorAdicionado;
  const diasRestantes = Math.ceil(faltante / economiaDiaria);

  return `Com economia diária de <strong>${formatarMoeda(economiaDiaria)}</strong>, você consegue em <strong>${diasRestantes} dias</strong> 📅`;
}

/**
 * Verificar meta próxima ao vencimento
 */
function verificarMetasVencimento() {
  const hoje = new Date();
  
  metas.forEach(meta => {
    const dataVencimento = new Date(meta.data);
    const diasRestantes = Math.floor((dataVencimento - hoje) / (1000 * 60 * 60 * 24));
    
    if (diasRestantes === 0) {
      mostrarNotificacao(`⏰ Meta "${meta.nome}" vence hoje!`, 'success');
    } else if (diasRestantes === 1) {
      mostrarNotificacao(`⏰ Meta "${meta.nome}" vence amanhã!`, 'success');
    }
  });
}

/**
 * Obter progresso total das metas
 */
function getProgressoMetas() {
  if (metas.length === 0) return 0;
  
  const totalAdicionado = metas.reduce((acc, m) => acc + m.valorAdicionado, 0);
  const totalAlvo = metas.reduce((acc, m) => acc + m.valorAlvo, 0);
  
  return totalAlvo === 0 ? 0 : (totalAdicionado / totalAlvo) * 100;
}
