import axios from 'axios';

export const loginUser = async (email: string, password: string) => {
	const response = await axios.post('http://localhost:4000/api/users/login', {
		email,
		password
	});
	if (response.data.token) {
		localStorage.setItem('user', JSON.stringify(response.data?.token));
		return response.data;
	}

	return Promise.reject(response.data);
};

export const logoutUser = () => {
	localStorage.removeItem('user');
};

export const registerUser = async (name: string, surname: string, email: string, password: string) => {
	const response = await axios.post('http://localhost:4000/api/users/register', {
		name,
		surname,
		email,
		password
	});
	if (response.data.success === true) {
		return response.data;
	}
	return Promise.reject(response.data);
};
