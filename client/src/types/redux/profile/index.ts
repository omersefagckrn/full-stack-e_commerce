export interface IUser {
	_id: string | undefined;
	email: string | undefined;
	name: string | undefined;
	surname: string | undefined;
	phone: string | undefined;
	isAdmin: boolean | undefined;
	updatedAt: string | undefined;
}

export interface IAddress {
	_id: string;
	user_id: string;
	title: string | undefined;
	address: string | undefined;
	zip_code: string | undefined;
	city_name: string | undefined;
	country_name: string | undefined;
}

export type profileReduxState = {
	user: IUser | null;
	address: IAddress[] | null;
	isLoadingGetUser: boolean;
	isSuccessGetUser: boolean;
	isErrorGetUser: boolean;
	errorMessageGetUser: string | null;

	isLoadingUpdateUser: boolean;
	isSuccessUpdateUser: boolean;
	isErrorUpdateUser: boolean;
	errorMessageUpdateUser: string | null;

	isLoadingGetUserAddress: boolean;
	isSuccessGetUserAddress: boolean;
	isErrorGetUserAddress: boolean;
	errorMessageGetUserAddress: string | null;

	isLoadingDeleteUserAddress: boolean;
	isSuccessDeleteUserAddress: boolean;
	isErrorDeleteUserAddress: boolean;
	errorMessageDeleteUserAddress: string | null;

	isLoadingEditUserAddress: boolean;
	isSuccessEditUserAddress: boolean;
	isErrorEditUserAddress: boolean;
	errorMessageEditUserAddress: string | null;
};
