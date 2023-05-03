import * as Checkout from 'components/Checkout';
import { FC } from 'react';

const CheckoutDashboard: FC = () => {
	return (
		<>
			<Checkout.Header />
			<div className='w-full lg:max-w-main lg:mx-auto'>
				<div className='grid lg:grid-cols-2'>
					<div className='mx-8'>
						<Checkout.PaymentDetails />
					</div>
					<div className='mx-8'>
						<Checkout.PaymentOrder />
					</div>
				</div>
			</div>
		</>
	);
};

export default CheckoutDashboard;
