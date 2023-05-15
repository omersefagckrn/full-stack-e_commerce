import toast, { Toast } from 'react-hot-toast';

type ToastType = Pick<Toast, any>;

export const AppToast = ({ message, type }: ToastType) => {
	switch (type) {
		case 'success':
			return toast.success(message);
		case 'error':
			return toast.error(message);
		default:
			return toast.error(`Invalid toast type: ${type}.`);
	}
};
