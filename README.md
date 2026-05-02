# 📊 Painel de Preços de Combustíveis

---

## 1. Contexto do Projeto

Este projeto foi desenvolvido como uma solução para o desafio técnico de substituição de processos manuais (planilhas) em uma distribuidora de combustíveis. O objetivo principal é permitir o registro diário da variação de preços de combustíveis praticados por diferentes fornecedores e polos de abastecimento, exibindo esse histórico em um painel visual dinâmico que facilita a análise de tendências.

---

## 2. Arquitetura e Decisões Técnicas

Para garantir uma aplicação escalável, de alta performance e fácil de manter, optei por uma arquitetura moderna dividindo as responsabilidades de forma clara:

### **Front-End: Next.js (React) & Tailwind CSS**
* **Next.js:** Utilizado para fornecer uma estrutura robusta de roteamento e renderização rápida.
* **Painel Visual:** Implementação de gráficos de linha interativos para exibir de forma intuitiva a evolução histórica dos preços dos combustíveis cadastrados.
* **Tailwind CSS:** Para uma estilização responsiva, limpa e padronizada.

### **Back-End: Go (Golang)**
* **Go:** Escolhido por sua altíssima performance, baixo consumo de recursos e tipagem estática que previne erros em tempo de execução.
* **REST API:** Construção de endpoints focados para receber os cadastros e retornar o histórico de preços filtrado por produto/fornecedor.

### **Banco de Dados: PostgreSQL & Docker**
* **Docker & Docker Compose:** Todo o ambiente do banco de dados foi conteinerizado para garantir que o projeto rode com exatidão em qualquer máquina, sem a necessidade de instalar o PostgreSQL localmente no sistema operacional.
* **PostgreSQL:** Banco de dados relacional robusto e ideal para manter a integridade dos dados históricos dos combustíveis e fornecedores.

---

## 3. Estrutura do Projeto

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
