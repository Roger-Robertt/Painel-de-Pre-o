package controller

import (
	model "painel-de-preco/back-end/model"

	"gorm.io/gorm"

	"github.com/gofiber/fiber/v3"
)

type FornecedorController struct {
	DB *gorm.DB
}

func NewFornecedorController(DB *gorm.DB) *FornecedorController {
	return &FornecedorController{
		DB: DB,
	}
}
func (fc *FornecedorController) GetAllFornecedores(ctx fiber.Ctx) error {

	var fornecedores []model.Fornecedor

	result := fc.DB.Find(&fornecedores)

	if result.Error != nil {
		return ctx.Status(500).JSON(fiber.Map{
			"error": "Erro ao buscar fornecedores no Banco de Dados",
		})
	}

	return ctx.JSON(fornecedores)
}
func (fc *FornecedorController) CreateFornecedor(ctx fiber.Ctx) error {
	var fornecedor model.Fornecedor

	if err := ctx.Bind().JSON(&fornecedor); err != nil {
		return ctx.Status(400).JSON(fiber.Map{
			"error": "Erro ao parsear o corpo da requisição",
		})
	}

	result := fc.DB.Create(&fornecedor)

	if result.Error != nil {
		return ctx.Status(500).JSON(fiber.Map{
			"error": "Erro ao criar fornecedor no Banco de Dados",
		})
	}

	return ctx.Status(201).JSON(fornecedor)
}
