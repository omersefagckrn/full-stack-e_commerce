import { FC, useEffect } from 'react';
import { getUserProfile } from 'redux/profile/profileSlice';
import { useAppDispatch, useAppSelector } from 'redux/store';

const Profile: FC = () => {
	const appDispatch = useAppDispatch();
	const { user } = useAppSelector((state) => state.profile);

	useEffect(() => {
		appDispatch(getUserProfile());
	}, [appDispatch]);

	return (
		<>
			<div className='text-xl font-workSans text-black font-semibold underline select-none'>Profile</div>
			<div className='text-xs font-workSans text-green_Five font-normal pt-2 select-none'>
				Here you can find and edit information about yourself.
			</div>
			<div>{user?.name + '' + user?.surname}</div>
			<div>{user?.email}</div>
		</>
	);
};

export default Profile;
