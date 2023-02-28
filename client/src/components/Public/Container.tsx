import { FC } from 'react';
import { Cookies, Footer, Navigation } from '..';

type ContainerProps = {
	children: React.ReactNode;
};

const Container: FC<ContainerProps> = ({ children }) => {
	return (
		<>
			<div className='flex flex-col justify-between h-screen'>
				<div className='sticky w-full top-0 z-[99]'>
					<Navigation />
				</div>
				<main className='flex-grow'>{children}</main>
				<Footer />
			</div>
			<Cookies />
		</>
	);
};

export default Container;
