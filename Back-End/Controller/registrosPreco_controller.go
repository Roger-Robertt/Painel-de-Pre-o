package controller

import (
	model "painel-de-preco/back-end/model"

	"gorm.io/gorm"

	"github.com/gofiber/fiber/v3"
)

type RegistroPrecoController struct {
	DB *gorm.DB
}

func NewRegistroPrecoController(DB *gorm.DB) *RegistroPrecoController {
	return &RegistroPrecoController{
		DB: DB,
	}
}

// GET /registros-preco
func (rpc *RegistroPrecoController) GetAllRegistrosPreco(ctx fiber.Ctx) error {

	var registros []model.RegistroPreco

	result := rpc.DB.Find(&registros)

	if result.Error != nil {
		return ctx.Status(500).JSON(fiber.Map{
			"error": "Erro ao buscar registros de preço no Banco de Dados",
		})
	}

	if err := rpc.DB.Preload("Fornecedor").Preload("Produto").Find(&registros).Error; err != nil {
		return ctx.Status(500).JSON(fiber.Map{"error": "Erro ao buscar registros"})
	}

	return ctx.JSON(registros)
}

// POST /registros-preco
func (rpc *RegistroPrecoController) CreateRegistroPreco(ctx fiber.Ctx) error {
	var registro model.RegistroPreco

	if err := ctx.Bind().JSON(&registro); err != nil {
		return ctx.Status(400).JSON(fiber.Map{
			"error": "Erro ao parsear o corpo da requisição",
		})
	}

	result := rpc.DB.Create(&registro)

	if result.Error != nil {
		return ctx.Status(500).JSON(fiber.Map{
			"error": "Erro ao criar registro de preço no Banco de Dados",
		})
	}

	return ctx.Status(201).JSON(registro)
}
