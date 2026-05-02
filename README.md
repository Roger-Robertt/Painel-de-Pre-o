Painel de Preços de Combustíveis
1. Contexto do Projeto
Este projeto foi desenvolvido como uma solução para o desafio técnico de substituição de processos manuais (planilhas) em uma distribuidora de combustíveis. O objetivo principal é permitir o registro diário da variação de preços de combustíveis praticados por diferentes fornecedores e polos de abastecimento, exibindo esse histórico em um painel visual dinâmico que facilita a análise de tendências.

2. Arquitetura e Decisões Técnicas
Para garantir uma aplicação escalável, de alta performance e fácil de manter, optei por uma arquitetura moderna dividindo as responsabilidades de forma clara:

Front-End: Next.js (React) & Tailwind CSS
Next.js: Utilizado para fornecer uma estrutura robusta de roteamento e renderização rápida.

Painel Visual: Implementação de gráficos de linha interativos para exibir de forma intuitiva a evolução histórica dos preços dos combustíveis cadastrados.

Tailwind CSS: Para uma estilização responsiva, limpa e padronizada.

Back-End: Go (Golang)
Go: Escolhido por sua altíssima performance, baixo consumo de recursos e tipagem estática que previne erros em tempo de execução.

REST API: Construção de endpoints focados para receber os cadastros e retornar o histórico de preços filtrado por produto/fornecedor.

Banco de Dados: PostgreSQL & Docker
Docker & Docker Compose: Todo o ambiente do banco de dados foi conteinerizado para garantir que o projeto rode com exatidão em qualquer máquina, sem a necessidade de instalar o PostgreSQL localmente no sistema operacional.

PostgreSQL: Banco de dados relacional robusto e ideal para manter a integridade dos dados históricos dos combustíveis e fornecedores.

3. Estrutura do Projeto
Plaintext
├── Back-End
│   ├── cmd/main.go               # Ponto de entrada da aplicação Go
│   ├── Controller/               # Lógica de controle e rotas da API
│   ├── Model/                    # Estruturas de dados (Produtos, Registros)
│   ├── dataBase/db.go            # Conexão com o PostgreSQL
│   └── docker-compose.yml        # Configuração do banco no Docker
├── Front-End
│   └── painel-de-combustivel/    # Aplicação Next.js/React do Painel Visual
└── README.md
4. Pré-requisitos para Execução
Antes de começar, certifique-se de ter instalado em sua máquina:

Git

Go (versão 1.20 ou superior)

Node.js (versão 18 ou superior)

Docker & Docker Compose

5. Como Executar o Projeto
Passo 1: Clonar o Repositório
Bash
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio
Passo 2: Configurar e rodar o Banco de Dados (Docker)
Navegue até a pasta do Back-End e inicialize o container do banco de dados:

Bash
cd Back-End
docker compose up -d
O PostgreSQL estará disponível em localhost:5433.

Passo 3: Rodar o Back-End (Go)
Ainda na pasta Back-End, inicialize o servidor da API:

Bash
go run main.go
O servidor Back-End será iniciado com sucesso e conectará automaticamente ao banco de dados.

Passo 4: Rodar o Front-End (Next.js)
Abra um novo terminal na raiz do projeto, acesse a pasta do Front-End e rode o servidor de desenvolvimento:

Bash
cd Front-End/painel-de-combustivel
npm install
npm run dev
Abra http://localhost:3000 no seu navegador para visualizar o painel visual e cadastrar novos preços.

6. Diferenciais Implementados
Dockerização Total do Banco: Facilidade no setup do projeto (Zero Configuration local para o banco).

Camada de persistência isolada: Utilização de volumes Docker para garantir que os dados não sejam perdidos ao reiniciar o computador.

Gráficos Dinâmicos: Transformação de dados brutos do PostgreSQL em inteligência de negócios visual.
