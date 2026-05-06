"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const router = useRouter()

    async function handleRegister(e: React.FormEvent) {
        e.preventDefault()

        const response = await fetch('http://localhost:3001/api/v1/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nome, email, senha })
        })

        if (response.ok) {
            alert('Conta criada com sucesso! Agora faça o login.')
            router.push('/')
        } else {
            alert('Erro ao criar conta. Verifique os dados.')
        }
    }

    return (
        <div className="flex h-screen items-center justify-center bg-black">
            <form onSubmit={handleRegister} className="p-8 bg-zinc-900 border border-zinc-800 rounded-lg w-96 shadow-2xl">
                <h1 className="text-white text-3xl font-bold mb-8 text-center">Criar <span className="text-blue-500">Conta</span></h1>

                <input
                    type="text"
                    placeholder="Seu Nome"
                    className="w-full p-3 mb-4 bg-zinc-800 text-white rounded border border-zinc-700 outline-none focus:border-blue-500"
                    onChange={(e) => setNome(e.target.value)}
                    required
                />

                <input
                    type="email"
                    placeholder="Email"
                    className="w-full p-3 mb-4 bg-zinc-800 text-white rounded border border-zinc-700 outline-none focus:border-blue-500"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <input
                    type="password"
                    placeholder="Senha"
                    className="w-full p-3 mb-6 bg-zinc-800 text-white rounded border border-zinc-700 outline-none focus:border-blue-500"
                    onChange={(e) => setSenha(e.target.value)}
                    required
                />

                <button className="w-full bg-blue-600 text-white p-3 rounded font-bold hover:bg-blue-700 transition">
                    Cadastrar
                </button>

                <p className="text-zinc-500 text-sm mt-4 text-center">
                    Já tem conta? <a href="/" className="text-blue-500 hover:underline">Faça login</a>
                </p>
            </form>
        </div>
    )
}
