/**
 * exportacao.js - Exportação em PDF e CSV
 * Gera relatórios e exporta dados
 */

/**
 * Exportar como CSV
 */
function exportarCSV() {
  let csv = 'Data,Descrição,Categoria,Tipo,Valor\n';
  
  transacoes.forEach(t => {
    csv += `"${t.data}","${t.descricao}","${t.categoria}","${t.tipo}",${t.valor}\n`;
  });

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `luz-financeiro-${new Date().toISOString().split('T')[0]}.csv`;
  link.click();
  
  mostrarNotificacao('✓ CSV baixado!', 'success');
}

/**
 * Exportar Dashboard em PDF
 */
function exportarPDF() {
  const element = document.getElementById('dashboard');
  const opt = {
    margin: 10,
    filename: `luz-financeiro-${new Date().toISOString().split('T')[0]}.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { orientation: 'portrait', unit: 'mm', format: 'a4' }
  };

  html2pdf().set(opt).from(element).save();
  mostrarNotificacao('✓ PDF baixado!', 'success');
}

/**
 * Gerar Relatório Customizado em PDF
 */
function gerarRelatorioPDF() {
  const tipo = document.getElementById('tipoRelatorio').value;
  const doc = document.createElement('div');
  doc.style.padding = '20px';
  doc.style.background = '#fff';

  let html = `
    <h1 style="text-align: center; color: #667eea; margin-bottom: 10px;">Luz Financeiro - Relatório</h1>
    <p style="text-align: center; color: #666; margin-bottom: 20px;">
      Usuário: ${usuarioAtual.nome} | Gerado em: ${new Date().toLocaleDateString('pt-BR')} às ${new Date().toLocaleTimeString('pt-BR')}
    </p>
  `;

  // ===== RELATÓRIO COMPLETO OU MENSAL =====
  if (tipo === 'completo' || tipo === 'mensal') {
    const receitas = getTotalReceitas();
    const despesas = getTotalDespesas();
    const saldo = getSaldo();

    html += `
      <h2 style="color: #667eea; margin-top: 20px; border-bottom: 2px solid #667eea; padding-bottom: 10px;">Resumo Financeiro</h2>
      <p><strong>Receita Total:</strong> ${formatarMoeda(receitas)}</p>
      <p><strong>Despesa Total:</strong> ${formatarMoeda(despesas)}</p>
      <p><strong>Saldo:</strong> <strong style="color: ${saldo >= 0 ? '#10b981' : '#ef4444'}">${formatarMoeda(saldo)}</strong></p>
      <p><strong>Total de Transações:</strong> ${transacoes.length}</p>
    `;
  }

  // ===== POR CATEGORIA =====
  if (tipo === 'completo' || tipo === 'categoria') {
    html += `<h2 style="color: #667eea; margin-top: 20px; border-bottom: 2px solid #667eea; padding-bottom: 10px;">Transações por Categoria</h2>`;

    const categorias = {};
    transacoes.forEach(t => {
      if (!categorias[t.categoria]) categorias[t.categoria] = [];
      categorias[t.categoria].push(t);
    });

    Object.entries(categorias).sort((a, b) => {
      const totalA = a[1].reduce((acc, t) => acc + t.valor, 0);
      const totalB = b[1].reduce((acc, t) => acc + t.valor, 0);
      return totalB - totalA;
    }).forEach(([cat, trans]) => {
      const total = trans.reduce((acc, t) => acc + t.valor, 0);
      html += `<h3 style="color: #764ba2; margin-top: 15px;">${cat} - ${formatarMoeda(total)}</h3><ul>`;
      trans.forEach(t => {
        html += `<li>${t.descricao} - ${formatarMoeda(t.valor)} (${new Date(t.data).toLocaleDateString('pt-BR')})</li>`;
      });
      html += '</ul>';
    });
  }

  // ===== METAS =====
  if (tipo === 'completo' || tipo === 'metas') {
    html += `<h2 style="color: #667eea; margin-top: 20px; border-bottom: 2px solid #667eea; padding-bottom: 10px;">Acompanhamento de Metas</h2>`;

    if (metas.length > 0) {
      metas.forEach(meta => {
        const progresso = (meta.valorAdicionado / meta.valorAlvo) * 100;
        const sugestao = calcularSugestao(meta);
        
        html += `
          <h3 style="color: #764ba2;">${meta.nome}</h3>
          <p><strong>Alvo:</strong> ${formatarMoeda(meta.valorAlvo)}</p>
          <p><strong>Adicionado:</strong> ${formatarMoeda(meta.valorAdicionado)} (${Math.round(progresso)}%)</p>
          <p><strong>Faltam:</strong> ${formatarMoeda(meta.valorAlvo - meta.valorAdicionado)}</p>
          <p><strong>Vencimento:</strong> ${new Date(meta.data).toLocaleDateString('pt-BR')}</p>
          <p><strong>Prioridade:</strong> ${meta.prioridade.toUpperCase()}</p>
          <p><em>${sugestao}</em></p>
          <hr style="margin: 15px 0;">
        `;
      });
    } else {
      html += '<p>Nenhuma meta criada</p>';
    }
  }

  doc.innerHTML = html;

  const opt = {
    margin: 10,
    filename: `relatorio-luz-${new Date().toISOString().split('T')[0]}.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { orientation: 'portrait', unit: 'mm', format: 'a4' }
  };

  html2pdf().set(opt).from(doc).save();
  mostrarNotificacao('✓ Relatório PDF gerado!', 'success');
}

/**
 * Imprimir página
 */
function imprimirPagina() {
  window.print();
}
