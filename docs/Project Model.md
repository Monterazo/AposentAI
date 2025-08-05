# Project Model Canvas: AposentAI

## 1. Objetivos e Justificativas
- **Descrição**: O projeto visa desenvolver a plataforma AposentAI para desmistificar e automatizar o processo de planejamento de aposentadoria no Brasil. O problema central que o projeto resolve é a complexidade e a burocracia do sistema previdenciário brasileiro, que torna o planejamento inacessível para o cidadão comum e o trabalho do advogado previdenciarista repetitivo e demorado.

- **Objetivos SMART**:
    - **Específico (Specific)**: Criar uma aplicação web funcional que permita a usuários (comuns e advogados) se cadastrarem, enviarem documentos (como o CNIS) e receberem uma simulação inteligente de cenários de aposentadoria.
    - **Mensurável (Measurable)**: O sucesso será medido pela conclusão das funcionalidades do MVP (Cadastro, Login, Upload, Simulação Básica e Gestão de Casos), com 100% dos critérios de aceitação das histórias de usuário da Sprint 1 a 6 atendidos.
    - **Alcançável (Achievable)**: O projeto é viável dada a composição da equipe com habilidades complementares em Desenvolvimento Full Stack (Anita), UX/UI & Frontend (Lucas R.) e Machine Learning & Liderança (Lucas M.).
    - **Relevante (Relevant)**: O projeto ataca uma dor real e de alto impacto no mercado brasileiro, possuindo valor tanto como ferramenta de cidadania quanto como produto B2B para profissionais da área jurídica.
    - **Temporal (Time-bound)**: Entregar um MVP completo e funcional no prazo de 4 meses, seguindo o cronograma de marcos estabelecido.

## 2. Requisitos Principais
- **Requisitos Funcionais**:
    - **RF01**: Sistema de cadastro e autenticação de usuários (Comum e Advogado) via e-mail/CPF e senha.
    - **RF02**: Interface segura para upload de documentos pessoais (PDFs como CNIS, CTPS).
    - **RF03**: Módulo de IA para extrair dados dos documentos e realizar simulações de aposentadoria.
    - **RF04**: Dashboard para visualização clara e intuitiva dos resultados da simulação.
    - **RF05**: Módulo de Gestão de Casos para o perfil de Advogado, permitindo associar múltiplos clientes e seus respectivos documentos/simulações.
- **Requisitos Não-Funcionais**:
    - **RNF01 (Segurança)**: Os dados sensíveis (CPF, senhas, documentos) devem ser armazenados de forma segura, com senhas hasheadas e controle de acesso rigoroso. Conformidade com a LGPD.
    - **RNF02 (Usabilidade)**: A interface deve ser limpa, intuitiva e acessível, minimizando a curva de aprendizado para usuários não-técnicos.
    - **RNF03 (Desempenho)**: A API deve ter um tempo de resposta rápido, e o processamento da simulação não deve exceder um tempo de espera razoável para o usuário.

## 3. Stakeholders
- **Equipe de Projeto**:
    - **Lucas Monterazo**: Machine Learning Engineer & Líder do Projeto.
    - **Anita Monteiro**: Full Stack Developer.
    - **Lucas Rodrigues**: UX/UI Designer & Frontend Developer.
- **Usuários Finais**:
    - **Usuário Comum**: Cidadão brasileiro que deseja entender e planejar sua aposentadoria.
    - **Advogado Previdenciarista**: Profissional que busca otimizar seu tempo e precisão na análise de casos de aposentadoria.
- **Outros (Contexto Acadêmico/Real)**:
    - **Orientador do Projeto/Professor**: Avaliador do progresso e da qualidade final da entrega.

## 4. Entregas
- **Software**:
    1.  **API RESTful (Backend)**: Aplicação FastAPI funcional e documentada (via Swagger/OpenAPI).
    2.  **Aplicação Web (Frontend)**: Single Page Application (SPA) interativa construída com Vite.js.
    3.  **Banco de Dados**: Schema PostgreSQL implementado e populado.
- **Documentação**:
    1.  **Documento de Arquitetura (`arquitetura.md`)**: Detalhamento da arquitetura com o C4 Model.
    2.  **Schema do Banco de Dados (`DATABASE_SCHEMA.md`)**: Modelo ER e descrição detalhada das tabelas.
    3.  **Documentação do Projeto**: Atas de reunião, backlog refinado e este Project Model Canvas.
    4.  **Repositório de Código**: Código-fonte completo e organizado no GitHub com um `README.md` claro.

## 5. Marcos e Cronograma
- **Mês 1: Fundação e Autenticação (Sprint 1)**
    - **Marco 1 (Fim do Mês 1)**: Usuários conseguem se cadastrar, fazer login e upload de documentos. A base da aplicação está de pé.
- **Mês 2: Inteligência e Simulação (Sprint 2 e 3)**
    - **Marco 2 (Fim do Mês 2)**: A funcionalidade principal de simulação (PoC) está implementada. Um usuário pode receber uma análise básica a partir de seu documento.
- **Mês 3: Funcionalidades para Advogados (Sprint 4 e 5)**
    - **Marco 3 (Fim do Mês 3)**: O dashboard do advogado está funcional, permitindo a criação e gestão de casos.
- **Mês 4: Refinamento e Entrega (Sprint 6)**
    - **Marco 4 (Fim do Mês 4)**: Projeto finalizado, testado, com UI polida e pronto para apresentação/deploy.

## 6. Riscos e Suposições
- **Riscos**:
    - **Risco Técnico (Alto)**: A extração de dados de PDFs do CNIS pode ser imprecisa devido à falta de padronização dos documentos. **Mitigação**: Iniciar com uma abordagem simples e criar uma tarefa para uma solução de OCR robusta no futuro; gerenciar as expectativas sobre a precisão inicial.
    - **Risco de Dependência (Médio)**: A dependência de APIs externas (LangChain, OpenAI) pode acarretar custos não previstos, instabilidade ou mudanças na API. **Mitigação**: Criar uma camada de abstração no código para facilitar a troca do provedor de IA.
    - **Risco de Escopo (Médio)**: A tentação de adicionar novas funcionalidades ("scope creep") pode atrasar o MVP. **Mitigação**: Aderência rigorosa ao backlog priorizado e às metas da sprint.
- **Suposições**: (Movido para a seção "Premissas" para alinhar com o template)

## 7. Orçamento
- **Custos de Serviços**: O projeto buscará utilizar os **níveis gratuitos (free tiers)** de serviços em nuvem para hospedagem e banco de dados (ex: Vercel, Render, Supabase). Custos com chamadas de API de IA serão monitorados e mantidos dentro dos créditos gratuitos iniciais, se possível.
- **Recursos Humanos**: O principal "custo" é o **tempo e dedicação da equipe de 3 pessoas** ao longo do cronograma de 4 meses do projeto.

## 8. Premissas
- A equipe possui as competências técnicas necessárias para executar o projeto conforme planejado.
- As APIs de IA e os serviços em nuvem estarão disponíveis e acessíveis durante todo o ciclo de vida do projeto.
- O acesso a exemplos de documentos (como CNIS) para treinamento e teste da IA estará disponível.

## 9. Restrições
- **Tempo**: O projeto tem um prazo fixo de 4 meses para a entrega do MVP funcional.
- **Equipe**: A equipe é fixa e enxuta (3 membros), o que exige um gerenciamento de tarefas eficiente e comunicação constante para evitar gargalos.
- **Tecnologia**: A stack tecnológica (FastAPI, PostgreSQL, Vite.js) está definida e não deve ser alterada.
- **Regulamentação**: O projeto lida com dados pessoais sensíveis, exigindo conformidade total com a **Lei Geral de Proteção de Dados (LGPD)** do Brasil em todas as etapas de desenvolvimento.