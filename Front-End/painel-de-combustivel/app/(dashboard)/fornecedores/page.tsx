"use client"

import { motion } from "framer-motion";
import { useState } from "react";

const formatarCNPJ = (cnpj: string) => {
    const numeros = cnpj.replace(/\D/g, '');
    return numeros.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5');
};

export default function CadastroFornecedor() {
    const [nome, setNome] = useState("");
    const [cnpj, setCnpj] = useState("");
    const [status, setStatus] = useState<{ type: "success" | "error" | ""; message: string }>({
        type: "",
        message: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const novoFornecedor = {
            nome: nome,
            cnpj: cnpj,
            status: "ativo",
        };

        try {
            const response = await fetch("http://127.0.0.1:3001/api/v1/fornecedores", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(novoFornecedor),
            });

            if (response.ok) {
                setStatus({
                    type: "success",
                    message: "Fornecedor cadastrado com sucesso!",
                });

                setNome("");
                setCnpj("");

                setTimeout(() => {
                    setStatus({ type: "", message: "" });
                }, 3000);

            } else {
                setStatus({
                    type: "error",
                    message: "Erro ao cadastrar fornecedor.",
                });
            }

        } catch (error) {
            setStatus({
                type: "error",
                message: "Erro ao conectar com o servidor.",
            });
        }
    };

    return (

        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
        >

            {status.message && (
                <div className={`p-4 mb-4 rounded ${status.type === 'success' ? 'bg-green-600' : 'bg-red-600'}`}>
                    {status.message}
                </div>
            )}

            <div className="p-8 min-h-screen flex flex-col items-center justify-center">
                <div className="bg-zinc-900 p-8 rounded">
                    <h1 className="text-4xl font-extrabold mb-6">Cadastro de Fornecedor</h1>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4 min-w-md">
                        <input
                            className="p-2 bg-zinc-800 border border-zinc-700 rounded"
                            placeholder="Razão Social ou Nome Fantasia (Ex: Auto Posto Shell)"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            required
                        />
                        <input
                            className="p-2 bg-zinc-800 border border-zinc-700 rounded"
                            placeholder="00.000.000/0000-00 (Ex: 12.345.678/0001-90)"
                            value={cnpj}
                            onChange={(e) => setCnpj(formatarCNPJ(e.target.value))}
                            maxLength={18}
                            required

                        />
                        <button
                            type="submit"
                            className="bg-blue-600 p-2 rounded hover:bg-blue-700 transition"
                        >
                            Salvar Fornecedor
                        </button>
                    </form>
                </div>
            </div>
        </motion.div>
    )

}