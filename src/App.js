import { useState, useEffect } from 'react'

import Amplify, { API, graphqlOperation } from 'aws-amplify'
import awsExports from './aws-exports'
import { Authenticator } from '@aws-amplify/ui-react'
import { listTodos } from './graphql/queries'
import { createTodo, updateTodo, deleteTodo } from './graphql/mutations'

// Remove later:?
import '@aws-amplify/ui-react/styles.css'

import { NewTodo }  from './NewTodo'
import { Todos } from './Todos'
import { SignOut } from './SignOut'

Amplify.configure(awsExports)

const initialState = { name: '', description: '', complete: false }

const App = () => {
	const [ formState, setFormState ] = useState(initialState)
	const [ todos, setTodos ] = useState([])

	useEffect(() => {
		fetchTodos()
	}, [])

	const setInput = ( key, value ) => {
		setFormState({ ...formState, [ key ]: value })
	}

	const fetchTodos = async () => {
		try {
			const todoData = await API.graphql( graphqlOperation( listTodos ) )
			const todos = todoData.data.listTodos.items
			setTodos(todos)
		} catch (err) { console.log('error fetching todos') }
	}

	const addTodo = async () => {
		try {
			if (!formState.name || !formState.description) return
			const todo = { ...formState }
			setTodos([ ...todos, todo ])
			setFormState(initialState)
			await API.graphql( graphqlOperation( createTodo, { input: todo } ) )
		} catch (err) { console.log('error creating todo:', err) }
	}

	const handleEdit = async (id, index, data) => {
		const newTodos = [ ...todos ]
		newTodos.splice(index, 1, data)
		setTodos(newTodos)
		await API.graphql( graphqlOperation( updateTodo, { input: { id, ...data } } ) )
	}

	
	const handleDelete = async (id, index) => {
		const newTodos = [ ...todos ]
		newTodos.splice(index, 1)
		setTodos(newTodos)
		await API.graphql( graphqlOperation( deleteTodo, { input: { id } } ) )
	}

	return (
		<div className='w-screen h-screen flex justify-center items-center border-md'>
			<Authenticator>
				{({ signOut, user }) => (
					<main className='drop-shadow-xl bg-emerald-500 py-10 px-20 rounded-md'>
						<h1 className='text-2xl text-white font-bold p-4 drop-shadow-xl'>
							Hello {user.attributes.name}
						</h1>

						<NewTodo
							setInput={setInput}
							formState={formState}
							addTodo={addTodo}
						/>

						<Todos
							todos={todos}
							handleEdit={handleEdit}
							handleDelete={handleDelete}
						/>

						<SignOut signOut={signOut} />
					</main>
				)}
			</Authenticator>
		</div>
	);
}

export default App;
