import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { AppToast } from './toast';

const confirmEndpoint = (endpoint: string) => {
	return `${process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PROD_API : process.env.REACT_APP_DEV_API}${endpoint}`;
};

const headerBuilder = (headers?: object) => {
	const defaultHeaders = {
		'Content-Type': 'application/json'
	} as AxiosRequestConfig['headers'];

	return { ...defaultHeaders, ...(headers ?? {}) };
};

const handleUnauthorized = (error: any) => {
	if (error.response?.statusText === 'Unauthorized') {
		localStorage.clear();
		window.location.href = '/auth/login';
		setTimeout(() => {
			AppToast({ message: 'Please login again.', type: 'error' });
		}, 1500);
	}
};

export const apiHelper = {
	get: async (endpoint: string, headers?: object): Promise<AxiosResponse> => {
		try {
			return await axios.get(confirmEndpoint(endpoint), headerBuilder(headers));
		} catch (error) {
			handleUnauthorized(error);
			return error.response;
		}
	},
	post: async (endpoint: string, body: object, headers?: object): Promise<AxiosResponse> => {
		try {
			return await axios.post(confirmEndpoint(endpoint), body, headerBuilder(headers));
		} catch (error) {
			handleUnauthorized(error);
			return error.response;
		}
	},
	put: async (endpoint: string, body: object, headers?: object): Promise<AxiosResponse> => {
		try {
			return await axios.put(confirmEndpoint(endpoint), body, headerBuilder(headers));
		} catch (error) {
			handleUnauthorized(error);
			return error.response;
		}
	},
	delete: async (endpoint: string, headers?: object): Promise<AxiosResponse> => {
		try {
			return await axios.delete(confirmEndpoint(endpoint), headerBuilder(headers));
		} catch (error) {
			handleUnauthorized(error);
			return error.response;
		}
	}
};
