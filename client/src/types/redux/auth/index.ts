export type AuthReduxState = {
	user: string | null;

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
};
