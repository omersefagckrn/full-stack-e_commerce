import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

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
	get: async (endpoint: string, headers?: object): Promise<AxiosResponse<any, any>> => {
		return await axios.get(confirmEndpoint(endpoint), headerBuilder(headers));
	},
	post: async (endpoint: string, body: object, headers?: object): Promise<AxiosResponse<any, any>> => {
		return await axios.post(confirmEndpoint(endpoint), body, headerBuilder(headers));
	},
	put: async (endpoint: string, body: object, headers?: object): Promise<AxiosResponse<any, any>> => {
		return await axios.put(confirmEndpoint(endpoint), body, headerBuilder(headers));
	},
	delete: async (endpoint: string, headers?: object): Promise<AxiosResponse<any, any>> => {
		return await axios.delete(confirmEndpoint(endpoint), headerBuilder(headers));
	}
};
