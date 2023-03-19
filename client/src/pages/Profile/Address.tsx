import { EditAddress, Loader } from 'components';
import AddAddress from 'components/Modal/AddAddress';
import { AppToast } from 'helper/toast';
import { confirmDialog } from 'primereact/confirmdialog';
import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteUserAddress, getUserAddress, reset } from 'redux/profile/profileSlice';
import { useAppDispatch, useAppSelector } from 'redux/store';
import { IAddress } from 'types/redux/profile';

const Address: FC = () => {
	const appDispatch = useAppDispatch();
	const navigate = useNavigate();
	const [showEditModal, setShowEditModal] = useState<boolean | undefined>(false);
	const [showAddModal, setShowAddModal] = useState<boolean | undefined>(false);
	const [propsAddress, setPropsAddress] = useState<IAddress | null>(null);

	const {
		user,
		address,
		isLoadingGetUserAddress,
		isErrorGetUserAddress,
		errorMessageGetUserAddress,
		isErrorDeleteUserAddress,
		errorMessageDeleteUserAddress,
		isLoadingDeleteUserAddress,
		isSuccessDeleteUserAddress,
		isSuccessEditUserAddress
	} = useAppSelector((state) => state.profile);

	useEffect(() => {
		appDispatch(getUserAddress(user?._id));
	}, [appDispatch, user?._id]);

	useEffect(() => {
		if (isErrorGetUserAddress) {
			AppToast({
				type: 'error',
				message: errorMessageGetUserAddress
			});
			localStorage.removeItem('token');
			navigate('/auth/login');
		}

		if (isErrorDeleteUserAddress) {
			AppToast({
				type: 'error',
				message: errorMessageDeleteUserAddress
			});
		}

		if (isSuccessDeleteUserAddress) {
			AppToast({
				type: 'success',
				message: 'Delete address successfully!'
			});
			appDispatch(getUserAddress(user?._id));
			appDispatch(reset());
		}

		if (isSuccessEditUserAddress) {
			appDispatch(getUserAddress(user?._id));
			appDispatch(reset());
		}
	}, [
		isErrorGetUserAddress,
		isErrorDeleteUserAddress,
		errorMessageGetUserAddress,
		errorMessageDeleteUserAddress,
		isSuccessDeleteUserAddress,
		navigate,
		appDispatch,
		user?._id,
		isSuccessEditUserAddress
	]);

	return (
		<>
			{showEditModal && <EditAddress address={propsAddress} visible={showEditModal} setVisible={() => setShowEditModal(false)} />}
			{showAddModal && <AddAddress visible={showAddModal} setVisible={() => setShowAddModal(false)} />}

			<div className='flex items-center justify-between'>
				<div className='text-xl text-black font-semibold select-none cursor-pointer'>My Address</div>
				<div
					onClick={() => {
						setShowAddModal(true);
					}}
					className='text-sm underline font-light text-green cursor-pointer select-none'
				>
					Add new address
				</div>
			</div>

			{isLoadingGetUserAddress && !isLoadingDeleteUserAddress ? (
				<div className='flex items-center justify-center'>
					<Loader />
				</div>
			) : (
				<div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4 select-none'>
					{address &&
						address.length > 0 &&
						Array.isArray(address) &&
						address?.map((item, index) => (
							<div key={index} className='flex flex-col w-full max-w-full'>
								<div className='flex flex-col space-y-2 border-[#C2C2C2] border-l-2 p-3 bg-[#F9F9F9]'>
									<div>
										<div className='text-sm text-black font-semibold'>{item.title}</div>
										<div className='text-xs text-purple font-normal'>{item.address}</div>
									</div>

									<div className='flex items-center justify-between space-x-2'>
										<div>
											<div className='text-sm text-black font-semibold'>City</div>
											<div className='text-xs text-purple font-normal'>{item.city_name}</div>
										</div>

										<div>
											<div className='text-sm text-black font-semibold'>Country</div>
											<div className='text-xs text-purple font-normal'>{item.country_name}</div>
										</div>

										<div>
											<div className='text-sm text-black font-semibold'>Zip Code</div>
											<div className='text-xs text-purple font-normal'>{item.zip_code}</div>
										</div>
									</div>
								</div>
								<div className='flex items-center space-x-2 mt-2'>
									<div
										className='text-redsoft text-sm font-semibold cursor-pointer underline'
										onClick={() => {
											confirmDialog({
												message: 'Are you sure to delete this address?',
												header: 'Delete Address',
												icon: 'pi pi-exclamation-triangle',
												acceptClassName: 'p-button-danger',
												headerStyle: {
													padding: '2rem'
												},
												contentStyle: {
													paddingBottom: '2rem',
													paddingRight: '2rem',
													paddingLeft: '2rem'
												},
												maskStyle: {
													backgroundColor: 'rgba(0,0,0,0.5)'
												},
												accept: () => {
													appDispatch(deleteUserAddress(item._id));
												}
											});
										}}
									>
										Delete
									</div>
									<div
										onClick={() => {
											setShowEditModal(true);
											setPropsAddress(item);
										}}
										className='text-black text-sm font-semibold cursor-pointer underline'
									>
										Update
									</div>
								</div>
							</div>
						))}
				</div>
			)}

			{address && address.length === 0 && <div className='text-sm text-redsoft underline font-semibold'>You don't have any address.</div>}
		</>
	);
};

export default Address;
