package model

// import "time"

type RegistroPreco struct {
    ID           uint       `gorm:"primaryKey" json:"id"`
    Preco        float64    `gorm:"not null" json:"preco"` 
    Data string `gorm:"not null" json:"data"`  
    ProdutoID    uint       `json:"produto_id"`
    // Produto      Produto    `gorm:"foreignKey:ProdutoID"`
    FornecedorNome string     `json:"fornecedor_nome"`
}

func (RegistroPreco) TableName() string {
    return "registro_precos"
}