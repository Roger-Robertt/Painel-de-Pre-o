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

	api := app.Group("/api/v1")

	database.ConectarBanco()

	ProdutoController := controller.NewProdutoController(database.DB)

	FornecedorController := controller.NewFornecedorController(database.DB)

	RegistrosController := controller.NewRegistroPrecoController(database.DB)

	AuthController := controller.NewAuthController(database.DB)

	// Rotas para Produtos, Fornecedores e Registros de Preço (GET)
	api.Get("/produtos", ProdutoController.GetAllProdutos)

	api.Get("/fornecedores", FornecedorController.GetAllFornecedores)

	api.Get("/registro_precos", RegistrosController.GetAllRegistrosPreco)

	// POST para criar um novo produto
	api.Post("/produtos", ProdutoController.CreateProduto)

	api.Post("/fornecedores", FornecedorController.CreateFornecedor)

	api.Post("/registro_precos", RegistrosController.CreateRegistroPreco)

	api.Post("/login", AuthController.Login)

	api.Post("/register", AuthController.Register)

	log.Fatal(app.Listen(":3001"))
}