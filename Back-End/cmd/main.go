package main

import (
	"log"

	controller "painel-de-preco/back-end/controller"
	database "painel-de-preco/back-end/database"

	"github.com/gofiber/fiber/v3"
	"github.com/gofiber/fiber/v3/middleware/cors"
)

func main() {
	app := fiber.New()

	app.Use(cors.New())

	database.ConectarBanco()

	ProdutoController := controller.NewProdutoController(database.DB)

	FornecedorController := controller.NewFornecedorController(database.DB)

	RegistrosController := controller.NewRegistroPrecoController(database.DB)

	// Rotas para Produtos, Fornecedores e Registros de Preço (GET)
	app.Get("/produtos", ProdutoController.GetAllProdutos)

	app.Get("/fornecedores", FornecedorController.GetAllFornecedores)

	app.Get("/registro_precos", RegistrosController.GetAllRegistrosPreco)

	// POST para criar um novo produto
	app.Post("/produtos", ProdutoController.CreateProduto)

	app.Post("/fornecedores", FornecedorController.CreateFornecedor)

	app.Post("/registro_precos", RegistrosController.CreateRegistroPreco)

	log.Fatal(app.Listen(":3001"))
}
