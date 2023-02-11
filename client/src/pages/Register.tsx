import { Button, Error, Input, Label } from 'components/Utils';
import { Formik } from 'formik';
import { FormRegisterValues, validationSchemaRegister } from 'helper/validation';
import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'redux/store';

import toast from 'react-hot-toast';
import { register } from 'redux/auth/authSlice';

const Register: FC = () => {
	const appDispatch = useAppDispatch();
	const { isErrorRegister, isLoadingRegister, isSuccessRegister, messageRegister } = useAppSelector((state) => state.auth);
	const navigate = useNavigate();

	const onSubmit = async ({ name, surname, email, password }: FormRegisterValues) => {
		console.log(name, surname, email, password);
		await appDispatch(
			register({
				name,
				surname,
				email,
				password
			})
		);
	};

	useEffect(() => {
		if (isSuccessRegister) {
			toast.success(messageRegister);
			navigate('/auth/login');
		}

		if (isErrorRegister) {
			toast.error(messageRegister);
		}
	}, [isSuccessRegister, isErrorRegister, messageRegister, appDispatch, navigate]);

	return (
		<>
			<div className='flex flex-col'>
				<div className='text-black font-medium text-2xl font-workSans mb-8'>Registered Customers</div>
				<div className='font-normal text-lg text-black'>If you have an account, sign in with your email address.</div>
				<Formik
					validateOnBlur={false}
					validateOnChange={false}
					initialValues={{ name: '', surname: '', email: '', password: '', confirmPassword: '' }}
					validationSchema={validationSchemaRegister}
					onSubmit={(values: FormRegisterValues, { resetForm }) => {
						// resetForm();
						onSubmit(values);
					}}
				>
					{({ handleSubmit, handleChange, values, errors }) => (
						<form onSubmit={handleSubmit} className='flex flex-col space-y-2'>
							<Label label='Name' />
							<Input value={values.name} type='text' id='name' onChange={handleChange} />
							<Error error={errors.name} />

							<Label label='Surname' />
							<Input value={values.surname} type='text' id='surname' onChange={handleChange} />
							<Error error={errors.surname} />

							<Label label='Email' />
							<Input value={values.email} type='text' id='email' onChange={handleChange} />
							<Error error={errors.email} />

							<Label label='Password' />
							<Input value={values.password} type='password' id='password' onChange={handleChange} />
							<Error error={errors.password} />

							<Label label='Confirm Password' />
							<Input
								value={values.confirmPassword}
								type='password'
								id='confirmPassword'
								onChange={handleChange}
							/>
							<Error error={errors.confirmPassword} />

							<div className='pt-4 flex flex-col'>
								<Button disabled={isLoadingRegister} type='submit'>
									Register
								</Button>
							</div>
						</form>
					)}
				</Formik>
			</div>
			<div className='flex flex-col space-y-8'>
				<div className='text-black font-medium text-2xl font-workSans'>Not new customer?</div>
				<div className='text-black font-light text-md font-workSans'>
					If you are not new, you can log in from the description below and continue shopping.
				</div>
				<Button className='w-56' onClick={() => navigate('/auth/login')}>
					Do you want to log in?
				</Button>
			</div>
		</>
	);
};

export default Register;
