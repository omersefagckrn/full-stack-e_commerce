import { Avatar } from 'primereact/avatar';
import { Carousel, CarouselResponsiveOption } from 'primereact/carousel';
import { Rating } from 'primereact/rating';
import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { addToCard } from 'redux/card/cardSlice';
import { getAllProducts } from 'redux/product/productSlice';
import { useAppDispatch, useAppSelector } from 'redux/store';
import { IProduct } from 'types/redux/product';

const CarouselDashboard: FC = () => {
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
			breakpoint: '600px',
			numVisible: 1,
			numScroll: 1
		}
	];

	const getStock = (stock: number) => {
		if (stock >= 0 && stock <= 5)
			return {
				stock: 'bg-red-700',
				text: 'Low Stock'
			};
		if (stock >= 6 && stock <= 10)
			return {
				stock: 'bg-yellow-400',
				text: 'Medium Stock'
			};
		if (stock >= 10)
			return {
				stock: 'bg-green-700',
				text: 'High Stock'
			};
	};
	const appDispatch = useAppDispatch();
	const { products } = useAppSelector((state) => state.products);
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
				<div className='lg:max-w-navigation mx-4 lg:mx-auto'>
					<div className='text-center text-5xl pb-10'>Popular Purchases</div>
					<Carousel
						value={products}
						numVisible={3}
						numScroll={1}
						responsiveOptions={responsiveOptions}
						itemTemplate={(product: IProduct) => (
							<div className='flex flex-col items-center justify-center rounded-lg border-[0.5px] border-gray-200 py-4 space-y-4 select-none m-1 xl:m-2 bg-white relative'>
								<img className='w-44 h-auto shadow-lg rounded-lg' src={product?.image} alt={product?.name} />
								<div
									onClick={() => {
										navigate(`/product/${product._id}`);
									}}
									className='text-lg font-semibold font-workSans text-center w-full max-w-[10rem] lg:max-w-[20rem] truncate underline cursor-pointer'
								>
									{product?.name}
								</div>
								<div className='text-xs font-workSans max-w-[10rem] w-full lg:max-w-[20rem] truncate'>{product?.description}</div>
								<Rating value={product?.rating} readOnly cancel={false} />
								<div className={`text-xs font-workSans px-4 py-3 rounded-full text-white ${getStock(product?.countInStock)?.stock}`}>
									<span className='text-xs font-workSans font-medium'>{getStock(product?.countInStock)?.text}</span>
								</div>
								<Avatar
									onClick={() => addCard(product)}
									className='absolute -top-6 -right-2 rounded-full hover:scale-105 hover:transition-all bg-red-500 text-white'
									label='+'
									size='normal'
								/>
							</div>
						)}
					/>
				</div>
			</div>
		</>
	);
};

export default CarouselDashboard;
