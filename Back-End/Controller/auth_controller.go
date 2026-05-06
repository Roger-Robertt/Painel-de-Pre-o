package controller

import (
	model "painel-de-preco/back-end/model"
	"github.com/gofiber/fiber/v3"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

type AuthController struct {
	DB *gorm.DB
}

func NewAuthController(DB *gorm.DB) *AuthController {
	return &AuthController{
		DB: DB,
	}
}
func (ac *AuthController) Register(ctx fiber.Ctx) error {
	var data map[string]string

	if err := ctx.Bind().JSON(&data); err != nil {
		return ctx.Status(400).JSON(fiber.Map{
			"error": "Erro ao processar dados",
		})
	}

	usuario := model.Usuario{
		Nome:  data["nome"],
		Email: data["email"],
		Senha: data["senha"],
	}

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(usuario.Senha), bcrypt.DefaultCost)
	if err != nil {
		return ctx.Status(500).JSON(fiber.Map{
			"error": "Erro ao criptografar a senha",
		})
	}
	usuario.Senha = string(hashedPassword)

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

func (ac *AuthController) Login(ctx fiber.Ctx) error {
	var data map[string]string

	if err := ctx.Bind().JSON(&data); err != nil {
		return ctx.Status(400).JSON(fiber.Map{
			"error": "Erro ao ler os dados",
		})
	}

	var usuario model.Usuario

	result := ac.DB.Where("email = ?", data["email"]).First(&usuario)

	if result.Error != nil {
		return ctx.Status(404).JSON(fiber.Map{
			"error": "Usuário não encontrado",
		})
	}

	err := bcrypt.CompareHashAndPassword([]byte(usuario.Senha), []byte(data["senha"]))
	if err != nil {
		return ctx.Status(401).JSON(fiber.Map{
			"error": "Senha incorreta",
		})
	}

	return ctx.Status(200).JSON(fiber.Map{
		"message": "Login realizado com sucesso!",
		"nome":    usuario.Nome,
	})
}
