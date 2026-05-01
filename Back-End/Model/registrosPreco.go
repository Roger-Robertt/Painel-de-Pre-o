package model

import "time"

type RegistroPreco struct {
	ID           int       `json:"id"`
	Produto      Produto   `gorm:"foreignKey:ProdutoID" json:"produto"`
	FornecedorID int       `json:"fornecedor_id"`
	Preco        float64   `json:"preco"`
	Data         time.Time `json:"data"`
}

type RegistrosPreco []RegistroPreco
