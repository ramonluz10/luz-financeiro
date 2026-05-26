/**
 * utils.js - Funções Utilitárias
 * Formatação, notificações, etc
 */

/**
 * Formatar número como moeda brasileira
 * @param {number} valor - Valor a formatar
 * @returns {string} Valor formatado
 */
function formatarMoeda(valor) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(valor);
}

/**
 * Formatar data
 * @param {string} data - Data em formato YYYY-MM-DD
 * @returns {string} Data formatada
 */
function formatarData(data) {
  return new Date(data).toLocaleDateString('pt-BR');
}

/**
 * Mostrar notificação
 * @param {string} mensagem - Mensagem a exibir
 * @param {string} tipo - 'success' ou 'error'
 */
function mostrarNotificacao(mensagem, tipo) {
  const notif = document.createElement('div');
  notif.className = `notification ${tipo}`;
  notif.innerHTML = `
    <i class="fas fa-${tipo === 'success' ? 'check-circle' : 'times-circle'}"></i> 
    ${mensagem}
  `;
  document.body.appendChild(notif);

  // Remover após 3.5 segundos
  setTimeout(() => {
    notif.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => notif.remove(), 300);
  }, 3500);
}

/**
 * Validar email
 * @param {string} email - Email a validar
 * @returns {boolean} True se válido
 */
function validarEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

/**
 * Validar senha (mínimo 6 caracteres)
 * @param {string} senha - Senha a validar
 * @returns {boolean} True se válido
 */
function validarSenha(senha) {
  return senha && senha.length >= 6;
}

/**
 * Gerar ID único
 * @returns {string} ID único
 */
function gerarIdUnico() {
  return `id_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Clonar objeto (deep clone)
 * @param {object} obj - Objeto a clonar
 * @returns {object} Clone do objeto
 */
function clonarObjeto(obj) {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * Ordenar array de objetos
 * @param {array} array - Array a ordenar
 * @param {string} propriedade - Propriedade para ordenar
 * @param {string} direcao - 'asc' ou 'desc'
 * @returns {array} Array ordenado
 */
function ordenarArray(array, propriedade, direcao = 'asc') {
  return [...array].sort((a, b) => {
    const valA = a[propriedade];
    const valB = b[propriedade];

    if (direcao === 'asc') {
      return valA > valB ? 1 : -1;
    } else {
      return valA < valB ? 1 : -1;
    }
  });
}

/**
 * Filtrar array de objetos
 * @param {array} array - Array a filtrar
 * @param {string} propriedade - Propriedade para filtrar
 * @param {*} valor - Valor a procurar
 * @returns {array} Array filtrado
 */
function filtrarArray(array, propriedade, valor) {
  return array.filter(item => item[propriedade] === valor);
}

/**
 * Calcular dias entre duas datas
 * @param {string} data1 - Data inicial (YYYY-MM-DD)
 * @param {string} data2 - Data final (YYYY-MM-DD)
 * @returns {number} Número de dias
 */
function calcularDias(data1, data2) {
  const d1 = new Date(data1);
  const d2 = new Date(data2);
  const diferenca = Math.abs(d2 - d1);
  const dias = Math.ceil(diferenca / (1000 * 60 * 60 * 24));
  return dias;
}

/**
 * Debounce - Aguarda antes de executar função
 * @param {function} func - Função a executar
 * @param {number} delay - Delay em ms
 * @returns {function} Função com debounce
 */
function debounce(func, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

/**
 * Throttle - Executa função com limite de frequência
 * @param {function} func - Função a executar
 * @param {number} limit - Limite em ms
 * @returns {function} Função com throttle
 */
function throttle(func, limit) {
  let inThrottle;
  return function (...args) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

/**
 * Gerar cor aleatória
 * @returns {string} Cor em hexadecimal
 */
function gerarCorAleatoria() {
  return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

/**
 * Formatar número com separador de milhares
 * @param {number} numero - Número a formatar
 * @returns {string} Número formatado
 */
function formatarNumero(numero) {
  return numero.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

/**
 * Truncar texto
 * @param {string} texto - Texto a truncar
 * @param {number} max - Número máximo de caracteres
 * @returns {string} Texto truncado
 */
function truncarTexto(texto, max = 50) {
  return texto.length > max ? texto.substring(0, max) + '...' : texto;
}

/**
 * Converter texto para maiúsculas (primeira letra)
 * @param {string} texto - Texto a converter
 * @returns {string} Texto convertido
 */
function capitalize(texto) {
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}

/**
 * Verificar se está online
 * @returns {boolean} True se online
 */
function estaOnline() {
  return navigator.onLine;
}

/**
 * Copiar texto para clipboard
 * @param {string} texto - Texto a copiar
 */
function copiarParaClipboard(texto) {
  navigator.clipboard.writeText(texto)
    .then(() => mostrarNotificacao('✓ Copiado!', 'success'))
    .catch(err => mostrarNotificacao('Erro ao copiar', 'error'));
}

/**
 * Abrir link em nova aba
 * @param {string} url - URL a abrir
 */
function abrirEmNovaAba(url) {
  window.open(url, '_blank');
}

/**
 * Scrollar para topo
 */
function scrollarParaTopo() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

/**
 * Scrollar para elemento
 * @param {string} id - ID do elemento
 */
function scrollarParaElemento(id) {
  const elemento = document.getElementById(id);
  if (elemento) {
    elemento.scrollIntoView({ behavior: 'smooth' });
  }
}
