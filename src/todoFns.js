import { API } from 'aws-amplify'
import { listTodos } from './graphql/queries'
import { createTodo, updateTodo, deleteTodo } from './graphql/mutations'


export const initialState = { name: '', description: '', complete: false }

export const fetchTodos = async setTodos => {
	try {
		const todoData = await API.graphql({
			query: listTodos,
			authMode: 'AMAZON_COGNITO_USER_POOLS'
		})
		const todos = todoData.data.listTodos.items
		setTodos(todos)
	} catch (err) { console.log('error fetching todos') }
}

export const addTodo = ( todos, setTodos, formState, setFormState ) => async todo => {
	try {
		if (!formState.name || !formState.description) return
		const todo = { ...formState }
		setTodos([ ...todos, todo ])
		setFormState(initialState)
		await API.graphql({
			query: createTodo,
			variables: { input: todo },
			authMode: 'AMAZON_COGNITO_USER_POOLS'
		})
	} catch (err) { console.log('error creating todo:', err) }
}

export const handleEdit = async todo => {
	try {
		await API.graphql({
			query: updateTodo,
			variables: { input: todo },
			authMode: 'AMAZON_COGNITO_USER_POOLS'
		})
	} catch (err) {
		console.log('Error editing todo:', err)
	}
}


export const handleDelete = (todos, setTodos ) => async ( id, index ) => {
	try {
		await API.graphql({
			query: deleteTodo,
			variables: { input: { id } },
			authMode: 'AMAZON_COGNITO_USER_POOLS'

		})
	} catch  (err) {
		console.log('Error deleting todo:', err)
	} finally {
		setTodos(todos.filter(todo => todo.id !== id))
	}
}
