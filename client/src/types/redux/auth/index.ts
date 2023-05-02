import { IUser } from '../profile';

export type AuthReduxState = {
	user: IUser | null;

	isErrorLogin: boolean;
	isLoadingLogin: boolean;
	isSuccessLogin: boolean;
	messageLogin: string;

	isLoadingLogout: boolean;
	isErrorLogout: boolean;
	isSuccessLogout: boolean;

	isLoadingRegister: boolean;
	isErrorRegister: boolean;
	isSuccessRegister: boolean;
	messageRegister: string;

	isAuth: boolean;
	isAdmin: boolean;
	id: string;
};
