'use client'
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Register() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const router = useRouter()

    const handdleCreateUser = async () => {
        await fetch("/api/create-user", {
            method: "POST", 
            body: JSON.stringify({
                name,
                email,
                password,
            })
        })
        router.back()
    }

  return (
    <div className="h-screen flex flex-col justify-center items-center gap-2">
      <h1 className="text-4xl font-bold">Register</h1>
      <section className="flex flex-col">
        <label htmlFor="input">Nome:</label>
        <input
          className="bg-white p-3 rounded-4xl w-[80vw]"
          type="text"
          placeholder="Digite seu Nome"
          onChange={(e) => setName(e.target.value)}
        />
      </section>
      <section className="flex flex-col">
        <label htmlFor="input">Email:</label>
        <input
          className="bg-white p-3 rounded-4xl w-[80vw]"
          type="email"
          placeholder="Digite seu Email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </section>
      <section className="flex flex-col">
        <label htmlFor="input">Senha:</label>
        <input
          className="bg-white p-3 rounded-4xl w-[80vw]"
          type="password"
          placeholder="Digite sua senha"
          onChange={(e) => setPassword(e.target.value)}
        />
      </section>

      <button className="py-3 px-15 rounded-4xl bg-blue-500" onClick={handdleCreateUser}>Register</button>
      <p>
        Caso possua uma conta, clique{" "}
        <Link className="text-blue-700 font-bold" href="/">
          aqui
        </Link>
      </p>
    </div>
  );
}
