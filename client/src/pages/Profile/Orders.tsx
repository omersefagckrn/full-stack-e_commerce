import { Loader } from 'components';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { FC, useEffect } from 'react';
import { getOrders } from 'redux/order/orderSlice';
import { useAppDispatch, useAppSelector } from 'redux/store';
import { SubOrdersResponse } from 'types/redux/order';

const Orders: FC = () => {
	const appDispatch = useAppDispatch();
	const { orders, isLoadingGetOrder } = useAppSelector((state) => state.order);
	const { id } = useAppSelector((state) => state.auth);

	console.log();

	useEffect(() => {
		appDispatch(getOrders(id));
	}, [appDispatch, id]);

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

	const formatCurrency = (value: number) => {
		return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
	};

	const footer = `In total there are ${orders?.orders?.length} orders.`;

	const orderIdBody = (order: SubOrdersResponse) => {
		return <div className='text-blue'>{order.order_id}</div>;
	};

	const statusBody = (order: SubOrdersResponse) => {
		return (
			<div
				style={{
					backgroundColor: bgColorCalculator(order.status).backgroundColor,
					color: bgColorCalculator(order.status).color
				}}
				className='flex items-center justify-center rounded-full text-[8px] py-2 px-2'
			>
				<span className='text-xs font-bold text-center'>{order.status}</span>
			</div>
		);
	};

	const totalPriceBody = (order: SubOrdersResponse) => {
		return <div>{formatCurrency(order.total_price)}</div>;
	};

	const itemCountBody = (order: SubOrdersResponse) => {
		return <div>{order.item_count}</div>;
	};

	return (
		<>
			<div className='text-xl text-black font-semibold select-none'>Your orders</div>
			{!isLoadingGetOrder && orders?.orders?.length === 0 && (
				<div className='flex items-center justify-center py-4'>
					<div className='text-lg text-black font-semibold select-none text-center'>You have no orders.</div>
				</div>
			)}
			{isLoadingGetOrder ? (
				<div className='flex items-center justify-center py-4'>
					<Loader />
				</div>
			) : (
				orders?.orders?.length > 0 && (
					<div className='my-4'>
						<DataTable
							selectionMode='single'
							paginator
							rows={5}
							rowsPerPageOptions={[5, 10, 25, 50]}
							footer={footer}
							value={orders.orders}
							size='normal'
						>
							<Column field='order_id' header='Order ID' sortable body={orderIdBody}></Column>
							<Column
								headerStyle={{
									alignItems: 'center',
									textAlign: 'center'
								}}
								field='item_count'
								header='Item Count'
								sortable
								body={itemCountBody}
							></Column>
							<Column field='total_price' header='Total Price' sortable body={totalPriceBody}></Column>
							<Column field='status' header='Status' sortable body={statusBody}></Column>
						</DataTable>
					</div>
				)
			)}
		</>
	);
};

export default Orders;
