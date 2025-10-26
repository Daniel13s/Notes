'use client'
import { useContext, useState } from "react"
import { userContext } from "../context/userProvider"
import { useRouter } from "next/navigation"
import { v4 } from "uuid"

export default function PopUp () {
    const [noteName, setNoteName] = useState('')
    const [note, setNote] = useState('')

    const router = useRouter()
    const {emailContext, setPopUp} = useContext(userContext)!
    async function handdleNote() {
        await fetch("/api/create-post", {
            method: "POST",
            body: JSON.stringify({
                email: emailContext,
                note: {
                    id: v4(),
                    name: noteName,
                    note: note
                }
            })
        })
        setPopUp(false)
        router.refresh()
    }
    return (
        <div className="w-70 flex flex-col bg-blue-500 p-5 rounded-2xl gap-2 shadow-black shadow-xs absolute">
            <button onClick={() => setPopUp(false)}>Voltar</button>
            <input className="bg-white p-2 rounded-4xl" type="text" placeholder="Note title" onChange={e => setNoteName(e.target.value)}/>
            <input className="bg-white p-2 rounded-4xl" type="text" placeholder="Note" onChange={e => setNote(e.target.value)}/>
            <button onClick={handdleNote}>Criar tarefa</button>
        </div>
    )
}