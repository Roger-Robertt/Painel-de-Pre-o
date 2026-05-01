package model

type Produto struct {
	ID   int    `json:"id"`
	Nome string `json:"nome"`
}

type Produtos []Produto
