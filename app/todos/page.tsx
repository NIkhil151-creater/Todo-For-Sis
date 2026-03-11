"use client"
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTodos, selectTodos, toggleTodoAsync, removeTodoAsync, editTodoAsync } from '../../features/counter/counterSlice'
import type { RootState } from '../../app/store'
import { FaRegEdit } from "react-icons/fa";
import { FaSave } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import type { AppDispatch } from '../store'
import "@/app/globals.css"
import Navbar from '../components/Navbar'

const page = () => {

	const todos = useSelector((state: RootState) => selectTodos(state))
	const dispatch = useDispatch<AppDispatch>()

	// State for edit mode
	const [editingId, setEditingId] = useState<string | null>(null)
	const [editText, setEditText] = useState('')

	const handleCheckbox = (todo: { id: string, text: string, isCompleted: boolean }) => {
		dispatch(toggleTodoAsync(todo))
	}
	const handleDelete = (id: string) => {
		dispatch(removeTodoAsync(id))
	}
	const handleEdit = (todo: { id: string, text: string, isCompleted: boolean }) => {
		setEditingId(todo.id)
		setEditText(todo.text)
	}
	const handleSave = (id: string) => {
		if (editText.trim()) {
			dispatch(editTodoAsync({ id, text: editText.trim() }))
		}
		setEditingId(null)
		setEditText('')
	}

	useEffect(() => {
		dispatch(fetchTodos())
	}, [dispatch])

	return (
		<div className={`h-screen w-screen bg-[#eb6a6a] text-black  text-center`}>

			<Navbar />

			<div className={`h-fit w-screen bg-[#eb6a6a] text-black flex items-center justify-center flex-col gap-5 mt-10`}>
				<div className={`text-3xl font-semibold text-center`}>All the Todos you have</div>
				{todos.length === 0 ? (
					<div className="text-xl text-gray-700">No todos yet! Add a new todo to get started.</div>
				) : (
					todos.map(item => {
						return <div key={item.id} className={`border-4 rounded-2xl border-gray-800 px-4 py-4 text-xl flex items-center justify-between gap-8.5 min-w-[80%] text-center`}>
							<input type="checkbox" className={`${item.isCompleted ? "line-through" : ""}`} checked={item.isCompleted} onChange={() => handleCheckbox(item)} name="" id="" />
							{editingId === item.id ? (
								<input
									type="text"
									value={editText}
									onChange={(e) => setEditText(e.target.value)}
									className="border px-2 py-1 flex-1"
								/>
							) : (
								<div className={`${item.isCompleted ? "line-through" : ""}`}>{item.text}</div>
							)}
							<div className={`buttons flex items-center justify-center gap-5`}>
								{editingId === item.id ? (
									<button className={`bg-green-600 px-1 py-0.5 text-black font-bold rounded-md`} onClick={() => handleSave(item.id)}> <FaSave /> </button>
								) : (
									<button className={`bg-emerald-300 px-1 py-0.5 text-black font-bold rounded-md`} onClick={() => handleEdit(item)}> <FaRegEdit /> </button>
								)}
								<button className={`bg-emerald-300 px-1 py-0.5 text-black font-bold rounded-md`} onClick={() => handleDelete(item.id)}> <AiFillDelete /> </button>
							</div>
						</div>
					})
				)}

			</div>
		</div>
	)
}

export default page
