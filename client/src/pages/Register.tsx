import { FC } from 'react';
import { useAppSelector } from 'redux/store';

const Register: FC = () => {
	const { user } = useAppSelector((state) => state.auth);
	return (
		<div>
			<div>Register {user}</div>
		</div>
	);
};

export default Register;
