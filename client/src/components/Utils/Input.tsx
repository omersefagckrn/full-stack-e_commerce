import { InputText } from 'primereact/inputtext';
import { FC } from 'react';
import { InputProps } from 'types/components/Utils/Input';

const Input: FC<InputProps> = ({ placeholder, value, onChange, hidden, maxLength, autoComplete, id, type, className }) => {
	return (
		<InputText
			hidden={hidden}
			maxLength={maxLength}
			autoComplete={'off' || autoComplete}
			id={id}
			onChange={onChange}
			value={value}
			type={type}
			placeholder={placeholder}
			className={className}
		/>
	);
};

export default Input;
