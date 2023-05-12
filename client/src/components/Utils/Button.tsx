import { FC } from 'react';

import { Button } from 'primereact/button';
import type { ButtonProps } from '../../types/components/utils/Button';

const AppButton: FC<ButtonProps> = ({ onClick, children, icon, className, type = 'button', disabled, text, ref }) => {
	return (
		<Button
			raised
			text={text}
			ref={ref}
			className={`${className} whitespace-nowrap rounded-lg border-none`}
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
