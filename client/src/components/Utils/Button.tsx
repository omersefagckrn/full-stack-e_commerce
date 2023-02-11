import { Spinner } from 'assets/icons';
import React from 'react';

type ButtonProps = {
	onClick?: () => void;
	children: React.ReactNode;
	className?: string;
	type?: 'button' | 'submit' | 'reset';
	disabled?: boolean;
};

const Button = ({ onClick, children, className, type = 'button', disabled }: ButtonProps) => {
	return (
		<button
			disabled={disabled}
			onClick={onClick}
			type={type}
			className={`${className && className} bg-green_Five rounded-lg py-3 px-6 text-white font-workSans`}
		>
			{disabled ? (
				<div className='flex items-center justify-center'>
					<Spinner />
					<div>Processing...</div>
				</div>
			) : (
				children
			)}
		</button>
	);
};

export default Button;
