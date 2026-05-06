
<img width="1347" height="588" alt="Image" src="https://github.com/user-attachments/assets/a5a3b75e-9a23-42e3-b431-c6ff73f45dae" />

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

 Painel de Preços de Combustíveis (Full-Stack)Solução robusta para monitoramento de variação de preços, integrando Go Fiber, Next.js e PostgreSQL.Este projeto foi desenvolvido para substituir processos manuais de controle de preços por uma plataforma digital automatizada, permitindo uma análise estratégica de tendências de mercado.🚀 1. Diferenciais de Arquitetura e Decisões TécnicasDiferente de um CRUD básico, esta aplicação foi desenhada com foco em performance e experiência do usuário (UX):Back-End (Go & Fiber)Performance: Uso do Go por sua eficiência em concorrência e baixo consumo de memória.GORM (ORM): Implementado para garantir segurança nas transações SQL e facilitar relacionamentos complexos.Relacionamentos: Uso de Preload para entregar dados mastigados ao front-end (ex: trazer o nome do combustível vinculado ao preço).Integridade: Lógica de Updates no banco para garantir que correções de preços não corrompam outros campos do registro.Front-End (Next.js 14 & TypeScript)Route Groups (dashboard): Organização avançada de rotas para compartilhar layouts (como menus e headers) entre a visualização de dados e o cadastro.Modo de Edição Híbrido: O formulário de cadastro detecta automaticamente se o usuário deseja criar ou corrigir um preço, alternando entre métodos POST e PUT.Sincronização em Tempo Real: Implementação de política de cache: 'no-store' nas chamadas de API, garantindo que o gráfico reflita as alterações do banco instantaneamente.Banco de Dados & InfraDockerization: Todo o ambiente PostgreSQL roda em containers, garantindo que o projeto funcione em qualquer máquina com um único comando.Persistência: Volumes Docker configurados para que os dados históricos não sejam perdidos ao reiniciar o ambiente.

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
