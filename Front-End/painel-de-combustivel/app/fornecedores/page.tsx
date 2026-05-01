'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Produto {
    id: number;
    nome: string;
}

export default function CadastroPreco() {
    const [produtos, setProdutos] = useState<Produto[]>([]);
    const [produtoId, setProdutoId] = useState('');
    const [fornecedor, setFornecedor] = useState('');
    const [preco, setPreco] = useState('');
    const [data, setData] = useState('');
    const [status, setStatus] = useState<{ type: 'success' | 'error' | ''; message: string }>({
        type: '',
        message: '',
    });

    useEffect(() => {
        fetch('http://127.0.0.1:3001/produtos')
            .then((res) => res.json())
            .then((data) => setProdutos(data))
            .catch(() => console.error('Erro ao carregar produtos'));
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const novoRegistro = {
            produto_id: Number(produtoId),
            fornecedor: String(fornecedor),
            preco: parseFloat(preco),
            data: data ? new Date(data).toISOString() : new Date().toISOString(),
        };

        console.log("Enviando para o Go:", novoRegistro);

        try {
            const response = await fetch('http://127.0.0.1:3001/registros-preco', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(novoRegistro),
            });

            if (response.ok) {
                setStatus({ type: 'success', message: 'Preço cadastrado com sucesso!' });
                setFornecedor('');
                setPreco('');
                setData('');
                setProdutoId('');
            } else {
                const errorData = await response.json();
                console.error("Erro da API:", errorData);
                setStatus({ type: 'error', message: 'Erro ao cadastrar o preço no banco.' });
            }
        } catch (error) {
            setStatus({ type: 'error', message: 'Erro de conexão com o servidor.' });
        }
    };

    return (

        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 2 }}
            className="p-8"
        >

            <div className="p-8 max-w-lg mx-auto bg-zinc-900 text-white rounded-lg shadow-md mt-10">
                <h1 className="text-2xl font-bold mb-6">Cadastro de Preço</h1>

                {status.message && (
                    <div className={`p-4 mb-4 rounded ${status.type === 'success' ? 'bg-green-600' : 'bg-red-600'}`}>
                        {status.message}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                    <div className="flex flex-col gap-1">
                        <label className="text-sm text-zinc-400">Selecione o Produto</label>
                        <select
                            value={produtoId}
                            onChange={(e) => setProdutoId(e.target.value)}
                            className="p-2.5 rounded bg-zinc-800 border border-zinc-700 text-white outline-none focus:border-blue-500"
                            required
                        >
                            <option value="">Escolha um combustível</option>
                            {produtos.map((p) => (
                                <option key={p.id} value={p.id}>
                                    {p.nome}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-sm text-zinc-400">Fornecedor / Posto</label>
                        <input
                            type="text"
                            value={fornecedor}
                            onChange={(e) => setFornecedor(e.target.value)}
                            className="p-2.5 rounded bg-zinc-800 border border-zinc-700 outline-none focus:border-blue-500"
                            placeholder="Ex: Posto Ipiranga"
                            required
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-sm text-zinc-400">Preço por Litro (R$)</label>
                        <input
                            type="number"
                            step="0.01"
                            value={preco}
                            onChange={(e) => setPreco(e.target.value)}
                            className="p-2.5 rounded bg-zinc-800 border border-zinc-700 outline-none focus:border-blue-500"
                            placeholder="Ex: 5.49"
                            required
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-sm text-zinc-400">Data do Registro</label>
                        <input
                            type="date"
                            value={data}
                            onChange={(e) => setData(e.target.value)}
                            className="p-2.5 rounded bg-zinc-800 border border-zinc-700 outline-none focus:border-blue-500"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="mt-4 p-3 bg-blue-600 hover:bg-blue-700 rounded font-bold transition-colors duration-200"
                    >
                        Salvar Preço
                    </button>
                </form>
            </div>
        </motion.div>
    );
}