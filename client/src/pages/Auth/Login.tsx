import { Button, Error, Input, Label } from 'components/Utils';
import { Formik } from 'formik';
import { validationSchemaLogin } from 'helper/validation';
import { FC, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { login } from 'redux/auth/authSlice';
import { useAppDispatch, useAppSelector } from 'redux/store';
import { FormLoginValues } from 'types/helper/validation';

const Login: FC = () => {
	const appDispatch = useAppDispatch();
	const { isErrorLogin, isLoadingLogin, isSuccessLogin, messageLogin } = useAppSelector((state) => state.auth);
	const navigate = useNavigate();

	const onSubmit = async ({ email, password }: FormLoginValues) => {
		await appDispatch(
			login({
				email,
				password
			})
		);
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
		<>
			<div className='flex flex-col'>
				<div className='text-black font-medium text-2xl mb-8'>Registered Customers</div>
				<div className='font-normal text-lg text-black'>If you have an account, sign in with your email address.</div>
				<Formik
					validateOnBlur={false}
					validateOnChange={false}
					initialValues={{ email: '', password: '' }}
					validationSchema={validationSchemaLogin}
					onSubmit={(values: FormLoginValues, { resetForm }) => {
						resetForm();
						onSubmit(values);
					}}
				>
					{({ handleSubmit, handleChange, values, errors }) => (
						<form onSubmit={handleSubmit} className='flex flex-col space-y-2'>
							<Label label='Email' />
							<Input value={values.email} type='text' id='email' onChange={handleChange} />
							<Error error={errors.email} />

							<Label label='Password' />
							<Input value={values.password} type='password' id='password' onChange={handleChange} />
							<Error error={errors.password} />

							<div className='pt-4 flex flex-col'>
								<Button disabled={isLoadingLogin} type='submit'>
									Login
								</Button>
							</div>
						</form>
					)}
				</Formik>
			</div>
			<div className='flex flex-col space-y-8'>
				<div className='text-black font-medium text-2xl'>New Customers</div>
				<div className='text-black font-light text-md'>Creating an account has many benefits: check out faster, keep more than one address, track orders and more.</div>
				<Button type='button' className='w-56' onClick={() => navigate('/auth/register')}>
					Create an Account
				</Button>
			</div>
		</>
	);
};

export default Login;
