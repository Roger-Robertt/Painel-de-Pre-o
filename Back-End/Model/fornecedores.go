package model

type Fornecedor struct {
    ID   uint   `gorm:"primaryKey" json:"id"`
    Nome string `gorm:"not null" json:"nome"`
    CNPJ string `gorm:"not null" json:"cnpj"`
}
func (Fornecedor) TableName() string {
    return "fornecedores"
}
