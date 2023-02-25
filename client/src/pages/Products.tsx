import { Product } from 'components';
import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllProducts } from 'redux/product/productSlice';
import { useAppDispatch, useAppSelector } from 'redux/store';

const Products: FC = () => {
	const appDispatch = useAppDispatch();
	const { products } = useAppSelector((state) => state.products);
	const navigate = useNavigate();

	useEffect(() => {
		appDispatch(getAllProducts());
	}, [appDispatch]);

	return (
		<div className='lg:max-w-screen-xl lg:mx-auto bg-red-500'>
			<div className='grid grid-cols-4 gap-6 py-4'>
				{products &&
					products.length > 0 &&
					products.map((product) => (
						<div onClick={() => navigate(`/product/${product._id}`)} key={product._id}>
							<Product product={product} />
						</div>
					))}
			</div>
		</div>
	);
};

export default Products;
