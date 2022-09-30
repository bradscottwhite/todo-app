import { useState } from 'react'

import { motion } from 'framer-motion'

const variants = {
	closed: { opacity: 0 },
	open: { opacity: 1 }
}

export const Todo = ({ todo: { id, name, description, complete }, index, handleEdit, handleDelete }) => {
	const [ todoState, setTodoState ] = useState({ name, description, complete })
	const [ checked, setChecked ] = useState(complete)
	const [ editing, setEditing ] = useState(false)

	const setInput = ( key, value ) => {
		setTodoState({ ...todoState, [ key ]: value })
	}

	const update = () => {
		// If editing is false then set editing to true
		if (!editing) setEditing(true)
		// If editing is true and todo data has changed then update the todo and set editing to false
		else if (todoState.name !== name || todoState.description !== description ) {
			handleEdit({ id, ...todoState })
			setEditing(false)
		}
	}

	const flipComplete = () => {
		setChecked(!checked)
		setInput('complete', checked)//!todoState.complete)
		console.log(todoState.complete)
		handleEdit({ id, ...todoState, complete: checked })
	}

	return (
		<motion.div
			variants={variants}
			className='flex justify-center drop-shadow-md bg-emerald-400 px-6 py-4 rounded-md my-3 text-white'
			key={id ? id : index}
		>
			<input
				type='checkbox'
				checked={checked /*todoState.complete*/}
				onChange={flipComplete}
				className='mx-3'
			/>

			{
				!editing ? (
					<p className='px-3 text-lg font-bold'>{todoState.name}</p>
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
					<p className='px-3 py-0.5'>{todoState.description}</p>
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
				onClick={update}
			>
				{editing ? 'Save' : 'Edit'}
			</button>
			
			<button
				className='mx-3 bg-emerald-200 hover:bg-emerald-300 hover:scale-110 transition ease-in-out delay-150 duration-300 drop-shadow-xl rounded-md px-4 py-1 text-white font-bold'
				onClick={() => handleDelete(id, index)}
			>Delete</button>
		</motion.div>
	)
};
