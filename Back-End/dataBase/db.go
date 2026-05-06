package database

import (
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"painel-de-preco/back-end/model"
)

var DB *gorm.DB

func ConectarBanco() {

	dsn := "host=127.0.0.1 user=postgres password=1234 dbname=Produtos port=5433 sslmode=disable"
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})

	if err != nil {
		panic("Falha ao conectar no banco de dados!")
	}

	// db.AutoMigrate().DropTable(&model.Usuario{})

	db.AutoMigrate(&model.Produto{}, &model.Fornecedor{}, &model.RegistroPreco{}, &model.Usuario{})

	DB = db

}
