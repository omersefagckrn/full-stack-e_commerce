import { Container, Loader } from 'components';
import { Button } from 'components/Utils';
import { getStock } from 'helper/product';
import { BreadCrumb } from 'primereact/breadcrumb';
import { Image } from 'primereact/image';
import type { MenuItem } from 'primereact/menuitem';
import { Rating } from 'primereact/rating';
import { FC, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { addToCard } from 'redux/card/cardSlice';
import { getProductById } from 'redux/product/productSlice';
import { useAppDispatch, useAppSelector } from 'redux/store';
import { IProduct } from 'types/redux/product';

const ProductDetails: FC = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const appDispatch = useAppDispatch();
	const { product, isLoadingGetProductById } = useAppSelector((state) => state.products);
	const { isAuth } = useAppSelector((state) => state.auth);

	useEffect(() => {
		appDispatch(getProductById(id as string));
	}, [appDispatch, id]);

	const items: MenuItem[] = [{ label: product?.name }];

	const home: MenuItem = { icon: 'pi pi-home', url: '/' };

	const addCard = (product: IProduct | null) => {
		if (!isAuth) return navigate('/auth/login');
		appDispatch(
			addToCard({
				product,
				quantity: 1
			})
		);
	};

	return (
		<Container>
			<div className='lg:max-w-main lg:mx-auto space-y-4 m-4'>
				{isLoadingGetProductById ? (
					<div className='flex items-center justify-center mt-2'>
						<Loader />
					</div>
				) : (
					<>
						<div className='mt-2'>
							<BreadCrumb className='shadow-md' model={items} home={home} />
						</div>
						<div className='grid lg:grid-cols-2 shadow-md gap-6 border border-gray rounded-lg p-4'>
							<Image className='w-full h-full' src={product?.image} alt={product?.name} preview />
							<div className='flex flex-col'>
								<div className='flex flex-col space-y-1'>
									<div className='text-blue font-medium text-md'>{product?.category}</div>
									<div className='text-2xl font-bold'>{product?.name}</div>
									<div className='flex flex-col items-start space-y-2'>
										<div className='flex items-center space-x-2 text-center'>
											<Rating value={product?.rating} readOnly cancel={false} />
											<span className='text-md text-gray'>{product?.rating}/5</span>
										</div>
										<div className={`text-xs py-2 px-2 text-white ${getStock(product?.countInStock)?.stock}`}>
											<span className='text-xs font-medium'>{getStock(product?.countInStock)?.text}</span>
										</div>
									</div>
									<div className='py-3'>
										<div className='h-[0.5px] bg-gray' />
									</div>
								</div>
								<div className='text-primary font-medium'>{product?.description}</div>
								<div className='text-2xl font-bold text-black'>${product?.price}</div>
								<Button onClick={() => addCard(product)} className='mt-3' children='Add to cart' />
							</div>
						</div>
					</>
				)}
			</div>
		</Container>
	);
};

export default ProductDetails;
