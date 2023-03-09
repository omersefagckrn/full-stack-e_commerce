export const getStock = (stock: number | undefined) => {
	if (stock === undefined) {
		return {
			stock: 'bg-redsoft',
			text: 'No stock information'
		};
	}
	if (stock >= 0 && stock <= 5)
		return {
			stock: 'bg-redsoft',
			text: 'Low'
		};
	if (stock >= 6 && stock <= 10)
		return {
			stock: 'bg-purple',
			text: 'Medium'
		};
	if (stock >= 10)
		return {
			stock: 'bg-green',
			text: 'High'
		};
};
