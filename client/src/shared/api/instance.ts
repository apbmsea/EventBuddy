import type { HandledError } from '@shared/types/error.types';
import axios from 'axios';
import { store } from '@app/store/store';
import { refreshRequest } from '@features/refresh/model/refreshSlice';
import { logoutRequest } from '@features/logout';
import { navigateTo } from '@shared/utils/navigate';

export const $api = axios.create({
	baseURL: import.meta.env.VITE_SERVER_URL || 'http://localhost:8080',
	timeout: 10000,
	withCredentials: true
});

export const $refresh = axios.create({
	baseURL: import.meta.env.VITE_SERVER_URL || 'http://localhost:8080',
	timeout: 10000,
	withCredentials: true
});

$api.interceptors.request.use(config => {
	const token = localStorage.getItem('accessToken');
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

$refresh.interceptors.request.use(config => {
	const token = localStorage.getItem('accessToken');
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

$api.interceptors.response.use(
	response => response,
	async error => {
		const originalRequest = error.config;

		if (!error.response) {
			switch (error.code) {
				case 'ERR_NETWORK':
					console.error('ERR_NETWORK');
					break;
				case 'ECONNABORTED':
					console.error('ECONNABORTED');
					break;
				case 'ERR_CANCELED':
					console.error('ERR_CANCELED');
					break;
			}

			return Promise.reject(error);
		}

		const handledError: HandledError = {
			status: error.response.status,
			data: error.response.data
		};

		switch (handledError.status) {
			case 400:
				return Promise.reject(handledError);

			case 401:
				if (!originalRequest._isRetry) {
					originalRequest._isRetry = true;
					await store.dispatch(refreshRequest());
				} else {
					await store.dispatch(logoutRequest());
					await navigateTo('/login');
				}
				break;

			case 403:
				console.warn('Доступ запрещён');
				break;

			case 404:
				console.warn('Ресурс не найден');
				break;

			case 500:
				console.error('Ошибка сервера');
				break;

			default:
				console.error('Необработанная ошибка', handledError);
		}
		return Promise.reject(handledError);
	}
);
