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
func (rpc *RegistroPrecoController) GetAllRegistrosPreco(ctx fiber.Ctx) error {

	var registro []model.RegistroPreco

	err := rpc.DB.Preload("Produto").Find(&registro).Error

    if err != nil {
      return ctx.Status(500).JSON(fiber.Map{
        "error": "Erro ao carregar registros com produtos", 
    })
    }
	return ctx.JSON(registro)
}
func (rpc *RegistroPrecoController) CreateRegistroPreco(ctx fiber.Ctx) error {
	var registro model.RegistroPreco

	if err := ctx.Bind().JSON(&registro); err != nil {
		return ctx.Status(500).JSON(fiber.Map{
        "error": err.Error(), 
    })
	}

	result := rpc.DB.Create(&registro)

	if err := rpc.DB.Preload("Produto").Find(&registro).Error; err != nil {
        return ctx.Status(500).JSON(fiber.Map{"error": "Erro ao buscar registros"})
    }

	if result.Error != nil {
		return ctx.Status(500).JSON(fiber.Map{
			"error": result.Error.Error(), 
		})
	}

	return ctx.Status(201).JSON(registro)
}