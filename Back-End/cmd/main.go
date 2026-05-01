package main

import (
	"log"

	database "painel-de-preco/back-end/dataBase"

	"painel-de-preco/back-end/Controller"

	"github.com/gofiber/fiber/v3"
	"github.com/gofiber/fiber/v3/middleware/cors"
)

func main() {
	app := fiber.New()

	app.Use(cors.New())

	database.ConectarBanco()

	ProdutoController := Controller.NewProdutoController()

	FornecedorController := Controller.NewFornecedorController()

	RegistrosController := Controller.NewRegistroPrecoController()

	// Rotas para Produtos, Fornecedores e Registros de Preço (GET)
	app.Get("/produtos", ProdutoController.GetAllProdutos)

	app.Get("/fornecedores", FornecedorController.GetAllFornecedores)

	app.Get("/registros-preco", RegistrosController.GetAllRegistrosPreco)

	// POST para criar um novo produto
	app.Post("/produtos", ProdutoController.CreateProduto)

	app.Post("/fornecedores", FornecedorController.CreateFornecedor)

	app.Post("/registros-preco", RegistrosController.CreateRegistroPreco)

	log.Fatal(app.Listen(":3001"))
}
