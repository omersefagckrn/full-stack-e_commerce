import React from 'react';

type ButtonProps = {
	onClick?: () => void;
	children: React.ReactNode;
	className?: string;
	type?: 'button' | 'submit' | 'reset';
};

const Button = ({ onClick, children, className, type = 'button' }: ButtonProps) => {
	return (
		<button onClick={onClick} type={type} className={`${className && className} bg-green_Five rounded-lg py-3 px-6`}>
			{children}
		</button>
	);
};

export default Button;
