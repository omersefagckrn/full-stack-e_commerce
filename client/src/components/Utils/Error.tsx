import { FC } from 'react';
import { ErrorProps } from 'types/components/Utils/Error';

const Error: FC<ErrorProps> = ({ error }) => {
	return <>{error && <div className='text-redsoft text-xs'>{error}</div>}</>;
};

export default Error;
