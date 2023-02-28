import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import ArrowLeft from 'assets/icons/arrowLeft.svg';

const Header: FC = () => {
	const navigate = useNavigate();
	return (
		<div className='select-none py-2 px-4 lg:py-5 lg:px-10 bg-green-300'>
			<div onClick={() => navigate('/')} className='inline-flex cursor-pointer items-center space-x-4 group'>
				<img src={ArrowLeft} alt='arrow left' className='w-4 h-4' />
				<div className='group-hover:underline'>Back to home</div>
			</div>
		</div>
	);
};

export default Header;
