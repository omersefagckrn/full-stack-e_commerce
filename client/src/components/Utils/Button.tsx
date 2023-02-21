import { FC } from 'react';
import { ButtonProps } from 'types/components/utils/Button';

import { Button } from 'primereact/button';

const AppButton: FC<ButtonProps> = ({ onClick, children, icon, className, type = 'button', disabled }) => {
	return <Button className={`${className && className} font-workSans`} outlined type={type} label={children as string} iconPos='right' icon={icon} loading={disabled} onClick={onClick} />;
};

export default AppButton;
