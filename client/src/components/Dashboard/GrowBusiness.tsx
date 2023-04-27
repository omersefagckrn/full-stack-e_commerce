import Icon1 from 'assets/business/icon1.svg';
import Icon2 from 'assets/business/icon2.svg';
import Icon3 from 'assets/business/icon3.svg';
import Icon4 from 'assets/business/icon4.svg';
import Icon5 from 'assets/business/icon5.svg';
import Icon6 from 'assets/business/icon6.svg';
import { FC } from 'react';

const Elements = (img: any, title: string, desc: string) => (
	<div className='bg-[#F3F5F7] flex flex-col items-center justify-center lg:items-start lg:justify-start p-8 '>
		<img src={img} alt='icon-1' className='w-20 h-20 mb-[36px]' />
		<div className='font-medium text-xl text-center lg:text-left'>{title}</div>
		<div className='mb-4 font-normal text-sm pt-4 text-center lg:text-left'>{desc}</div>
	</div>
);

const GrowBusiness: FC = () => {
	return (
		<div className='lg:mx-auto lg:max-w-main mt-20 select-none'>
			<div className='mx-4 lg:mx-0'>
				<div className='text-center text-5xl text-black'>
					Built-in features that help you <br /> <span className='text-blue-700 font-bold'>grow</span> your business
				</div>
				<div className='grid md:grid-cols-2 lg:grid-cols-3 gap-5 py-20'>
					{Elements(
						Icon1,
						'Lightning-Fast Storefronts',
						'Build your lightning-fast e-commerce store and increase your conversion rate. Get more sales with conversion focused optimization.'
					)}
					{Elements(
						Icon2,
						'Cross-borders E-Commerce',
						'Sell worldwide from a single dashboard. Create an international brand with unlimited currency and language options.'
					)}
					{Elements(
						Icon3,
						'24/7 Support',
						'Launch your website quickly with the help of in-house experts. Get access to 24/7 technical support whenever you need.'
					)}
					{Elements(Icon4, 'Visual Theme Editor', 'Easily create and edit site pages with a drag-and-drop editor, no coding needed.')}
					{Elements(
						Icon5,
						'Omnichannel Commerce',
						'Sell, market and grow across marketplaces, social media platforms, search engines and brick and mortar stores. Leverage the power of omnichannel today.'
					)}
					{Elements(
						Icon6,
						'Automation & Marketing',
						'Increase your sales with advanced marketing tools. Integrate with GA4, GTM, Instagram and Facebook easily.'
					)}
				</div>
			</div>
		</div>
	);
};

export default GrowBusiness;
