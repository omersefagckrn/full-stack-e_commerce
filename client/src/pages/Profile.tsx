import { Loader } from 'components';
import { FC, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { getUserProfile } from 'redux/profile/profileSlice';
import { useAppDispatch, useAppSelector } from 'redux/store';

const Profile: FC = () => {
	const appDispatch = useAppDispatch();
	const { user, isLoadingGetUser, errorMessageGetUser, isErrorGetUser } = useAppSelector((state) => state.profile);
	const navigate = useNavigate();

	useEffect(() => {
		appDispatch(getUserProfile());
	}, [appDispatch]);

	useEffect(() => {
		if (isErrorGetUser) {
			toast.error(errorMessageGetUser);
			localStorage.removeItem('token');
			navigate('/auth/login');
		}
	}, [isErrorGetUser, errorMessageGetUser, navigate]);

	const formatToLocalDate = (expectedDate: string | undefined): string => {
		const date = new Date(expectedDate as string);
		const formattedDate = date.toLocaleString('tr-TR', { timeZone: 'Europe/Istanbul' });
		return formattedDate;
	};

	return (
		<>
			<div className='flex items-center justify-between'>
				<div className='text-xl font-workSans text-black font-semibold underline select-none'>Profile</div>
				<div className='text-xs font-workSans'>
					Updated At: <span className='font-semibold'>{formatToLocalDate(user?.updatedAt)}</span>
				</div>
			</div>
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

					<div className='text-sm font-workSans text-black font-semibold pt-4 select-none'>Phone Number</div>
					<div className='text-xs font-workSans text-green_Five font-normal pt-2 select-none'>{user?.phone}</div>
				</div>
			)}
		</>
	);
};

export default Profile;
