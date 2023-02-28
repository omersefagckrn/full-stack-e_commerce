import { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from 'redux/product/productSlice';
import { useAppDispatch, useAppSelector } from 'redux/store';

const ProductDetails: FC = () => {
	const { id } = useParams();
	const dispatch = useAppDispatch();
	const { product } = useAppSelector((state) => state.products);

	useEffect(() => {
		dispatch(getProductById(id as string));
	}, [dispatch, id]);

	return (
		<>
			<div className='rounded-lg p-3 border border-purple-400'>{product?.name}</div>
		</>
	);
};

export default ProductDetails;
