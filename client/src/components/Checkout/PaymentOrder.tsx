import Delete from 'assets/icons/Delete.svg';
import { addCard, handleDeleteAllItemQuantity, removeCard } from 'helper/product';
import { DataView } from 'primereact/dataview';
import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTotals } from 'redux/card/cardSlice';
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

	return (
		<>
			<>
				<div className='text-primary text-3xl my-4'>Cart</div>
				<div className='flex flex-col items-center justify-between w-full space-y-2 mb-6'>
					{cards && cards.length > 0 ? (
						<>
							<DataView
								value={cards}
								itemTemplate={(card: ICard) => (
									<div className='flex lg:items-center w-full flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-10 p-4 select-none'>
										<img
											src={card.product?.image}
											alt={card.product?._id as string}
											className='h-[100px] object-cover rounded-lg select-none'
										/>
										<div className='flex flex-col space-y-2 w-full'>
											<div className='text-primary font-normal text-xs'>{card.product?.name}</div>
											<div className='text-[#666666] font-normal text-xs'>{card.product?.description}</div>
											<div className='text-[#666666] font-normal text-md underline'>
												Quantity: {card.quantity}
											</div>
											<div className='flex items-center text-center space-x-6'>
												<div className='flex items-center space-x-2 w-full'>
													<div
														onClick={() =>
															removeCard(card.product as IProduct, appDispatch)
														}
														className='border-[#CCCCCC] border-[1px] w-8 text-center rounded-lg text-primary cursor-pointer hover:bg-primary hover:text-white hover:border-none'
													>
														-
													</div>
													<div className='text-primary text-xl font-bold'>1</div>
													<div
														onClick={() =>
															addCard(card.product as IProduct, appDispatch)
														}
														className='border-[#CCCCCC] border-[1px] w-8 text-center rounded-lg text-primary cursor-pointer hover:bg-primary hover:text-white hover:border-none'
													>
														+
													</div>
												</div>
												<div className='font-bold text-primary text-md text-center'>
													{card.product?.price}$
												</div>
												<img
													onClick={() =>
														handleDeleteAllItemQuantity(
															card.product as IProduct,
															appDispatch
														)
													}
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
								<div className='font-semibold text-primary text-md'>${cardTotalPrice.toLocaleString().slice(0, 8)}</div>
							</div>
						</>
					) : (
						<div className='flex items-center justify-center py-2'>
							<div className='text-xs text-redsoft font-semibold select-none text-center'>
								You have no items in your shopping cart.{' '}
								<span
									onClick={() => {
										navigate('/');
										setTimeout(() => {
											const link = document.createElement('a');
											link.href = '/#products';
											link.click();
										}, 1000);
									}}
									className='underline cursor-pointer'
								>
									Click here
								</span>{' '}
								to continue shopping.
							</div>
						</div>
					)}
				</div>
			</>
		</>
	);
};

export default PaymentOrder;
