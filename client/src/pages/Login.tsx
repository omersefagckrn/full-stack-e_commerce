import { ChangeEvent, FC, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { login } from 'redux/auth/authSlice';
import { useAppDispatch, useAppSelector } from 'redux/store';

const Login: FC = () => {
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');

	const appDispatch = useAppDispatch();
	const { isErrorLogin, isLoadingLogin, isSuccessLogin, messageLogin } = useAppSelector((state) => state.auth);
	const navigate = useNavigate();

	const onSubmit = async (event: ChangeEvent<HTMLFormElement>) => {
		event.preventDefault();
		await appDispatch(login({ email, password }));
	};

	useEffect(() => {
		if (isSuccessLogin) {
			toast.success(messageLogin);
			navigate('/');
		}

		if (isErrorLogin) {
			toast.error(messageLogin);
		}
	}, [isSuccessLogin, isErrorLogin, messageLogin, appDispatch, navigate]);

	return (
		<div className='flex items-center justify-center py-10'>
			<form onSubmit={onSubmit} className='flex flex-col space-y-2'>
				<input autoComplete='off' value={email} type='text' id='email' onChange={(event: ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)} className='py-3 px-2 bg-gray-400 rounded-lg focus:outline-none placeholder:text-white' />
				<input autoComplete='off' value={password} type='password' id='password' onChange={(event: ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)} className='py-3 px-2 bg-gray-400 rounded-lg focus:outline-none placeholder:text-white' />
				<button disabled={isLoadingLogin} type='submit' className='py-3 px-2 bg-gray-400 rounded-lg placeholder:text-white focus:outline-none text-black'>
					{isLoadingLogin ? 'Loading...' : 'Login'}
				</button>
			</form>
		</div>
	);
};

export default Login;
