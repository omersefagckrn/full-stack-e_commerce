import { Loader } from 'components';
import { Button, Error, Input, Label } from 'components/Utils';
import { Formik } from 'formik';
import { validationSchemaEditProfile } from 'helper/validation';
import { FC, useEffect } from 'react';
import { getUserProfile } from 'redux/profile/profileSlice';
import { useAppDispatch, useAppSelector } from 'redux/store';
import { FormEditProfileValues } from 'types/helper/validation';

const EditProfile: FC = () => {
	const appDispatch = useAppDispatch();
	const { isLoadingGetUser } = useAppSelector((state) => state.profile);

	useEffect(() => {
		appDispatch(getUserProfile());
	}, [appDispatch]);

	const onSubmit = (values: FormEditProfileValues) => {
		console.log(values);
	};
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
					initialValues={{ name: '', surname: '', email: '' }}
					validationSchema={validationSchemaEditProfile}
					onSubmit={(values: FormEditProfileValues, { resetForm }) => {
						resetForm();
						onSubmit(values);
					}}
				>
					{({ handleSubmit, handleChange, values, errors }) => (
						<form onSubmit={handleSubmit} className='flex flex-col space-y-2'>
							<Label label='Email' />
							<Input value={values.email} type='text' id='email' onChange={handleChange} />
							<Error error={errors.email} />

							<div className='pt-4 flex flex-col'>
								<Button type='submit'>Login</Button>
							</div>
						</form>
					)}
				</Formik>
			)}
		</>
	);
};

export default EditProfile;
