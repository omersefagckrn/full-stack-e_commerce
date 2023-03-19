import { Button, Error, Input, Label } from 'components/Utils';
import { Formik } from 'formik';
import { AppToast } from 'helper/toast';
import { validationSchemaAddAddress } from 'helper/validation';
import { Dialog } from 'primereact/dialog';
import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { addUserAddress } from 'redux/profile/profileSlice';
import { useAppDispatch, useAppSelector } from 'redux/store';
import type { AddAddressProps } from 'types/components/Modal/AddAddress';
import type { FormAddAddressValues } from 'types/helper/validation';

const AddAddress: FC<AddAddressProps> = ({ visible, setVisible }) => {
	const AppDispatch = useAppDispatch();
	const navigate = useNavigate();
	const { isLoadingAddUserAddress, isErrorAddUserAddress, isSuccessAddUserAddress, errorMessageAddUserAddress } = useAppSelector((state) => state.profile);

	useEffect(() => {
		if (isSuccessAddUserAddress) {
			setVisible(false);
			AppToast({
				type: 'success',
				message: 'Add address successfully!'
			});
			setTimeout(() => {
				navigate(0);
			}, 1500);
		}

		if (isErrorAddUserAddress) {
			AppToast({
				type: 'error',
				message: errorMessageAddUserAddress
			});
		}
	}, [isSuccessAddUserAddress, isErrorAddUserAddress, errorMessageAddUserAddress, setVisible, navigate]);

	const onSubmit = async ({ title, address, city_name, country_name, zip_code }: FormAddAddressValues) => {
		await AppDispatch(
			addUserAddress({
				title,
				address,
				city_name,
				country_name,
				zip_code
			})
		);
	};

	return (
		<>
			<Dialog
				className='w-full lg:max-w-[774px]'
				draggable={false}
				maximizable={window.outerWidth > 775 ? false : true}
				header='Edit Address'
				visible={visible}
				onHide={() => setVisible(false)}
				headerStyle={{
					paddingBottom: '0rem'
				}}
			>
				<Formik
					validateOnBlur={false}
					validateOnChange={false}
					initialValues={{
						title: 'Home',
						address: '',
						zip_code: '',
						city_name: '',
						country_name: ''
					}}
					validationSchema={validationSchemaAddAddress}
					onSubmit={(values: FormAddAddressValues, { resetForm }) => {
						resetForm();
						onSubmit(values);
					}}
				>
					{({ handleSubmit, handleChange, values, errors }) => (
						<form onSubmit={handleSubmit} className='flex flex-col space-y-2'>
							<Label label='Title' />
							<Input value={values.title} type='text' id='title' onChange={handleChange} />
							<Error error={errors.title} />

							<Label label='Address' />
							<Input value={values.address} type='text' id='address' onChange={handleChange} />
							<Error error={errors.address} />

							<Label label='Zip Code' />
							<Input maxLength={5} value={values.zip_code} type='text' id='zip_code' onChange={handleChange} />
							<Error error={errors.zip_code} />

							<Label label='City Name' />
							<Input value={values.city_name} type='text' id='city_name' onChange={handleChange} />
							<Error error={errors.city_name} />

							<Label label='Country Name' />
							<Input value={values.country_name} type='text' id='country_name' onChange={handleChange} />
							<Error error={errors.country_name} />

							<div className='pt-4 flex flex-col'>
								<Button disabled={isLoadingAddUserAddress} type='submit'>
									Add new address
								</Button>
							</div>
						</form>
					)}
				</Formik>
			</Dialog>
		</>
	);
};

export default AddAddress;
