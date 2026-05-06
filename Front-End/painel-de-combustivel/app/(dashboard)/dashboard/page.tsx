"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface Produto {
  id: number;
  nome: string;
}

export interface Fornecedor {
  id: number;
  nome: string;
  cnpj: string;
}

interface RegistroPreco {
  id: number;
  produto_id: number;
  fornecedor_nome: string;
  preco: number;
  data: string;

  fornecedor?: Fornecedor;
}

export default function Dashboard() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [registros, setRegistros] = useState<RegistroPreco[]>([]);
  const [produtoSelecionado, setProdutoSelecionado] = useState<number | "">("");

  useEffect(() => {

    Promise.all([
      fetch("http://127.0.0.1:3001/api/v1/produtos", { cache: 'no-store' }).then(res => res.json()).catch(() => []),
      fetch("http://127.0.0.1:3001/api/v1/registro_precos", { cache: 'no-store' }).then(res => res.json()).catch(() => [])
    ])
      .then(([dadosProdutos, dadosRegistros]) => {

        if (Array.isArray(dadosProdutos)) {
          setProdutos(dadosProdutos);
          if (dadosProdutos.length > 0) {
            setProdutoSelecionado(dadosProdutos[0].id);
          }
        }

        if (Array.isArray(dadosRegistros)) {
          setRegistros(dadosRegistros);
        } else {
          setRegistros([]);
        }
      })
      .catch((err) => {
        console.error("Erro ao carregar dados:", err);
        setProdutos([]);
        setRegistros([]);
      });
  }, []);

  const dadosGrafico = Array.isArray(registros)
    ? registros
      .filter((reg) => reg && reg.produto_id === Number(produtoSelecionado))
      .map((reg) => ({
        data: reg.data ? reg.data.split('-').reverse().join('/') : "",
        preco: Number(reg.preco) || 0,
      }))
      .sort((a, b) => {
        const dateA = new Date(a.data.split('/').reverse().join('-')).getTime();
        const dateB = new Date(b.data.split('/').reverse().join('-')).getTime();
        return dateA - dateB;
      })
    : [];

  return (

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="p-8"
    >
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2"><span className="text-4xl font-bold bg-linear-to-r from-white via-blue-700 to-white bg-clip-text text-transparent animate-gradient-text">Dashboard de Preços</span></h1>
          <p className="text-zinc-400">Consulta a variação de preços e históricos.</p>
        </div>

        <div className="w-full max-w-xs flex flex-col gap-2">
          <label className="text-sm font-medium text-zinc-300">Selecionar Produto</label>
          <select
            value={produtoSelecionado}
            onChange={(e) => setProdutoSelecionado(Number(e.target.value))}
            className="bg-zinc-900 border border-zinc-800 text-white rounded-lg p-3 outline-none focus:border-blue-500 transition-colors"
          >
            {produtos.map((prod) => (
              <option key={prod.id} value={prod.id}>
                {prod.nome}
              </option>
            ))}
          </select>
        </div>

        <div className="w-full h-87.5 bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Variação de Preço ao Longo do Tempo</h2>
          {dadosGrafico.length > 0 ? (

            <div className="grid grid-cols-1 gap-8">
              <ResponsiveContainer width="100%" height={295}>

                <LineChart data={dadosGrafico}>
                  key={registros.length + (registros[0]?.preco || 0)}

                  <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                  <XAxis dataKey="data" stroke="#71717a" />
                  <YAxis stroke="#71717a" domain={[0, 10]} />
                  <Tooltip
                    contentStyle={{ background: "#18181b", borderColor: "#27272a", borderRadius: "8px" }}
                    labelStyle={{ color: "#a1a1aa" }}
                  />
                  <Line
                    type="monotone"
                    dataKey="preco"
                    stroke="#3b82f6"
                    strokeWidth={3}
                    dot={{ r: 6 }}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>

              </ResponsiveContainer>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-zinc-500">
              Nenhum histórico de preço encontrado para este produto.
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 gap-8">
          <div className="overflow-x-auto no-scrollbar rounded-xl border border-zinc-800 bg-zinc-900/50">
            <div className="p-6 border-b border-zinc-800 bg-zinc-900">
              <h2 className="text-lg font-semibold text-white">Preços Atuais por Fornecedor</h2>
            </div>
            <table className="w-full text-left border-collapse min-w-150 md:min-w-full">

              <thead>
                <tr className="border-b border-zinc-800 bg-zinc-950/50">
                  <th className="p-4 font-semibold text-zinc-400">Fornecedor</th>
                  <th className="p-4 font-semibold text-zinc-400">Preço</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-zinc-800">
                {registros
                  .filter((reg) => reg.produto_id === Number(produtoSelecionado))
                  .map((reg) => (
                    <tr key={reg.id} className="hover:bg-zinc-800/30 transition-colors">
                      <td className="p-4 text-white font-medium">

                        {reg.fornecedor_nome ? `Fornecedor ${reg.fornecedor_nome}` : "Fornecedor Padrão"}
                      </td>
                      <td className="p-4 text-blue-400 font-semibold">
                        R$ {reg.preco.toFixed(2)}
                      </td>
                    </tr>
                  ))}
              </tbody>

            </table>

          </div>
        </div>
      </div>
    </motion.div>
  );
}