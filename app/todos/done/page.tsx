"use client"
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTodos, selectTodos, toggleTodoAsync, removeTodoAsync } from '../../../features/counter/counterSlice'
import type { RootState } from '../../store'
import { AiFillDelete } from "react-icons/ai";
import type { AppDispatch } from '../../store'
import "@/app/globals.css"
import Navbar from '../../components/Navbar'

const page = () => {

	const allTodos = useSelector((state: RootState) => selectTodos(state))
	const dispatch = useDispatch<AppDispatch>()

	// Filter to show only completed todos
	const completedTodos = allTodos.filter(todo => todo.isCompleted)

	const handleCheckbox = (todo: { id: string, text: string, isCompleted: boolean }) => {
		dispatch(toggleTodoAsync(todo))
	}
	const handleDelete = (id: string) => {
		dispatch(removeTodoAsync(id))
	}

	useEffect(() => {
		dispatch(fetchTodos())
	}, [dispatch])

	return (
		<div className={`h-screen w-screen bg-[#eb6a6a] text-black `}>

			<Navbar />

			<div className={`h-fit w-screen bg-[#eb6a6a] text-black flex items-center justify-center flex-col gap-5 mt-10`}>
				<h1 className="text-3xl font-bold mb-5">Completed Todos</h1>
				
				{completedTodos.length === 0 ? (
					<div className="text-xl text-gray-700">No completed todos yet!</div>
				) : (
					completedTodos.map(item => {
						return <div key={item.id} className={`border-4 rounded-2xl border-gray-800 px-4 py-4 text-xl flex items-center justify-between gap-8.5 min-w-[80%] text-center`}>
							<input type="checkbox" className={``} checked={item.isCompleted} onChange={() => handleCheckbox(item)} name="" id="" />
							<div className={`line-through flex-1`}>{item.text}</div>
							<div className={`buttons flex items-center justify-center gap-5`}>
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
