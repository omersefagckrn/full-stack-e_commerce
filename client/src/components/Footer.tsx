import { Location, Mail, Phone } from 'assets/icons';
import { FC } from 'react';

const Footer: FC = () => {
	return (
		<div className='bg-black'>
			<div className='lg:mx-auto lg:max-w-footer py-10 lg:py-20'>
				<div className='grid gird-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-6 ml-6 lg:ml-0'>
					<div className='flex flex-col'>
						<div className='text-gray_Two text-lg font-workSans underline pb-6'>Contact</div>
						<div className='text-gray_Two text-[12px] pt-6'>Limited Company</div>
						<div className='flex items-center space-x-2 pt-6'>
							<Location />
							<div className='text-gray_Two text-[12px]'>1658 Rosewood Lane New York city, NY</div>
						</div>
						<div className='flex items-center space-x-2 pt-6'>
							<Phone />
							<div className='text-green_Five text-[12px] '>0507 845 5183</div>
						</div>
						<div className='flex items-center space-x-2 pt-6'>
							<Mail />
							<div className='text-green_Five text-[12px]'>omergckrnx@gmail.com</div>
						</div>
					</div>
					<div className='flex flex-col'>
						<div className='text-gray_Two text-lg font-workSans underline pb-6'>Cooperation - Association</div>
						<div className='text-gray_Two text-[12px] pt-6'>Operation Regulation of EC-Exchange</div>
						<div className='text-gray_Two text-[12px] pt-6'>Return Policy</div>
						<div className='text-gray_Two text-[12px] pt-6'>Privacy Policy</div>
						<div className='text-gray_Two text-[12px] pt-6'>Selling With ftribe</div>
					</div>
					<div className='flex flex-col'>
						<div className='text-gray_Two text-lg font-workSans underline pb-6'>Customer Support</div>
						<div className='text-gray_Two text-[12px] pt-6'>Operation Regulation of EC-Exchange</div>
						<div className='text-gray_Two text-[12px] pt-6'>Frequently asked Questions</div>
						<div className='text-gray_Two text-[12px] pt-6'>Submit Support Request</div>
						<div className='text-gray_Two text-[12px] pt-6'>Ordering Guide</div>
						<div className='text-gray_Two text-[12px] pt-6'>Shipping Methods</div>
					</div>
					<div className='flex flex-col'>
						<div className='text-gray_Two text-lg font-workSans pb-6 underline'>Installment Purchase Guide</div>
						<div className='text-gray_Two text-[12px] font-workSans pt-6'>Import Policy</div>
						<div className='pt-6'>
							<div className='text-gray_Two text-[12px] font-workSans'>Customer Support:</div>
							<div className='text-green_Five text-xs'>customer@ftribe.com</div>
						</div>
						<div className='pt-6'>
							<div className='text-gray_Two text-[12px] font-workSans'>Security Error Report:</div>
							<div className='text-green_Five text-xs'>admin@gmail.com</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Footer;
