import { FC } from 'react';
import AllOrders from './Orders/AllOrders';

const PanelOrders: FC = () => {
	return (
		<>
			<div className='text-3xl my-6 font-semibold text-center'>All Orders</div>
			<AllOrders />
		</>
	);
};

export default PanelOrders;
