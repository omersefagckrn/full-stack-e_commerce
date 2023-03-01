import { FC } from 'react';
import { Cookies, Footer, Navigation } from '..';

type ContainerProps = {
	children: React.ReactNode;
};

const Container: FC<ContainerProps> = ({ children }) => {
	return (
		<>
			<div className='flex flex-col justify-between h-screen'>
				<Navigation />
				<main className='flex-grow'>{children}</main>
				<Footer />
			</div>
			<Cookies />
		</>
	);
};

export default Container;
