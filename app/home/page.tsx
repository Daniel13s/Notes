"use client";
import { useContext, useEffect, useState } from "react";
import { userContext } from "../context/userProvider";
import PopUp from "../popUp/PopUp";
import Link from "next/link";
import { BiExit, BiPlus } from "react-icons/bi";
import { FaTrash } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { FaSpinner } from "react-icons/fa6";

export default function Home() {
  const [notes, setNotes] = useState([]);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false)

  const router = useRouter()
  const { emailContext, setEmailContext, popUp, setPopUp, setClickNote } =
    useContext(userContext)!;

    async function deleteNote(idCLick: string) {
      await fetch("/api/delete-post", {
        method: "POST",
        body: JSON.stringify({
          id: idCLick,
          email: emailContext
        })
      })
      window.location.reload()
    }

    useEffect(() => {
      function getEmail() {
        const getEmailUpdate = localStorage.getItem("email")!;
        const emailPer = getEmailUpdate ? JSON.parse(getEmailUpdate) : "";
        console.log(emailPer)
        setEmailContext(emailPer)
      }
      getEmail();
    }, []);

    
    useEffect(() => {
    async function toggleNotes() {
      setLoading(true)
      const note = await fetch("/api/get-posts", {
        method: "POST",
        body: JSON.stringify({
          email: emailContext,
        }),
      }).then((res) => res.json());
      setNotes(note.posts);
      setName(note.name);
      setLoading(false)
    }
    toggleNotes();
  }, [emailContext]);
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <Link href="/"><BiExit size={40}/></Link>
      <h1 className="text-3xl font-bold">Bem vindo, {name}!</h1>
      <section className="h-130 grid grid-cols-3 max-[600px]:grid-cols-2 max-[400px]:grid-cols-1 gap-2 overflow-auto">
        {loading ? <FaSpinner className="animate-spin" size={50} color="white" /> : notes.map((note: any) => (
          <div
            className="w-50 h-50 bg-blue-50 rounded-2xl flex flex-col items-center justify-around"
            key={note.id}
          >
            <div className="text-center" onClick={() => {
              setClickNote({
                id: note.id,
                name: note.name,
                description: note.note,
              })
              router.replace("/edit-note")
              }}>
              <h1 className="text-xl font-bold">{note.name}</h1>
              <p>{note.note}</p>
            </div>
            <FaTrash className="" onClick={() => deleteNote(note.id)}/>
          </div>
        ))}
        <button
          onClick={() => setPopUp(popUp ? false : true)}
          className="w-50 h-50 bg-blue-50 rounded-2xl flex justify-center items-center"
        >
          <BiPlus size={50} />
        </button>
      </section>
      {popUp ? <PopUp /> : null}
    </div>
  );
}
