import { FC } from 'react';
import { SyncLoader } from 'react-spinners';

const Loader: FC = () => {
	return <SyncLoader size={12} color='#FF0000' />;
};

export default Loader;
