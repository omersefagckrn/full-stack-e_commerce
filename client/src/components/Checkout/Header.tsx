import { FC } from 'react';

import ArrowLeft from 'assets/icons/arrowLeft.svg';
import { useNavigate } from 'react-router-dom';

const Header: FC = () => {
	const navigate = useNavigate();
	return (
		<div onClick={() => navigate('/')} className='flex cursor-pointer items-center space-x-4 group select-none py-5 px-10 bg-green'>
			<img src={ArrowLeft} alt='arrow left' className='w-4 h-4' />
			<div className='group-hover:underline'>Back to home</div>
		</div>
	);
};

export default Header;
