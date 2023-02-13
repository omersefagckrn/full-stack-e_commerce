import { Loader } from 'components';
import { FC, useEffect } from 'react';
import { getUserProfile } from 'redux/profile/profileSlice';
import { useAppDispatch, useAppSelector } from 'redux/store';

const Profile: FC = () => {
	const appDispatch = useAppDispatch();
	const { user, isLoadingGetUser } = useAppSelector((state) => state.profile);

	useEffect(() => {
		appDispatch(getUserProfile());
	}, [appDispatch]);

	return (
		<>
			<div className='text-xl font-workSans text-black font-semibold underline select-none'>Profile</div>
			<div className='text-xs font-workSans text-green_Five font-normal pt-2 select-none'>Here you can find and edit information about yourself.</div>
			{isLoadingGetUser ? (
				<div className='flex items-center justify-center'>
					<Loader />
				</div>
			) : (
				<div>
					<div className='text-sm font-workSans text-black font-semibold pt-4 select-none'>Name</div>
					<div className='text-xs font-workSans text-green_Five font-normal pt-2 select-none'>{user?.name + ' ' + user?.surname}</div>
					<div className='text-sm font-workSans text-black font-semibold pt-4 select-none'>Email</div>
					<div className='text-xs font-workSans text-green_Five font-normal pt-2 select-none'>{user?.email}</div>
				</div>
			)}
		</>
	);
};

export default Profile;
