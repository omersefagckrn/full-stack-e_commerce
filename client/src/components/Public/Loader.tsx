import { ProgressSpinner } from 'primereact/progressspinner';
import { FC } from 'react';

const Loader: FC = () => {
	return <ProgressSpinner style={{ width: '50px', height: '50px' }} strokeWidth='8' fill='var(--surface-ground)' animationDuration='.5s' />;
};

export default Loader;
