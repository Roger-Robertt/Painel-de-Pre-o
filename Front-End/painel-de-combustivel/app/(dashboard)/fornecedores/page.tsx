'use client';

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const formatarCNPJ = (cnpj: string) => {
    const numeros = cnpj.replace(/\D/g, '');
    return numeros.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5');
};

export default function CadastroFornecedor() {
    const [nome, setNome] = useState("");
    const [cnpj, setCnpj] = useState("");
    const [listaFornecedores, setListaFornecedores] = useState<{ id: number; nome: string; cnpj: string }[]>([]);

    const [modoEdicao, setModoEdicao] = useState(false);
    const [editId, setEditId] = useState("");
    const [editNome, setEditNome] = useState("");
    const [editCnpj, setEditCnpj] = useState("");
    const [fornecedorEncontrado, setFornecedorEncontrado] = useState(false);

    const [modoDelete, setModoDelete] = useState(false);
    const [deleteId, setDeleteId] = useState("");
    const [deleteNome, setDeleteNome] = useState("");
    const [deleteFornecedorEncontrado, setDeleteFornecedorEncontrado] = useState(false);

    const [status, setStatus] = useState<{ type: "success" | "error" | ""; message: string }>({ type: "", message: "" });

    const carregarTodos = async () => {
        try {
            const res = await fetch("http://127.0.0.1:3001/api/v1/fornecedores");
            if (res.ok) setListaFornecedores(await res.json());
        } catch { console.error("Erro ao carregar lista"); }
    };

    useEffect(() => { carregarTodos(); }, []);

    const selecionarParaEditar = (id: string) => {
        setEditId(id);
        const f = listaFornecedores.find(f => String(f.id) === id);
        if (f) {
            setEditNome(f.nome);
            setEditCnpj(f.cnpj);
            setFornecedorEncontrado(true);
        }
    };

    const selecionarParaDeletar = (id: string) => {
        setDeleteId(id);
        const f = listaFornecedores.find(f => String(f.id) === id);
        if (f) {
            setDeleteNome(f.nome);
            setDeleteFornecedorEncontrado(true);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const cnpjLimpo = cnpj.replace(/\D/g, '');
        const jaExiste = listaFornecedores.some(f => f.cnpj.replace(/\D/g, '') === cnpjLimpo);
        if (jaExiste) {
            setStatus({ type: "error", message: "Este CNPJ já está cadastrado!" });
            return;
        }
        try {
            const response = await fetch("http://127.0.0.1:3001/api/v1/fornecedores", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ nome, cnpj, status: "ativo" }),
            });
            if (response.ok) {
                setStatus({ type: "success", message: "Fornecedor cadastrado!" });
                setNome(""); setCnpj("");
                carregarTodos();
                setTimeout(() => setStatus({ type: "", message: "" }), 3000);
            }
        } catch { setStatus({ type: "error", message: "Erro de conexão." }); }
    };

    const handleSalvarEdicao = async () => {
        try {
            const res = await fetch(`http://127.0.0.1:3001/api/v1/fornecedores/${editId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ nome: editNome, cnpj: editCnpj }),
            });
            if (res.ok) {
                setModoEdicao(false); setFornecedorEncontrado(false); setEditId("");
                setStatus({ type: "success", message: "Atualizado!" });
                carregarTodos();
                setTimeout(() => setStatus({ type: "", message: "" }), 3000);
            }
        } catch { alert("Erro ao salvar."); }
    };

    const handleDeletar = async () => {
        try {
            const res = await fetch(`http://127.0.0.1:3001/api/v1/fornecedores/${deleteId}`, { method: "DELETE" });
            if (res.ok) {
                setModoDelete(false); setDeleteFornecedorEncontrado(false); setDeleteId("");
                setStatus({ type: "success", message: "Removido!" });
                carregarTodos();
                setTimeout(() => setStatus({ type: "", message: "" }), 3000);
            }
        } catch { alert("Erro ao deletar."); }
    };

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="p-8 min-h-screen bg-black text-white">

            {status.message && (
                <div className={`fixed top-4 right-4 p-4 rounded shadow-lg z-50 ${status.type === 'success' ? 'bg-green-600' : 'bg-red-600'}`}>
                    {status.message}
                </div>
            )}

            <div className="max-w-md mx-auto bg-zinc-900 p-8 rounded-xl border border-zinc-800">
                <h1 className="text-2xl font-bold mb-6 text-blue-500">Novo Fornecedor</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input className="w-full p-3 bg-zinc-800 rounded border border-zinc-700" placeholder="Nome Fantasia" value={nome} onChange={(e) => setNome(e.target.value)} required />
                    <input className="w-full p-3 bg-zinc-800 rounded border border-zinc-700" placeholder="CNPJ" value={cnpj} onChange={(e) => setCnpj(formatarCNPJ(e.target.value))} maxLength={18} required />
                    <button type="submit" className="w-full bg-blue-600 p-3 rounded font-bold hover:bg-blue-700 transition">Salvar Fornecedor</button>
                </form>
                <div className="grid grid-cols-2 gap-4 mt-6">
                    <button onClick={() => { setModoEdicao(true); setFornecedorEncontrado(false); setEditId(""); }} className="bg-zinc-800 p-2 rounded border border-zinc-700 hover:bg-zinc-700">Editar</button>
                    <button onClick={() => { setModoDelete(true); setDeleteFornecedorEncontrado(false); setDeleteId(""); }} className="bg-zinc-800 p-2 rounded border border-zinc-700 hover:bg-red-900/30 text-red-500">Excluir</button>
                </div>
            </div>

            <AnimatePresence>
                {modoEdicao && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                        <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="bg-zinc-900 p-6 rounded-xl border border-zinc-700 w-full max-w-sm">
                            <h2 className="text-xl font-bold mb-4 text-blue-400">Editar Fornecedor</h2>

                            <div className="space-y-4">
                                <select
                                    className="w-full p-3 bg-zinc-800 rounded border border-zinc-700 text-white"
                                    value={editId}
                                    onChange={(e) => selecionarParaEditar(e.target.value)}
                                >
                                    <option value="">Selecione um fornecedor...</option>
                                    {listaFornecedores.map(f => (
                                        <option key={f.id} value={f.id}>{f.nome} — {f.cnpj}</option>
                                    ))}
                                </select>

                                {fornecedorEncontrado && (
                                    <>
                                        <div>
                                            <label className="text-zinc-400 text-xs uppercase mb-1 block">Nome</label>
                                            <input className="w-full p-2 bg-zinc-800 rounded border border-zinc-700" value={editNome} onChange={(e) => setEditNome(e.target.value)} />
                                        </div>
                                        <div>
                                            <label className="text-zinc-400 text-xs uppercase mb-1 block">CNPJ</label>
                                            <input className="w-full p-2 bg-zinc-800 rounded border border-zinc-700" value={editCnpj} onChange={(e) => setEditCnpj(formatarCNPJ(e.target.value))} maxLength={18} />
                                        </div>
                                        <button onClick={handleSalvarEdicao} className="w-full bg-green-600 p-2 rounded hover:bg-green-700 transition">Salvar Alterações</button>
                                    </>
                                )}
                            </div>

                            <button onClick={() => { setModoEdicao(false); setFornecedorEncontrado(false); setEditId(""); }} className="w-full mt-4 text-zinc-500 text-sm">Cancelar</button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {modoDelete && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                        <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="bg-zinc-900 p-6 rounded-xl border border-zinc-700 w-full max-w-sm">
                            <h2 className="text-xl font-bold mb-4 text-red-500">Excluir Fornecedor</h2>

                            <div className="space-y-4">
                                <select
                                    className="w-full p-3 bg-zinc-800 rounded border border-zinc-700 text-white"
                                    value={deleteId}
                                    onChange={(e) => selecionarParaDeletar(e.target.value)}
                                >
                                    <option value="">Selecione um fornecedor...</option>
                                    {listaFornecedores.map(f => (
                                        <option key={f.id} value={f.id}>{f.nome} — {f.cnpj}</option>
                                    ))}
                                </select>

                                {deleteFornecedorEncontrado && (
                                    <>
                                        <div className="bg-zinc-800 border border-red-700 rounded-lg p-4">
                                            <p className="text-zinc-400 text-sm mb-1">Você está prestes a excluir:</p>
                                            <p className="text-white font-bold">{deleteNome}</p>
                                            <p className="text-red-400 text-xs mt-2">⚠ Esta ação não pode ser desfeita.</p>
                                        </div>
                                        <button onClick={handleDeletar} className="w-full bg-red-600 p-2 rounded hover:bg-red-700 transition">Confirmar Exclusão</button>
                                    </>
                                )}
                            </div>

                            <button onClick={() => { setModoDelete(false); setDeleteFornecedorEncontrado(false); setDeleteId(""); }} className="w-full mt-4 text-zinc-500 text-sm">Voltar</button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

        </motion.div>
    );
}