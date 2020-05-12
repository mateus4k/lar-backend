# LAR 👨‍👩‍👧‍👦 Gestão Financeira Domiciliar
![shield](https://img.shields.io/appveyor/build/mateus4k/lar-backend)
![shield](https://img.shields.io/nycrc/mateus4k/lar-backend)
![shield](https://img.shields.io/github/languages/top/mateus4k/lar-backend)
![shield](https://img.shields.io/github/languages/code-size/mateus4k/lar-backend)
![shield](https://img.shields.io/badge/AdonisJs-v4.1-blueviolet)
![shield](https://img.shields.io/github/package-json/dependency-version/mateus4k/lar-backend/@adonisjs/lucid)


## Levantameto de requisitos

### Requisitos funcionais

---
Autenticação
- [x] O usuário deve poder criar uma conta com nome, e-mail e senha;
- [x] O usuário deve poder se autenticar na aplicação com e-mail e senha;
- [x] O usuário deve poder alterar sua senha informando a senha nova e a sua confirmação;

Família
- [x] Após o primeiro login, o usuário deverá **criar seu lar** ou **entrar em um lar já existente** com seu respectivo código *(id)*.
- [x] A família deve conter categorias padrões ao se cadastrar
- [ ] **(PÓS-MVP)** O líder do grupo deve poder repassar essa responsabilidade para outro membro.

Categorias
- [x] O líder da família deve poder gerenciar suas categorias (nome, ícone e cor)
- [ ] A categoria pode ser associada a despesas (expense) ou entrada (revenue)

Gastos
- [x] O usuário deve poder inserir um novo gasto escolhendo uma nota, data e hora, categoria e valor
- [ ] **(PÓS-MVP)** O usuário líder deverá ser notificado a cada gasto de seus dependentes.

Entradas
- [ ] O usuário líder deve poder registrar uma nova entrada

Relatórios
- [ ] O usuário poderá visualizar gráficos com os gastos do mês por categoria.

---

### Requisitos não funcionais

- [ ] Mobile com React Native
- [ ] Offline first
- [x] Banco de dados SQL
- [x] Back-end com AdonisJs

---

### Regras de negócio

- [x] O e-mail do usuário é único
- [ ] O usuário não pode alterar seu e-mail
- [x] O usuário criador do grupo deve ser automaticamente o líder
- [ ] Somente o líder poderá editar ou excluir despesas
- [ ] O dependente só pode ver suas próprias despesas
- [ ] Todos cadastros devem possuir validação de campos com mensagens legíveis
