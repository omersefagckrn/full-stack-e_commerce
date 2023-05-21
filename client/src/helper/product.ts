export const getStock = (stock: number | undefined) => {
	if (stock === undefined) {
		return {
			stock: 'bg-redsoft',
			text: 'No stock information'
		};
	}
	if (stock === 0) {
		return {
			stock: 'bg-redsoft',
			text: 'Out stock'
		};
	}
	if (stock >= 0 && stock <= 20)
		return {
			stock: 'bg-redsoft',
			text: 'Low'
		};
	if (stock >= 20 && stock <= 100)
		return {
			stock: 'bg-purple',
			text: 'Medium'
		};
	if (stock >= 200)
		return {
			stock: 'bg-green',
			text: 'High'
		};
};

export const formatCurrency = (value: number) => {
	return value.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' });
};
