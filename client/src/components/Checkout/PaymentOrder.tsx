import Delete from 'assets/icons/Delete.svg';
import { DataView } from 'primereact/dataview';
import { Tooltip } from 'primereact/tooltip';
import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { addToCard, deleteAllItemQuantity, getTotals, removeFromCard } from 'redux/card/cardSlice';
import { useAppDispatch, useAppSelector } from 'redux/store';
import type { ICard } from 'types/redux/card';
import type { IProduct } from 'types/redux/product';

const PaymentOrder: FC = () => {
	const { cards, cardTotalPrice } = useAppSelector((state) => state.card);
	const appDispatch = useAppDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		appDispatch(getTotals());
	}, [cards, appDispatch]);

	const addCard = (product: IProduct) => {
		appDispatch(
			addToCard({
				product,
				quantity: 1
			})
		);
	};

	const removeCard = (product: IProduct) => {
		appDispatch(
			removeFromCard({
				product,
				quantity: 1
			})
		);
	};

	const deleteAllItem = (product: IProduct) => {
		appDispatch(
			deleteAllItemQuantity({
				product,
				quantity: 1
			})
		);
	};

	return (
		<>
			<Tooltip target='#deleteAllItem' />
			<div className='mt-4'>
				<div className='text-primary text-3xl'>Cart({cards.length})</div>
				<div className='flex flex-col items-center justify-between w-full space-y-2'>
					{cards && cards.length > 0 ? (
						<>
							<DataView
								value={cards}
								itemTemplate={(card: ICard) => (
									<div className='flex items-center w-full flex-row space-x-10 p-4'>
										<img
											src={card.product?.image}
											alt={card.product?._id as string}
											className='h-[100px] w-[100px] object-cover rounded-lg select-none'
										/>
										<div className='flex justify-center flex-col space-y-2 w-full'>
											<div className='text-primary font-normal text-xs w-[85%] truncate'>
												{card.product?.name}
											</div>
											<div className='text-[#666666] font-normal text-xs'>{card.product?.description}</div>
											<div className='text-[#666666] font-normal text-md underline'>
												Quantity: {card.quantity}
											</div>
											<div className='flex items-center space-x-6'>
												<div className='flex items-center space-x-2 w-full'>
													<div
														onClick={() => removeCard(card.product as IProduct)}
														className='border-[#CCCCCC] border-[1px] w-8 text-center rounded-lg text-primary cursor-pointer hover:bg-primary hover:text-white hover:border-none'
													>
														-
													</div>
													<div className='text-primary text-xl font-bold'>1</div>
													<div
														onClick={() => addCard(card.product as IProduct)}
														className='border-[#CCCCCC] border-[1px] w-8 text-center rounded-lg text-primary cursor-pointer hover:bg-primary hover:text-white hover:border-none'
													>
														+
													</div>
												</div>
												<div className='font-bold text-primary text-md'>{card.product?.price}$</div>
												<img
													data-pr-tooltip='Delete all item'
													data-pr-position='bottom'
													id='deleteAllItem'
													onClick={() => deleteAllItem(card.product as IProduct)}
													src={Delete}
													alt='Delete'
													className='w-6 h-6 cursor-pointer'
												/>
											</div>
										</div>
									</div>
								)}
								paginator
								rows={2}
							/>
							<div className='flex space-x-2 items-center justify-between'>
								<div className='font-semibold text-primary text-md'>Total</div>
								<div className='font-semibold text-primary text-md'>${cardTotalPrice.toLocaleString().slice(0, 8)} </div>
							</div>
						</>
					) : (
						<div className='flex flex-col text-center space-y-2 mb-20'>
							<div className='text-red-500 font-bold'>There are no products in your cart.</div>
							<div onClick={() => navigate('/')} className='underline cursor-pointer text-black font-medium'>
								Click for new products!
							</div>
						</div>
					)}
				</div>
			</div>
		</>
	);
};

export default PaymentOrder;
