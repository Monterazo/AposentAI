# Documento de Reunião Diária (Daily Scrum) - AposentAI

## Equipe
- **Scrum Master**: Lucas Monterazo
- **Equipe de Desenvolvimento**:
  - **Anita Monteiro** — Full Stack Developer
  - **Lucas Rodrigues** — UX/UI Designer & Frontend Developer
  - **Lucas Monterazo** — Machine Learning Engineer & Líder do Projeto

## Data
- **Data da Reunião**: 01/08/2025
- **Horário**: 09:30h
- **Duração**: 15 minutos

## Participantes
- Anita Monteiro
- Lucas Rodrigues
- Lucas Monterazo

## Pauta da Reunião
Cada membro da equipe responde às seguintes perguntas:

### Anita Monteiro (Full Stack Developer)
1.  **O que você fez ontem para ajudar a equipe a atingir a meta da Sprint?**
    - Iniciei o desenvolvimento da história de "Cadastro e Autenticação". No backend, criei a tabela `Usuario` com o Alembic, os schemas Pydantic e o endpoint `POST /usuarios` para o cadastro. No frontend, criei a estrutura básica do formulário de registro.

2.  **O que você planeja fazer hoje para ajudar a equipe a atingir a meta da Sprint?**
    - Vou implementar a lógica de hashing de senha com `passlib` no backend e a funcionalidade de login (`POST /token`). Depois, vou conectar o formulário de login do frontend para obter e armazenar o token JWT.

3.  **Há algum impedimento no seu caminho?**
    - Sem impedimentos no momento.

### Lucas Rodrigues (UX/UI Designer & Frontend Developer)
1.  **O que você fez ontem para ajudar a equipe a atingir a meta da Sprint?**
    - Finalizei o protótipo de alta fidelidade no Figma para todo o fluxo de autenticação (Cadastro, Login, Dashboard inicial). Também defini a paleta de cores e os componentes base no Windy CSS para o projeto.

2.  **O que você planeja fazer hoje para ajudar a equipe a atingir a meta da Sprint?**
    - Hoje vou pegar o formulário de cadastro que a Anita criou e aplicar o estilo final, garantindo que a experiência do usuário (UX) e a interface (UI) estejam alinhadas com o protótipo, incluindo as máscaras de input e as animações de feedback.

3.  **Há algum impedimento no seu caminho?**
    - Um pequeno alinhamento necessário: preciso definir com a Anita o formato padrão das mensagens de erro que virão da API para poder estilizá-las corretamente no frontend.

### Lucas Monterazo (Machine Learning Engineer & Líder do Projeto)
1.  **O que você fez ontem para ajudar a equipe a atingir a meta da Sprint?**
    - Configurei o SDK da LangChain no nosso projeto e realizei os primeiros testes de conectividade com a API do modelo de linguagem. Comecei a pesquisa (Spike) sobre as melhores bibliotecas Python para extração de texto de PDFs.

2.  **O que você planeja fazer hoje para ajudar a equipe a atingir a meta da Sprint?**
    - Vou focar em criar a primeira versão do *prompt* para a simulação de aposentadoria e testá-lo com um texto extraído manualmente de um arquivo CNIS. O objetivo é validar se o modelo de linguagem consegue nos retornar um JSON estruturado com os dados que esperamos.

3.  **Há algum impedimento no seu caminho?**
    - Sim. A falta de padronização nos layouts dos PDFs do CNIS é um risco técnico. A extração de texto simples pode não ser confiável, o que impactaria diretamente a qualidade da entrada para o prompt da IA.

## Impedimentos Identificados
Liste os impedimentos que foram mencionados durante a reunião e as ações planejadas para resolvê-los.

- **Impedimento 1**: Falta de padrão para exibir as mensagens de erro da API no frontend.
  - **Ação Planejada**: Reunião rápida de 5 minutos entre Anita e Lucas R. após a daily para definir um formato JSON padrão para os erros da API (ex: `{"detail": "mensagem de erro"}`).
  - **Responsável**: Anita Monteiro e Lucas Rodrigues.

- **Impedimento 2**: Risco na extração de dados de PDFs do CNIS devido à falta de padronização.
  - **Ação Planejada**: Manter a Prova de Conceito (PoC) focada em 1 ou 2 layouts de PDF "ideais" para validar o fluxo. Uma nova história técnica será adicionada ao backlog para "Investigar solução de OCR robusta para PDFs" para ser priorizada futuramente.
  - **Responsável**: Lucas Monterazo.

## Notas Adicionais
- A separação de tarefas entre o desenvolvimento full stack (Anita) e o foco em UX/UI e frontend (Lucas R.) está funcionando bem e permitindo o avanço em paralelo das funcionalidades.

---

## Revisão e Aprovação
- **Revisado por**: Lucas Monterazo
- **Data da Revisão**: 05/08/2025

`[Assinatura do Scrum Master - Lucas Monterazo]` &nbsp;&nbsp;&nbsp;&nbsp; `[Assinatura de um Membro da Equipe - Lucas Rodrigues]`