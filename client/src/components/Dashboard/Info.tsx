import { FC } from 'react';

import ArrowRight from 'assets/icons/arrowRight.svg';
import { Button } from 'components/Utils';
/* @ts-ignore */
import HeroVideo from 'assets/videos/dashboard-video.mp4';

const Info: FC = () => {
	return (
		<div className='bg-black pb-10'>
			<div className='font-workSans'>
				<div className='flex flex-col items-center justify-center mx-4 space-y-4 lg:space-y-10'>
					<div className='text-white text-3xl lg:text-[96px] font-semibold text-center leading-[116px]'>Your E-Commerce</div>
					<div className='flex items-center space-x-4'>
						<div className='font-bold text-3xl lg:text-[80px] text-white'>Business</div>
						<img className='w-14 lg:w-28' src={ArrowRight} alt='arrow-right' />

						<video autoPlay loop muted className='w-full max-w-[100px] lg:max-w-[215px] rounded-lg object-cover'>
							<source src={HeroVideo} type='video/mp4' />
						</video>
					</div>
					<div className='text-white text-3xl lg:text-[80px] font-bold leading-[116px]'>with Pockie</div>
					<div className='font-normal text-lg text-[#8B9197] text-center'>
						On the product sales platform we have
						<div>prepared for you, you can pay with the best performance and have your product</div>
						shipped.
					</div>
					<div className='flex items-center space-x-4 mt-10'>
						<Button>Get Started</Button>
						<Button text>
							<div className='flex space-x-2 '>
								<div className='text-white whitespace-nowrap'>Leave a call</div>
								<img src={ArrowRight} alt='arrow-right' className='w-[20px]' />
							</div>
						</Button>
					</div>

					<div className='py-3 px-5 text-center bg-white rounded-full mt-10 text-purple'>support@pockie.com</div>
				</div>
			</div>
		</div>
	);
};

export default Info;
