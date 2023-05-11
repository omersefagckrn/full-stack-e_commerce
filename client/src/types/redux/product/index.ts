export interface IProduct {
	_id: string;
	name: string;
	image: any;
	description: string;
	category: string;
	price: number;
	countInStock: number;
	rating: number;
	createdAt: string;
	updatedAt: string;
}

export type productReduxState = {
	products: IProduct[];
	product: IProduct | null;
	isLoadingGetAllProduct: boolean;
	isSuccessGetAllProduct: boolean;
	isErrorGetAllProduct: boolean;
	errorMessageGetAllProduct: null | string;

	isLoadingGetProductById: boolean;
	isSuccessGetProductById: boolean;
	isErrorGetProductById: boolean;
	errorMessageGetProductById: null | string;

	isLoadingDeleteProduct: boolean;
	isSuccessDeleteProduct: boolean;
	isErrorDeleteProduct: boolean;
	errorMessageDeleteProduct: null | string;

	isLoadingCreateProduct: boolean;
	isSuccessCreateProduct: boolean;
	isErrorCreateProduct: boolean;
	errorMessageCreateProduct: null | string;

	isLoadingUpdateProduct: boolean;
	isSuccessUpdateProduct: boolean;
	isErrorUpdateProduct: boolean;
	errorMessageUpdateProduct: null | string;
};
