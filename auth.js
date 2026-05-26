/**
 * auth.js - Autenticação SEM API
 * Login e Cadastro usando localStorage
 * Sem Google OAuth, sem servidor backend
 */

// Variável global
let usuarioAtual = null;

// Carrega usuários do localStorage na inicialização
function carregarUsarios() {
  const usuarios = localStorage.getItem('usuarios_luz');
  return usuarios ? JSON.parse(usuarios) : {};
}

// Salva usuários no localStorage
function salvarUsuarios(usuarios) {
  localStorage.setItem('usuarios_luz', JSON.stringify(usuarios));
}

/**
 * FAZER LOGIN - Email + Senha
 */
function fazerLogin(event) {
  event.preventDefault();

  const email = document.getElementById('emailLogin').value.trim();
  const senha = document.getElementById('senhaLogin').value;

  // Carregar usuários cadastrados
  const usuarios = carregarUsarios();

  // Validar email
  if (!email || !senha) {
    mostrarNotificacao('Preencha todos os campos', 'error');
    return;
  }

  // Verificar se usuário existe
  if (!usuarios[email]) {
    mostrarNotificacao('Email ou senha incorretos', 'error');
    return;
  }

  // Verificar senha (comparar hash)
  const usuarioCadastrado = usuarios[email];
  if (!verificarSenha(senha, usuarioCadastrado.senhaHash)) {
    mostrarNotificacao('Email ou senha incorretos', 'error');
    return;
  }

  // Login bem-sucedido!
  usuarioAtual = {
    email: email,
    nome: usuarioCadastrado.nome,
    dataCriacao: usuarioCadastrado.dataCriacao,
    dataLogin: new Date().toISOString()
  };

  // Salvar sessão
  localStorage.setItem('usuario_logado', JSON.stringify(usuarioAtual));

  // Mostrar app
  mostrarApp();
  mostrarNotificacao(`✓ Bem-vindo, ${usuarioAtual.nome}!`, 'success');

  // Limpar formulário
  document.getElementById('emailLogin').value = '';
  document.getElementById('senhaLogin').value = '';
}

/**
 * FAZER CADASTRO - Criar nova conta
 */
function fazerCadastro(event) {
  event.preventDefault();

  const nome = document.getElementById('nomeCadastro').value.trim();
  const email = document.getElementById('emailCadastro').value.trim();
  const senha = document.getElementById('senhaCadastro').value;
  const confirmarSenha = document.getElementById('confirmarSenha').value;

  // Validações
  if (!nome || !email || !senha || !confirmarSenha) {
    mostrarNotificacao('Preencha todos os campos', 'error');
    return;
  }

  if (nome.length < 3) {
    mostrarNotificacao('Nome deve ter no mínimo 3 caracteres', 'error');
    return;
  }

  if (!validarEmail(email)) {
    mostrarNotificacao('Email inválido', 'error');
    return;
  }

  if (senha.length < 6) {
    mostrarNotificacao('Senha deve ter no mínimo 6 caracteres', 'error');
    document.getElementById('senhaError').style.display = 'none';
    return;
  }

  if (senha !== confirmarSenha) {
    document.getElementById('senhaError').style.display = 'block';
    mostrarNotificacao('As senhas não coincidem', 'error');
    return;
  }

  // Carregar usuários existentes
  const usuarios = carregarUsarios();

  // Verificar se email já existe
  if (usuarios[email]) {
    document.getElementById('emailError').style.display = 'block';
    mostrarNotificacao('Este email já está cadastrado', 'error');
    return;
  }

  // Criar novo usuário com hash da senha
  const senhaHash = hashSenha(senha);

  usuarios[email] = {
    nome: nome,
    email: email,
    senhaHash: senhaHash,
    dataCriacao: new Date().toISOString()
  };

  // Salvar no localStorage
  salvarUsuarios(usuarios);

  mostrarNotificacao('✓ Conta criada com sucesso! Faça login', 'success');

  // Limpar e voltar para login
  setTimeout(() => {
    document.getElementById('nomeCadastro').value = '';
    document.getElementById('emailCadastro').value = '';
    document.getElementById('senhaCadastro').value = '';
    document.getElementById('confirmarSenha').value = '';
    document.getElementById('emailError').style.display = 'none';
    document.getElementById('senhaError').style.display = 'none';
    mostrarLogin();
  }, 1500);
}

/**
 * RECUPERAR SENHA
 */
function recuperarSenha(event) {
  event.preventDefault();

  const email = document.getElementById('emailRecuperar').value.trim();
  const usuarios = carregarUsarios();

  if (!email) {
    mostrarNotificacao('Digite um email', 'error');
    return;
  }

  if (!usuarios[email]) {
    document.getElementById('emailRecupError').style.display = 'block';
    mostrarNotificacao('Email não encontrado', 'error');
    return;
  }

  // Gerar uma senha temporária aleatória
  const novaSenhaTemporaria = gerarSenhaAleatoria();
  const senhaHash = hashSenha(novaSenhaTemporaria);

  // Atualizar senha no usuário
  usuarios[email].senhaHash = senhaHash;
  salvarUsuarios(usuarios);

  // Mostrar mensagem com a nova senha
  mostrarNotificacao(`✓ Senha redefinida! Nova senha: ${novaSenhaTemporaria}`, 'success');

  // Mostrar em um alert também (em produção seria enviado por email)
  alert(`
🔑 SENHA TEMPORÁRIA

Sua nova senha temporária é:
${novaSenhaTemporaria}

Use esta senha para fazer login e depois altere por uma nova no perfil.
  `);

  // Limpar e voltar
  setTimeout(() => {
    document.getElementById('emailRecuperar').value = '';
    document.getElementById('emailRecupError').style.display = 'none';
    mostrarLogin();
  }, 1000);
}

/**
 * FAZER LOGOUT
 */
function fazerLogout() {
  if (confirm('Tem certeza que deseja sair?')) {
    // Remover sessão
    localStorage.removeItem('usuario_logado');
    usuarioAtual = null;

    // Voltar para tela de login
    document.getElementById('appContainer').style.display = 'none';
    document.getElementById('authScreen').style.display = 'flex';

    mostrarNotificacao('✓ Desconectado com sucesso', 'success');
  }
}

/**
 * FAZER HASH DA SENHA (Simples - Em produção usar bcryptjs)
 * ⚠️ IMPORTANTE: Em produção, use uma biblioteca como bcryptjs
 */
function hashSenha(senha) {
  // Implementação simples com SHA-256
  // Em produção: npm install bcryptjs
  // import bcrypt from 'bcryptjs';
  // const hash = await bcrypt.hash(senha, 10);

  // Para este projeto, usar btoa (Base64) + reversão
  // ⚠️ NÃO é seguro! Apenas para demonstração
  return btoa(senha + 'luz_financeiro_salt');
}

/**
 * VERIFICAR SENHA
 */
function verificarSenha(senha, hash) {
  return hashSenha(senha) === hash;
}

/**
 * GERAR SENHA ALEATÓRIA TEMPORÁRIA
 */
function gerarSenhaAleatoria() {
  const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%';
  let senha = '';
  for (let i = 0; i < 12; i++) {
    senha += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
  }
  return senha;
}

/**
 * MOSTRAR FORMULÁRIO DE LOGIN
 */
function mostrarLogin() {
  document.getElementById('loginForm').classList.remove('hidden');
  document.getElementById('cadastroForm').classList.add('hidden');
  document.getElementById('recuperarForm').classList.add('hidden');
}

/**
 * MOSTRAR FORMULÁRIO DE CADASTRO
 */
function mostrarCadastro() {
  document.getElementById('loginForm').classList.add('hidden');
  document.getElementById('cadastroForm').classList.remove('hidden');
  document.getElementById('recuperarForm').classList.add('hidden');
}

/**
 * MOSTRAR FORMULÁRIO DE RECUPERAÇÃO
 */
function mostrarRecuperarSenha(event) {
  event.preventDefault();
  document.getElementById('loginForm').classList.add('hidden');
  document.getElementById('cadastroForm').classList.add('hidden');
  document.getElementById('recuperarForm').classList.remove('hidden');
}

/**
 * MOSTRAR APP (Após login bem-sucedido)
 */
function mostrarApp() {
  document.getElementById('authScreen').style.display = 'none';
  document.getElementById('appContainer').style.display = 'flex';

  // Atualizar dados do usuário no header
  document.getElementById('userName').textContent = usuarioAtual.nome;
  document.getElementById('userEmail').textContent = usuarioAtual.email;

  // Definir data atual no formulário
  document.getElementById('data').valueAsDate = new Date();

  // Carregar dados do usuário
  carregarDadosSalvos();
  atualizarTudo();
}

/**
 * CARREGAR DADOS DO USUÁRIO LOGADO
 */
function carregarDadosSalvos() {
  if (!usuarioAtual) return;

  const transacoesSalvas = localStorage.getItem(`transacoes_${usuarioAtual.email}`);
  const metasSalvas = localStorage.getItem(`metas_${usuarioAtual.email}`);

  if (transacoesSalvas) transacoes = JSON.parse(transacoesSalvas);
  if (metasSalvas) metas = JSON.parse(metasSalvas);
}

/**
 * SALVAR DADOS DO USUÁRIO
 */
function salvarDados() {
  if (!usuarioAtual) return;

  localStorage.setItem(`transacoes_${usuarioAtual.email}`, JSON.stringify(transacoes));
  localStorage.setItem(`metas_${usuarioAtual.email}`, JSON.stringify(metas));
}

/**
 * VERIFICAR SE JÁ ESTÁ LOGADO (Na inicialização)
 */
function verificarSeJaEstaLogado() {
  const usuarioSalvo = localStorage.getItem('usuario_logado');

  if (usuarioSalvo) {
    usuarioAtual = JSON.parse(usuarioSalvo);
    mostrarApp();
  } else {
    document.getElementById('authScreen').style.display = 'flex';
    document.getElementById('appContainer').style.display = 'none';
  }
}

/**
 * VALIDAR EMAIL
 */
function validarEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

// Verificar login ao carregar a página
window.addEventListener('load', verificarSeJaEstaLogado);
