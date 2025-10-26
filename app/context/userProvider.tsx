'use client'

import { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState } from "react";

interface INote {
    id: string,
    name: string,
    description: string
}
interface UserI {
    name: string,
    emailContext: string,
    popUp: boolean,
    clickNote: INote,
    setName: Dispatch<SetStateAction<string>>,
    setEmailContext: Dispatch<SetStateAction<string>>,
    setPopUp: Dispatch<SetStateAction<boolean>>,
    setClickNote: Dispatch<SetStateAction<INote>>
}

export const userContext = createContext<UserI | undefined>(undefined)

export default function UserProvider({children} : {children: ReactNode}) {
    const [name, setName] = useState("")
    const [emailContext, setEmailContext] = useState("")
    const [popUp, setPopUp] = useState(false)
    const [clickNote, setClickNote] = useState<INote>({
        id: "",
        name: "",
        description: ""
    })
    
    useEffect(() => {
        localStorage.setItem("email", JSON.stringify(emailContext))
        JSON.parse(localStorage.getItem("email") || "")
    }, [emailContext])

    return (
        <userContext.Provider value={{name, setName, emailContext, setEmailContext, popUp, setPopUp, clickNote, setClickNote}}>{children}</userContext.Provider>
    )
}