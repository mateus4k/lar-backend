# LAR | Gestão Financeira Domiciliar

## Database Structure

### User

| Table          | Type     | Note   |
| :---           | :---     | :---   |
| id             | int      |        |
| family_id      | int      |        |
| name           | string   |        |
| email          | string   | unique |
| password       | string   |        |
| accepted_terms | boolean  |        |
| timestamps     | datetime |        |

---

### Family

| Table      | Type     | Note                    |
| :---       | :---     | :---                    |
| id         | int      |                         |
| user_id    | ?int     | lider                   |
| name       | string   | NOTNULL                 |
| code       | string   | NOTNULL/unique/length=8 |
| timestamps | datetime |                         |

---

### Category

| Table      | Type     | Note            |
| :---       | :---     | :---            |
| id         | int      |                 |
| family_id  | int      |                 |
| name       | string   | NOTNULL         |
| icon       | string   | length=50       |
| color      | string   | length=7        |
| type       | enum     | revenue/expense |
| deleted_at | datetime | softdelete      |
| timestamps | datetime |                 |

---

### Expense

| Table       | Type     | Note          |
| :---        | :---     | :---          |
| id          | int      |               |
| user_id     | int      |               |
| category_id | string   |               |
| name        | string   |               |
| value       | float    |               |
| datetime    | datetime | default=now() |
| timestamps  | datetime |               |

---
