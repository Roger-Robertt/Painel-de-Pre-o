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

func (fc *FornecedorController) GetFornecedorByID(ctx fiber.Ctx) error {
    id := ctx.Params("id")

    var fornecedor model.Fornecedor
    if err := fc.DB.First(&fornecedor, id).Error; err != nil {
        return ctx.Status(404).JSON(fiber.Map{"error": "Fornecedor não encontrado"})
    }

    return ctx.JSON(fornecedor)
}

func (fc *FornecedorController) CreateFornecedor(ctx fiber.Ctx) error {
	var fornecedor model.Fornecedor

	if err := ctx.Bind().JSON(&fornecedor); err != nil {
		return ctx.Status(400).JSON(fiber.Map{
			"error": "Erro ao parsear o corpo da requisição",
		})
	}

	 var existing model.Fornecedor
	 
    if err := fc.DB.Where("cnpj = ?", fornecedor.CNPJ).First(&existing).Error; err == nil {
        return ctx.Status(409).JSON(fiber.Map{"error": "CNPJ já cadastrado"})
    
    }

	result := fc.DB.Create(&fornecedor)

	if result.Error != nil {
		return ctx.Status(500).JSON(fiber.Map{
			"error": "Erro ao criar fornecedor no Banco de Dados",
		})
	}

	return ctx.Status(201).JSON(fornecedor)
}

func (fc *FornecedorController) UpdateFornecedor(ctx fiber.Ctx) error {
    id := ctx.Params("id")

    var fornecedor model.Fornecedor
    if err := fc.DB.First(&fornecedor, id).Error; err != nil {
        return ctx.Status(404).JSON(fiber.Map{"error": "Fornecedor não encontrado"})
    }

    var body model.Fornecedor
    if err := ctx.Bind().Body(&body); err != nil {
        return ctx.Status(400).JSON(fiber.Map{"error": "Dados inválidos"})
    }

    fornecedor.Nome = body.Nome
    fornecedor.CNPJ = body.CNPJ

    if err := fc.DB.Save(&fornecedor).Error; err != nil {
        return ctx.Status(500).JSON(fiber.Map{"error": "Erro ao atualizar"})
    }

    return ctx.JSON(fornecedor)
}

func (fc *FornecedorController) DeleteFornecedor(ctx fiber.Ctx) error {
    id := ctx.Params("id")

    var fornecedor model.Fornecedor
    if err := fc.DB.First(&fornecedor, id).Error; err != nil {
        return ctx.Status(404).JSON(fiber.Map{"error": "Fornecedor não encontrado"})
    }

    fc.DB.Exec("DELETE FROM registro_precos WHERE fornecedor_nome = ?", fornecedor.Nome)

    fc.DB.Exec("DELETE FROM fornecedores WHERE id = ?", id)

    return ctx.JSON(fiber.Map{"message": "Fornecedor e histórico deletados com sucesso"})
}
