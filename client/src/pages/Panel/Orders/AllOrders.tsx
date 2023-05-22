import { Loader } from 'components';
import { formatCurrency } from 'helper/product';
import { AppToast } from 'helper/toast';
import { Avatar } from 'primereact/avatar';
import { AvatarGroup } from 'primereact/avatargroup';
import { confirmDialog } from 'primereact/confirmdialog';
import { FC, useEffect } from 'react';
import { cancelOrder, getAdminOrders, resetOrderState, toShippingOrder } from 'redux/panel/order/orderSlice';
import { useAppDispatch, useAppSelector } from 'redux/store';
import { SubOrdersResponse } from 'types/redux/order';

const AllOrders: FC = () => {
	const appDispatch = useAppDispatch();

	const {
		orders,
		isLoadingGetAdminOrders,
		isSuccessToShippingOrder,
		isErrorToShippingOrder,
		messageToShippingOrder,
		isLoadingToShippingOrder,
		isLoadingCancelOrder,
		isErrorCancelOrder,
		messageCancelOrder,
		isSuccessCancelOrder
	} = useAppSelector((state) => state.panel.orders);

	useEffect(() => {
		appDispatch(getAdminOrders());
	}, [appDispatch]);

	useEffect(() => {
		if (isSuccessToShippingOrder) {
			AppToast({
				type: 'success',
				/* @ts-ignore */
				message: messageToShippingOrder?.message
			});
			appDispatch(resetOrderState());
			appDispatch(getAdminOrders());
		}
		if (isErrorToShippingOrder) {
			AppToast({
				type: 'error',
				/* @ts-ignore */
				message: messageToShippingOrder?.message
			});
			appDispatch(resetOrderState());
			appDispatch(getAdminOrders());
		}
	}, [isSuccessToShippingOrder, isErrorToShippingOrder, messageToShippingOrder, appDispatch]);

	useEffect(() => {
		if (isErrorCancelOrder) {
			AppToast({
				type: 'error',
				/* @ts-ignore */
				message: messageCancelOrder?.message
			});
			appDispatch(resetOrderState());
			appDispatch(getAdminOrders());
		}

		if (isSuccessCancelOrder) {
			AppToast({
				type: 'success',
				/* @ts-ignore */
				message: messageCancelOrder?.message
			});
			appDispatch(resetOrderState());
			appDispatch(getAdminOrders());
		}
	}, [isErrorCancelOrder, isSuccessCancelOrder, messageCancelOrder, appDispatch]);

	const bgColorCalculator = (status: SubOrdersResponse['status']) => {
		if (status === 'GETTING_READY') {
			return {
				backgroundColor: orders.colors.pending,
				color: 'black'
			};
		} else if (status === 'CANCELLED') {
			return {
				backgroundColor: orders.colors.cancelled,
				color: 'black'
			};
		} else if (status === 'DELIVERED') {
			return {
				backgroundColor: orders.colors.delivered,
				color: 'black'
			};
		} else if (status === 'SHIPPING') {
			return {
				backgroundColor: orders.colors.shipping,
				color: 'white'
			};
		} else {
			return {
				backgroundColor: 'white',
				color: 'black'
			};
		}
	};

	return (
		<>
			{isLoadingGetAdminOrders || isLoadingCancelOrder || isLoadingToShippingOrder ? (
				<div className='flex items-center justify-center'>
					<Loader />
				</div>
			) : (
				orders?.orders?.map((order, idx: number) => (
					<div key={idx} className='border-[1px] border-primary rounded-lg p-4 mb-2'>
						<div className='flex items-center justify-between'>
							<AvatarGroup>
								{order?.image?.map((image, idx: number) => (
									<Avatar key={idx} image={image as string} size='normal' shape='circle' />
								))}
							</AvatarGroup>
							<div>{order?.order_id}</div>
							<div>{order?.item_count} Item</div>
							<div>{formatCurrency(order?.total_price)}</div>
							<div>
								{new Date(order.date).toLocaleDateString('en-US', {
									year: 'numeric',
									month: 'long',
									day: 'numeric'
								})}
							</div>
							<div
								style={{
									backgroundColor: bgColorCalculator(order.status).backgroundColor,
									color: bgColorCalculator(order.status).color
								}}
								className='flex items-center justify-center rounded-full text-[8px] py-2 px-2 select-none'
							>
								<span className='text-xs font-bold text-center'>{order.status}</span>
							</div>
						</div>
						<div className='flex items-center space-x-4 mt-4'>
							<div
								className='text-base font-semibold text-center text-primary cursor-pointer underline'
								onClick={() => {
									confirmDialog({
										message: 'Are you sure you want to ship?',
										header: 'Confirmation',
										icon: 'pi pi-exclamation-triangle',
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
										accept: () => appDispatch(toShippingOrder(order.order_id as string))
									});
								}}
							>
								{isLoadingToShippingOrder ? 'Process in progress...' : 'Order To Shipping'}
							</div>
							<div
								className='text-base font-semibold text-center text-red-500 cursor-pointer underline'
								onClick={() => {
									confirmDialog({
										message: 'Are you sure you want to cancel order?',
										header: 'Confirmation',
										icon: 'pi pi-exclamation-triangle',
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
										accept: () => appDispatch(cancelOrder(order.order_id as string))
									});
								}}
							>
								{isLoadingCancelOrder ? 'Process in progress...' : 'Cancel Order'}
							</div>
						</div>
					</div>
				))
			)}
		</>
	);
};

export default AllOrders;
