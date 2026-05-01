package main

import (
	"log"

	"github.com/gofiber/fiber/v3"
	"github.com/seu-usuario/nome-do-projeto/Controller"
	database "github.com/seu-usuario/nome-do-projeto/dataBase"
)

func main() {
	app := fiber.New()

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
