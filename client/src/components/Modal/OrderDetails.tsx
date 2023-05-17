import Loader from 'components/Public/Loader';
import { Dialog } from 'primereact/dialog';
import { FC, useEffect } from 'react';
import { getOrdersDetails } from 'redux/order/orderSlice';
import { useAppDispatch, useAppSelector } from 'redux/store';
import type { OrderDetailsProps } from 'types/components/Modal/OrderDetails';

const OrderDetails: FC<OrderDetailsProps> = ({ visible, setVisible, orderId, userId }) => {
	const appDispatch = useAppDispatch();
	const { order, isLoadingGetOrderDetails } = useAppSelector((state) => state.order);

	useEffect(() => {
		appDispatch(
			getOrdersDetails({
				user: userId,
				order: orderId
			})
		);
	}, [appDispatch, orderId, userId]);

	return (
		<>
			<Dialog
				className='w-full lg:max-w-[774px]'
				draggable={false}
				maximizable={window.outerWidth > 775 ? false : true}
				header='Order Details'
				visible={visible}
				onHide={() => setVisible(false)}
				headerStyle={{
					paddingBottom: '0rem'
				}}
			>
				{isLoadingGetOrderDetails ? (
					<div className='flex items-center justify-center my-4'>
						<Loader />
					</div>
				) : (
					<>
						{order?.details?.map((detail: any, idx: number) => (
							<div className='border-gray border-[1px] p-3 rounded-lg my-4 select-none' key={idx}>
								<div className='flex items-center justify-between'>
									<div className='flex items-start space-x-2'>
										<img
											src={detail?.item_image}
											alt={detail?.item?.id}
											className='w-[3rem] h-[3rem] shadow-md rounded-lg border-gray border-[1px]'
										/>
										<div className='flex flex-col'>
											<div className='text-lg text-black font-semibold'>{detail?.item?.product_name}</div>
											<div className='text-xs text-gray font-normal'>{detail?.item?.product_id}</div>
										</div>
									</div>
									<div className='font-normal text-primary'>
										{detail?.item?.quantity} x {detail?.item?.unit_price}
									</div>
									<div className='font-normal text-primary text-sm'>
										{detail?.item?.quantity * detail?.item?.unit_price} TRY
									</div>
								</div>
							</div>
						))}

						<div className='flex space-x-2 items-center justify-end text-sm font-medium select-none'>
							<div className='text-primary'>Total Price:</div>
							<div className='text-redsoft underline'>{order?.payment_info?.total_price} TRY</div>
						</div>

						<hr className='my-4 text-gray' />

						<div className='font-semibold text-lg text-black'>Billing Address & Shipping Address</div>

						<div className='flex flex-col my-2 select-none'>
							<div className='flex flex-col space-y-2 border-[#C2C2C2] border-l-2 p-3 bg-[#F9F9F9]'>
								<div>
									<div className='text-sm text-black font-semibold'>{order?.payment_info?.billing_address?.title}</div>
									<div className='text-xs text-purple font-normal truncate max-w-[260px]'>
										{order?.payment_info?.billing_address?.address}
									</div>
								</div>

								<div className='flex items-center justify-between space-x-2'>
									<div>
										<div className='text-sm text-black font-semibold'>City</div>
										<div className='text-xs text-purple font-normal'>
											{order?.payment_info?.billing_address?.city_name}
										</div>
									</div>

									<div>
										<div className='text-sm text-black font-semibold'>Country</div>
										<div className='text-xs text-purple font-normal'>
											{order?.payment_info?.billing_address?.country_name}
										</div>
									</div>

									<div>
										<div className='text-sm text-black font-semibold'>Zip Code</div>
										<div className='text-xs text-purple font-normal'>
											{order?.payment_info?.billing_address?.zip_code}
										</div>
									</div>
								</div>
							</div>
						</div>
					</>
				)}
			</Dialog>
		</>
	);
};

export default OrderDetails;
