"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Produto, RegistroPreco } from '@/types';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const CORES_FORNECEDOR: Record<string, string> = {
  "Posto SheLL": "#3b82f6",
  "Posto Ipiranga ": "#f59e0b",
  "Posto Grall": "#8b5cf6",
  "Posto Vermelho": "#ef4444",
};

const CORES = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899", "#06b6d4"];

export default function Dashboard() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [registros, setRegistros] = useState<RegistroPreco[]>([]);
  const [produtoSelecionado, setProdutoSelecionado] = useState<number | "">("");

  useEffect(() => {
    const buscarDados = async () => {
      try {
        const [dadosProdutos, dadosRegistros] = await Promise.all([
          fetch("http://127.0.0.1:3001/api/v1/produtos", { cache: 'no-store' }).then(res => res.json()).catch(() => []),
          fetch("http://127.0.0.1:3001/api/v1/registro_precos", { cache: 'no-store' }).then(res => res.json()).catch(() => [])
        ]);

        if (Array.isArray(dadosProdutos)) {
          setProdutos(dadosProdutos);
          if (dadosProdutos.length > 0) setProdutoSelecionado(dadosProdutos[0].id);
        }

        if (Array.isArray(dadosRegistros)) {
          setRegistros(dadosRegistros);
        } else {
          setRegistros([]);
        }
      } catch (err) {
        console.error("Erro ao carregar dados:", err);
        setProdutos([]);
        setRegistros([]);
      }
    };
    buscarDados();
  }, []);

  const registrosFiltrados = registros.filter(
    (reg) => reg && reg.produto_id === Number(produtoSelecionado)
  );

  const fornecedores = [...new Set(registrosFiltrados.map((r) => r.fornecedor_nome))];

  const datas = [...new Set(
    registrosFiltrados.map((r) =>
      new Date(r.data).toLocaleDateString('pt-BR', { timeZone: 'UTC' })
    )
  )].sort((a, b) => {
    const d1 = new Date(a.split('/').reverse().join('-')).getTime();
    const d2 = new Date(b.split('/').reverse().join('-')).getTime();
    return d1 - d2;
  });

  const dadosGrafico = datas.map((data) => {
    const ponto: any = { data };
    fornecedores.forEach((fornecedor) => {
      const reg = registrosFiltrados.find(
        (r) =>
          new Date(r.data).toLocaleDateString('pt-BR', { timeZone: 'UTC' }) === data &&
          r.fornecedor_nome === fornecedor
      );
      ponto[fornecedor] = reg ? Number(reg.preco) : null;
    });
    return ponto;
  });

  const precoAtualPorFornecedor = fornecedores.map((fornecedor, index) => {
    const regs = registrosFiltrados
      .filter((r) => r.fornecedor_nome === fornecedor)
      .sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime());
    return { fornecedor, preco: Number(regs[0]?.preco ?? 0), cor: CORES[index % CORES.length] };
  });

  const maisBarato = precoAtualPorFornecedor.length > 0
    ? precoAtualPorFornecedor.reduce((a, b) => a.preco < b.preco ? a : b)
    : null;

  const maisCaro = precoAtualPorFornecedor.length > 0
    ? precoAtualPorFornecedor.reduce((a, b) => a.preco > b.preco ? a : b)
    : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="p-8"
    >
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">
            <span className="text-4xl font-bold bg-linear-to-r from-white via-blue-700 to-white bg-clip-text text-transparent animate-gradient-text">
              Dashboard de Preços
            </span>
          </h1>
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
              <option key={prod.id} value={prod.id}>{prod.nome}</option>
            ))}
          </select>
        </div>

        {maisBarato && maisCaro && (
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-zinc-900/50 border border-green-700 rounded-xl p-5 flex flex-col gap-1">
              <span className="text-xs font-bold text-green-400 uppercase tracking-wider">✅ Mais Barato</span>
              <p className="text-white font-bold text-lg">{maisBarato.fornecedor}</p>
              <p className="text-green-400 font-extrabold text-2xl">R$ {maisBarato.preco.toFixed(2)}</p>
            </div>
            <div className="bg-zinc-900/50 border border-red-700 rounded-xl p-5 flex flex-col gap-1">
              <span className="text-xs font-bold text-red-400 uppercase tracking-wider">🔴 Mais Caro</span>
              <p className="text-white font-bold text-lg">{maisCaro.fornecedor}</p>
              <p className="text-red-400 font-extrabold text-2xl">R$ {maisCaro.preco.toFixed(2)}</p>
            </div>
          </div>
        )}

        <div className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Variação de Preço ao Longo do Tempo</h2>
          {dadosGrafico.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dadosGrafico}>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                <XAxis dataKey="data" stroke="#71717a" />
                <YAxis stroke="#71717a" />
                <Tooltip
                  contentStyle={{ background: "#18181b", borderColor: "#27272a", borderRadius: "8px" }}
                  labelStyle={{ color: "#a1a1aa" }}
                  formatter={(value: any) => [`R$ ${Number(value).toFixed(2)}`, ""]}
                />
                <Legend wrapperStyle={{ color: "#a1a1aa", paddingTop: "16px" }} />
                {fornecedores.map((fornecedor, index) => (
                  <Line
                    key={fornecedor}
                    type="monotone"
                    dataKey={fornecedor}
                    stroke={CORES_FORNECEDOR[fornecedor] || CORES[index % CORES.length]}
                    strokeWidth={2}
                    connectNulls={true}
                    dot={false}
                    activeDot={{ r: 6 }}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-48 flex items-center justify-center text-zinc-500">
              Nenhum histórico de preço encontrado para este produto.
            </div>
          )}
        </div>

        <div className="overflow-x-auto no-scrollbar rounded-xl border border-zinc-800 bg-zinc-900/50">
          <div className="p-6 border-b border-zinc-800 bg-zinc-900">
            <h2 className="text-lg font-semibold text-white">Preços Atuais por Fornecedor</h2>
          </div>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-zinc-800 bg-zinc-950/50">
                <th className="p-4 font-semibold text-zinc-400">Fornecedor</th>
                <th className="p-4 font-semibold text-zinc-400">Preço</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">

              {precoAtualPorFornecedor
                .sort((a, b) => a.preco - b.preco)
                .map((item) => (
                  <tr key={item.fornecedor} className="hover:bg-zinc-800/30 transition-colors">
                    <td className="p-4 font-medium flex items-center gap-2">
                      <span className="inline-block w-3 h-3 rounded-full" style={{ background: item.cor }} />
                      <span className="text-white">{item.fornecedor}</span>
                      {item.fornecedor === maisBarato?.fornecedor && (
                        <span className="text-xs bg-green-900/50 text-green-400 px-2 py-0.5 rounded-full">mais barato</span>
                      )}
                      {item.fornecedor === maisCaro?.fornecedor && precoAtualPorFornecedor.length > 1 && (
                        <span className="text-xs bg-red-900/50 text-red-400 px-2 py-0.5 rounded-full">mais caro</span>
                      )}
                    </td>
                    <td className="p-4 text-blue-400 font-semibold">
                      R$ {item.preco.toFixed(2)}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}