# 🤝 Guia de Contribuição – AposentAI

Obrigado por considerar contribuir com o **AposentAI**! Este guia vai te ajudar a entender como colaborar de forma eficiente e alinhada com o fluxo de trabalho do projeto.

---

## ⚙️ Configurando o Ambiente de Desenvolvimento

Antes de começar, você precisa configurar o ambiente de desenvolvimento localmente.

### Backend (Django)

*(A ser preenchido: inclua os passos para instalar as dependências, configurar o banco de dados e rodar as migrações. Ex: `pip install -r requirements.txt`, `python manage.py migrate`, etc.)*

### Frontend (React + Vite)

*(A ser preenchido: inclua os passos para instalar as dependências do Node.js. Ex: `npm install` ou `yarn install`)*

---

## 🚀 Como Contribuir

1.  **Fork** o repositório.
2.  Crie uma nova **branch** a partir da `develop`:
    ```bash
    git checkout develop
    git checkout -b feat/nome-da-feature
    ```
3.  Faça suas alterações e adicione seus commits usando a convenção de *Conventional Commits*.
4.  Envie um **Pull Request (PR)** para a branch `develop`.

### 🔁 Fluxo de Desenvolvimento (GitFlow)

* **main**: Contém as versões estáveis que foram entregues.
* **develop**: Branch principal de desenvolvimento. Novas funcionalidades são integradas aqui.
* **feature/\***: Branches para novas funcionalidades.
* **bugfix/\***: Branches para correções de bugs.
* **hotfix/\***: Branches para correções emergenciais na `main`.
* **release/\***: Branches para preparação de uma nova versão.

### ✅ Regras de Pull Request

* PRs devem ser abertos sempre para a branch `develop`.
* Cada PR deve ser revisado por pelo menos 2 membros do time antes do *merge*.
* Adicione uma descrição clara do que foi feito e, se possível, capturas de tela.
* Siga a convenção de *Conventional Commits* no título do seu PR (ex: `feat:`, `fix:`, `docs:`).

### 🏷️ Commits

Siga a convenção *Conventional Commits*:

* **feat**: nova funcionalidade
* **fix**: correção de bug
* **docs**: mudanças na documentação
* **style**: formatação, sem mudança de código
* **refactor**: refatoração de código
* **test**: adição ou refatoração de testes
* **chore**: tarefas de build ou configuração

**Exemplo:**
```bash
git commit -m "feat: adiciona cálculo do tempo de contribuição por categoria"
🧪 Testes e Boas Práticas
Sempre teste seu código antes de enviar o PR.
Documente funções e módulos públicos.
Preze por legibilidade, simplicidade e clareza.
Evite deixar print(), console.log() ou códigos comentados no merge final.
💬 Dúvidas ou Sugestões
Abra uma issue ou entre em contato pelo repositório oficial.

🎉 Obrigado por contribuir com o AposentAI!