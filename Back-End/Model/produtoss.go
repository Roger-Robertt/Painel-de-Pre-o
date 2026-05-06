package model

type Produto struct {
    ID   uint   `gorm:"primaryKey" json:"id"`
    Nome string `gorm:"not null" json:"nome"`
}

type Produtos []Produto
