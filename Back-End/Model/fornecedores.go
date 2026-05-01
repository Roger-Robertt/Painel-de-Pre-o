package model

type Fornecedor struct {
	ID   int    `json:"id"`
	Nome string `json:"nome"`
	Cnpj string `json:"cnpj"`
}

type Fornecedores []Fornecedor
