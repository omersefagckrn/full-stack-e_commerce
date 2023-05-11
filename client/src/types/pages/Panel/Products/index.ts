import { IProduct } from 'types/redux/product';

export type AddProductProps = {
	visible: boolean;
	setVisible: (visible: boolean) => void;
};

export type EditProductProps = {
	visible: boolean;
	setVisible: (visible: boolean) => void;
	product: IProduct;
};

export type FormPanelAddProductValues = {
	name: string;
	price: number;
	category: string;
	countInStock: number;
	description: string;
	rating: number;
};

export type FormPanelEditProductValues = {
	name: string;
	price: number;
	category: string;
	countInStock: number;
	description: string;
	rating: number;
};
