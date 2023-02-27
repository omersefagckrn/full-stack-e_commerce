import { InputText } from 'primereact/inputtext';
import { FC } from 'react';
import { InputProps } from 'types/components/utils/Input';

const Input: FC<InputProps> = ({ placeholder, value, onChange, hidden, maxLength, autoComplete, id, type, className, ...props }) => {
	return (
		<InputText
			tooltipOptions={{ position: 'bottom' }}
			tooltip={placeholder}
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
