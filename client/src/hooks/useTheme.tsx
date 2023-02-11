import { useEffect } from 'react';
import { useAppSelector } from 'redux/store';

const useTheme = () => {
	const { mode } = useAppSelector((state) => state.theme);

	useEffect(() => {
		if (mode === 'dark') {
			document.documentElement.classList.add('dark');
			document.documentElement.classList.remove('light');
		} else {
			document.documentElement.classList.remove('dark');
			document.documentElement.classList.add('light');
		}
	}, [mode]);

	return [mode];
};

export default useTheme;
