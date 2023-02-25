export type ProductProps = {
	product: {
		_id: string;
		name: string;
		image: string;
		description: string;
		category: string;
		price: number;
		countInStock: number;
		rating: number;
		createdAt: string;
		updatedAt: string;
	};
};
