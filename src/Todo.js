import { useState } from 'react'

import { motion } from 'framer-motion'

const variants = {
	closed: { opacity: 0 },
	open: { opacity: 1 }
}

export const Todo = ({ todo, index, handleEdit, handleDelete }) => {
	const [ todoState, setTodoState ] = useState(todo)
	const [ editing, setEditing ] = useState(false)

	const setInput = ( key, value ) => {
		setTodoState({ ...todoState, [ key ]: value })
	}

	const handleClick = () => {
		if (editing) return
		setEditing(true)
	}

	const edit = () => {
		if (!editing || ( todoState.name === todo.name && todoState.description === todo.description ) ) return
		handleEdit( todo.id, index, todoState )
		setEditing(false)
	}

	return (
		<motion.div
			onClick={handleClick}
			variants={variants}
			className='flex justify-center drop-shadow-md bg-emerald-400 px-6 py-4 rounded-md my-3 text-white'
			key={todo.id ? todo.id : index}
		>
			{
				!editing ? (
					<p className='px-3 text-lg font-bold'>{todo.name}</p>
				) : (
					<input
						className='text-slate-500 rounded-md px-4 py-1 mx-3'
						placeholder='Name'
						value={todoState.name}
						onChange={e => setInput('name', e.target.value)}
					/>
				)
			}
			{
				!editing ? (
				<p className='px-3 py-0.5'>{todo.description}</p>
				) : (
					<input
						className='text-slate-500 rounded-md px-4 py-1 mx-3'
						placeholder='Description'
						value={todoState.description}
						onChange={e => setInput('description', e.target.value)}
					/>
				)
			}

			{/* Delete/edit buttons (icons?) */}
			<button
				className='mx-3 bg-emerald-200 hover:bg-emerald-300 hover:scale-110 transition ease-in-out delay-150 duration-300 drop-shadow-xl rounded-md px-4 py-1 text-white font-bold'
				onClick={edit}
			>Edit</button>
			
			<button
				className='mx-3 bg-emerald-200 hover:bg-emerald-300 hover:scale-110 transition ease-in-out delay-150 duration-300 drop-shadow-xl rounded-md px-4 py-1 text-white font-bold'
				onClick={() => handleDelete(todo.id, index)}
			>Delete</button>
		</motion.div>
	)
};
