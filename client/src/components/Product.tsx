import { FC } from 'react';
import { ProductProps } from 'types/components/Product';

const Product: FC<ProductProps> = ({ product }) => {
	return (
		<>
			<div className='rounded-lg p-3 border border-purple-400'>
				{product?.name}
				{product?.price}
				{product?.category}
				<img src={product?.image} alt={product?.name} />
			</div>
		</>
	);
};

export default Product;
