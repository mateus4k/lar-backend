# LAR | Gestão Financeira Domiciliar

## Levantameto de requisitos

### Requisitos funcionais

- O usuário deve poder criar uma conta com nome, e-mail e senha;
- O usuário deve poder se autenticar na aplicação com e-mail e senha;
- O usuário deve poder alterar sua senha informando a senha nova e a sua confirmação;

```ts
interface user {
  id: int
  name: string
  email: string //unique
  password: string
}
```

- Após o primeiro login, o usuário deverá **criar seu lar** ou **entrar em um lar já existente** com seu respectivo código *(id)*.

```ts
interface family {
  id: int
  user_id: int // lider
  code: string //unique|random|length=6
  name: string
  timestamps: datetime;
}
```

```ts
interface family_users {
  user_id: int
  family_id: int
  lider: int // (question)/uniqueForFamily
}
```

- O líder do grupo deve poder repassar essa responsabilidade para outro membro.

- O usuário deve conter categorias padrões ao se cadastrar

----
how to create a seed for entire users
----

- O usuário deve poder gerenciar suas categorias (ícone, nome e cor)

```ts
interface categories {
  id: int
  user_id: int
  name: string
  icon: string
  color: string // length=6
}
```

- O usuário deve poder inserir um novo gasto escolhendo seu nome, data e hora, categoria e valor

```ts
interface expense {
  id: int
  user_id: int
  category_id: int
  name: string
  value: float
  datetime: datetime //default=now()
  timestamps: datetime;
}
```

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
