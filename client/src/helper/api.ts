import axios from 'axios';

const confirmEndpoint = (endpoint: string) => {
	return `${process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PROD_API : process.env.REACT_APP_DEV_API}${endpoint}`;
};

const defaultHeaders = {
	'Content-Type': 'application/json'
};

export const apiHelper = {
	get: async (endpoint: string, headers?: object) => {
		return await axios.get(confirmEndpoint(endpoint), headers ?? defaultHeaders);
	},
	post: async (endpoint: string, body: object, headers?: object) => {
		return await axios.post(confirmEndpoint(endpoint), body, headers ?? defaultHeaders);
	},
	put: async (endpoint: string, body: object, headers?: object) => {
		return await axios.put(confirmEndpoint(endpoint), body, headers ?? defaultHeaders);
	},
	delete: async (endpoint: string, headers?: object) => {
		return await axios.delete(confirmEndpoint(endpoint), headers ?? defaultHeaders);
	}
};
