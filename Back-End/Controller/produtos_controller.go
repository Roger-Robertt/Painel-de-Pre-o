package controller

import (
	model "painel-de-preco/back-end/model"

	"github.com/gofiber/fiber/v3"
	"gorm.io/gorm"
)

type ProdutoController struct {
	DB *gorm.DB
}

func NewProdutoController(DB *gorm.DB) *ProdutoController {
	return &ProdutoController{
		DB: DB,
	}
}

func (pc *ProdutoController) GetAllProdutos(ctx fiber.Ctx) error {

	var produtos []model.Produto

	result := pc.DB.Find(&produtos)

	if result.Error != nil {
		return ctx.Status(500).JSON(fiber.Map{
			"error": "Erro ao buscar produtos no Banco de Dados",
		})
	}

	return ctx.JSON(produtos)
}
func (pc *ProdutoController) CreateProduto(ctx fiber.Ctx) error {
	var produto model.Produto

	if err := ctx.Bind().JSON(&produto); err != nil {
		return ctx.Status(400).JSON(fiber.Map{
			"error": "Erro ao parsear o corpo da requisição",
		})
	}

	result := pc.DB.Create(&produto)

	if result.Error != nil {
		return ctx.Status(500).JSON(fiber.Map{
			"error": "Erro ao criar produto no Banco de Dados",
		})
	}

	return ctx.Status(201).JSON(produto)
}
