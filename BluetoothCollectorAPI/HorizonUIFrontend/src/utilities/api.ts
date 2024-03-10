import axios, { AxiosResponse } from 'axios';

import { handleItem, setThreshold } from './local-storage';
import { AuthRequest, LogoutRequest, SignupRequest } from './interfaces';
import { API_URL, REFRESH_TOKEN_KEY, TOKEN_KEY, TOKEN_THRESHOLD_KEY } from './constants';

export const http = axios.create({
	baseURL: API_URL
});

export const post = (endpoint: string, data?: unknown): Promise<AxiosResponse> =>
	new Promise((resolve, reject) =>
		http
			.post(endpoint, data)
			.then(resolve)
			.catch(e => reject(e.response.data))
	);

export const get = (endpoint: string): Promise<AxiosResponse> =>
	new Promise((resolve, reject) =>
		http
			.get(endpoint)
			.then(resolve)
			.catch(e => reject(e.response.data))
	);

export const patch = <T>(endpoint: string, data: T): Promise<AxiosResponse> =>
	new Promise((resolve, reject) =>
		http
			.patch(endpoint, data)
			.then(resolve)
			.catch(e => reject(e.response.data))
	);

export const login = (data: AuthRequest): Promise<AxiosResponse> => post('Account/Authenticate', data);

export const logout = (data: LogoutRequest): Promise<AxiosResponse> => post('Account/logout', data);

export const passwordReset = (data: Partial<AuthRequest>): Promise<AxiosResponse> =>
	post('Account/changePassword', data);

export const signup = (data: SignupRequest): Promise<AxiosResponse> => post('Account/Start', data);

http.interceptors.request.use(config => {
	console.log('first token storage: ', localStorage.getItem(TOKEN_KEY));
	if (config.headers) {
		config.headers['Authorization'] = localStorage.getItem(TOKEN_KEY) || '';
	}

	return config;
}, Promise.reject);

http.interceptors.response.use(
	response => response,
	error => {
		const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);

		if (!refreshToken) {
			return Promise.reject(error);
		}

		const originalRequest = error.config;

		if (error.response.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;

			if (http.defaults.headers) {
				http.defaults.headers['Authorization'] = 'Bearer ' + refreshToken;
			}

			return post('Account/RefreshToken')
				.then(res => {
					const { tokenThreshold, jwToken } = res.data.data;

					handleItem(TOKEN_KEY, jwToken);
					handleItem(TOKEN_THRESHOLD_KEY, setThreshold(tokenThreshold));

					if (http.defaults.headers) {
						http.defaults.headers['Authorization'] = jwToken;
					}

					return http(originalRequest);
				})
				.catch(Promise.reject);
		}

		return Promise.reject(error);
	}
);
