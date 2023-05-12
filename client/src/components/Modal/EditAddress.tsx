import { Button, Error, Input, Label } from 'components/Utils';
import { Formik } from 'formik';
import { AppToast } from 'helper/toast';
import { validationSchemaEditAddress } from 'helper/validation';
import { Dialog } from 'primereact/dialog';
import { FC, useEffect } from 'react';
import { editUserAddress, reset } from 'redux/profile/profileSlice';
import { useAppDispatch, useAppSelector } from 'redux/store';
import type { EditAddressProps } from 'types/components/Modal/EditAddress';
import type { FormEditAddressValues } from 'types/helper/validation';
import type { IAddress } from 'types/redux/profile';

const EditAddress: FC<EditAddressProps> = ({ address, visible, setVisible }) => {
	const addressId = address?._id as IAddress['_id'];
	const AppDispatch = useAppDispatch();
	const { isLoadingEditUserAddress, isErrorEditUserAddress, isSuccessEditUserAddress, errorMessageEditUserAddress } = useAppSelector((state) => state.profile);

	useEffect(() => {
		if (isErrorEditUserAddress) {
			AppToast({
				type: 'error',
				message: errorMessageEditUserAddress
			});
		}

		if (isSuccessEditUserAddress) {
			AppToast({
				type: 'success',
				message: 'Address updated successfully!'
			});
			setVisible(false);
			AppDispatch(reset());
		}
	}, [isLoadingEditUserAddress, isErrorEditUserAddress, isSuccessEditUserAddress, setVisible, AppDispatch, address?.user_id, errorMessageEditUserAddress]);

	const onSubmit = async ({ title, address, city_name, country_name, zip_code }: FormEditAddressValues) => {
		await AppDispatch(
			editUserAddress({
				addressId,
				address,
				city_name,
				country_name,
				zip_code,
				title
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
						title: address?.title || '',
						address: address?.address || '',
						zip_code: address?.zip_code || '',
						city_name: address?.city_name || '',
						country_name: address?.country_name || ''
					}}
					validationSchema={validationSchemaEditAddress}
					onSubmit={(values: FormEditAddressValues, { resetForm }) => {
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
								<Button type='submit'>Update your address</Button>
							</div>
						</form>
					)}
				</Formik>
			</Dialog>
		</>
	);
};

export default EditAddress;
