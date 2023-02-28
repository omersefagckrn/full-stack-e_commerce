import { Loader } from 'components';
import { FC, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { getUserProfile } from 'redux/profile/profileSlice';
import { useAppDispatch, useAppSelector } from 'redux/store';

const ProfileInformation: FC = () => {
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
			<div className='flex items-center justify-between select-none'>
				<div className='text-xl font-workSans text-black font-semibold underline'>Profile Info</div>
				<div className='text-xs font-workSans'>
					Updated At: <span className='font-semibold'>{formatToLocalDate(user?.updatedAt)}</span>
				</div>
			</div>
			{isLoadingGetUser ? (
				<div className='flex items-center justify-center'>
					<Loader />
				</div>
			) : (
				<div className='flex flex-col space-y-4'>
					<div className='text-xs font-workSans text-purple font-normal pt-2 select-none'>Here you can find and edit information about yourself.</div>

					<div>
						<div className='text-sm font-workSans text-black font-semibold '>Name</div>
						<div className='text-xs font-workSans text-purple font-normal'>{user?.name + ' ' + user?.surname}</div>
					</div>
					<div>
						<div className='text-sm font-workSans text-black font-semibold'>Email</div>
						<div className='text-xs font-workSans text-purple font-normal'>{user?.email}</div>
					</div>

					<div>
						<div className='text-sm font-workSans text-black font-semibold'>Phone Number</div>
						<div className='text-xs font-workSans text-purple font-normal'>{user?.phone}</div>
					</div>
				</div>
			)}
		</>
	);
};

export default ProfileInformation;
