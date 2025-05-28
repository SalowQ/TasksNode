# Tasks Manager

Esse é um CRUD para um gerenciador de tarefas onde é possível adicionar atividades, retornar todas as atividades, editar e deletar uma atividade específica, além de adicionar atividades a partir de um arquivo CSV.

## Documentação da API

#### Cadastra uma nova atividade

```http
  POST /api/tasks
```

Entrada:
| Parâmetro | Tipo | Descrição |
| :---------- | :--------- | :---------------------------------- |
| `title` | `string` | **Obrigatório**. O título da atividade |
| `description` | `string` | **Obrigatório**. A descrição da atividade |

#### Atualiza uma atividade

```http
  PUT /api/tasks/${id}
```

Entrada:
| Parâmetro | Tipo | Descrição |
| :---------- | :--------- | :---------------------------------- |
| `title` | `string` | **Obrigatório**. O título da atividade |
| `description` | `string` | **Obrigatório**. A descrição da atividade |

#### Retorna todas os livros

```http
  GET /api/tasks
```

Saída:
| Parâmetro | Tipo | Descrição |
| :---------- | :--------- | :------------------------------------------ |
| `id` | `string` | O ID da atividade |
| `title` | `string` | O título da atividade |
| `description` | `string` | A descrição da atividade |
| `completed_at` | `string` | Data de quando a atividade foi concluída |
| `created_at` | `decimal` | Data de quando a atividade foi criada |
| `updated_at` | `int` | Data da atualização mais recente da atividade |

#### Deleta uma atividade

```http
  DELETE /api/tasks/${id}
```

#### Completa uma atividade

```http
  PATCH /api/tasks/${id}/complete
```

#### Consome um arquivo CSV para inserção de atividades em lote

```http
  POST /api/tasks/sheet
```

## Stack utilizada

**Back-end:** Node.js
