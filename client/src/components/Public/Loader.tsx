import { FC } from 'react';
import { SyncLoader } from 'react-spinners';

const Loader: FC = () => {
	return <SyncLoader size={10} color='#6F55FF' />;
};

export default Loader;
