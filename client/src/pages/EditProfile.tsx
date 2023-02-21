import { Loader } from 'components';
import { Button, Error, Input, Label } from 'components/Utils';
import { Formik } from 'formik';
import { validationSchemaEditProfile } from 'helper/validation';
import { InputMask } from 'primereact/inputmask';
import { FC, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { getUserProfile, updateUserProfile } from 'redux/profile/profileSlice';
import { useAppDispatch, useAppSelector } from 'redux/store';
import { FormEditProfileValues } from 'types/helper/validation';

const EditProfile: FC = () => {
	const appDispatch = useAppDispatch();
	const { user, isLoadingGetUser, isSuccessGetUser, isErrorUpdateUser, isLoadingUpdateUser, errorMessageUpdateUser, isSuccessUpdateUser } = useAppSelector((state) => state.profile);
	const navigate = useNavigate();

	useEffect(() => {
		appDispatch(getUserProfile());
	}, [appDispatch]);

	const onSubmit = async ({ name, surname, email, phone }: FormEditProfileValues) => {
		await appDispatch(updateUserProfile({ email, name, surname, phone }));
	};

	useEffect(() => {
		if (isSuccessUpdateUser) {
			toast.success('Your information has been updated');
			navigate('/user/profile/information');
		}
		if (isErrorUpdateUser) {
			appDispatch(getUserProfile());
			toast.error(errorMessageUpdateUser);
		}
	}, [isSuccessGetUser, isErrorUpdateUser, errorMessageUpdateUser, appDispatch, isSuccessUpdateUser, navigate]);

	return (
		<>
			<div className='text-xl font-workSans text-black font-semibold underline select-none'>Profile</div>
			<div className='text-xs font-workSans text-green_Five font-normal pt-2 select-none'>Here you can find and edit information about yourself.</div>
			{isLoadingGetUser ? (
				<div className='flex items-center justify-center'>
					<Loader />
				</div>
			) : (
				<Formik
					validateOnBlur={false}
					validateOnChange={false}
					initialValues={{ name: user?.name, surname: user?.surname, email: user?.email, phone: user?.phone }}
					validationSchema={validationSchemaEditProfile}
					onSubmit={(values: FormEditProfileValues, { resetForm }) => {
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

							<Label label='Phone' />
							<InputMask
								value={values.phone}
								id='phone'
								type='text'
								mask='(9999) 999-9999'
								placeholder='(999) 999-9999'
								onChange={handleChange}
							/>
							<Error error={errors.phone} />

							<Label label='E-mail' />
							<Input value={values.email} type='text' id='email' onChange={handleChange} />
							<Error error={errors.email} />

							<div className='pt-4 flex flex-col'>
								<Button disabled={isLoadingUpdateUser} type='submit'>
									Change your information
								</Button>
							</div>
						</form>
					)}
				</Formik>
			)}
		</>
	);
};

export default EditProfile;
