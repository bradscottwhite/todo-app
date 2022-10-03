import { useState, useEffect } from 'react'

import Amplify from 'aws-amplify'
import awsExports from './aws-exports'
import { Authenticator } from '@aws-amplify/ui-react'
//import '@aws-amplify/ui-react/styles.css'

import { initialState, fetchTodos, addTodo, handleEdit, handleDelete } from './todoFns'

import { NewTodo }  from './NewTodo'
import { Todos } from './Todos'
import { SignOut } from './SignOut'

Amplify.configure(awsExports)

const App = () => {
	const [ formState, setFormState ] = useState(initialState)
	const [ todos, setTodos ] = useState([])

	useEffect(() => {
		fetchTodos( setTodos )
	}, [])

	const setInput = ( key, value ) => {
		setFormState({ ...formState, [ key ]: value })
	}

	return (
		<div className='w-screen h-screen flex justify-center items-center'>
			<Authenticator signUpAttributes={[]}>
				{({ signOut, user }) => (
					<main className='drop-shadow-xl bg-emerald-500 py-4 px-8 sm:py-10 sm:px-20 rounded-md'>
						<h1 className='text-2xl text-white font-bold p-4 drop-shadow-xl'>
							Hello {user.attributes.name}
						</h1>

						<NewTodo
							setInput={setInput}
							formState={formState}
							addTodo={addTodo( todos, setTodos, formState, setFormState )}
						/>

						<Todos
							todos={todos}
							handleEdit={handleEdit}
							handleDelete={handleDelete( todos, setTodos )}
						/>

						<SignOut signOut={signOut} />
					</main>
				)}
			</Authenticator>
		</div>
	);
}

export default App;
