package controller

import (
	"github.com/gofiber/fiber/v3"
	model "painel-de-preco/back-end/model"
	"gorm.io/gorm"
)

type PrecoController struct {
	DB *gorm.DB
}

func NewPrecoController(DB *gorm.DB) *PrecoController {
	return &PrecoController{
		DB: DB,
	}
}

func (pc *PrecoController) GetRegistroPrecoByID(ctx fiber.Ctx) error {
	id := ctx.Params("id")

	var registro model.RegistroPreco

	if err := pc.DB.First(&registro, id).Error; err != nil {
		return ctx.Status(404).JSON(fiber.Map{
			"error": "Registro de preço não encontrado",
		})
	}
	return ctx.Status(200).JSON(registro)
}	

func (pc *PrecoController) UpdatePreco(ctx fiber.Ctx) error {
	id := ctx.Params("id")
	var registro model.RegistroPreco

	if err := pc.DB.First(&registro, id).Error; err != nil {
		return ctx.Status(404).JSON(fiber.Map{
			"error": "Registro de preço não encontrado",
		})
	}

	if err := ctx.Bind().JSON(&registro); err != nil {
		return ctx.Status(400).JSON(fiber.Map{
			"error": "Dados inválidos",
		})
	}

	if err := pc.DB.Save(&registro).Error; err != nil {
		return ctx.Status(500).JSON(fiber.Map{
			"error": "Erro ao atualizar registro de preço no banco",
		})
	}

	return ctx.Status(200).JSON(registro)
}

