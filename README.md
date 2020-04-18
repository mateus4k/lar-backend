# LAR | Gestão Financeira Domiciliar

## Levantameto de requisitos

### Requisitos funcionais

- O usuário deve poder criar uma conta com nome, e-mail e senha;
- O usuário deve poder se autenticar na aplicação com e-mail e senha;
- O usuário deve poder alterar seu nome e senha informando a senha antiga, a senha nova e a confirmação da senha nova;

- Após o primeiro login, o usuário deverá criar seu grupo ou entrar em um já existente com seu respectivo código.

- O líder do grupo deve poder repassar essa responsabilidade para outro membro.

- O usuário deve conter categorias padrões ao se cadastrar
- O usuário deve poder gerenciar suas categorias (ícone, nome e cor)

- O usuário deve poder inserir um novo gasto escolhendo seu nome, data e hora, categoria e valor

- O usuário poderá visualizar gráficos com os gastos do mês por categoria.

- O usuário líder deverá ser notificado a cada gasto de seus dependentes.

### Requisitos não funcionais

- Offline first
- Banco de dados SQL
- Mobile com React Native
- Back-end com NodeJs

### Regras de negócio

- O e-mail do usuário é único
- O usuário não pode alterar seu e-mail
- O usuário criador do grupo deve ser automaticamente o líder
- Somente o líder poderá editar ou excluir despesas
- O dependente só pode ver suas próprias despesas
- Todos cadastros devem possuir validação de campos com mensagens legíveis
