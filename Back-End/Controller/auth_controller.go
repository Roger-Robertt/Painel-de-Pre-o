package controller

import (
	model "painel-de-preco/back-end/model"
	"github.com/gofiber/fiber/v3"
	"gorm.io/gorm"
)

// 1. Criar a estrutura do Controller (igual aos outros)
type AuthController struct {
	DB *gorm.DB
}

func NewAuthController(DB *gorm.DB) *AuthController {
	return &AuthController{
		DB: DB,
	}
}

// No arquivo controller/auth_controller.go

func (ac *AuthController) Register(ctx fiber.Ctx) error {
	var data map[string]string

	// 1. Pega os dados enviados pelo formulário (nome, email, senha)
	if err := ctx.Bind().JSON(&data); err != nil {
		return ctx.Status(400).JSON(fiber.Map{
			"error": "Erro ao processar dados",
		})
	}

	// 2. Cria o objeto do usuário com o que veio do Front
	usuario := model.Usuario{
		Nome:  data["nome"],
		Email: data["email"],
		Senha: data["senha"],
	}

	// 3. Salva no banco de dados Postgres usando o GORM
	result := ac.DB.Create(&usuario)
	if result.Error != nil {
		return ctx.Status(500).JSON(fiber.Map{
			"error": "Erro ao criar usuário. Talvez o e-mail já exista.",
		})
	}

	return ctx.Status(201).JSON(fiber.Map{
		"message": "Usuário criado com sucesso!",
	})
}

// 2. Criar o método de Login usando essa estrutura
func (ac *AuthController) Login(ctx fiber.Ctx) error {
	var data map[string]string

	if err := ctx.Bind().JSON(&data); err != nil {
		return ctx.Status(400).JSON(fiber.Map{
			"error": "Erro ao ler os dados",
		})
	}

	var usuario model.Usuario
	// 3. Usa o ac.DB (que vem do GORM) igual você faz nos outros arquivos
	result := ac.DB.Where("email = ?", data["email"]).First(&usuario)

	if result.Error != nil {
		return ctx.Status(404).JSON(fiber.Map{
			"error": "Usuário não encontrado",
		})
	}

	// 4. Verificação da Senha (ajuste se no model for 'Senha' ou 'Password')
	if usuario.Senha != data["senha"] {
		return ctx.Status(401).JSON(fiber.Map{
			"error": "Senha incorreta",
		})
	}

	return ctx.Status(200).JSON(fiber.Map{
		"message": "Login realizado com sucesso!",
		"nome":    usuario.Nome,
	})
}
