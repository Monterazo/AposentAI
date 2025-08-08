# Documento de Planejamento da Sprint 1

## Equipe
- **Product Owner**: Anita Monteiro
- **Scrum Master**: Lucas Monterazo
- **Equipe de Desenvolvimento**:
  - Anita Monteiro (Full Stack Developer)
  - Lucas Rodrigues (UX/UI Designer & Frontend Developer)
  - Lucas Monterazo (Machine Learning Engineer & Tech Lead)

## Data
- **Data da Reunião**: 05/08/2025
- **Duração**: 2 horas

## Objetivos da Sprint
- **Sprint Goal**: **Ao final da sprint, um novo usuário poderá se cadastrar com CPF, fazer login, realizar o upload de um documento CNIS em PDF e receber o resultado de uma simulação básica (Prova de Conceito).**

## Itens do Backlog da Sprint
Itens do Product Backlog selecionados para a Sprint 1.

- **Item 1**: **Cadastro e Autenticação de Usuário Comum**
  - **Prioridade**: Alta
  - **Critérios de Aceitação**:
    - [ ] O usuário pode se cadastrar com nome, e-mail, CPF e senha.
    - [ ] O sistema valida a unicidade do e-mail e CPF.
    - [ ] O usuário cadastrado consegue fazer login e receber um token de autenticação (JWT).
    - [ ] As senhas são armazenadas de forma segura (hash).

- **Item 2**: **Upload de Documento CNIS**
  - **Prioridade**: Alta
  - **Critérios de Aceitação**:
    - [ ] Um usuário logado pode fazer o upload de um arquivo PDF.
    - [ ] O sistema valida o tipo e o tamanho do arquivo.
    - [ ] Um registro do documento é criado no banco de dados, associado ao usuário.

- **Item 3**: **Execução de Simulação Básica (Prova de Conceito)**
  - **Prioridade**: Alta
  - **Critérios de Aceitação**:
    - [ ] Existe um endpoint protegido que inicia a simulação para o usuário logado.
    - [ ] O sistema extrai o texto do PDF do CNIS enviado.
    - [ ] O texto é enviado à LangChain e uma resposta estruturada é recebida.
    - [ ] O resultado da simulação é salvo no banco e retornado ao usuário.

## Tarefas
Detalhamento das tarefas para cada item do backlog da sprint.

- **Item 1: Cadastro e Autenticação**
  - **Tarefa 1.1**: [Backend] Criar models (SQLAlchemy) e migrations (Alembic) para a tabela `Usuario`.
    - **Estimativa**: 4 horas
    - **Responsável**: Anita Monteiro
  - **Tarefa 1.2**: [UX/UI] Prototipar as telas de Cadastro e Login no Figma.
    - **Estimativa**: 8 horas
    - **Responsável**: Lucas Rodrigues
  - **Tarefa 1.3**: [Backend] Desenvolver endpoints para cadastro (`POST /usuarios`) e login (`POST /token`) com hashing de senha e geração de JWT.
    - **Estimativa**: 14 horas
    - **Responsável**: Anita Monteiro
  - **Tarefa 1.4**: [Frontend] Implementar os componentes de UI para as telas de Cadastro e Login.
    - **Estimativa**: 12 horas
    - **Responsável**: Lucas Rodrigues
  - **Tarefa 1.5**: [Full Stack] Integrar os formulários de frontend com os endpoints da API e gerenciar o estado de autenticação (JWT).
    - **Estimativa**: 6 horas
    - **Responsável**: Anita Monteiro

- **Item 2: Upload de Documento**
  - **Tarefa 2.1**: [Backend] Criar model/migration para a tabela `Documento` e desenvolver endpoint `POST /documentos` para upload de arquivos.
    - **Estimativa**: 8 horas
    - **Responsável**: Anita Monteiro
  - **Tarefa 2.2**: [Frontend] Desenvolver componente de UI para seleção e upload de arquivos, com feedback visual.
    - **Estimativa**: 6 horas
    - **Responsável**: Lucas Rodrigues

- **Item 3: Simulação Básica (PoC)**
  - **Tarefa 3.1**: [Pesquisa/Spike] Pesquisar e testar bibliotecas Python para extração de texto de arquivos PDF.
    - **Estimativa**: 8 horas
    - **Responsável**: Lucas Monterazo
  - **Tarefa 3.2**: [Backend] Configurar o SDK do LangChain e criar o serviço de simulação, incluindo a engenharia do prompt inicial.
    - **Estimativa**: 12 horas
    - **Responsável**: Lucas Monterazo
  - **Tarefa 3.3**: [Backend] Criar o endpoint `POST /simulacao` que orquestra a extração de texto e a chamada para a IA.
    - **Estimativa**: 8 horas
    - **Responsável**: Lucas Monterazo
  - **Tarefa 3.4**: [Frontend] Criar uma página simples para disparar a simulação e exibir a resposta em JSON bruto.
    - **Estimativa**: 4 horas
    - **Responsável**: Lucas Rodrigues

## Capacidade da Equipe
- **Dias Disponíveis na Sprint**: 10 (2 semanas)
- **Capacidade Total (estimada)**: 180 horas (baseado em 3 membros com 6 horas focadas/dia)
- **Total de Horas Planejadas**: 90 horas (deixando um buffer para imprevistos e colaboração).

## Riscos e Impedimentos
- **Risco 1**: A extração de dados dos PDFs do CNIS pode ser imprecisa.
  - **Mitigação**: A tarefa foi definida como uma Prova de Conceito (PoC) para validar a viabilidade. O objetivo é testar com layouts ideais. O risco será reavaliado na Sprint Review.

- **Risco 2**: A complexidade da integração ou da engenharia de prompt com a API da LangChain pode ser maior que o estimado.
  - **Mitigação**: O especialista em ML (Lucas Monterazo) está alocado para esta tarefa, e a estimativa de tempo já inclui um buffer para pesquisa e experimentação.

## Notas Adicionais
- Para esta sprint, o armazenamento de documentos será feito localmente no sistema de arquivos do servidor para acelerar o desenvolvimento do MVP. A migração para um serviço de nuvem (AWS S3) será abordada em uma sprint futura.

---

## Revisão e Aprovação
- **Revisado por**: Lucas Monterazo
- **Data da Revisão**: 05/08/2025

`[Assinatura do Product Owner - Anita Monteiro]` &nbsp;&nbsp;&nbsp;&nbsp; `[Assinatura do Scrum Master - Lucas Monterazo]`