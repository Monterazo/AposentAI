
# Template de Histórias do Usuário: AposentAI

## Título da História
Upload de Documento CNIS pelo Usuário

## Descrição
Como um **usuário autenticado**, eu quero **fazer o upload do meu extrato CNIS em formato PDF**, para que **a plataforma possa analisar meus dados previdenciários e realizar uma simulação precisa da minha aposentadoria**.

## Critérios SMART

### Specific (Específica)
Desenvolver uma funcionalidade na interface do usuário que permita a um usuário logado selecionar um arquivo PDF do seu dispositivo e enviá-lo para o servidor. O backend deve receber este arquivo, validar seu formato (application/pdf) e tamanho (limite de 10MB), salvá-lo em um diretório local e criar um registro na tabela `DOCUMENTO` associado ao ID do usuário.

### Measurable (Mensurável)
O sucesso da história será medido pela conformidade com todos os Critérios de Aceitação. O resultado final deve ser um arquivo PDF salvo com sucesso no servidor e um novo registro correspondente no banco de dados, visível através de uma consulta SQL. A funcionalidade será considerada "concluída" quando todos os testes (manuais e automatizados) para os critérios de aceitação passarem.

### Achievable (Atingível)
A história é atingível dentro de uma sprint. A equipe possui as habilidades necessárias: a Anita (Full Stack) pode construir o endpoint na API e a lógica de banco de dados, e o Lucas R. (Frontend) pode construir o componente de UI. A decisão de usar armazenamento local para o MVP remove a complexidade de configurar um serviço de nuvem nesta fase.

### Relevant (Relevante)
Esta história é extremamente relevante, pois o upload do CNIS é o principal método de entrada de dados para o motor de simulação de IA. Sem esta funcionalidade, o usuário não pode fornecer as informações necessárias para a funcionalidade central do AposentAI, bloqueando a entrega de valor do produto.

### Time-bound (Limitada no Tempo)
Esta história deve ser concluída dentro do período da **Sprint 1**, que tem a duração de duas semanas (de 07/07/2025 a 14/07/2025).

## Critérios de Aceitação
1.  **DADO QUE** eu sou um usuário logado na minha dashboard, **QUANDO** eu clico no botão "Enviar Documento", **ENTÃO** um seletor de arquivos do meu sistema operacional deve abrir.
2.  **DADO QUE** o seletor de arquivos está aberto, **QUANDO** eu seleciono um arquivo com formato PDF e tamanho menor que 10MB, **ENTÃO** o arquivo é enviado para a API com sucesso e eu recebo uma mensagem de "Upload concluído com sucesso".
3.  **DADO QUE** o arquivo foi enviado com sucesso, **QUANDO** o backend o recebe, **ENTÃO** um novo registro deve ser criado na tabela "DOCUMENTO" do banco de dados, contendo o ID do meu usuário, o nome do arquivo e o caminho para o seu armazenamento.
4.  **DADO QUE** eu tento enviar um arquivo que não é PDF ou que é maior que 10MB, **QUANDO** eu tento fazer o upload, **ENTÃO** eu devo ver uma mensagem de erro clara na interface informando o motivo da falha (ex: "Formato de arquivo inválido" ou "Arquivo muito grande").
5.  **DADO QUE** o upload falhou no servidor por qualquer motivo, **QUANDO** eu envio o arquivo, **ENTÃO** eu devo receber uma mensagem de erro genérica como "Ocorreu um erro ao enviar seu documento. Tente novamente."

## Notas e Comentários
- Conforme decisão de planejamento, o armazenamento de arquivos para esta sprint será feito no sistema de arquivos local do servidor, em um diretório pré-definido. A URL/caminho será salva na coluna `path_armazenamento`.
- O frontend deve fornecer um feedback visual durante o processo de upload (ex: uma barra de progresso ou um ícone de 'loading') para melhorar a experiência do usuário.

## Histórico de Revisões
- **Data:** 05/08/2025
  - **Alterações:** Criação da história de usuário para a funcionalidade de Upload de Documentos, detalhada com critérios SMART.
  - **Revisado por:** Anita Monteiro (Product Owner)
