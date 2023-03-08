import { Button, Error, Input, Label } from 'components/Utils';
import { Formik } from 'formik';
import { validationSchemaPayment } from 'helper/validation';
import { InputMask } from 'primereact/inputmask';
import { FC } from 'react';
import { FormPaymentValues } from 'types/helper/validation';

const PaymentDetails: FC = () => {
	const onSubmit = async ({ cardName, cardNumber, cardExpiry, cardCvc }: FormPaymentValues) => {
		console.log(cardName, cardNumber, cardExpiry, cardCvc);
	};
	return (
		<Formik
			validateOnBlur={false}
			validateOnChange={false}
			initialValues={{ cardName: '', cardNumber: '', cardExpiry: '', cardCvc: '' }}
			validationSchema={validationSchemaPayment}
			onSubmit={(values: FormPaymentValues, { resetForm }) => {
				resetForm();
				onSubmit(values);
			}}
		>
			{({ handleSubmit, handleChange, values, errors }) => (
				<form onSubmit={handleSubmit} className='flex flex-col space-y-2 w-full'>
					<div className='text-primary text-3xl mt-4'>Payment Details</div>
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
							<InputMask mask='99/99' id='cardExpiry' value={values.cardExpiry} onChange={handleChange} maxLength={5} placeholder='14/01' />
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
	);
};

export default PaymentDetails;
