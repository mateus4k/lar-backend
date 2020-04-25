# LAR 👨‍👩‍👧‍👦 Gestão Financeira Domiciliar

## Levantameto de requisitos

### Requisitos funcionais

---
Autenticação
- [x] O usuário deve poder criar uma conta com nome, e-mail e senha;
- [x] O usuário deve poder se autenticar na aplicação com e-mail e senha;
- [x] O usuário deve poder alterar sua senha informando a senha nova e a sua confirmação;

Família
- [x] Após o primeiro login, o usuário deverá **criar seu lar** ou **entrar em um lar já existente** com seu respectivo código *(id)*.
- [ ] **(PÓS-MVP)** O líder do grupo deve poder repassar essa responsabilidade para outro membro.

Categorias
- [ ] O usuário deve conter categorias padrões ao se cadastrar
- [ ] O usuário deve poder gerenciar suas categorias (ícone, nome e cor)

Gastos
- [ ] O usuário deve poder inserir um novo gasto escolhendo seu nome, data e hora, categoria e valor
- [ ] **(PÓS-MVP)** O usuário líder deverá ser notificado a cada gasto de seus dependentes.

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
