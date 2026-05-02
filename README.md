
<img width="1582" height="724" alt="Image" src="https://github.com/user-attachments/assets/00476069-6dea-4b4a-b0b9-ea821329e559" />

# 📊 Painel de Preços de Combustíveis

![Go](https://img.shields.io/badge/Go-00ADD8?style=for-the-badge&logo=go&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

---

## 📝 1. Contexto do Projeto

Este projeto foi desenvolvido como uma solução para o desafio técnico de substituição de processos manuais (planilhas) em uma distribuidora de combustíveis. O objetivo principal é permitir o registro diário da variação de preços de combustíveis praticados por diferentes fornecedores e polos de abastecimento, exibindo esse histórico em um painel visual dinâmico que facilita a análise de tendências.

---

## 🛠️ 2. Arquitetura e Decisões Técnicas

Para garantir uma aplicação escalável, de alta performance e fácil de manter, optei por uma arquitetura moderna dividindo as responsabilidades de forma clara:

### **Front-End: Next.js (React) & Tailwind CSS**
* **Next.js:** Estrutura robusta de roteamento e renderização rápida.
* **Painel Visual:** Implementação de gráficos de linha interativos para exibir de forma intuitiva a evolução histórica dos preços dos combustíveis cadastrados.
* **Tailwind CSS:** Estilização responsiva, limpa e padronizada.

### **Back-End: Go (Golang)**
* **Go:** Escolhido por sua altíssima performance, baixo consumo de recursos e tipagem estática que previne erros em tempo de execução.
* **REST API:** Construção de endpoints focados para receber os cadastros e retornar o histórico de preços filtrado por produto/fornecedor.

### **Banco de Dados: PostgreSQL & Docker**
* **Docker & Docker Compose:** Todo o ambiente do banco de dados foi conteinerizado para garantir que o projeto rode com exatidão em qualquer máquina, sem a necessidade de instalar o PostgreSQL localmente no sistema operacional.
* **PostgreSQL:** Banco de dados relacional robusto e ideal para manter a integridade dos dados históricos dos combustíveis e fornecedores.

---

## 📁 3. Estrutura do Projeto

```text
├── Back-End
│   ├── cmd/main.go               # Ponto de entrada da aplicação Go
│   ├── Controller/               # Lógica de controle e rotas da API
│   ├── Model/                    # Estruturas de dados (Produtos, Registros)
│   ├── dataBase/db.go            # Conexão com o PostgreSQL
│   └── docker-compose.yml        # Configuração do banco no Docker
├── Front-End
│   └── painel-de-combustivel/    # Aplicação Next.js/React do Painel Visual
└── README.md
---

---

## 📌 4. Pré-requisitos para Execução

Antes de começar, certifique-se de ter as seguintes ferramentas instaladas em sua máquina:

* **Git** → [Download](https://git-scm.com/)
* **Go** `(v1.20 ou superior)` → [Download](https://go.dev/)
* **Node.js** `(v18 ou superior)` → [Download](https://nodejs.org/)
* **Docker & Docker Compose** → [Download](https://www.docker.com/)

---

## 🚀 5. Como Executar o Projeto

Siga os passos abaixo no seu terminal para configurar e rodar a aplicação localmente:

### **Passo 1: Clonar o Repositório**
```bash
# Clone o projeto
git clone [https://github.com/seu-usuario/seu-repositorio.git](https://github.com/seu-usuario/seu-repositorio.git)

# Acesse a pasta raiz do projeto
cd seu-repositorio

🌟 6. Diferenciais Implementados
🐳 Dockerização Total do Banco: Facilidade no setup do projeto (Zero Configuration local para o banco).

💾 Camada de Persistência Isolada: Utilização de volumes Docker para garantir que os seus dados não sejam perdidos ao desligar ou reiniciar o computador.

📈 Inteligência de Negócios: Transformação de dados brutos do PostgreSQL em inteligência visual por meio de gráficos dinâmicos de fácil leitura.
