'use client'
import React, { useState } from 'react'
import "@/app/globals.css"
import Navbar from '../components/Navbar'
import { useAppDispatch } from '../hooks'
import { addTodoAsync } from '../../features/counter/counterSlice'
import { MdOutlineAddCircle } from "react-icons/md";
import { TiTick } from "react-icons/ti";

export interface Todo {
  id: string;
  text: string;
  isCompleted: boolean;
}

const Add = () => {

    const dispatch = useAppDispatch()
    const [onetodo, setOnetodo] = useState("")
    const [showMessage, setShowMessage] = useState(false)
    const handleAdd = () => {
        if (onetodo.trim() === "") {
            alert("Please fill the input field")
        }
        else {
            dispatch(addTodoAsync(onetodo))
            setOnetodo("")
            setShowMessage(true)
            setTimeout(() => setShowMessage(false), 2000)
        }
    }

    const handleEnter = (key:string) => {
        if(key === "Enter") {
            handleAdd()
        }
    }

    return (
        <div className={`bg-normal h-screen w-screen`}>
            <Navbar />
            <div className={` flex items-center justify-center gap-5 my-[15%] flex-col `}>
                <input className={`px-4 py-2 border-6 rounded-lg border-slate-900 text-2xl`} onKeyDown={(e) => handleEnter(e.key)} placeholder='Enter a todo...' type="text" value={onetodo} onChange={(e) => {
                    setOnetodo(e.target.value);
                    } }/>
                <button className={`border-4 px-4 py-2 rounded-2xl hover:bg-[#f55656] transition duration-500 hover:border-slate-800 text-xl flex items-center justify-center gap-5 hover:text-slate-900`} onClick={handleAdd}>Add <MdOutlineAddCircle /></button>
                {showMessage 
                    ? <div className={`text-lg flex gap-2 items-center justify-center`}>
                        <TiTick className={`text-green-500 text-xl`} />
                        <div className={``}>Your Todo has been added!</div>
                    </div>
                    : null
                }
            </div>
        </div>
    )
}

export default Add

