import * as Checkout from 'components/Checkout';
import { FC } from 'react';

const CheckoutDashboard: FC = () => {
	return (
		<>
			<Checkout.Header />
			<div className='lg:max-w-main lg:mx-auto'>
				<div className='grid lg:grid-cols-2'>
					<div className='px-8'>
						<Checkout.PaymentDetails />
					</div>
					<div className='px-8'>
						<Checkout.PaymentOrder />
					</div>
				</div>
			</div>
		</>
	);
};

export default CheckoutDashboard;
