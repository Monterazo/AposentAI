# 🤝 Guia de Contribuição – AposentAI

Obrigado por considerar contribuir com o **AposentAI**! Este guia vai te ajudar a entender como colaborar de forma eficiente e alinhada com o fluxo de trabalho do projeto.

---

## 🚀 Como contribuir

1. **Fork** o repositório.
2. Crie uma nova **branch** a partir da `develop`:
   ```bash
   git checkout develop
   git checkout -b feat/nome-da-feature
3. Faça suas alterações.
4. Confirme usando a convenção Conventional Commits.
5. Envie um Pull Request para a branch develop.

   🔁 Fluxo de Desenvolvimento (GitFlow)
main: contém versões estáveis já entregues.

develop: branch de desenvolvimento geral.

feature/*: novas funcionalidades.

bugfix/*: correções de bugs.

hotfix/*: correções emergenciais na main.

release/*: preparação para uma nova versão.

✅ Regras de Pull Request
PRs devem ser abertos sempre para a branch develop.

Cada PR deve ser revisado por pelo menos 2 membros do time antes do merge.

Adicione uma descrição clara do que foi feito e, se possível, capturas de tela ou exemplos.

Inclua no título da PR o tipo de contribuição (ex: feat:, fix:, docs:, refactor:).

🏷️ Commits
Siga a convenção Conventional Commits:

feat: nova funcionalidade

fix: correção de bug

docs: mudanças na documentação

style: formatação, sem mudança de código

refactor: refatoração de código

test: testes

chore: tarefas de build ou configuração

Exemplo:

bash
Copiar
Editar
git commit -m "feat: adiciona cálculo do tempo de contribuição por categoria"
🧪 Testes e Boas Práticas
Teste o código antes de enviar o PR.

Sempre documente funções e módulos públicos.

Preze por legibilidade, simplicidade e clareza.

Evite deixar prints, console.log ou códigos comentados.

💬 Dúvidas ou Sugestões
Abra uma issue ou entre em contato pelo repositório oficial.

🎉 Obrigado por contribuir com o AposentAI! Sua ajuda é essencial para construirmos algo incrível.
