import { Loader } from 'components';
import { getStock } from 'helper/product';
import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllProducts } from 'redux/product/productSlice';
import { useAppDispatch, useAppSelector } from 'redux/store';
import { IProduct } from 'types/redux/product';

import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Rating } from 'primereact/rating';

const ProductTableDashboard: FC = () => {
	const appDispatch = useAppDispatch();
	const { products, isLoadingGetAllProduct } = useAppSelector((state) => state.products);
	const navigate = useNavigate();

	useEffect(() => {
		appDispatch(getAllProducts());
	}, [appDispatch]);

	const formatCurrency = (value: number) => {
		return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
	};

	const priceBodyTemplate = (product: IProduct) => {
		return formatCurrency(product.price);
	};

	const ratingBodyTemplate = (product: IProduct) => {
		return <Rating value={product.rating} readOnly cancel={false} />;
	};

	const imageBodyTemplate = (product: IProduct) => {
		return <img src={product.image} alt={product.image} className='w-[6rem] shadow-md rounded-lg' />;
	};

	const nameBodyTemplate = (product: IProduct) => {
		return <span className='font-medium'>{product.name}</span>;
	};

	const categoryBodyTemplate = (product: IProduct) => {
		return <span className='font-medium'>{product.category}</span>;
	};

	const statusBodyTemplate = (product: IProduct) => {
		return (
			<div className={`text-center rounded-lg text-xs py-2 px-2 text-white ${getStock(product?.countInStock)?.stock}`}>
				<span className='text-xs font-medium'>{getStock(product?.countInStock)?.text}</span>
			</div>
		);
	};

	const footer = `In total there are ${products ? products.length : 0} products.`;

	const header = (
		<div className='flex flex-wrap items-center justify-between gap-2'>
			<span className='text-xl text-900 font-bold'>Products</span>
			<Button onClick={() => appDispatch(getAllProducts())} icon='pi pi-refresh' rounded raised />
		</div>
	);

	return (
		<>
			<div className='text-black pb-20'>
				<div className='lg:max-w-main mx-4 lg:mx-auto'>
					{isLoadingGetAllProduct ? (
						<span className='flex items-center justify-center'>
							<Loader />
						</span>
					) : (
						<DataTable
							onRowSelect={(event) => navigate(`/product/${event.data._id}`)}
							value={products}
							selectionMode='single'
							paginator
							rows={5}
							rowsPerPageOptions={[5, 10, 25, 50]}
							header={header}
							footer={footer}
							tableStyle={{ minWidth: '60rem' }}
						>
							<Column field='name' sortable header='Name' body={nameBodyTemplate}></Column>
							<Column field='image' header='Image' body={imageBodyTemplate}></Column>
							<Column field='price' sortable header='Price' body={priceBodyTemplate}></Column>
							<Column field='category' header='Category' body={categoryBodyTemplate}></Column>
							<Column field='rating' header='Rating' body={ratingBodyTemplate}></Column>
							<Column field='countInStock' header='Stock' body={statusBodyTemplate}></Column>
						</DataTable>
					)}
				</div>
			</div>
		</>
	);
};

export default ProductTableDashboard;
