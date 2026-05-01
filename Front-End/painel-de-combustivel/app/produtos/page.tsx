'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface Produto {
    id: number;
    nome: string;
}

export default function CadastroProduto() {
    const [nome, setNome] = useState('');
    const [produtos, setProdutos] = useState<Produto[]>([]);
    const [status, setStatus] = useState<{ type: 'success' | 'error' | ''; message: string }>({
        type: '',
        message: '',
    });

    const carregarProdutos = () => {
        fetch('http://127.0.0.1:3001/produtos')
            .then((res) => res.json())
            .then((data) => setProdutos(data))
            .catch(() => console.error('Erro ao carregar produtos'));
    };

    useEffect(() => {
        carregarProdutos();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch('http://127.0.0.1:3001/produtos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nome }),
            });

            if (response.ok) {
                setStatus({ type: 'success', message: 'Produto cadastrado com sucesso!' });
                setNome('');
                carregarProdutos();

            } else {
                setStatus({ type: 'error', message: 'Erro ao cadastrar o produto.' });
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
                <h1 className="text-3xl font-bold mb-6">Cadastro de Produtos</h1>

                {status.message && (
                    <div className={`p-4 mb-4 rounded ${status.type === 'success' ? 'bg-green-600' : 'bg-red-600'}`}>
                        {status.message}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-8">
                    <div className="flex flex-col gap-1">
                        <label className="text-sm text-zinc-400">Nome do Combustível</label>
                        <input
                            type="text"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            className="p-2.5 rounded bg-zinc-800 border border-zinc-700 outline-none focus:border-blue-500"
                            placeholder="Ex: Gasolina Aditivada"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="p-3 bg-green-600 hover:bg-green-700 rounded font-bold transition-colors duration-200"
                    >
                        Cadastrar Produto
                    </button>
                </form>

                <h2 className="text-xl font-bold mb-4 text-zinc-300">Produtos Cadastrados</h2>
                <ul className="divide-y divide-zinc-800 bg-zinc-800/50 rounded-lg p-4">
                    {produtos.length === 0 ? (
                        <p className="text-zinc-500 text-sm">Nenhum produto cadastrado ainda.</p>
                    ) : (
                        produtos.map((p) => (
                            <li key={p.id} className="py-2 flex justify-between text-zinc-300">
                                <span>{p.nome}</span>
                                <span className="text-zinc-600">ID: {p.id}</span>
                            </li>
                        ))
                    )}
                </ul>
            </div>
        </motion.div>
    );
}