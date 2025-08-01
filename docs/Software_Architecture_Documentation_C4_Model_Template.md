# Documentação da Arquitetura de Software: AposentAI

**Visão Geral**

Este documento descreve a arquitetura de software do sistema AposentAI utilizando o C4 Model. A arquitetura é apresentada em quatro níveis: Contexto, Container, Componente e Código, para fornecer uma visão clara e detalhada do sistema, desde a sua interação com o ambiente externo até a estrutura interna do código.

**Autores:** Anita Monteiro, Lucas Monterazo e Lucas Rodrigues  
**Data de Criação:** 30/07/2025

-----

## 1\. Diagrama de Contexto

### 1.1. Descrição do Diagrama de Contexto

O diagrama de contexto fornece uma visão geral de alto nível do sistema AposentAI e suas interações com os atores e sistemas externos. Ele mostra como os usuários interagem com o sistema e quais são as principais dependências externas necessárias para sua operação.

  - **Sistema:** Aposenta-AI
  - **Atores Externos:** Administrador, Advogado, Usuário Comum.
  - **Sistemas Externos:** IA do Google, APIs do INSS, Stripe / PayPal, SendGrid / Amazon SES, PostgreSQL, LangChain.

### 1.2. Diagrama

```mermaid
graph TB
    %% Pessoas
    admin["Administrador<br/>Gerencia o sistema e os usuários"]
    lawyer["Advogado<br/>Profissional institucional que gerencia casos de aposentadoria"]
    user["Usuário Comum<br/>Pessoa física que deseja simular e gerenciar sua aposentadoria"]
    
    %% Sistema Principal
    subgraph "Aposenta-AI"
        aposentaAI["Aposenta-AI<br/>Plataforma modular para simulação e gestão de aposentadorias"]
    end
    
    %% Sistemas Externos
    googleAI["IA do Google<br/>Integração futura para processamento inteligente"]
    inssAPI["APIs do INSS<br/>APIs governamentais para automação de requerimentos"]
    stripe["Stripe / PayPal<br/>Sistema de pagamento por assinatura"]
    sendgrid["SendGrid / Amazon SES<br/>Serviço de envio de e-mails"]
    postgresql["PostgreSQL<br/>Banco de dados para armazenamento dos dados dos usuários e documentos"]
    langchain["LangChain<br/>Motor de IA para geração de simulações e análises"]
    
    %% Relacionamentos
    admin -->|Acessa painel administrativo| aposentaAI
    lawyer -->|Gerencia múltiplos clientes e casos| aposentaAI
    user -->|Usa para simulações e upload de documentos| aposentaAI
    aposentaAI -->|Armazena e consulta dados| postgresql
    aposentaAI -->|Utiliza IA para simulações| langchain
    aposentaAI -->|Integração futura com IA externa| googleAI
    aposentaAI -->|Integração futura com APIs governamentais| inssAPI
    aposentaAI -->|Processa pagamentos de assinatura| stripe
    aposentaAI -->|Envia e-mails de confirmação| sendgrid
```

### 1.3. Descrição dos Componentes

  - **Atores Externos:**

      - **Administrador:** Um usuário com privilégios elevados que gerencia o sistema e as contas de outros usuários. Acessa o painel administrativo da plataforma.
      - **Advogado:** Um profissional ou entidade institucional que utiliza o sistema para gerenciar os casos de aposentadoria de múltiplos clientes.
      - **Usuário Comum:** Uma pessoa física que utiliza a plataforma para realizar simulações, fazer upload de documentos e gerenciar seu próprio processo de aposentadoria.

  - **Sistema:**

      - **Aposenta-AI:** O sistema central. Uma plataforma modular projetada para a simulação e gestão completa de processos de aposentadoria.

  - **Sistemas Externos:**

      - **IA do Google:** Uma integração futura planejada para processamento inteligente de dados e documentos.
      - **APIs do INSS:** Integração futura planejada para automatizar requerimentos e consultar dados diretamente das fontes governamentais.
      - **Stripe / PayPal:** Sistema de pagamento externo utilizado para processar as assinaturas dos usuários na plataforma.
      - **SendGrid / Amazon SES:** Serviço externo responsável pelo envio de e-mails transacionais.
      - **PostgreSQL:** O banco de dados principal, usado para armazenar e consultar todos os dados da aplicação.
      - **LangChain:** O motor de Inteligência Artificial que alimenta as funcionalidades de simulação e análise.

-----

## 2\. Diagrama de Container

### 2.1. Descrição do Diagrama de Container

O diagrama de container mostra os principais blocos de software que compõem o sistema Aposenta-AI e como eles interagem entre si. Ele expõe a arquitetura de alto nível da aplicação, detalhando as responsabilidades de cada parte.

### 2.2. Diagrama

```mermaid
graph TB
    %% Pessoas
    admin["Administrador<br/>Gerencia o sistema e os usuários"]
    lawyer["Advogado<br/>Profissional institucional que gerencia casos de aposentadoria"]
    user["Usuário Comum<br/>Pessoa física que deseja simular e gerenciar sua aposentadoria"]

    %% Sistema Principal
    subgraph "Aposenta-AI"
        frontend["Frontend - Lovable<br/>Vite.js + Windy<br/>Interface web para upload de documentos, simulações e relatórios"]
        api["Backend - API<br/>FastAPI (Python)<br/>Gerencia autenticação, simulações, relatórios e integrações externas"]
        db[("Banco de Dados<br/>PostgreSQL<br/>Armazena usuários, documentos e dados de simulação")]
        ai["Módulo de IA<br/>LangChain<br/>Executa simulações inteligentes e preenche requerimentos"]
        email["Serviço de E-mail<br/>SendGrid / Amazon SES<br/>Envia confirmações e notificações"]
        payment["Serviço de Pagamento<br/>Stripe / PayPal<br/>Gerencia planos e assinaturas"]
        auth["Autenticação<br/>OAuth / Login local<br/>Gerencia o login dos usuários com Strategy Pattern"]
    end

    %% Sistemas Externos
    inss["APIs do INSS<br/>Integração futura para requerimentos"]
    googleai["IA do Google<br/>Integração futura com serviços de IA"]

    %% Relacionamentos com pessoas
    admin -->|Usa| frontend
    lawyer -->|Usa| frontend
    user -->|Usa| frontend

    %% Relacionamentos internos
    frontend -->|Comunica via HTTP| api
    api -->|Lê/Escreve dados| db
    api -->|Envia dados para análise IA| ai
    api -->|Envia confirmações de e-mail| email
    api -->|Processa pagamento| payment
    api -->|Autentica usuários| auth
    api -->|Retorna dados| frontend

    %% Relacionamentos externos
    api -->|Integração futura| inss
    api -->|Integração futura| googleai
```

### 2.3. Descrição dos Containers

  - **Frontend - Lovable (Vite.js + Windy):** Fornece a interface web para todos os usuários. É responsável por renderizar telas, capturar entradas e apresentar as simulações e relatórios.
  - **Backend - API (FastAPI - Python):** Cérebro do sistema. Gerencia toda a lógica de negócio, autenticação, orquestração de simulações e integração com outros containers.
  - **Banco de Dados (PostgreSQL):** Armazena de forma persistente todos os dados da aplicação, como usuários, documentos e simulações.
  - **Módulo de IA (LangChain):** Executa as simulações inteligentes de aposentadoria e o preenchimento automático de requerimentos.
  - **Serviço de E-mail (SendGrid / Amazon SES):** Envia e-mails transacionais para os usuários (confirmações, notificações).
  - **Serviço de Pagamento (Stripe / PayPal):** Gerencia os planos de assinatura e processa pagamentos.
  - **Autenticação (OAuth / Login local):** Gerencia o ciclo de vida da autenticação dos usuários, suportando múltiplos provedores.

-----

## 3\. Diagrama de Componente

### 3.1. Descrição do Diagrama de Componente

Este diagrama detalha a arquitetura interna do container **Backend - API**, mostrando os principais módulos que o compõem, suas responsabilidades e como interagem.

### 3.2. Diagrama

```mermaid
graph TB
    %% Pessoas e Containers
    user["Usuário<br/>Usa o sistema"]
    frontend["Frontend<br/>Lovable (Vite.js + Windy)<br/>Interface Web acessada por usuários"]
    database[("Banco de Dados<br/>PostgreSQL<br/>Armazena dados")]
    emailService["Serviço de E-mail<br/>SendGrid / Amazon SES<br/>Envio de e-mails"]
    paymentProvider["Gateway de Pagamento<br/>Stripe / PayPal<br/>Gerencia assinaturas"]

    %% Sistema Principal
    subgraph "Backend - API (FastAPI)"
        api["API<br/>Camada central de lógica do sistema"]
        
        %% Componentes internos
        authModule["Módulo de Autenticação<br/>Python<br/>Gerencia login via OAuth ou credenciais, usando Strategy Pattern"]
        userModule["Módulo de Usuários<br/>Python<br/>Criação, leitura e atualização de dados de usuários"]
        documentModule["Módulo de Documentos<br/>Python<br/>Upload e processamento de documentos"]
        simulationModule["Módulo de Simulação<br/>Python + LangChain<br/>Realiza simulações de aposentadoria com IA"]
        paymentModule["Módulo de Pagamentos<br/>Python<br/>Integra-se com Stripe/PayPal para gerenciar assinaturas"]
        notificationModule["Módulo de Notificações<br/>Python<br/>Gera notificações e confirmações por e-mail"]
        reportModule["Módulo de Relatórios<br/>Python<br/>Geração de relatórios personalizados para usuários"]
    end

    %% Relacionamentos principais
    user -->|Usa| frontend
    frontend -->|Faz requisições via HTTP| api
    api -->|Lê/Escreve dados| database
    
    %% Relacionamentos com componentes
    api -->|Autentica usuários| authModule
    api -->|Gerencia perfis| userModule
    api -->|Gerencia documentos| documentModule
    api -->|Solicita simulações| simulationModule
    api -->|Processa assinaturas| paymentModule
    api -->|Dispara notificações| notificationModule
    api -->|Gera relatórios| reportModule

    %% Relacionamentos entre componentes
    authModule -->|Entrega JWT| userModule
    simulationModule -->|Consulta documentos| documentModule
    paymentModule -->|Notifica após transação| notificationModule
    notificationModule -->|Envia e-mails| emailService
    paymentModule -->|Processa pagamentos com| paymentProvider
```

### 3.3. Descrição dos Componentes (Dentro da API)

  - **Módulo de Autenticação:** Gerencia o login (OAuth/credenciais) com o padrão Strategy.
  - **Módulo de Usuários:** Lida com o CRUD de dados dos usuários.
  - **Módulo de Documentos:** Gerencia upload, armazenamento e processamento de documentos.
  - **Módulo de Simulação:** Realiza simulações de aposentadoria usando LangChain.
  - **Módulo de Pagamentos:** Integra-se com o gateway de pagamento para gerenciar assinaturas.
  - **Módulo de Notificações:** Orquestra o envio de notificações e e-mails.
  - **Módulo de Relatórios:** Gera relatórios personalizados para os usuários.

-----

## 4\. Diagrama de Código (Opcional)

### 4.1. Descrição do Diagrama de Código

Este diagrama de classes ilustra as principais entidades de código, suas responsabilidades e os padrões de design aplicados para garantir uma arquitetura robusta e manutenível.

### 4.2. Diagrama

```mermaid
classDiagram
    class AuthModule {
      <<interface>>
      +login(credentials: Credentials) : Token
    }
    class OAuthAuthModule
    class CredentialsAuthModule
    AuthModule <|.. OAuthAuthModule
    AuthModule <|.. CredentialsAuthModule
    
    class UserModule {
      +createUser(userData: UserData)
    }
    class UserRepository
    UserModule --> UserRepository

    class SimulationModule {
      +calculateRetirement(userId: UUID)
    }
    class LangChainService
    SimulationModule --> LangChainService

    class PaymentModule {
      +createSubscription(userId: UUID)
    }
    class PaymentGateway
    PaymentModule --> PaymentGateway

    class NotificationModule {
      +sendEmailNotification(email: String)
    }
    class EmailService
    NotificationModule --> EmailService

    class API {
      +handleRequest(request: Request)
    }
    API --> AuthModule
    API --> UserModule
    API --> SimulationModule
    API --> PaymentModule
    API --> NotificationModule
```

### 4.3. Descrição do Código

A arquitetura do código é modular, com cada funcionalidade encapsulada. Os principais padrões são:

  - **Padrão Strategy:** Utilizado no `AuthModule` para lidar com diferentes métodos de login (OAuth e credenciais).
  - **Padrão Repository:** Aplicado para abstrair a camada de persistência de dados (`UserRepository`, `DocumentRepository`).
  - **Fachada (Facade):** A classe `API` atua como uma fachada, recebendo requisições e delegando a responsabilidade para o módulo apropriado.
  - **Injeção de Dependência:** Módulos interagem com serviços externos (`LangChainService`, `PaymentGateway`, `EmailService`) através de interfaces bem definidas.

-----

## 5\. Decisões Arquiteturais

### 5.1. Decisões Importantes

*(Esta seção deve ser preenchida pela equipe com as principais decisões arquiteturais do projeto, suas justificativas e impactos. Exemplos: escolha do FastAPI, uso de LangChain, arquitetura modular, etc.)*

  - **Decisão:** [Nome ou breve descrição da decisão]
      - **Descrição:** [Detalhes sobre a decisão]
      - **Justificativa:** [Motivo pelo qual a decisão foi tomada]
      - **Impacto:** [Impacto da decisão no sistema]

-----

## 6\. Considerações Finais

### 6.1. Padrões e Práticas

*(Esta seção deve ser preenchida com os padrões e práticas adotados pela equipe.)*

  - **Padrões:** [Ex: MVC, CQRS, Strategy Pattern, Event-Driven Architecture]
  - **Práticas:** [Ex: Continuous Integration, Code Review, Testes Automatizados (TDD/BDD)]

### 6.2. Próximos Passos

*(Esta seção deve indicar melhorias futuras ou áreas a serem exploradas para a evolução da arquitetura.)*

  - [Ex: Implementar cache distribuído com Redis, Adotar um novo serviço de IA para análise de documentos.]