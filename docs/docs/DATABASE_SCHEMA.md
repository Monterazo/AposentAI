
## Diagrama Entidade-Relacionamento (ER)

O diagrama abaixo oferece uma visão geral das entidades principais e como elas se conectam.

```mermaid
erDiagram
    USUARIO {
        UUID id PK "Primary Key"
        string nome
        string email UK "Unique"
        string cpf UK "Unique"
        string senha_hash
        enum tipo "COMUM, ADVOGADO, ADMIN"
        timestamp data_criacao
    }

    CASO {
        UUID id PK
        UUID advogado_id FK "Foreign Key (USUARIO)"
        UUID cliente_id FK "Foreign Key (USUARIO)"
        string titulo
        text descricao
        enum status "ABERTO, EM_ANALISE, FECHADO"
        timestamp data_criacao
    }

    DOCUMENTO {
        UUID id PK
        UUID usuario_id FK "Foreign Key (USUARIO)"
        UUID caso_id FK "Foreign Key (CASO)"
        string nome_arquivo
        string tipo_documento
        string path_armazenamento
        timestamp data_upload
    }

    SIMULACAO {
        UUID id PK
        UUID usuario_id FK "Foreign Key (USUARIO)"
        UUID caso_id FK "Foreign Key (CASO)"
        jsonb parametros_entrada
        jsonb resultado
        timestamp data_simulacao
    }

    ASSINATURA {
        UUID id PK
        UUID usuario_id FK "Foreign Key (USUARIO)"
        enum plano "BASICO, PRO"
        enum status "ATIVA, CANCELADA, INADIMPLENTE"
        string id_gateway_pagamento "ID do Stripe/PayPal"
        date data_inicio
        date data_proxima_cobranca
    }

    PAGAMENTO {
        UUID id PK
        UUID assinatura_id FK "Foreign Key (ASSINATURA)"
        decimal valor
        enum status "PAGO, FALHOU, PENDENTE"
        timestamp data_pagamento
        string id_transacao_gateway "ID da Transação"
    }

    USUARIO ||--|{ ASSINATURA : "possui"
    USUARIO ||--|{ DOCUMENTO : "envia"
    USUARIO ||--|{ SIMULACAO : "realiza para si"

    USUARIO {ADVOGADO} ||--|{ CASO : "gerencia"
    USUARIO {CLIENTE} ||--o| CASO : "é cliente de"

    CASO ||--|{ DOCUMENTO : "contém"
    CASO ||--|{ SIMULACAO : "contém"

    ASSINATURA ||--|{ PAGAMENTO : "gera"
```

## Detalhamento das Entidades

### 1\. `USUARIO`

Armazena os dados de todos os atores (Comum, Advogado, Admin) que interagem com o sistema. É a entidade central de identificação.

| Coluna | Tipo de Dado | Chaves/Restrições | Descrição |
| :--- | :--- | :--- | :--- |
| `id` | `UUID` | `PK (Primary Key)` | Identificador único universal do usuário. |
| `nome` | `VARCHAR(100)`| `NOT NULL` | Nome completo do usuário. |
| `email` | `VARCHAR(100)`| `UK (Unique Key), NOT NULL`| E-mail de login, deve ser único na plataforma. |
| `cpf` | `VARCHAR(11)` | `UK (Unique Key), NOT NULL`| CPF do usuário (Pessoa Física), usado como identificador único. |
| `senha_hash` | `VARCHAR(255)`| `NULLABLE` | Senha criptografada. Pode ser nula para logins via OAuth. |
| `tipo` | `ENUM` | `NOT NULL` | Define o papel do usuário: 'COMUM', 'ADVOGADO', 'ADMIN'. |
| `data_criacao`| `TIMESTAMPTZ` | `DEFAULT NOW()` | Data e hora de registro do usuário. |

### 2\. `CASO`

Entidade que modela a unidade de trabalho de um Advogado, conectando um cliente a todos os seus artefatos (documentos, simulações).

| Coluna | Tipo de Dado | Chaves/Restrições | Descrição |
| :--- | :--- | :--- | :--- |
| `id` | `UUID` | `PK` | Identificador único do caso. |
| `advogado_id`| `UUID` | `FK -> USUARIO(id)` | Referencia o `USUARIO` (advogado) que gerencia o caso. |
| `cliente_id` | `UUID` | `FK -> USUARIO(id)` | Referencia o `USUARIO` (cliente) a quem o caso pertence. |
| `titulo` | `VARCHAR(200)`| `NOT NULL` | Título do caso para identificação. |
| `descricao` | `TEXT` | `NULLABLE` | Descrição ou notas adicionais sobre o caso. |
| `status` | `ENUM` | `NOT NULL` | Status do fluxo de trabalho: 'ABERTO', 'EM\_ANALISE', 'FECHADO'.|
| `data_criacao`| `TIMESTAMPTZ` | `DEFAULT NOW()` | Data e hora de criação do caso. |

### 3\. `DOCUMENTO`

Representa os arquivos (ex: CNIS, CTPS) carregados na plataforma pelos usuários.

| Coluna | Tipo de Dado | Chaves/Restrições | Descrição |
| :--- | :--- | :--- | :--- |
| `id` | `UUID` | `PK` | Identificador único do documento. |
| `usuario_id` | `UUID` | `FK -> USUARIO(id)` | Usuário que realizou o upload do arquivo. |
| `caso_id` | `UUID` | `FK -> CASO(id), NULLABLE`| Vincula o documento a um caso específico (opcional). |
| `nome_arquivo`| `VARCHAR(255)`| `NOT NULL` | Nome original do arquivo enviado. |
| `tipo_documento`| `VARCHAR(50)`| `NULLABLE` | Tipo do documento (ex: 'CNIS', 'RG', 'CTPS'). |
| `path_armazenamento`| `TEXT` | `NOT NULL` | URL ou caminho para o arquivo armazenado (ex: S3). |
| `data_upload`| `TIMESTAMPTZ` | `DEFAULT NOW()` | Data e hora do upload. |

### 4\. `SIMULACAO`

Armazena as entradas e saídas do motor de IA (LangChain) para cada simulação realizada.

| Coluna | Tipo de Dado | Chaves/Restrições | Descrição |
| :--- | :--- | :--- | :--- |
| `id` | `UUID` | `PK` | Identificador único da simulação. |
| `usuario_id` | `UUID` | `FK -> USUARIO(id)` | Usuário para quem a simulação foi calculada. |
| `caso_id` | `UUID` | `FK -> CASO(id), NULLABLE`| Vincula a simulação a um caso específico (opcional). |
| `parametros_entrada`| `JSONB` | `NULLABLE` | Dados de entrada usados pela IA (flexível). |
| `resultado` | `JSONB` | `NULLABLE` | Resposta completa da IA (flexível). |
| `data_simulacao` | `TIMESTAMPTZ` | `DEFAULT NOW()` | Data e hora em que a simulação foi executada. |

### 5\. `ASSINATURA` e `PAGAMENTO`

Modelam o sistema de planos e faturamento integrado a gateways de pagamento.

**Tabela `ASSINATURA`**

| Coluna | Tipo de Dado | Chaves/Restrições | Descrição |
| :--- | :--- | :--- | :--- |
| `id` | `UUID` | `PK` | Identificador único da assinatura. |
| `usuario_id` | `UUID` | `FK -> USUARIO(id)` | Usuário que possui a assinatura. |
| `plano` | `ENUM` | `NOT NULL` | Plano contratado: 'BASICO', 'PRO'. |
| `status` | `ENUM` | `NOT NULL` | Status da assinatura: 'ATIVA', 'CANCELADA', etc. |
| `id_gateway_pagamento`| `VARCHAR(100)`| `NULLABLE` | ID da assinatura no sistema externo (Stripe/PayPal). |
| `data_inicio` | `DATE` | `NOT NULL` | Data de início da vigência da assinatura. |
| `data_proxima_cobranca`| `DATE` | `NOT NULL` | Data da próxima fatura a ser gerada. |

**Tabela `PAGAMENTO`**

| Coluna | Tipo de Dado | Chaves/Restrições | Descrição |
| :--- | :--- | :--- | :--- |
| `id` | `UUID` | `PK` | Identificador único do pagamento. |
| `assinatura_id` | `UUID` | `FK -> ASSINATURA(id)`| Assinatura que originou este pagamento. |
| `valor` | `NUMERIC(10, 2)` | `NOT NULL` | Valor da transação. |
| `status`| `ENUM` | `NOT NULL` | Status do pagamento: 'PAGO', 'FALHOU', 'PENDENTE'. |
| `data_pagamento` | `TIMESTAMPTZ`| `DEFAULT NOW()`| Data e hora da transação. |
| `id_transacao_gateway`| `VARCHAR(100)`| `NULLABLE`| ID da transação no sistema externo. |

## Considerações Adicionais

  * **Chaves Primárias (UUID):** Adoção de `UUID` como chave primária para evitar a exposição de IDs sequenciais em APIs e facilitar a sincronização em arquiteturas distribuídas no futuro.
  * **Tipos `ENUM`:** Uso de tipos enumerados para campos como `status` e `tipo` para garantir a integridade dos dados e evitar a inserção de valores inválidos.
  * **Tipo `JSONB`:** O uso do tipo `JSONB` no PostgreSQL para as colunas `parametros_entrada` e `resultado` da tabela `SIMULACAO` oferece flexibilidade máxima para armazenar dados complexos e semi-estruturados vindos da IA, sem a necessidade de alterar o schema do banco com frequência.