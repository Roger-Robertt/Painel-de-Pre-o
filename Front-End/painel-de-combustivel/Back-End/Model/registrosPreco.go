package model

type RegistroPreco struct {
	ID           int     `json:"id"`
	ProdutoID    int     `json:"produto_id"`
	FornecedorID int     `json:"fornecedor_id"`
	Preco        float64 `json:"preco"`
	Data         string  `json:"data"`
}

type RegistrosPreco []RegistroPreco
