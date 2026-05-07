export interface Produto {
    id: number;
    nome: string;
}

export interface Fornecedor {
    id: number;
    nome: string;
    cnpj?: string;
}

export interface RegistroPreco {
    id: number;
    fornecedor_nome: string;
    preco: number;
    produto_id: number;
    data: string;
    produto?: {
        id: number;
        nome: string;
    };
}
