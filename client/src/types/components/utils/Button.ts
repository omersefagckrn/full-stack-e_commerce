export type ButtonProps = {
	onClick?: () => void;
	children: React.ReactNode;
	className?: string;
	type?: 'button' | 'submit' | 'reset';
	disabled?: boolean;
	icon?: string;
	text?: boolean;
};
