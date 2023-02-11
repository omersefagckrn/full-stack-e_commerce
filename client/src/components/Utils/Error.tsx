import { FC } from 'react';

type ErrorProps = {
	error: string | undefined;
};

const Error: FC<ErrorProps> = ({ error }) => {
	return <>{error && <div className='text-red_Seven text-xs'>{error}</div>}</>;
};

export default Error;
