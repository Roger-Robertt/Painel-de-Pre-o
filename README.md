
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

## 🛠 2. Arquitetura e Decisões Técnicas

Para garantir uma aplicação escalável e de alta performance, optei por uma arquitetura Full-Stack moderna:

### **🚀 Back-End: Go (Fiber)**
*   **Performance:** Escolhido pela altíssima eficiência e baixo consumo de recursos.
*   **GORM (ORM):** Utilizado para mapeamento relacional e segurança em transações SQL.
*   **Relacionamentos Inteligentes:** Implementação de `Preload` para entregar objetos complexos ao Front-end (ex: vincular nomes de produtos aos registros de preços).
*   **Lógica de Atualização (PUT):** Implementação de Handlers específicos para correção de dados, garantindo a integridade dos registros históricos.

### **💻 Front-End: Next.js 14 (App Router)**
*   **Route Groups `(dashboard)`:** Organização avançada de rotas para compartilhamento de layouts e separação lógica de módulos.
*   **Gerenciamento de Estado e Cache:** Uso estratégico de `cache: 'no-store'` para garantir sincronização em tempo real entre as edições no banco e os gráficos.
*   **Visualização de Dados:** Integração com **Recharts** para transformar dados brutos em gráficos de linha interativos.

### **🗄️ Infraestrutura: PostgreSQL & Docker**
*   **Conteinerização:** Setup do banco de dados via Docker Compose para garantir que o ambiente seja idêntico em qualquer máquina (Zero Configuration local).
*   **Persistência de Dados:** Configuração de volumes para segurança das informações históricas.

---

## 📁 3. Estrutura do Repositório

```bash
├── Back-End
│   ├── cmd/main.go              # Ponto de entrada e definição de rotas
│   ├── Controller/              # Handlers (Lógica de CRUD e Preload)
│   ├── Model/                   # Estruturas de dados (GORM)
│   ├── dataBase/                # Configuração de conexão PostgreSQL
│   └── docker-compose.yml       # Orquestração do banco de dados
├── Front-End
│   └── painel-de-combustivel
│       ├── app/(dashboard)      # Layouts e páginas (Dashboard e Lançamentos)
│       └── components/          # Componentes de UI responsivos
└── README.md
```

---

## 🚀 4. Como Executar o Projeto

### **Passo 1: Banco de Dados**
Dentro da pasta `Back-End`, execute:
```Ubuntu(WSL)
docker-compose up -d
```

### **passo 2: Banco de Dados**
Dentro da pasta `Back-End` verifica o arquivo Docker-compose.yml:
```
version: '3.8'
services:
  db:
    image: postgres:15-alpine
    container_name: postgres_container
    environment:
      POSTGRES_USER: usuario_exemplo
      POSTGRES_PASSWORD: senha_secreta
      POSTGRES_DB: meu_banco
    ports:
      - "5432:5432"
    volumes:
      - db_data:/var/lib/postgresql/data

volumes:
  db_data:
 ``` 
### **Passo 3: Banco de Dados**
Se você alterou o docker-compose.yml, reinicie o contêiner para aplicar as novas configurações:
Dentro da pasta `Back-End` execute:
```Ubuntu(WSL)
  docker-compose down
  docker-compose up -d --build
```

### **Passo 4: Banco de Dados**
Dentro da pasta `Back-End` execute:
```Ubuntu(WSL)
go run cmd/main.go
```

### **Passo 5: Banco de Dados**
Dentro da pasta `Banc-End` observação:
```Ubuntu(WSL)
Tudo q for execultar, atualizar, instalar, sempre executa o terminal do Ubuntu(WSL).
```
### **Passo 6: Front-End**
```bash
npm install
npm run dev
```

---

## 🌟 5. Diferenciais Implementados

*   ✅ **CRUD Híbrido:** Formulário inteligente que alterna entre Criação e Edição (POST/PUT).
*   ✅ **Preload de Associações:** O backend entrega o nome real do combustível, eliminando processamento desnecessário no cliente.
*   ✅ **UX Reativa:** Feedback visual de sucesso/erro e scroll automático para correções.
*   ✅ **Dashboard Real-Time:** Atualização instantânea dos gráficos ao salvar novas informações.

---

### 6. 🔒 Segurança (Bônus)
*   ✅ **Sistema de Autenticação:** Embora não fosse um requisito obrigatório, implementei um fluxo de login para demonstrar conhecimentos em proteção de rotas e gestão de identidade de usuários.


