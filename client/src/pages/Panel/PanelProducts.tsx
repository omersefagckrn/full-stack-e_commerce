import { Loader } from 'components';
import { Button } from 'components/Utils';
import { getStock } from 'helper/product';
import { AppToast } from 'helper/toast';
import { confirmDialog } from 'primereact/confirmdialog';
import { Image } from 'primereact/image';
import { Rating } from 'primereact/rating';
import { FC, useEffect, useState } from 'react';
import { FiTag } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { deleteProduct, getProducts, resetDeleteProduct } from 'redux/panel/product/productSlice';
import { useAppDispatch, useAppSelector } from 'redux/store';
import { IProduct } from 'types/redux/product';
import AddProduct from './Products/AddProduct';
import EditProduct from './Products/EditProduct';

const PanelProducts: FC = () => {
	const [showAddProductModal, setShowAddProductModal] = useState<boolean>(false);
	const [showEditProductModal, setShowEditProductModal] = useState<boolean>(false);
	const [propsProduct, setPropsProduct] = useState<IProduct | any>(null);
	const appDispatch = useAppDispatch();
	const navigate = useNavigate();
	const { products, isLoadingGetProducts, isLoadingDeleteProduct, errorMessageDeleteProduct, isSuccessDeleteProduct, isErrorDeleteProduct } = useAppSelector((state) => state.panel.products);

	useEffect(() => {
		appDispatch(getProducts());
	}, [appDispatch]);

	useEffect(() => {
		if (isSuccessDeleteProduct) {
			AppToast({
				type: 'success',
				message: 'Product deleted successfully'
			});
			appDispatch(getProducts());
			appDispatch(resetDeleteProduct());
		}

		if (isErrorDeleteProduct) {
			AppToast({
				type: 'error',
				message: errorMessageDeleteProduct
			});
			appDispatch(resetDeleteProduct());
		}
	}, [isSuccessDeleteProduct, isErrorDeleteProduct, errorMessageDeleteProduct, appDispatch]);

	const formatCurrency = (value: number) => {
		return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
	};

	const handleUpdateProduct = (product: IProduct) => {
		setShowEditProductModal(true);
		setPropsProduct(product);
	};

	const handleDeleteProduct = (id: IProduct['_id']) => {
		confirmDialog({
			message: 'Are you sure to delete this product?',
			header: 'Delete Product',
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
			accept: () => appDispatch(deleteProduct(id))
		});
	};

	return (
		<>
			{showAddProductModal && <AddProduct visible={showAddProductModal} setVisible={() => setShowAddProductModal(false)} />}
			{showEditProductModal && <EditProduct product={propsProduct} visible={showEditProductModal} setVisible={() => setShowEditProductModal(false)} />}

			<div className='text-3xl my-6 font-semibold text-center'>Your products will be listed here.</div>
			<div className='cursor-pointer text-center text-white bg-green p-3 w-full rounded-lg' onClick={() => setShowAddProductModal(true)}>
				Yeni ürün ekle
			</div>
			<div className='my-6'>
				{isLoadingGetProducts ? (
					<span className='flex items-center justify-center'>
						<Loader />
					</span>
				) : (
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
						{products.map((product, key) => {
							return (
								<div key={key} className='p-4 border-[1px] border-slate-300 rounded-lg text-center select-none'>
									<div className='flex flex-col items-center justify-between space-y-4 w-full h-full'>
										<div className='flex items-center justify-between w-full'>
											<div className='flex items-center space-x-2'>
												<FiTag className='text-black w-4 h-4' />
											</div>
											<div className='text-black text-xs'>{product.category}</div>
											<div
												className={`text-center rounded-lg text-xs py-2 px-2 text-white ${
													getStock(product?.countInStock)?.stock
												}`}
											>
												<span className='text-xs font-medium'>
													{getStock(product?.countInStock)?.text}
												</span>
											</div>
										</div>

										<div className='flex flex-col items-center justify-center space-y-2'>
											<Image
												src={product.image}
												alt='Image'
												className='w-[10rem] shadow-md shadow-black object-contain rounded-lg'
											/>
											<div
												onClick={() => navigate(`/product/${product._id}`)}
												className='font-semibold text-sm max-w-[200px] truncate w-full lg:max-w-[250px] lg:text-base underline'
											>
												{product.name}
											</div>
											<Rating className='text-purple' value={product.rating} readOnly cancel={false} />
										</div>
										<div className='text-2xl font-semibold'>{formatCurrency(product.price)}</div>
										<div className='flex items-center justify-between w-full'>
											<Button onClick={() => handleUpdateProduct(product)}>Update</Button>
											<Button
												disabled={isLoadingDeleteProduct}
												onClick={() => handleDeleteProduct(product?._id)}
											>
												Delete
											</Button>
										</div>
									</div>
								</div>
							);
						})}
					</div>
				)}
			</div>
		</>
	);
};

export default PanelProducts;
