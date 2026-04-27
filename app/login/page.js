"use client";

import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault(); // evita recargar la página
    console.log("Login:", { email, password });
    // después acá vamos a llamar a tu API real
  }

  return (
    <section className="w-full min-h-[calc(100vh-7rem)] flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-xl border border-zinc-700/40 bg-[#111318] p-6 shadow-xl">
        <h1 className="text-2xl font-bold text-[#b6c4ff]">Iniciar sesión</h1>
        <p className="mt-1 text-sm text-zinc-400">
          Ingresá tus datos para continuar
        </p>

        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
          <div>
            <label className="mb-1 block text-sm text-zinc-300">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              className="w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-white outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm text-zinc-300">Contraseña</label>
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="******"
              className="w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-white outline-none focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            className="mt-2 rounded-md bg-blue-600 py-2 font-semibold text-white transition hover:bg-blue-500"
          >
            Entrar
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-zinc-400">
          ¿No tenés cuenta?{" "}
          <Link href="/register" className="font-semibold text-[#b6c4ff] hover:underline">
            Crear cuenta
          </Link>
        </p>
      </div>
    </section>
  );
}