import { FC } from 'react';

type InputProps = {
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

const Input: FC<InputProps> = ({ placeholder, value, onChange, hidden, maxLength, autoComplete, id, type, className, ...props }) => {
	return (
		<input
			hidden={hidden}
			maxLength={maxLength}
			autoComplete={'off'}
			id={id}
			onChange={onChange}
			value={value}
			type={type}
			placeholder={placeholder}
			{...props}
			className={`bg-white border-[1px] border-grayTwo rounded-lg focus:outline-none placeholder:text-grayThree placeholder:font-workSans py-3 px-4 ${className}`}
		/>
	);
};

export default Input;
