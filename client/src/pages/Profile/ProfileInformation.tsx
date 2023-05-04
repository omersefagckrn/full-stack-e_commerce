import { Loader } from 'components';
import { FC, useEffect } from 'react';
import { getUserProfile } from 'redux/profile/profileSlice';
import { useAppDispatch, useAppSelector } from 'redux/store';

const ProfileInformation: FC = () => {
	const appDispatch = useAppDispatch();
	const { user, isLoadingGetUser } = useAppSelector((state) => state.profile);

	useEffect(() => {
		appDispatch(getUserProfile());
	}, [appDispatch]);

	const formatToLocalDate = (expectedDate: string | undefined): string => {
		const date = new Date(expectedDate as string);
		const formattedDate = date.toLocaleString('tr-TR', { timeZone: 'Europe/Istanbul' });
		return formattedDate;
	};

	return (
		<>
			<div className='flex items-center justify-between select-none'>
				<div className='text-xl text-black font-semibold'>Profile Info</div>
				<div className='text-base'>
					Updated At: <span className='font-semibold'>{formatToLocalDate(user?.updatedAt)}</span>
				</div>
			</div>
			{isLoadingGetUser ? (
				<div className='flex items-center justify-center'>
					<Loader />
				</div>
			) : (
				<div className='flex flex-col space-y-4'>
					<div className='text-base text-purple font-normal pt-2 select-none'>Here you can find and edit information about yourself.</div>
					<div>
						<div className='text-sm text-black font-semibold'>Name</div>
						<div className='text-base text-purple font-normal'>{user?.name + ' ' + user?.surname}</div>
					</div>
					<div>
						<div className='text-sm text-black font-semibold'>Email</div>
						<div className='text-base text-purple font-normal'>{user?.email}</div>
					</div>

					<div>
						<div className='text-sm text-black font-semibold'>Phone Number</div>
						<div className='text-base text-purple font-normal'>
							{user?.phone?.replace(/[\s()-]+/g, '').replace(/^(?:\+|0)(\d{3})(\d{3})(\d{2})(\d{2})$/, '+90 $1 $2 $3 $4')}
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default ProfileInformation;
