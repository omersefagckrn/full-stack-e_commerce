import { FormEditProfileValues, FormLoginValues, FormRegisterValues } from 'types/helper/validation';
import * as Yup from 'yup';

export const validationSchemaLogin: Yup.ObjectSchema<FormLoginValues> = Yup.object({
	email: Yup.string().email('Invalid email format').required('Email is required'),
	password: Yup.string().required('Password is required')
});

export const validationSchemaRegister: Yup.ObjectSchema<FormRegisterValues> = Yup.object({
	name: Yup.string().required('Name is required'),
	surname: Yup.string().required('Surname is required'),
	email: Yup.string().email('Invalid email format').required('Email is required'),
	password: Yup.string().required('Password is required'),
	phone: Yup.string().required('Phone is required'),
	confirmPassword: Yup.string()
		.oneOf([Yup.ref('password')], 'Passwords must match')
		.required('Confirm password is required')
});

export const validationSchemaEditProfile: Yup.ObjectSchema<FormEditProfileValues> = Yup.object({
	name: Yup.string(),
	surname: Yup.string(),
	email: Yup.string().email('Invalid email format'),
	phone: Yup.string()
});
