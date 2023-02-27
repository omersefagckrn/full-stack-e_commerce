import { Logo } from 'assets';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

const Header: FC = () => {
	const navigate = useNavigate();
	return (
		<div onClick={() => navigate('/')} className='border-b-[1px] border-border select-none bg-black py-2 px-4 lg:py-5 lg:px-10 cursor-pointer'>
			<Logo />
		</div>
	);
};

export default Header;
