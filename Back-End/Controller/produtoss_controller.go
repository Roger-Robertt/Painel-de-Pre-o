package Controller

import (
	model "painel-de-preco/back-end/Model"
	database "painel-de-preco/back-end/dataBase"

	"github.com/gofiber/fiber/v3"
)

type ProdutoController struct {
}

func NewProdutoController() *ProdutoController {
	return &ProdutoController{}
}

// GET /produtos
func (pc *ProdutoController) GetAllProdutos(ctx fiber.Ctx) error {

	var produtos []model.Produto

	result := database.DB.Find(&produtos)

	if result.Error != nil {
		return ctx.Status(500).JSON(fiber.Map{
			"error": "Erro ao buscar produtos no Banco de Dados",
		})
	}

	return ctx.JSON(produtos)
}

// POST /produtos
func (pc *ProdutoController) CreateProduto(ctx fiber.Ctx) error {
	var produto model.Produto

	if err := ctx.Bind().JSON(&produto); err != nil {
		return ctx.Status(400).JSON(fiber.Map{
			"error": "Erro ao parsear o corpo da requisição",
		})
	}

	result := database.DB.Create(&produto)

	if result.Error != nil {
		return ctx.Status(500).JSON(fiber.Map{
			"error": "Erro ao criar produto no Banco de Dados",
		})
	}

	return ctx.Status(201).JSON(produto)
}
