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
    const [fornecedorName, setFornecedorName] = useState('');
    const [listarFornecedores, setListarFornecedores] = useState<{ id: number; nome: string }[]>([]);
    const [preco, setPreco] = useState('');
    const [data, setData] = useState('');
    const [registros, setRegistros] = useState<{ id: number; fornecedor_nome: string; preco: number; produto_id: number; data: string, produto?: { id: number, nome: string } }[]>([]); // Estado para armazenar os registros de preços
    const [editandoId, setEditandoId] = useState<string | null>(null);
    const [status, setStatus] = useState<{ type: 'success' | 'error' | ''; message: string }>({
        type: '',
        message: '',
    });

    useEffect(() => {
        fetch('http://127.0.0.1:3001/api/v1/produtos', { cache: 'no-store' })
            .then((res) => res.json())
            .then((data) => setProdutos(data))
            .catch(() => console.error('Erro ao carregar produtos'));
    }, []);

    useEffect(() => {
        fetch('http://127.0.0.1:3001/api/v1/fornecedores', { cache: 'no-store' })
            .then((res) => res.json())
            .then((data) => setListarFornecedores(data))
            .catch(() => console.error('Erro ao carregar fornecedores'));
    }, []);

    useEffect(() => {
        fetch('http://127.0.0.1:3001/api/v1/registro_precos', { cache: 'no-store' })
            .then((res) => res.json())
            .then((data) => setRegistros(data))
            .catch(() => console.error('Erro ao carregar registros de preços'));
    }, []);
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const novoRegistro = {
            fornecedor_nome: fornecedorName,
            preco: parseFloat(preco) || 0,
            produto_id: parseInt(produtoId) || 0,
            data: data ? data : new Date().toLocaleDateString('en-CA')
        };

        console.log("Enviando para o Go:", novoRegistro);

        const url = editandoId
            ? `http://127.0.0.1:3001/api/v1/precos/${editandoId}`
            : 'http://127.0.0.1:3001/api/v1/registro_precos';

        const method = editandoId ? 'PUT' : 'POST';

        try {
            const response = await fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(novoRegistro),
            });

            if (response.ok) {
                setStatus({
                    type: 'success',
                    message: editandoId ? 'Preço atualizado com sucesso!' : 'Preço cadastrado com sucesso!'
                });

                setEditandoId(null);
                setFornecedorName('');
                setPreco('');
                setData('');
                setProdutoId('');
            } else {
                setStatus({ type: 'error', message: 'Erro ao processar a requisição.' });
            }
        } catch (error) {
            setStatus({ type: 'error', message: 'Erro de conexão com o servidor.' });
        }
    };
    const iniciarEdicao = (registro: any) => {
        setEditandoId(registro.id.toString());
        setFornecedorName(registro.fornecedor_nome);
        setPreco(registro.preco.toString());
        setData(registro.data);
        setProdutoId(registro.produto_id.toString());
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
                        <select
                            value={fornecedorName}
                            onChange={(e) => setFornecedorName(e.target.value)}
                            className="p-2.5 rounded bg-zinc-800 border border-zinc-700 outline-none focus:border-blue-500"
                            required
                        >
                            <option value="">Escolha um fornecedor</option>
                            {listarFornecedores.map((f) => (
                                <option key={f.id} value={f.nome}>
                                    {f.nome}
                                </option>
                            ))}
                        </select>
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

            <div className="mt-10 max-w-lg mx-auto">
                <h2 className="text-xl font-bold mb-4 text-zinc-400">Histórico de Lançamentos</h2>
                <div className="space-y-2">
                    {registros.map((reg) => (
                        <div key={reg.id} className="p-4 bg-zinc-800 rounded border border-zinc-700 flex justify-between items-center">
                            <span className="text-xs font-bold text-blue-500 uppercase">
                                {reg.produto?.nome || "Combustível"}
                            </span>

                            <div>
                                <p className="font-bold">{reg.fornecedor_nome}</p>
                                <p className="text-sm text-zinc-500">R$ {reg.preco} - {reg.data}</p>
                            </div>

                            <button
                                onClick={() => iniciarEdicao(reg)}
                                className="text-blue-500 hover:underline text-sm"
                            >
                                Corrigir
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}