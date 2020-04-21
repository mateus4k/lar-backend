# LAR | Gestão Financeira Domiciliar

## Levantameto de requisitos

### Requisitos funcionais

- [x] O usuário deve poder criar uma conta com nome, e-mail e senha;
- [x] O usuário deve poder se autenticar na aplicação com e-mail e senha;
- [ ] O usuário deve poder alterar sua senha informando a senha nova e a sua confirmação;

- [ ] Após o primeiro login, o usuário deverá **criar seu lar** ou **entrar em um lar já existente** com seu respectivo código *(id)*.

- [ ] O líder do grupo deve poder repassar essa responsabilidade para outro membro.

- [ ] O usuário deve conter categorias padrões ao se cadastrar

- [ ] O usuário deve poder gerenciar suas categorias (ícone, nome e cor)

- [ ] O usuário deve poder inserir um novo gasto escolhendo seu nome, data e hora, categoria e valor

- [ ] O usuário poderá visualizar gráficos com os gastos do mês por categoria.

- [ ] O usuário líder deverá ser notificado a cada gasto de seus dependentes.

### Requisitos não funcionais

- [ ] Mobile com React Native
- [ ] Offline first
- [x] Banco de dados SQL
- [x] Back-end com NodeJs

### Regras de negócio

- [x] O e-mail do usuário é único
- [ ] O usuário não pode alterar seu e-mail
- [ ] O usuário criador do grupo deve ser automaticamente o líder
- [ ] Somente o líder poderá editar ou excluir despesas
- [ ] O dependente só pode ver suas próprias despesas
- [ ] Todos cadastros devem possuir validação de campos com mensagens legíveis
