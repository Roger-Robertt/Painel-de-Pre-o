package database

import (
	model "painel-de-preco/back-end/Model"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func ConectarBanco() {

	dsn := "host=127.0.0.1 user=postgres password=1234 dbname=Produtos port=5433 sslmode=disable"
	database, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})

	if err != nil {
		panic("Falha ao conectar no banco de dados!")
	}

	database.AutoMigrate(&model.Produto{}, &model.RegistroPreco{})

	DB = database

}
