export interface IUser {
	id: string | undefined;
	email: string | undefined;
	name: string | undefined;
	surname: string | undefined;
	phone: string | undefined;
	isAdmin: boolean | undefined;
	createdAt: string | undefined;
	updatedAt: string | undefined;
}

export type profileReduxState = {
	user: IUser | null;
	isLoadingGetUser: boolean;
	isSuccessGetUser: boolean;
	isErrorGetUser: boolean;
	errorMessageGetUser: string | null;

	isLoadingUpdateUser: boolean;
	isSuccessUpdateUser: boolean;
	isErrorUpdateUser: boolean;
	errorMessageUpdateUser: string | null;
};
