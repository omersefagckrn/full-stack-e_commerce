export type OrderDetailsProps = {
	orderId: string | undefined;
	userId: string | undefined;
	visible: boolean;
	setVisible: (visible: boolean) => void;
};
