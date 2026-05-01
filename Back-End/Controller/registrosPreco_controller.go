package Controller

import (
	model "painel-de-preco/back-end/Model"
	database "painel-de-preco/back-end/dataBase"

	"github.com/gofiber/fiber/v3"
)

type RegistroPrecoController struct {
}

func NewRegistroPrecoController() *RegistroPrecoController {
	return &RegistroPrecoController{}
}

// GET /registros-preco
func (rpc *RegistroPrecoController) GetAllRegistrosPreco(ctx fiber.Ctx) error {

	var registros []model.RegistroPreco

	result := database.DB.Find(&registros)

	if result.Error != nil {
		return ctx.Status(500).JSON(fiber.Map{
			"error": "Erro ao buscar registros de preço no Banco de Dados",
		})
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

	result := database.DB.Create(&registro)

	if result.Error != nil {
		return ctx.Status(500).JSON(fiber.Map{
			"error": "Erro ao criar registro de preço no Banco de Dados",
		})
	}

	return ctx.Status(201).JSON(registro)
}
