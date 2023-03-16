import { IAddress } from 'types/redux/profile';

export type EditAddressProps = {
	visible: boolean;
	setVisible: (visible: boolean) => void;
	address: IAddress | null;
};
