"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { userContext } from "./context/userProvider";
import { FaSpinner } from "react-icons/fa";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false)

  const {setName, setEmailContext} = useContext(userContext)!
  const router = useRouter();

  const handdleLogin = async () => {
    setLoading(true)
    const login = await fetch("/api/get-user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    }).then((res) => res.json());

    if(!login) {
      setLoading(false)
      setError(true)
      return
    }
    setName(login.name!)
    setEmailContext(login.email!)
    setError(false)
    setLoading(false)
    router.replace("/home");
    return
  };

  return (
    <div className="h-svh w-screen flex flex-col justify-center items-center gap-2">
      <h1 className="text-4xl font-bold">Login</h1>
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
      {error ? <p className="text-red-700">Email ou senha incorreta</p> : <p></p>}
      <button
        className="py-3 px-15 rounded-4xl bg-blue-500"
        onClick={handdleLogin}
      >
        {loading ? <FaSpinner className="animate-spin" size={20} /> : <p>Login</p>}
      </button>

      <p>
        Caso não possua uma conta, registre-se{" "}
        <Link className="text-blue-700 font-bold" href="/register">
          aqui
        </Link>
      </p>
    </div>
  );
}
