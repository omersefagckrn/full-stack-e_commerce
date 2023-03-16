import { ProgressSpinner } from 'primereact/progressspinner';
import { FC } from 'react';

const Loader: FC = () => {
	return <ProgressSpinner style={{ width: '30px', height: '30px' }} strokeWidth='8' animationDuration='.5s' aria-label='Loading' />;
};

export default Loader;
