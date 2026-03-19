
# AposentAI

[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![GitHub Issues](https://img.shields.io/github/issues/Monterazo/AposentAI.svg)](https://github.com/Monterazo/AposentAI/issues)
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr/Monterazo/AposentAI.svg)](https://github.com/Monterazo/AposentAI/pulls)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)

## 📋 Sobre o Projeto

O **AposentAI** é um agente de Inteligência Artificial desenvolvida para otimizar processos na **Previdência Social brasileira**. O sistema automatiza análises, agiliza concessões de benefícios, melhora a gestão de processos judiciais e reforça o combate à fraude, tornando a Previdência mais eficiente e transparente.

### 🏗️ Base Tecnológica

Este projeto é baseado no **[Full Stack FastAPI Template](https://github.com/fastapi/full-stack-fastapi-template)** desenvolvido pela comunidade FastAPI, que fornece uma base sólida para aplicações web modernas com:

- **Backend**: FastAPI, SQLModel, PostgreSQL
- **Frontend**: React, TypeScript, Vite, Chakra UI
- **DevOps**: Docker Compose, Traefik, GitHub Actions
- **Qualidade**: Testes automatizados, linting, CI/CD

> **Agradecimentos**: Agradecemos à comunidade FastAPI e aos contribuidores do template original por fornecerem uma base excelente para o desenvolvimento deste projeto. Veja [CREDITS.md](AposentAI/CREDITS.md) para mais detalhes sobre os créditos.

## 🏁 Início Rápido

Essas instruções ajudarão você a ter uma cópia do projeto rodando localmente para desenvolvimento e testes.

### Pré-requisitos

Antes de começar, certifique-se de ter instalado:

```bash
Python 3.11+
Node.js (recomenda-se versão LTS)
PostgreSQL
Git
```

### Instalação

Clone o repositório:

```bash
git clone https://github.com/Monterazo/AposentAI.git
cd AposentAI
```

Instale as dependências:

```bash
# Backend
cd backend
pip install -r requirements.txt

# Frontend
cd ../frontend
npm install
```

Configure o banco de dados (PostgreSQL):

```bash
# Exemplo (ajuste com suas credenciais)
createdb aposentai_db
```

Consulte instruções completas no arquivo [`BUILD.md`](BUILD.md).

## 💡 Uso

Exemplo de execução (detalhes no BUILD.md):

```bash
# Iniciar backend (Django)
cd backend
python manage.py runserver

# Iniciar frontend (Vite)
cd ../frontend
npm run dev
```

Acesse o sistema em `http://localhost:5173`

## ✅ Funcionalidades

- **Automatização da análise de documentos**
  - Extração de texto (PDFs, imagens)
  - Classificação e categorização
  - Extração de entidades nomeadas (nomes, datas, valores)
  
- **Geração de relatórios e insights**
  - Visualização de dados
  - Interface web amigável para servidores da Previdência
  - Exportação de relatórios automatizados

## 📚 Documentação

Os diagramas C4 (Contexto, Contêiner e Componentes) estarão disponíveis na pasta `/docs/arquitetura`.

A documentação técnica será incluída futuramente. Por enquanto, utilize os arquivos `BUILD.md` e `CONTRIBUTING.md`.

## 🎯 Como Contribuir

Contribuições são sempre bem-vindas! Para colaborar:

1. Faça um fork do projeto
2. Crie uma branch: `git checkout -b minha-nova-feature`
3. Faça suas alterações
4. Commit: `git commit -m 'feat: nova funcionalidade'`
5. Push: `git push origin minha-nova-feature`
6. Abra um Pull Request

➡️ Leia o guia de contribuição em [`CONTRIBUTING.md`](CONTRIBUTING.md)

## 📌 Diretrizes de Contribuição

- Use boas práticas de Git (commits descritivos)
- Documente seu código
- Testes são sempre bem-vindos
- Use issues com tags (`good first issue`, `bug`, etc.)

## 📝 Licença

Este projeto está licenciado sob a Licença MIT — veja o arquivo [`LICENSE`](LICENSE) para detalhes.

## 👥 Créditos

- **Lucas Monterazzo** (@Monterazo) — Machine Learning Engineer & Líder do Projeto  
- **Anita Monteiro** — Full Stack Developer  
- **Lucas Rodrigues** — UX/UI Designer & Frontend Developer

## ❓ FAQ

**P:** Como faço para configurar o ambiente?  
**R:** Siga as instruções em [BUILD.md](BUILD.md), que explicam passo a passo a configuração de backend, frontend e banco de dados.

## 📊 Estado do Projeto

Este projeto está em **desenvolvimento ativo**. Novas funcionalidades, melhorias e correções são feitas continuamente.

## 🖼️ Screenshots

*Em breve: imagens da interface serão adicionadas aqui.*
