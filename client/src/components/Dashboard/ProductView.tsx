import Loader from 'components/Public/Loader';
import { getStock } from 'helper/product';
import { Rating } from 'primereact/rating';
import { FC, useEffect } from 'react';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { FiTag } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { getAllProducts } from 'redux/product/productSlice';
import { useAppDispatch, useAppSelector } from 'redux/store';
const ProductView: FC = () => {
	const appDispatch = useAppDispatch();
	const navigate = useNavigate();
	const { products, isLoadingGetAllProduct } = useAppSelector((state) => state.products);

	useEffect(() => {
		appDispatch(getAllProducts());
	}, [appDispatch]);

	const formatCurrency = (value: number) => {
		return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
	};

	return (
		<>
			<div id='products' className='text-black pb-20'>
				<div className='lg:max-w-main mx-4 lg:mx-auto'>
					{isLoadingGetAllProduct ? (
						<span className='flex items-center justify-center'>
							<Loader />
						</span>
					) : (
						<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
							{products.map((product, key) => {
								return (
									<div
										onClick={() => navigate(`/product/${product._id}`)}
										key={key}
										className='p-4 border-[1px] border-slate-300 rounded-lg text-center cursor-pointer select-none transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-2'
									>
										<div className='flex flex-col items-center justify-between space-y-4 w-full'>
											<div className='flex items-center justify-between w-full'>
												<div className='flex items-center space-x-2'>
													<FiTag className='text-black w-4 h-4' />
													<div className='text-black text-xs'>{product.category}</div>
												</div>
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
												<img
													src={product.image}
													alt={product.image}
													className='w-[10rem] h-[10rem] shadow-md shadow-black object-contain rounded-lg'
												/>
												<div className='font-semibold text-sm max-w-[200px] truncate w-full lg:max-w-[250px] lg:text-base'>
													{product.name}
												</div>
												<Rating
													className='text-purple'
													value={product.rating}
													readOnly
													cancel={false}
												/>
											</div>
											<div className='flex items-center justify-between w-full'>
												<div className='text-2xl font-semibold'>{formatCurrency(product.price)}</div>
												<div className='p-3 bg-purple rounded-full cursor-pointer'>
													<AiOutlineShoppingCart className='w-4 h-4 text-white' />
												</div>
											</div>
										</div>
									</div>
								);
							})}
						</div>
					)}
				</div>
			</div>
		</>
	);
};

export default ProductView;

/*           <div className='flex items-center justify-between py-4 w-full'>
					<div className='flex space-x-5'>
						<img src={product.image} alt={product.image} className='w-[10rem] shadow-md shadow-black object-contain rounded-lg' />
						<div className='flex flex-col space-y-4 items-start justify-between'>
							<div>{product.name}</div>
							<Rating value={product.rating} readOnly cancel={false} />
							<div className='flex items-center space-x-4'>
								<div className='flex items-center space-x-2'>
									<FiTag className='text-black' />
									<div className='text-black'>{product.category}</div>
								</div>
								<div className={`text-center rounded-lg text-xs py-2 px-2 text-white ${getStock(product?.countInStock)?.stock}`}>
									<span className='text-xs font-medium'>{getStock(product?.countInStock)?.text}</span>
								</div>
							</div>
						</div>
					</div>
					<div>
						<div className='text-2xl font-semibold'>{formatCurrency(product.price)}</div>
					</div>
	        </div> 
*/
