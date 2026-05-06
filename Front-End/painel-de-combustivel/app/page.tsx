'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const router = useRouter()

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault()

        const response = await fetch('http://localhost:3001/api/v1/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, senha })
        })

        if (response.ok) {
            router.push('/dashboard')
        } else {
            alert('Usuário ou senha incorretos!')
        }
    }

    return (
        <div className="flex h-screen items-center justify-center bg-black">
            <form onSubmit={handleLogin} className="p-8 bg-zinc-900 border border-zinc-800 rounded-lg w-96">
                <h1 className="text-white text-2xl font-bold mb-6 text-center">PetroTrend</h1>
                <input
                    type="email"
                    placeholder="Email"
                    className="w-full p-2 mb-4 bg-zinc-800 text-white rounded outline-none focus:ring-2 focus:ring-blue-500"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Senha"
                    className="w-full p-2 mb-6 bg-zinc-800 text-white rounded outline-none focus:ring-2 focus:ring-blue-500"
                    onChange={(e) => setSenha(e.target.value)}
                />
                <button className="w-full bg-blue-600 text-white p-2 rounded font-bold hover:bg-blue-700 transition">
                    Entrar
                </button>

                <p className="text-zinc-500 text-sm mt-4 text-center">
                    Não tem uma conta? <a href="/register" className="text-blue-500 hover:underline">Cadastre-se</a>
                </p>

            </form>
        </div>
    )
}
