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

	PrecoController := controller.NewPrecoController(database.DB)

	AuthController := controller.NewAuthController(database.DB)



	api.Get("/produtos", ProdutoController.GetAllProdutos)

	api.Get("/fornecedores", FornecedorController.GetAllFornecedores)

	api.Get("/registro_precos", RegistrosController.GetAllRegistrosPreco)

	api.Get("/precos/:id", PrecoController.GetRegistroPrecoByID)

	api.Get("/fornecedores/:id", FornecedorController.GetFornecedorByID)



	api.Post("/produtos", ProdutoController.CreateProduto)

	api.Post("/fornecedores", FornecedorController.CreateFornecedor)

	api.Post("/registro_precos", RegistrosController.CreateRegistroPreco)

	api.Post("/login", AuthController.Login)

	api.Post("/register", AuthController.Register)

	

	api.Put("/precos/:id", PrecoController.UpdatePreco)

	api.Put("/fornecedores/:id", FornecedorController.UpdateFornecedor)


	api.Delete("/fornecedores/:id", FornecedorController.DeleteFornecedor)

	log.Fatal(app.Listen(":3001"))
}
