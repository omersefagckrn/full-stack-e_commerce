import Loader from 'components/Public/Loader';
import { Button, Error, Input, Label } from 'components/Utils';
import { Formik } from 'formik';
import { AppCartStorage } from 'helper/storage';
import { AppToast } from 'helper/toast';
import { validationSchemaPayment } from 'helper/validation';
import { InputMask } from 'primereact/inputmask';
import { RadioButton, RadioButtonChangeEvent } from 'primereact/radiobutton';
import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createOrder, resetCreateOrder } from 'redux/order/orderSlice';
import { getUserAddress, getUserProfile } from 'redux/profile/profileSlice';
import { useAppDispatch, useAppSelector } from 'redux/store';
import type { FormPaymentValues } from 'types/helper/validation';
import { IAddress } from 'types/redux/profile';

const PaymentDetails: FC = () => {
	const { user, address, isLoadingGetUserAddress } = useAppSelector((state) => state.profile);
	const { cardTotalPrice, cards } = useAppSelector((state) => state.card);
	const { id } = useAppSelector((state) => state.auth);
	const { paymentResponse, isSuccessCreateOrder, isErrorCreateOrder } = useAppSelector((state) => state.order);

	const navigate = useNavigate();
	const AppDispatch = useAppDispatch();

	const [basketItems, setBasketItems] = useState<[] | any>([]);
	const [selectedAddress, setSelectedAddress] = useState<boolean | IAddress>(false);

	useEffect(() => {
		AppDispatch(getUserAddress(id));
		AppDispatch(getUserProfile());
		setBasketItems(() => {
			let primaryBasketItems: any = [];

			cards.forEach((item: any) => {
				for (let i = 0; i < item.quantity; i++) {
					primaryBasketItems.push({
						id: item.product._id,
						price: item.product.price.toFixed(1).toString(),
						name: item.product.name,
						category1: item.product.category,
						category2: item.product.category,
						itemType: 'PHYSICAL'
					});
				}
			});

			return primaryBasketItems;
		});
	}, [AppDispatch, id, cards]);

	useEffect(() => {
		if (isSuccessCreateOrder) {
			AppToast({
				type: 'success',
				message: paymentResponse?.message
			});
			AppDispatch(resetCreateOrder());
			setBasketItems([]);
			AppCartStorage.removeItem('card');
			setTimeout(() => {
				navigate('/user/profile/orders');
			}, 2000);
		}
		if (isErrorCreateOrder) {
			AppToast({
				type: 'error',
				message: paymentResponse?.message
			});
			AppDispatch(resetCreateOrder());
		}
	}, [isSuccessCreateOrder, paymentResponse, isErrorCreateOrder, AppDispatch, navigate]);

	const onSubmit = async ({ cardName, cardNumber, cardExpiry, cardCvc }: FormPaymentValues) => {
		if (selectedAddress === false) {
			return AppToast({
				type: 'error',
				message: 'Please select an address'
			});
		} else {
			await AppDispatch(
				createOrder({
					user_id: user?._id,
					price: cardTotalPrice.toFixed(1).toString(),
					paidPrice: cardTotalPrice.toFixed(1).toString(),
					installment: 1,
					paymentCard: {
						cardHolderName: cardName,
						cardNumber: cardNumber.replace(/ /g, ''),
						expireYear: '20' + cardExpiry.split('/')[1].trim(),
						expireMonth: cardExpiry.split('/')[0].trim(),
						cvc: cardCvc,
						registerCard: 0
					},
					buyer: {
						id: user?._id,
						name: user?.name,
						surname: user?.surname,
						identityNumber: '11111111111',
						email: user?.email,
						gsmNumber: '+90' + user?.phone?.replace(/[\s()-]+/g, ''),
						registrationDate: new Date().toISOString().slice(0, 19).replace('T', ' '),
						lastLoginDate: new Date().toISOString().slice(0, 19).replace('T', ' '),
						registrationAddress: (selectedAddress as IAddress).address,
						city: (selectedAddress as IAddress).city_name,
						country: (selectedAddress as IAddress).country_name,
						zipCode: (selectedAddress as IAddress).zip_code,
						ip: '85.34.78.112'
					},
					shippingAddress: {
						address: (selectedAddress as IAddress).address,
						zipCode: (selectedAddress as IAddress).zip_code,
						contactName: user?.name,
						city: (selectedAddress as IAddress).city_name,
						country: (selectedAddress as IAddress).country_name
					},
					billingAddress: {
						address: (selectedAddress as IAddress).address,
						zipCode: (selectedAddress as IAddress).zip_code,
						contactName: user?.name,
						city: (selectedAddress as IAddress).city_name,
						country: (selectedAddress as IAddress).country_name
					},
					basketItems,
					currency: 'TRY'
				})
			);
		}
	};

	return (
		<>
			<div className='text-primary text-3xl my-4'>Payment Details</div>

			{address && address.length === 0 && !isLoadingGetUserAddress && (
				<div className='flex items-center justify-center py-4'>
					<div className='text-xs text-redsoft font-semibold select-none text-center'>
						You don't have any address yet.{' '}
						<span onClick={() => navigate('/user/profile/address')} className='underline cursor-pointer'>
							Please add new address.
						</span>
					</div>
				</div>
			)}

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
				initialValues={{ cardName: 'John doe', cardNumber: '5528 7900 0000 0008', cardExpiry: '12/30', cardCvc: '123' }}
				validationSchema={validationSchemaPayment}
				onSubmit={(values: FormPaymentValues) => onSubmit(values)}
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
						<div className='flex flex-col lg:flex-row lg:space-x-2'>
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
