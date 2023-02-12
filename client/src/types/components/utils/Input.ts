export type InputProps = {
	id?: string;
	value?: string;
	type?: React.InputHTMLAttributes<HTMLInputElement>['type'];
	placeholder?: string;
	autoComplete?: React.InputHTMLAttributes<HTMLInputElement>['autoComplete'];
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	maxLength?: number;
	name?: string;
	hidden?: boolean;
	className?: string;
};
