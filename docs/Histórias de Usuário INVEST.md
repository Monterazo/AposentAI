

# Template de Histórias do Usuário: AposentAI

## Título da História
Cadastro e Autenticação de Usuário Comum

## Descrição
Como um **novo usuário (pessoa física)**, eu quero **me cadastrar na plataforma usando meu nome, e-mail, CPF e uma senha, e depois fazer login**, para que **eu possa ter uma conta segura e acessar as funcionalidades de simulação e upload de documentos**.

## Critérios INVEST

### Independent (Independente)
Esta história é largamente independente e é uma funcionalidade base para quase todas as outras histórias do sistema (como "Upload de Documento" e "Execução de Simulação"), que dependem de um usuário autenticado. Ela não depende de outras histórias de funcionalidade para ser implementada.

### Negotiable (Negociável)
Sim. Os detalhes da implementação são negociáveis. Por exemplo, podemos discutir a inclusão de login social (Google, etc.) em uma iteração futura ou os requisitos exatos de força da senha (mínimo de caracteres, caracteres especiais, etc.).

### Valuable (Valiosa)
Altamente valiosa. Esta história desbloqueia o acesso à plataforma para os usuários, sendo um pré-requisito essencial para a entrega de qualquer outra funcionalidade. Sem ela, não há usuários e, portanto, não há valor no produto.

### Estimable (Estimável)
Sim. A equipe já estimou as tarefas técnicas associadas a esta história durante o Planejamento da Sprint 1 (criação de endpoints, banco de dados, formulários de UI), resultando em uma estimativa consolidada.

### Small (Pequena)
Sim. Apesar de envolver backend e frontend, a história foi quebrada em tarefas gerenciáveis que, somadas, cabem confortavelmente na capacidade de uma única sprint de duas semanas.

### Testable (Testável)
Sim. Os critérios de aceitação abaixo fornecem uma base clara para a criação de testes automatizados (unitários, de integração) e para a verificação manual.

## Critérios de Aceitação
Utilizando o formato DADO-QUANDO-ENTÃO (Gherkin):

1.  **DADO QUE** eu sou um visitante na página de cadastro, **QUANDO** eu preencho o formulário com dados válidos (nome, e-mail e CPF únicos, senha), **ENTÃO** meu usuário deve ser criado com sucesso no banco de dados e eu sou redirecionado para a tela de login.
2.  **DADO QUE** eu tento me cadastrar com um e-mail ou CPF que já existe, **QUANDO** eu submeto o formulário, **ENTÃO** eu devo ver uma mensagem de erro clara informando que "os dados já estão em uso".
3.  **DADO QUE** eu sou um usuário cadastrado e estou na página de login, **QUANDO** eu insiro meu e-mail e senha corretos, **ENTÃO** eu sou autenticado com sucesso, um token JWT é gerado e armazenado no cliente, e eu sou redirecionado para o dashboard principal.
4.  **DADO QUE** eu sou um usuário cadastrado, **QUANDO** eu tento fazer login com uma senha incorreta, **ENTÃO** eu devo ver uma mensagem de erro clara informando que "as credenciais são inválidas".
5.  **DADO QUE** um usuário foi criado, **QUANDO** um administrador de sistema verifica o banco de dados, **ENTÃO** a senha do usuário deve estar armazenada em um formato criptografado (hash) e não em texto puro.

## Notas e Comentários
- Para o MVP, a validação de CPF será focada no formato e na unicidade. Uma validação mais complexa, incluindo a verificação dos dígitos verificadores, pode ser implementada como uma melhoria futura.
- A biblioteca `passlib` foi a escolhida pela equipe técnica para o hashing de senhas no backend.
- O token de autenticação será um JWT (JSON Web Token) com um tempo de expiração definido (ex: 1 hora para o token de acesso).

## Histórico de Revisões
- **Data:** 05/08/2025
  - **Alterações:** Criação inicial da história do usuário com base no documento de Planejamento da Sprint 1.
  - **Revisado por:** Anita Monteiro (Product Owner)
