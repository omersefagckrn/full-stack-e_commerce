import { Button, Error, Input, Label } from 'components/Utils';
import { Formik } from 'formik';
import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'redux/store';

import { validationSchemaRegister } from 'helper/validation';
import toast from 'react-hot-toast';
import { register } from 'redux/auth/authSlice';
import { FormRegisterValues } from 'types/helper/validation';

import { InputMask } from 'primereact/inputmask';
import { reset } from 'redux/profile/profileSlice';

const Register: FC = () => {
	const appDispatch = useAppDispatch();
	const { isErrorRegister, isLoadingRegister, isSuccessRegister, messageRegister } = useAppSelector((state) => state.auth);
	const navigate = useNavigate();

	const onSubmit = async ({ name, surname, email, password, phone }: FormRegisterValues) => {
		await appDispatch(
			register({
				name,
				surname,
				email,
				password,
				phone
			})
		);
	};

	useEffect(() => {
		if (isSuccessRegister) {
			toast.success(messageRegister);
			navigate('/auth/login');
			appDispatch(reset());
		}

		if (isErrorRegister) {
			toast.error(messageRegister);
		}
	}, [isSuccessRegister, isErrorRegister, messageRegister, appDispatch, navigate]);

	return (
		<>
			<div className='flex flex-col'>
				<div className='text-black font-medium text-2xl mb-2'>Register</div>
				<Formik
					validateOnBlur={false}
					validateOnChange={false}
					initialValues={{ name: '', surname: '', email: '', phone: '', password: '', confirmPassword: '' }}
					validationSchema={validationSchemaRegister}
					onSubmit={(values: FormRegisterValues, { resetForm }) => {
						resetForm();
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

							<Label label='Phone' />
							<InputMask
								value={values.phone}
								id='phone'
								type='text'
								mask='(9999) 999-9999'
								placeholder='(9999) 999-9999'
								onChange={handleChange}
							/>
							<Error error={errors.phone} />

							<Label label='Password' />
							<Input value={values.password} type='password' id='password' onChange={handleChange} />
							<Error error={errors.password} />

							<Label label='Confirm Password' />
							<Input value={values.confirmPassword} type='password' id='confirmPassword' onChange={handleChange} />
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
				<div className='text-black font-medium text-2xl'>Not new customer?</div>
				<div className='text-black font-light text-md'>If you are not new, you can log in from the description below and continue shopping.</div>
				<Button type='button' className='w-56' onClick={() => navigate('/auth/login')}>
					Sign In
				</Button>
			</div>
		</>
	);
};

export default Register;
