import { FC } from 'react';

import { useNavigate } from 'react-router-dom';

const Header: FC = () => {
	const navigate = useNavigate();
	return (
		<div className='bg-black p-4'>
			<div onClick={() => navigate('/')} className='text-white'>
				Ana sayfa
			</div>
		</div>
	);
};

export default Header;
