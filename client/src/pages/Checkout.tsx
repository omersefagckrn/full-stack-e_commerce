import * as Checkout from 'components/Checkout';
import { FC } from 'react';

const CheckoutDashboard: FC = () => {
	return (
		<>
			<div className='w-full h-full'>
				<Checkout.Header />
				<div className='lg:max-w-main lg:mx-auto'>
					<div className='flex flex-col lg:flex-row pb-[112px] lg:pb-0'>
						<div className='w-full lg:border-r-[1px] lg:border-border lg:h-[calc(100vh_-_112px)]'>
							<div className='px-8'>
								<Checkout.PaymentDetails />
							</div>
						</div>
						<div className='w-full lg:w-[50%]'>
							<div className='px-8 lg:pl-10'>
								<Checkout.PaymentOrder />
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className='fixed bottom-0 w-full bg-black select-none'>
				<div className='w-full text-white font-bold text-xs underline p-4 text-center'>
					After you fill out and define your payment method, cargo delivery is made as soon as possible.
				</div>
			</div>
		</>
	);
};

export default CheckoutDashboard;
