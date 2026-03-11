"use client"
import { Lavishly_Yours } from 'next/font/google'
import Link from 'next/link'
import "./globals.css"
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTodos, selectTodos } from '../features/counter/counterSlice'
import type { RootState } from './store'
import type { AppDispatch } from './store'

const lavish = Lavishly_Yours({
	subsets: ["latin"],
	weight: "400"
})

export default function Home() {

	const dispatch = useDispatch<AppDispatch>()
	const todos = useSelector((state: RootState) => selectTodos(state))

	useEffect(() => {
		dispatch(fetchTodos())
	}, [dispatch])

	return (
		<div className={`h-screen w-screen bg-normal text-black flex items-center justify-center flex-col gap-8.5`}>
			<div className={`${lavish.className} text-5xl`}>To do's for your ease</div>
			<div className={`text-2xl max-w-[20%] text-center`}>Jot down ur tusle & Get it sorted</div>
			<div className={`flex gap-5 justify-center items-center flex-wrap`}>
				<button className={`text-lg border-8 border-gray-800 rounded-lg px-3 py-2 max-w-fit hover:bg-[#e45a5a] transition duration-500 cursor-pointer`}> <Link href={`/add`}> Add </Link> </button>
				<button className={`text-lg border-8 border-gray-800 rounded-lg px-3 py-2 max-w-fit hover:bg-[#e45a5a] transition duration-500 cursor-pointer`}> <Link href={`/todos`}> Todos </Link> </button>
				<button className={`text-lg border-8 border-gray-800 rounded-lg px-3 py-2 max-w-fit hover:bg-[#e45a5a] transition duration-500 cursor-pointer`}> <Link href={`/todos/done`}> Done </Link> </button>
				<button className={`text-lg border-8 border-gray-800 rounded-lg px-3 py-2 max-w-fit hover:bg-[#e45a5a] transition duration-500 cursor-pointer`}> <Link href={`/todos/remaining`}> Remaining </Link> </button>
			</div>
			<div className={`text-xl mt-4`}>
				Total Todos: {todos.length}
			</div>
		</div>
	);
}

