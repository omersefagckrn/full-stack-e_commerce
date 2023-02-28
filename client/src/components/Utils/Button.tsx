import { FC } from 'react';
import { ButtonProps } from 'types/components/Utils/Button';

import { Button } from 'primereact/button';

const AppButton: FC<ButtonProps> = ({ onClick, children, icon, className, type = 'button', disabled, text }) => {
	return (
		<Button
			text={text}
			className={`${className} font-workSans whitespace-nowrap rounded-lg`}
			outlined
			type={type}
			label={children as string}
			iconPos='right'
			icon={icon}
			loading={disabled}
			onClick={onClick}
		/>
	);
};

export default AppButton;
