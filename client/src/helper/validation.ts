import * as Yup from 'yup';

export type FormLoginValues = {
	email: string;
	password: string;
};

export const validationSchemaLogin: Yup.ObjectSchema<FormLoginValues> = Yup.object({
	email: Yup.string().email('Invalid email format').required('Email is required'),
	password: Yup.string().required('Password is required')
});

export type FormRegisterValues = {
	name: string;
	surname: string;
	email: string;
	password: string;
	confirmPassword: string;
};

export const validationSchemaRegister: Yup.ObjectSchema<FormRegisterValues> = Yup.object({
	name: Yup.string().required('Name is required'),
	surname: Yup.string().required('Surname is required'),
	email: Yup.string().email('Invalid email format').required('Email is required'),
	password: Yup.string().required('Password is required'),
	confirmPassword: Yup.string()
		.oneOf([Yup.ref('password')], 'Passwords must match')
		.required('Confirm password is required')
});
