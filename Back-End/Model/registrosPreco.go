package model

import "time"

type RegistroPreco struct {
	ID           int       `json:"id"`
	ProdutoID    int       `json:"produto_id"`
	Produto      Produto   `gorm:"foreignKey:ProdutoID" json:"produto"`
	FornecedorID string    `json:"fornecedor_id"`
	Preco        float64   `json:"preco"`
	Data         time.Time `json:"data"`
}

type RegistrosPreco []RegistroPreco
