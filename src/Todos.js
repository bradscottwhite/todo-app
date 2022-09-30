import { motion } from 'framer-motion'

import { Todo } from './Todo'

const variants = {
	closed: {
		opacity: 0,
		transition: {
			duration: 0.5,
			staggerChildren: 0.2,
			staggerDirection: -1
		}
	}, open: {
		opacity: 1,
		transition: {
			duration: 0.5,
			delayChildren: 0.2,
			staggerChildren: 0.2,
			staggerDirection: 1
		}
	}
}

export const Todos = ({ todos, handleEdit, handleDelete }) => (
	<div className='py-4'>
		<h2
			className='text-white flex justify-center text-xl drop-shadow-xl p-4'
			style={{ visibility: todos.length > 0 ? 'visible' : 'hidden' }}
		>Todos</h2>
			
		<motion.div
			initial='closed'
			animate='open'
			exit='closed'
			variants={variants}
			className='whitespace-nowrap overflow-x-auto h-[40vh]'
		>
			{
				todos.map((todo, index) => (
					<Todo
						todo={todo}
						index={index}
						handleEdit={handleEdit}
						handleDelete={handleDelete}
					/>
				))
			}
		</motion.div>
	</div>
);
