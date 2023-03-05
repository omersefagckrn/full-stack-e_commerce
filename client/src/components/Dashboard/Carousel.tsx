import { Loader } from 'components';
import { getStock } from 'helper/product';
import { Avatar } from 'primereact/avatar';
import { Carousel, CarouselResponsiveOption } from 'primereact/carousel';
import { Image } from 'primereact/image';
import { Rating } from 'primereact/rating';
import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { addToCard } from 'redux/card/cardSlice';
import { getAllProducts } from 'redux/product/productSlice';
import { useAppDispatch, useAppSelector } from 'redux/store';
import { IProduct } from 'types/redux/product';

const responsiveOptions: CarouselResponsiveOption[] = [
	{
		breakpoint: '1000px',
		numVisible: 3,
		numScroll: 1
	},
	{
		breakpoint: '991px',
		numVisible: 2,
		numScroll: 1
	},
	{
		breakpoint: '200px',
		numVisible: 1,
		numScroll: 1
	}
];

const CarouselDashboard: FC = () => {
	const appDispatch = useAppDispatch();
	const { products, isLoadingGetAllProduct } = useAppSelector((state) => state.products);
	const { isAuth } = useAppSelector((state) => state.auth);
	const navigate = useNavigate();

	useEffect(() => {
		appDispatch(getAllProducts());
	}, [appDispatch]);

	const addCard = (product: IProduct) => {
		if (!isAuth) return navigate('/auth/login');
		appDispatch(
			addToCard({
				product,
				quantity: 1
			})
		);
	};

	return (
		<>
			<div className='text-black pb-20'>
				<div className='lg:max-w-main mx-4 lg:mx-auto'>
					{isLoadingGetAllProduct ? (
						<span className='flex items-center justify-center'>
							<Loader />
						</span>
					) : (
						<Carousel
							value={products}
							numVisible={3}
							numScroll={1}
							responsiveOptions={responsiveOptions}
							itemTemplate={(product: IProduct) => (
								<div className='flex flex-col items-center justify-center rounded-lg border-[0.5px] border-gray p-2 m-2 space-y-4 select-none relative'>
									<Image
										preview
										zoomSrc={product?.image}
										className='w-44 h-auto shadow-lg rounded-lg'
										src={product?.image}
										alt={product?.name}
									/>
									<div
										onClick={() => {
											navigate(`/product/${product._id}`);
										}}
										className='text-lg font-semibold text-center w-full max-w-[10rem] lg:max-w-[20rem] truncate underline cursor-pointer'
									>
										{product?.name}
									</div>
									<div className='text-xs max-w-[10rem] w-full lg:max-w-[20rem] truncate'>{product?.description}</div>
									<Rating value={product?.rating} readOnly cancel={false} />
									<div className={`text-xs px-4 py-3 rounded-full text-white ${getStock(product?.countInStock)?.stock}`}>
										<span className='text-xs font-medium'>{getStock(product?.countInStock)?.text}</span>
									</div>
									<Avatar
										onClick={() => addCard(product)}
										className='absolute -top-6 -right-2 rounded-full hover:scale-105 hover:transition-all bg-black text-white'
										label='+'
										size='normal'
									/>
								</div>
							)}
						/>
					)}
				</div>
			</div>
		</>
	);
};

export default CarouselDashboard;
