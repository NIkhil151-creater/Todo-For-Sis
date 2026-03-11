"use client"
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Navbar = () => {
	const pathname = usePathname()

	// Helper function to check if a link is active
	const isActive = (path: string) => pathname === path

	return (
		<div className={`flex items-center justify-center`}>
			<div className={`px-3 py-2 my-5 flex gap-5`}>
				<Link href={`/`}>
					<button className={`border-4 border-slate-800 max-w-fit px-3 py-2 rounded-xl hover:bg-[#e45a5a] transition duration-500 cursor-pointer ${isActive('/') ? 'bg-[#e45a5a]' : ''}`}>
						Home
					</button>
				</Link>
				<Link href={`/add`}>
					<button className={`border-4 border-slate-800 max-w-fit px-3 py-2 rounded-xl hover:bg-[#e45a5a] transition duration-500 cursor-pointer ${isActive('/') ? 'bg-[#e45a5a]' : ''}`}>
						Add
					</button>
				</Link>
				<Link href={`/todos`}>
					<button className={`border-4 border-slate-800 max-w-fit px-3 py-2 rounded-xl hover:bg-[#e45a5a] transition duration-500 cursor-pointer ${isActive('/todos') ? 'bg-[#e45a5a]' : ''}`}>
						Todos
					</button>
				</Link>
				<Link href={`/todos/done`}>
					<button className={`border-4 border-slate-800 max-w-fit px-3 py-2 rounded-xl hover:bg-[#e45a5a] transition duration-500 cursor-pointer ${isActive('/todos/done') ? 'bg-[#e45a5a]' : ''}`}>
						Done
					</button>
				</Link>
				<Link href={`/todos/remaining`}>
					<button className={`border-4 border-slate-800 max-w-fit px-3 py-2 rounded-xl hover:bg-[#e45a5a] transition duration-500 cursor-pointer ${isActive('/todos/remaining') ? 'bg-[#e45a5a]' : ''}`}>
						Remaining
					</button>
				</Link>
			</div>
		</div>
	)
}

export default Navbar
