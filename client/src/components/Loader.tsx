import { FC } from 'react';
import { ThreeDots } from 'react-loader-spinner';

const Loader: FC = () => {
	return <ThreeDots height='40' width='40' radius='9' color='#68D237' ariaLabel='three-dots-loading' wrapperStyle={{}} visible={true} />;
};

export default Loader;
