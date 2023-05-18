import { Location, Mail, Phone } from 'assets/icons';
import { FC } from 'react';

const Footer: FC = () => {
	return (
		<div className='bg-black'>
			<div className='lg:mx-auto lg:max-w-main py-10 lg:py-20'>
				<div className='grid gird-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-6 ml-6'>
					<div className='flex flex-col'>
						<div className='text-gray text-lg underline pb-6'>Contact</div>
						<div className='text-gray text-xs pt-6'>Limited Company</div>
						<div className='flex items-center space-x-2 pt-6'>
							<Location />
							<div className='text-gray text-xs'>1658 Rosewood Lane New York city, NY</div>
						</div>
						<div className='flex items-center space-x-2 pt-6'>
							<Phone />
							<div className='text-green text-xs'>0507 845 5183</div>
						</div>
						<div className='flex items-center space-x-2 pt-6'>
							<Mail />
							<div className='text-green text-xs'>omergckrnx@gmail.com</div>
						</div>
					</div>
					<div className='flex flex-col'>
						<div className='text-gray text-lg underline pb-6'>Cooperation - Association</div>
						<div className='text-gray text-xs pt-6'>Operation Regulation of EC-Exchange</div>
						<div className='text-gray text-xs pt-6'>Return Policy</div>
						<div className='text-gray text-xs pt-6'>Privacy Policy</div>
						<div className='text-gray text-xs pt-6'>Selling With ftribe</div>
					</div>
					<div className='flex flex-col'>
						<div className='text-gray text-lg underline pb-6'>Customer Support</div>
						<div className='text-gray text-xs pt-6'>Operation Regulation of EC-Exchange</div>
						<div className='text-gray text-xs pt-6'>Frequently asked Questions</div>
						<div className='text-gray text-xs pt-6'>Submit Support Request</div>
						<div className='text-gray text-xs pt-6'>Ordering Guide</div>
						<div className='text-gray text-xs pt-6'>Shipping Methods</div>
					</div>
					<div className='flex flex-col'>
						<div className='text-gray text-lg pb-6 underline'>Installment Purchase Guide</div>
						<div className='text-gray text-xs pt-6'>Import Policy</div>
						<div className='pt-6'>
							<div className='text-gray text-xs'>Customer Support:</div>
							<div className='text-green text-xs'>customer@ftribe.com</div>
						</div>
						<div className='pt-6'>
							<div className='text-gray text-xs'>Security Error Report:</div>
							<div className='text-green text-xs'>admin@gmail.com</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Footer;
