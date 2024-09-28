// app/page.js
'use client'

import { useState } from 'react';
import { signIn } from '../public/utils/firebase'; 
import { useAuth } from '../contexts/AuthContext'; 
import { useRouter } from 'next/navigation'; 

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { user, loading } = useAuth(); 
  const router = useRouter(); 

  const handleLogin = async (event) => {
    event.preventDefault();
    setError('');

    try {
      await signIn(email, password);
      router.push('/home'); 
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      setError('Erro ao fazer login. Verifique suas credenciais.');
      router.push('/home');

    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Verificando autenticação...</div>;
  }

  if (user) {
    return null; 
    
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h1 className="text-4xl font-semibold mb-6 text-center text-gray-800">Login</h1>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="E-mail"
            className="border border-gray-300 p-2 mb-4 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Senha"
            className="border border-gray-300 p-2 mb-4 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-600 transition" type="submit">
            Entrar
          </button>
        </form>
        <p className="text-center mt-4">Não tem uma conta? <a href="/register" className="text-blue-500 hover:underline">Registre-se</a></p>
      </div>
    </div>
  );
  
}
