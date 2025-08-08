### **Ata de Reunião - AposentAI**

**Nome do Projeto:** AposentAI - Plataforma de Simulação de Aposentadoria

---

**Data:** 26/05/2025
**Local:** Reunião Online (Canal no Discord)
**Participantes:**

* Anita Monteiro
* Lucas Monterazo
* Lucas Rodrigues

### **Objetivos da Reunião**

1.  Oficializar o objetivo da primeira Sprint de desenvolvimento (Sprint 1).
2.  Desmembrar as Histórias de Usuário priorizadas em tarefas técnicas.
3.  Definir responsabilidades iniciais e alinhar as configurações do ambiente de desenvolvimento.

### **Tópicos Discutidos**

* **Tópico 1: Definição do Objetivo da Sprint 1.**
    Foi discutido e acordado o foco principal para as próximas duas semanas de desenvolvimento. O objetivo é criar um fluxo mínimo viável para o usuário comum.

* **Tópico 2: Detalhamento Técnico das Histórias de Usuário.**
    A equipe detalhou as tarefas necessárias para implementar as três histórias refinadas:
    * **Cadastro e Login:** Criação das tabelas no DB, endpoints na API (FastAPI), schemas de validação (Pydantic) e os formulários no frontend (Vite.js).
    * **Upload de Documento:** Definição da estratégia de armazenamento (local vs. cloud), criação do endpoint para receber o arquivo e do componente de UI para upload.
    * **Simulação PoC:** Discussão sobre a biblioteca de extração de texto de PDF, a estruturação do prompt para a LangChain e como o resultado será armazenado e devolvido pela API.

* **Tópico 3: Ferramentas e Ambiente de Desenvolvimento.**
    Discutiu-se sobre a gestão de tarefas e a padronização do ambiente para evitar conflitos e retrabalho.

### **Decisões Tomadas**

1.  **Decisão 1: Objetivo da Sprint 1 Aprovado.**
    O objetivo oficial da Sprint 1 será: **"Ao final da sprint, um novo usuário poderá se cadastrar com CPF, fazer login, realizar o upload de um documento CNIS em PDF e receber o resultado de uma simulação básica."**

2.  **Decisão 2: Armazenamento de Arquivos Simplificado para o MVP.**
    Para acelerar o desenvolvimento inicial, os documentos enviados pelos usuários serão armazenados no **sistema de arquivos local do servidor**. A migração para um serviço de armazenamento em nuvem (como AWS S3) será criada como uma história técnica para uma sprint futura.

3.  **Decisão 3: Gestão de Tarefas no GitHub Projects.**
    A equipe utilizará a ferramenta **GitHub Projects** para gerenciar o andamento das tarefas da sprint, aproveitando a integração nativa com o repositório de código.

### **Ações a Serem Tomadas**

| Ação | Responsável | Prazo |
| :--- | :--- | :--- |
| Criar a estrutura inicial de pastas (`backend/`, `frontend/`, `docs/`) no repositório do GitHub. | Lucas Rodrigues | 05/08/2025 |
| Configurar o board no GitHub Projects com as Histórias de Usuário e as tarefas técnicas definidas. | Anita Monteiro | 06/08/2025 |
| Criar e commitar o arquivo `.env.example` com todas as variáveis de ambiente necessárias. | Lucas Monterazo | 06/08/2025 |

### **Informações Adicionais**

* Ficou definido que as reuniões diárias de alinhamento (Daily Stand-ups) ocorrerão todos os dias às 9:30h, com duração máxima de 15 minutos.

### **Próxima Reunião**

* **Tipo:** Sprint Review & Planning da Sprint 2
* **Data:** 19/06/2025 
* **Local:** Reunião Online (Discord)
* **Agenda:**
    1.  Apresentação das funcionalidades concluídas na Sprint 1.
    2.  Revisão do backlog priorizado para a próxima sprint.
    3.  Planejamento da Sprint 2.

---
**Revisado por:** Anita Monteiro
**Data da Revisão:** 13/07/2025

`[Assinatura do Responsável pela Ata - Lucas Monterazo]`
`[Assinatura de um Participante - Anita Monteiro]`