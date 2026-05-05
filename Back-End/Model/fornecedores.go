package model

type Fornecedor struct {
    ID   uint   `gorm:"primaryKey" json:"id"`
    Nome string `gorm:"not null" json:"nome"`
    cnpj string `gorm:"not null" json:"cnpj"` // Novo campo pedido na imagem
}

type Fornecedores []Fornecedor
