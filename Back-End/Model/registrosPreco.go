package model

import "time"

type RegistroPreco struct {
	ID         int        `json:"id"`
	ProdutoID  int        `json:"produto_id"`
	Produto    Produto    `gorm:"foreignKey:ProdutoID" json:"produto"`
	Fornecedor Fornecedor `gorm:"foreignKey:FornecedorID" json:"fornecedor"`
	Preco      float64    `json:"preco"`
	Data       time.Time  `json:"data"`
}

type RegistrosPreco []RegistroPreco
