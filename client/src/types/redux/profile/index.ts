export interface IUser {
	id: string;
	email: string;
	name: string;
	surname: string;
	isAdmin: boolean;
	createdAt: string;
	updatedAt: string;
}

export type profileReduxState = {
	user: IUser | null;
	isLoadingGetUser: boolean;
	isSuccessGetUser: boolean;
	isErrorGetUser: boolean;
	errorMessageGetUser: string | null;
};
