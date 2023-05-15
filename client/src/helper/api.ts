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

export const apiHelper = {
	get: async (endpoint: string, headers?: object): Promise<AxiosResponse> => {
		try {
			return await axios.get(confirmEndpoint(endpoint), headerBuilder(headers));
		} catch (error) {
			if (error.response.statusText === 'Unauthorized') {
				localStorage.clear();
				window.location.href = '/auth/login';
				AppToast({
					type: 'error',
					message: error.response.data.message
				});
			}
			return await axios.get(confirmEndpoint(endpoint), headerBuilder(headers));
		}
	},
	post: async (endpoint: string, body: object, headers?: object): Promise<AxiosResponse> => {
		try {
			return await axios.post(confirmEndpoint(endpoint), body, headerBuilder(headers));
		} catch (error) {
			if (error.response.statusText === 'Unauthorized') {
				localStorage.clear();
				window.location.href = '/auth/login';
				AppToast({
					type: 'error',
					message: error.response.data.message
				});
			}
			return await axios.post(confirmEndpoint(endpoint), body, headerBuilder(headers));
		}
	},
	put: async (endpoint: string, body: object, headers?: object): Promise<AxiosResponse> => {
		try {
			return await axios.put(confirmEndpoint(endpoint), body, headerBuilder(headers));
		} catch (error) {
			if (error.response.statusText === 'Unauthorized') {
				localStorage.clear();
				window.location.href = '/auth/login';
				AppToast({
					type: 'error',
					message: error.response.data.message
				});
			}
			return await axios.put(confirmEndpoint(endpoint), body, headerBuilder(headers));
		}
	},
	delete: async (endpoint: string, headers?: object): Promise<AxiosResponse> => {
		try {
			return await axios.delete(confirmEndpoint(endpoint), headerBuilder(headers));
		} catch (error) {
			if (error.response.statusText === 'Unauthorized') {
				localStorage.clear();
				window.location.href = '/auth/login';
				AppToast({
					type: 'error',
					message: error.response.data.message
				});
			}
			return await axios.delete(confirmEndpoint(endpoint), headerBuilder(headers));
		}
	}
};
