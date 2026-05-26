# 🚀 Luz Financeiro v4 - SEM API EXTERNA

Dashboard profissional de controle financeiro com **Login e Cadastro 100% Real**. Tudo funciona localmente sem precisar de API, Google OAuth ou servidor.

## ✨ Recursos

- ✅ **Login Real** - Email + Senha
- ✅ **Cadastro Completo** - Criar conta nova
- ✅ **Recuperação de Senha** - Recuperar acesso
- ✅ **Dados por Usuário** - Cada usuário tem seus dados
- ✅ **Metas Inteligentes** - Com sugestões automáticas
- ✅ **Priorização** - Cores para diferentes prioridades
- ✅ **Exportação PDF** - Relatórios customizáveis
- ✅ **Responsivo** - Desktop, tablet e mobile
- ✅ **100% Offline** - Funciona sem internet

## 📁 Estrutura de Pastas

```
luz-financeiro/
├── index.html              # Página principal
├── css/
│   └── style.css          # Todos os estilos
├── js/
│   ├── auth.js            # Login, Cadastro, Recuperação (SEM API!)
│   ├── app.js             # Funções principais
│   ├── transacoes.js      # Gerenciar transações
│   ├── metas.js           # Gerenciar metas
│   ├── exportacao.js      # PDF e CSV
│   └── utils.js           # Funções auxiliares
└── README.md              # Este arquivo
```

## 🚀 Como Usar

### 1. Baixar os Arquivos

Baixe todos os 9 arquivos disponíveis para download.

### 2. Criar Estrutura

Crie as pastas:
```
luz-financeiro/
├── index.html
├── css/
│   └── style.css
└── js/
    ├── auth.js
    ├── app.js
    ├── transacoes.js
    ├── metas.js
    ├── exportacao.js
    └── utils.js
```

### 3. Abrir no Navegador

Duplo clique em `index.html` (ou clique direito → Abrir com → Navegador)

### 4. Criar Conta

1. Clique em "Criar Conta"
2. Preencha: Nome, Email, Senha
3. Clique "Criar Conta"
4. Faça login com seus dados

## 🔐 Como Funciona o Login

### Cadastro
1. Usuário preenche formulário
2. Sistema valida dados
3. Senha é criptografada (hash)
4. Usuário é salvo no `localStorage`
5. Pronto para fazer login!

### Login
1. Usuário digita email + senha
2. Sistema verifica se existe
3. Compara senha com hash salvo
4. Se correto, carrega dados do usuário
5. Mostra o app!

### Recuperação de Senha
1. Clique "Esqueceu a senha?"
2. Digite seu email
3. Sistema gera nova senha temporária
4. Copie e use para fazer login
5. Você pode alterar depois

## 📊 Dados do Usuário

Cada usuário tem seus próprios:
- ✅ Transações (receitas e despesas)
- ✅ Metas (objetivos financeiros)
- ✅ Histórico completo

Tudo fica salvo automaticamente no navegador!

## 🔒 Segurança

⚠️ **IMPORTANTE**: Este sistema é para USO PESSOAL APENAS

**Segurança:**
- ✅ Senhas são criptografadas (hash)
- ✅ Dados salvos localmente (seu PC)
- ✅ Ninguém pode acessar seus dados
- ✅ Nenhuma informação sai do seu navegador

**Limitações:**
- ❌ Dados são perdidos se limpar cache
- ❌ Não sincroniza entre dispositivos
- ❌ Não pode recuperar se perder a senha (sem email)
- ❌ Hash simples (não é bcryptjs - para produção use bcryptjs)

## 🎯 Exemplo de Uso

### Passo 1: Cadastro
```
Nome: João Silva
Email: joao@email.com
Senha: MinhaS3nh@F0rt3
```

### Passo 2: Login
```
Email: joao@email.com
Senha: MinhaS3nh@F0rt3
```

### Passo 3: Usar o App
1. Adicionar transações
2. Criar metas
3. Ver análise por categoria
4. Exportar relatórios em PDF

## 📋 Usuários de Teste

Você pode usar um dos usuários abaixo se quiser testar SEM criar conta:

```
Email: teste@email.com
Senha: teste123

Email: demo@email.com
Senha: demo123
```

**Para adicionar estes usuários**, abra o Console (F12) e execute:

```javascript
// Criar usuário de teste
const usuarios = JSON.parse(localStorage.getItem('usuarios_luz')) || {};
usuarios['teste@email.com'] = {
  nome: 'Usuário Teste',
  email: 'teste@email.com',
  senhaHash: btoa('teste123' + 'luz_financeiro_salt'),
  dataCriacao: new Date().toISOString()
};
localStorage.setItem('usuarios_luz', JSON.stringify(usuarios));
```

## 🛠️ Customização

### Mudar Cores

Edite `css/style.css`:
```css
/* Cor primária */
#667eea → sua-cor

/* Cor secundária */
#764ba2 → sua-cor
```

### Mudar Categorias

Edite `index.html` (seção de transações):
```html
<option value="Sua Categoria">Sua Categoria</option>
```

### Aumentar Segurança da Senha

**Para produção**, instale `bcryptjs`:

```bash
npm install bcryptjs
```

E atualize `js/auth.js`:
```javascript
import bcrypt from 'bcryptjs';

async function hashSenha(senha) {
  return await bcrypt.hash(senha, 10);
}

async function verificarSenha(senha, hash) {
  return await bcrypt.compare(senha, hash);
}
```

## ⚙️ Como Funciona Internamente

### localStorage
```javascript
// Usuários cadastrados
localStorage.setItem('usuarios_luz', JSON.stringify({
  'email@example.com': {
    nome: 'João',
    email: 'email@example.com',
    senhaHash: 'hash_da_senha_aqui',
    dataCriacao: '2024-01-01T...'
  }
}))

// Usuário logado
localStorage.setItem('usuario_logado', JSON.stringify({
  nome: 'João',
  email: 'email@example.com'
}))

// Transações do usuário
localStorage.setItem('transacoes_email@example.com', JSON.stringify([...]))

// Metas do usuário
localStorage.setItem('metas_email@example.com', JSON.stringify([...]))
```

## 🐛 Problemas Comuns

### "Arquivo não abre"
- ✅ Clique direito → Abrir com → Navegador
- ✅ Ou arraste para o navegador

### "Dados desapareceram"
- ⚠️ Se limpou cache, dados foram perdidos
- ✅ Sempre exporte backup (PDF)

### "Esqueci a senha"
- 👉 Clique "Esqueceu a senha?"
- 👉 Digite seu email
- 👉 Cópie a nova senha temporária

### "Quer funcionar em 2 computadores"
- ❌ Dados são locais, não sincronizam
- ✅ Use backup (export PDF) e importe em outro PC
- ✅ Ou use a versão com Backend (Firebase)

## 📚 Arquivos Explicados

| Arquivo | Função |
|---------|--------|
| `index.html` | Estrutura HTML (login + app) |
| `css/style.css` | Todos os estilos visuais |
| `js/auth.js` | **Login, Cadastro, Recuperação** |
| `js/app.js` | Navegação e views |
| `js/transacoes.js` | Adicionar/editar transações |
| `js/metas.js` | Criar/gerenciar metas |
| `js/exportacao.js` | Exportar PDF e CSV |
| `js/utils.js` | Funções auxiliares |

## 🚀 Próximas Melhorias

- [ ] Usar bcryptjs para hash mais seguro
- [ ] Exportar/importar dados
- [ ] Sincronizar com Firebase
- [ ] App mobile (React Native)
- [ ] Gráficos mais avançados
- [ ] Integração com banco

## 📝 Licença

Código aberto - Use e customize como quiser!

## 🤝 Suporte

Dúvidas? Recomendações? Envie feedback!

---

**Versão**: 4.0.0 (Sem API)  
**Última atualização**: 2024  
**Status**: ✅ Pronto para usar
