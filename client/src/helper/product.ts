export const getStock = (stock: number | undefined) => {
	if (stock === undefined) {
		return {
			stock: '',
			text: 'No stock information'
		};
	}
	if (stock >= 0 && stock <= 5)
		return {
			stock: 'bg-redsoft',
			text: 'Low Stock'
		};
	if (stock >= 6 && stock <= 10)
		return {
			stock: 'bg-purple',
			text: 'Medium Stock'
		};
	if (stock >= 10)
		return {
			stock: 'bg-green',
			text: 'High Stock'
		};
};
