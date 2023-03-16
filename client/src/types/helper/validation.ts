export type FormLoginValues = {
	email: string;
	password: string;
};

export type FormRegisterValues = {
	name: string;
	surname: string;
	email: string;
	password: string;
	confirmPassword: string;
	phone: string;
};

export type FormEditProfileValues = {
	name: string | undefined;
	surname: string | undefined;
	email: string | undefined;
	phone: string | undefined;
};

export type FormPaymentValues = {
	cardName: string;
	cardNumber: string;
	cardExpiry: string;
	cardCvc: string;
};

export type FormEditAddressValues = {
	title: string | undefined;
	address: string | undefined;
	zip_code: string | undefined;
	city_name: string | undefined;
	country_name: string | undefined;
};
