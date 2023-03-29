import Loader from 'components/Public/Loader';
import { Button, Error, Input, Label } from 'components/Utils';
import { Formik } from 'formik';
import { AppToast } from 'helper/toast';
import { validationSchemaPayment } from 'helper/validation';
import { InputMask } from 'primereact/inputmask';
import { RadioButton, RadioButtonChangeEvent } from 'primereact/radiobutton';
import { FC, useEffect, useState } from 'react';
import { getUserAddress } from 'redux/profile/profileSlice';
import { useAppDispatch, useAppSelector } from 'redux/store';
import type { FormPaymentValues } from 'types/helper/validation';
import { IAddress } from 'types/redux/profile';

const PaymentDetails: FC = () => {
	const { user, address, isLoadingGetUserAddress } = useAppSelector((state) => state.profile);
	const AppDispatch = useAppDispatch();
	const [selectedAddress, setSelectedAddress] = useState<boolean | IAddress>(false);

	useEffect(() => {
		AppDispatch(getUserAddress(user?._id));
	}, [AppDispatch, user?._id]);

	const onSubmit = async ({ cardName, cardNumber, cardExpiry, cardCvc }: FormPaymentValues) => {
		if (selectedAddress === false) {
			AppToast({
				type: 'error',
				message: 'Please select an address'
			});
		} else {
			/* ##TODO: Order dispatch */
			console.log(cardName, cardNumber, cardExpiry, cardCvc, selectedAddress);
		}
	};

	return (
		<>
			<div className='text-primary text-3xl my-4'>Payment Details</div>

			{address && address.length === 0 && <div className='text-sm text-redsoft underline font-semibold'>You don't have any address.</div>}

			{isLoadingGetUserAddress ? (
				<div className='flex items-center justify-center my-2'>
					<Loader />
				</div>
			) : (
				address &&
				address.length > 0 &&
				Array.isArray(address) && (
					<>
						<div className='text-sm text-black font-semibold'>You must choose an address to continue!</div>
						<div className='grid lg:grid-cols-2 gap-4 mt-2'>
							{address.map((item) => (
								<div className='flex flex-row relative' key={item._id}>
									<RadioButton
										className='absolute left-0 w-full h-full rounded-lg hover:border-[0.5px] border-black'
										inputId={item.title}
										name='address'
										value={item}
										onChange={(e: RadioButtonChangeEvent) => setSelectedAddress(e.value)}
										checked={selectedAddress === item}
									/>
									<div
										className={`${
											selectedAddress === item ? 'bg-primary text-white shadow-md' : 'bg-[#E3F2FD]'
										} rounded-lg w-full p-3`}
									>
										<div className='flex flex-col space-y-1 text-xs font-semibold select-none'>
											<div className='flex space-x-2 underline'>
												{item.title} & {item.city_name}
											</div>
											<div>
												{item.address} {item.country_name}
											</div>
										</div>
									</div>
								</div>
							))}
						</div>
					</>
				)
			)}

			<Formik
				validateOnBlur={false}
				validateOnChange={false}
				initialValues={{ cardName: '', cardNumber: '', cardExpiry: '', cardCvc: '' }}
				validationSchema={validationSchemaPayment}
				onSubmit={(values: FormPaymentValues) => {
					onSubmit(values);
				}}
			>
				{({ handleSubmit, handleChange, values, errors }) => (
					<form onSubmit={handleSubmit} className='flex flex-col space-y-2 w-full'>
						<div className='flex flex-col space-y-2'>
							<Label label='Name on Card' />
							<Input id='cardName' value={values.cardName} onChange={handleChange} placeholder='Alfonso Delarosa' />
							<Error error={errors.cardName} />
						</div>
						<div className='flex flex-col space-y-2 mt-4 lg:mt-6'>
							<Label label='Card Number' />
							<InputMask
								id='cardNumber'
								onChange={handleChange}
								value={values.cardNumber}
								maxLength={19}
								mask='9999 9999 9999 9999'
								placeholder='1220 - 1289 - 9981 - 2987'
							/>
							<Error error={errors.cardNumber} />
						</div>
						<div className='flex space-x-2'>
							<div className='flex flex-col space-y-2 w-full'>
								<Label label='MM/YY' />
								<InputMask
									mask='99/99'
									id='cardExpiry'
									value={values.cardExpiry}
									onChange={handleChange}
									maxLength={5}
									placeholder='14/01'
								/>
								<Error error={errors.cardExpiry} />
							</div>
							<div className='flex flex-col space-y-2 w-full lg:w-[82%]'>
								<Label label='Cvc' />
								<Input id='cardCvc' onChange={handleChange} value={values.cardCvc} maxLength={3} placeholder='520' />
								<Error error={errors.cardCvc} />
							</div>
						</div>
						<div className='pt-6'>
							<Button type='submit' className='w-full'>
								Complete the payment
							</Button>
						</div>
					</form>
				)}
			</Formik>
		</>
	);
};

export default PaymentDetails;