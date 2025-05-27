# Projeto de Engenharia de Software
Agente de IA programado para fazer análises para a Previdência Social brasileira

# AposentAI
 
## Descrição

Este projeto desenvolve uma solução de Inteligência Artificial para otimizar processos na Previdência Social brasileira. Através da análise automatizada de dados, a IA visa agilizar a concessão de benefícios, aprimorar a gestão de processos judiciais e fortalecer o combate à fraude, contribuindo para um sistema mais eficiente e transparente.


## Objetivos Principais e Funcionalidades Esperadas

Os principais objetivos deste projeto são:

* **Automatizar a análise de documentos:** Extrair informações relevantes de documentos como laudos médicos, comprovantes de renda e outros, utilizando técnicas de Processamento de Linguagem Natural (PLN).
* **Identificar padrões em dados:** Analisar dados do Cadastro Nacional de Informações Sociais (CNIS) e outros bancos de dados para identificar padrões de comportamento, como possíveis fraudes ou inconsistências em pedidos de benefícios.
* **Prever resultados em processos administrativos:** Utilizar Machine Learning para prever a probabilidade de aprovação de pedidos de benefícios ou a duração de processos administrativos.
* **Gerar relatórios e insights:** Fornecer relatórios e insights sobre os dados analisados, auxiliando os servidores da Previdência Social na tomada de decisões.


## Funcionalidades Principais

* **Módulo de Análise de Documentos:**
    * Extração de texto de diferentes formatos (PDF, imagens).
    * Classificação e categorização de documentos.
    * Extração de entidades nomeadas (nomes, datas, valores).
    * Análise de sentimentos e contexto.
* **Módulo de Análise de Dados:**
    * Pré-processamento e limpeza de dados.
    * Análise exploratória de dados.
    * Modelagem preditiva (classificação, regressão).
    * Detecção de anomalias.
* **Módulo de Interface e Relatórios:**
    * Interface web para interação com o agente de IA.
    * Visualização de dados e geração de relatórios.
    * APIs para integração com outros sistemas.
 
## Estrutura Organizacional do Código (Diagrama C4)

```c4plantuml
@startuml

!include <c4/C4_Context>
!include <c4/C4_Container>
!include <c4/C4_Component>
!include <c4/C4_Deployment>

' System Context
System_Context(sistema, "Agente de IA Previdenciário", "Um sistema inteligente para automatizar a análise de dados e documentos na Previdência Social brasileira.")

' System Landscape
' SystemLandscapeBoundary(boundary, "Previdência Social") {
'   System(inss, "INSS", "Sistema de gestão da Previdência Social")
'   System_Ext(governo, "Governo", "Outros sistemas governamentais")
'   Rel(sistema, inss, "Usa dados de", "HTTPS")
'   Rel(sistema, governo, "Integra com", "API")
' }

' Container Diagram
Container_Boundary(c1, "Containers") {
  Container(web_app, "Aplicação Web", "Python / Django", "Interface web para usuários interagirem com o agente de IA.")
  Container(api, "API", "Python / Flask", "API para comunicação entre a aplicação web e os módulos de IA.")
  ContainerDb(db, "Banco de Dados", "PostgreSQL", "Armazena dados da aplicação e resultados das análises.")
  Container(ia_analise_docs, "Módulo de Análise de Documentos", "Python / TensorFlow, NLTK", "Realiza a extração e análise de informações de documentos.")
  Container(ia_analise_dados, "Módulo de Análise de Dados", "Python / Scikit-learn, Pandas", "Realiza a análise de dados estruturados e modelagem preditiva.")
  
  Rel(web_app, api, "Usa", "HTTPS")
  Rel(api, db, "Lê e escreve", "JDBC/ODBC")
  Rel(api, ia_analise_docs, "Usa", "API")
  Rel(api, ia_analise_dados, "Usa", "API")
}

' Component Diagram (Exemplo para Análise de Documentos)
Component_Boundary(c2, "Componentes do Módulo de Análise de Documentos") {
  Component(extrator_texto, "Extrator de Texto", "Python", "Extrai texto de diferentes formatos de arquivo.")
  Component(classificador_docs, "Classificador de Documentos", "Python / TensorFlow", "Classifica documentos em categorias (e.g., laudo médico, comprovante de renda).")
  Component(extrator_entidades, "Extrator de Entidades", "Python / Spacy", "Extrai entidades nomeadas (e.g., nomes, datas, valores) do texto.")
  Component(analisador_sentimento, "Analisador de Sentimento", "Python / NLTK", "Analisa o sentimento e o contexto do texto.")
  
  Rel(ia_analise_docs, extrator_texto, "Usa")
  Rel(ia_analise_docs, classificador_docs, "Usa")
  Rel(ia_analise_docs, extrator_entidades, "Usa")
  Rel(ia_analise_docs, analisador_sentimento, "Usa")
}

@enduml



## Tecnologias Utilizadas

* **Backend:** 
* **Frontend:** 
* **Banco de Dados:** CNIS (Cadastro Nacional de Informações Sociais), Processos administrativos de concessão de benefícios, Processos judiciais previdenciários, Jusbrasil.
* **Servidor:**
* **Gestão:** Github Projects (Kanban e gestão ágil)

## Pré-requisitos

Antes de começar, certifique-se de ter instalado:




## ⚙️ Guia para Build Local do Sistema

1. Clone o repositório:
    ```bash
    git clone https://github.com/seu-usuario/agente-ia-previdencia.git
    cd agente-ia-previdencia
    ```

2. Crie e ative o ambiente virtual:
    ```bash
    python -m venv venv
    source venv/bin/activate  # Linux/Mac
    .\venv\Scripts\activate   # Windows
    ```

3. Instale as dependências:
    ```bash
    pip install -r requirements.txt
    ```

4. Execute os notebooks ou scripts conforme a documentação na pasta `/src`.


## 📋 Lista de Issues (Tarefas Iniciais)

- [x] Criar estrutura inicial do repositório
- [ ] Implementar pipeline de coleta de dados
- [ ] Desenvolver módulo de análise com IA
- [ ] Gerar relatórios automáticos (label: `good first issue`)
- [ ] Realizar testes de performance e precisão
## 🤝 Como Contribuir

1. Faça um fork do projeto
2. Crie uma branch com sua feature: `git checkout -b minha-feature`
3. Faça o commit das suas alterações: `git commit -m 'Minha nova feature'`
4. Faça o push para a sua branch: `git push origin minha-feature`
5. Abra um Pull Request

## Equipe

* **Anita Monteiro:** Full Stack Developer
* **Lucas Monterazzo:** Machine Learning Engineer
* **Lucas Rodrigues:** UX/UI Designer and Frontend Developer
