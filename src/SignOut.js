export const SignOut = ({ signOut }) => (
	<div className='flex justify-center'>
	<button
		className='bg-emerald-200 hover:bg-emerald-300 hover:scale-110 transition ease-in-out delay-150 duration-300 drop-shadow-xl rounded-md px-6 py-2 text-white font-bold'
			onClick={signOut}
		>Sign out</button>
	</div>
);
