export const NewTodo = ({ setInput, formState, addTodo }) => (
	<div className='drop-shadow-xl bg-emerald-600 px-6 py-4 rounded-md grid grid-rows-3 sm:grid-cols-1 sm:flex sm:justify-center gap-4 sm:gap-0'>
		<input
			className='rounded-md px-4 py-1 sm:mx-3'
			placeholder='Name'
			value={formState.name}
			onChange={e => setInput('name', e.target.value)}
		/>
		<input
			className='rounded-md px-4 py-1 mx-3'
			placeholder='Description'
			value={formState.description}
			onChange={e => setInput('description', e.target.value)}
		/>
		<button
			className='bg-emerald-200 hover:bg-emerald-300 hover:scale-110 transition ease-in-out delay-150 duration-300 drop-shadow-xl rounded-md px-6 py-2 text-white font-bold mx-3'
			onClick={addTodo}
		>Create Todo</button>
	</div>
);
