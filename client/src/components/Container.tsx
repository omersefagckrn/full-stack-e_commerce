import { FC } from 'react';
import { Footer, Navigation } from '.';

type ContainerProps = {
	children: React.ReactNode;
};

const Container: FC<ContainerProps> = ({ children }) => {
	return (
		<div className='h-screen flex flex-col justify-between'>
			<Navigation />
			<main className='flex-grow'>{children}</main>
			<Footer />
		</div>
	);
};

export default Container;
