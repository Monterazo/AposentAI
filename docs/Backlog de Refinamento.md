# Documento de Refinamento do Backlog (Backlog Refinement): AposentAI

## Equipe

* **Product Owner:** Anita Monteiro
* **Scrum Master:** Lucas Monterazo
* **Equipe de Desenvolvimento:** Lucas Rodrigues 

## Data

* **Data da Reunião:** 30 de julho de 2025
* **Duração:** 1.5 horas
* **Participantes:** Anita Monteiro, Lucas Monterazo, Lucas Rodrigues

## Objetivo da Reunião

Refinar, detalhar e priorizar os itens do Product Backlog para a primeira fase de desenvolvimento do AposentAI, garantindo que as Histórias de Usuário estejam claras, testáveis e prontas (Ready) para a Sprint 1.

## Itens do Backlog Refinados

### Item 1: (Épico: Gestão de Usuários) - Cadastro e Autenticação de Usuário Comum

* **Descrição:** Como um novo usuário (pessoa física), eu quero me cadastrar na plataforma usando meu nome, e-mail e CPF, e criar uma senha segura, para que eu possa ter acesso às funcionalidades do sistema. Após o cadastro, eu quero conseguir fazer login para acessar minha conta.
* **Prioridade:** **Alta**
* **Estimativa:** **8 Story Points**
* **Critérios de Aceitação:**
    * [ ] O formulário de cadastro deve solicitar: Nome Completo, E-mail, CPF e Senha.
    * [ ] O sistema deve validar que o e-mail e o CPF ainda não existem na base de dados.
    * [ ] O formato do CPF deve ser validado (pode ser um formato simples de 11 dígitos numéricos inicialmente).
    * [ ] A senha deve ser armazenada de forma segura (usando hash).
    * [ ] Após o cadastro bem-sucedido, o usuário deve ser redirecionado para a tela de login.
    * [ ] Um usuário cadastrado deve conseguir fazer login usando e-mail e senha.
    * [ ] Em caso de login bem-sucedido, o sistema deve gerar e retornar um token de autenticação (JWT).
    * [ ] O sistema deve retornar uma mensagem de erro clara para tentativas de login com credenciais incorretas.

### Item 2: (Épico: Simulação de Aposentadoria) - Upload de Documento CNIS

* **Descrição:** Como um usuário autenticado, eu quero fazer o upload do meu extrato CNIS (em formato PDF) para que a plataforma possa usar essas informações para realizar a simulação da minha aposentadoria.
* **Prioridade:** **Alta**
* **Estimativa:** **5 Story Points**
* **Critérios de Aceitação:**
    * [ ] Na área logada, deve haver uma interface clara para o upload de arquivos.
    * [ ] O usuário deve conseguir selecionar um arquivo PDF do seu computador.
    * [ ] O sistema deve validar se o arquivo é um PDF e se está abaixo de um limite de tamanho (ex: 10MB).
    * [ ] Após o upload, o arquivo deve ser armazenado de forma segura (ex: S3 Bucket ou diretório no servidor).
    * [ ] Um registro do documento deve ser criado na tabela `DOCUMENTO`, associado ao `id` do usuário logado.
    * [ ] O usuário deve receber uma notificação de sucesso ou erro após a tentativa de upload.

### Item 3: (Épico: Simulação de Aposentadoria) - Execução de Simulação Básica (Prova de Conceito)

* **Descrição:** Como um usuário autenticado que já fiz o upload do meu CNIS, eu quero solicitar uma simulação de aposentadoria para receber uma análise inicial das minhas possibilidades.
* **Prioridade:** **Alta**
* **Estimativa:** **13 Story Points**
* **Critérios de Aceitação:**
    * [ ] Deve existir um endpoint de API protegido (ex: `POST /simulacao`) para iniciar o processo.
    * [ ] A API deve identificar o usuário logado e localizar seu documento CNIS mais recente.
    * [ ] O backend deve extrair o texto do PDF do CNIS (usando uma biblioteca OCR/extrator de texto).
    * [ ] O texto extraído deve ser enviado para o serviço da `LangChain` através de um prompt pré-definido.
    * [ ] A resposta da `LangChain` (em formato JSON) deve ser recebida e validada pelo backend.
    * [ ] Um novo registro deve ser criado na tabela `SIMULACAO` com os parâmetros de entrada e o resultado obtido.
    * [ ] O resultado da simulação deve ser retornado para o frontend de forma estruturada.

## Discussões e Decisões Importantes

* **Discussão 1:** Definição do escopo do MVP (Minimum Viable Product).
    * **Decisão:** A equipe concordou em focar 100% no fluxo do **Usuário Comum** para as primeiras sprints. As funcionalidades do **Advogado** (gestão de casos, múltiplos clientes) serão um épico separado e priorizadas após a validação do fluxo principal.

* **Discussão 2:** Identificador único para o usuário.
    * **Decisão:** Fica confirmado que o **CPF** será o identificador principal para o cadastro da Pessoa Física, conforme refinado anteriormente. O campo deve ser único no banco de dados.

* **Discussão 3:** Complexidade da extração de dados do CNIS.
    * **Decisão:** Para o Item 3 (Simulação PoC), a extração de dados será simplificada. Não haverá uma análise profunda do layout do PDF. O objetivo inicial é validar o fluxo ponta a ponta: `Upload -> Extração de Texto -> Chamada na IA -> Resposta`. A inteligência para interpretar layouts complexos será uma melhoria futura.

## Ações a Serem Tomadas

* **Ação 1:**
    * **Descrição:** O Product Owner deve criar um novo Épico no backlog chamado "Gestão de Casos para Advogados" e mover todas as histórias relacionadas a esse perfil para lá.
    * **Responsável:** Anita Monteiro
    * **Prazo:** 08/08/2025

* **Ação 2:**
    * **Descrição:** A equipe de desenvolvimento precisa realizar uma breve pesquisa (Spike) para escolher e testar uma biblioteca Python para validação de CPF e uma biblioteca para extração de texto de PDFs.
    * **Responsável:** Lucas Rodrigues
    * **Prazo:** 06/08/2025

* **Ação 3:**
    * **Descrição:** Configurar as credenciais de acesso à API da `LangChain` no ambiente de desenvolvimento e criar um script simples para testar a conectividade e autenticação.
    * **Responsável:** Lucas Monterazo
    * **Prazo:** 06/08/2025

## Notas Adicionais

Foi sugerido a criação de uma aba para advogados associados a escritórios e possibilidade de advogados independentes. 