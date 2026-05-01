package Controller

import (
	database "painel-de-preco/back-end/dataBase"

	model "painel-de-preco/back-end/Model"

	"github.com/gofiber/fiber/v3"
)

type FornecedorController struct {
}

func NewFornecedorController() *FornecedorController {
	return &FornecedorController{}
}

// GET /fornecedores
func (fc *FornecedorController) GetAllFornecedores(ctx fiber.Ctx) error {

	var fornecedores []model.Fornecedor

	result := database.DB.Find(&fornecedores)

	if result.Error != nil {
		return ctx.Status(500).JSON(fiber.Map{
			"error": "Erro ao buscar fornecedores no Banco de Dados",
		})
	}

	return ctx.JSON(fornecedores)
}

// POST /fornecedores
func (fc *FornecedorController) CreateFornecedor(ctx fiber.Ctx) error {
	var fornecedor model.Fornecedor

	if err := ctx.Bind().JSON(&fornecedor); err != nil {
		return ctx.Status(400).JSON(fiber.Map{
			"error": "Erro ao parsear o corpo da requisição",
		})
	}

	result := database.DB.Create(&fornecedor)

	if result.Error != nil {
		return ctx.Status(500).JSON(fiber.Map{
			"error": "Erro ao criar fornecedor no Banco de Dados",
		})
	}

	return ctx.Status(201).JSON(fornecedor)
}
