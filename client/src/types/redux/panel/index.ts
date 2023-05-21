export interface SubOrdersResponse {
	date: Date;
	order_id: string;
	status: string;
	total_price: number;
	item_count: number;
	image: String[];
}

export interface IAdminOrdersResponse {
	orders: SubOrdersResponse[];
	colors: {
		delivered: string;
		pending: string;
		cancelled: string;
		shipping: string;
	};
}
