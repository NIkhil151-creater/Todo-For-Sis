'use client'
import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { useAppDispatch } from '../hooks'
import { addTodoAsync } from '../../features/counter/counterSlice'
import { BiMessageAltAdd } from "react-icons/bi";

export default function AddPage() {
    const dispatch = useAppDispatch()
    const [todoText, setTodoText] = useState("")
    const [message, setMessage] = useState("")
    const [isError, setIsError] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        
        if (!todoText.trim()) {
            setMessage("Please enter a todo")
            setIsError(true)
            return
        }

        try {
            await dispatch(addTodoAsync(todoText.trim())).unwrap()
            setTodoText("")
            setMessage("Todo added successfully!")
            setIsError(false)
            setTimeout(() => setMessage(""), 3000)
        } catch (err) {
            setMessage("Failed to add todo. Is MongoDB running?")
            setIsError(true)
        }
    }

    return (
        <div className="min-h-screen bg-normal">
            <Navbar />
            <div className="flex flex-col items-center justify-center mt-20 text-center">
                <h1 className="text-3xl font-bold mb-8">Add New Todo</h1>
                
                <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-md px-4">
                    <input
                        type="text" value={todoText} onChange={(e) => setTodoText(e.target.value)} placeholder="Enter your todo..." className="p-4 text-xl border-4 border-slate-900 rounded-lg"
                    />
                    
                    <button type="submit" className="max-w-fit p-4 text-2xl font-bold bg-fuchsia-400 rounded-2xl hover:bg-red-200 transition duration-750 flex justify-center items-center gap-3 text-black mx-auto">
                        Add Todo <BiMessageAltAdd />
                    </button>
                </form>

                {message && (
                    <div className={`mt-4 p-4 rounded-lg ${isError ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                        {message}
                    </div>
                )}
            </div>
        </div>
    )
}

