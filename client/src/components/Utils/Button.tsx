import { Spinner } from 'assets/icons';
import { FC } from 'react';
import { ButtonProps } from 'types/components/utils/Button';

const Button: FC<ButtonProps> = ({ onClick, children, className, type = 'button', disabled }) => {
	return (
		<button
			disabled={disabled}
			onClick={onClick}
			type={type}
			className={`${className && className} bg-green_Five rounded-lg py-3 px-6 text-white font-workSans`}
		>
			{disabled ? (
				<div className='flex items-center justify-center'>
					<Spinner className='animate-spin mr-3 h-5 w-5' />
					<div>Processing...</div>
				</div>
			) : (
				children
			)}
		</button>
	);
};

export default Button;
