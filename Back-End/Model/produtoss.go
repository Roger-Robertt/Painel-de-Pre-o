package model

type Produto struct {
    ID   uint   `gorm:"primaryKey" json:"id"`
    Nome string `gorm:"not null" json:"nome"` // Ex: Diesel S10, Gasolina Comum
}

type Produtos []Produto
