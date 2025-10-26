"use client";

import { useContext, useState } from "react";
import { userContext } from "../context/userProvider";
import Link from "next/link";
import { BiArrowBack, BiCheck } from "react-icons/bi";
import { FaSpinner } from "react-icons/fa";

export default function EditNote() {
  const { clickNote } = useContext(userContext)!;

  const [title, setTitle] = useState(clickNote.name);
  const [description, setDescription] = useState(clickNote.description);
  const [loading, setLoading] = useState(false)

  async function toggleNote() {
    setLoading(true)
    await fetch("/api/update-post", {
      method: "POST",
      body: JSON.stringify({
        note: { id: clickNote.id, name: title, note: description }
      }),
    });
    setLoading(false)
  }
  return (
    <div className="h-screen flex flex-col justify-center items-center gap-5">
        <Link href="/home"><BiArrowBack size={40} color="white" /></Link>
      <section className="flex flex-col">
        <input
          className="w-[80vw] text-2xl font-bold text-center bg-white rounded-t-2xl"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          className="w-[80vw] h-50 bg-white rounded-b-2xl"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </section>
      {loading ? <FaSpinner className="animate-spin" size={30} color="white" /> : <button onClick={toggleNote}><BiCheck size={50} color="white" /></button>}
    </div>
  );
}
