import { Slide, toast, type ToastOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './notification.scss';

export interface NotificationConfig {
	enabled: boolean;
	duration: number; // секунды
	autoClear: boolean;
}

interface NotifyOptions {
	title: string;
	message: string;
}

/**
 * fallback пока настройки не пришли
 */
const FALLBACK_CONFIG: NotificationConfig = {
	enabled: true,
	duration: 3,
	autoClear: true
};

let currentConfig: NotificationConfig = FALLBACK_CONFIG;

/**
 * дергать при загрузке юзера / изменении настроек
 */
export const setNotificationConfig = (config?: NotificationConfig) => {
	if (config) {
		currentConfig = config;
	}
};

const buildOptions = (): ToastOptions => ({
	autoClose: currentConfig.autoClear ? currentConfig.duration * 1000 : false,

	hideProgressBar: false,
	closeOnClick: true,
	pauseOnHover: true,
	draggable: true,
	transition: Slide
});

const renderContent = (title: string, message: string) => (
	<div>
		<strong>{title}</strong>
		<div>{message}</div>
	</div>
);

const show = (
	type: 'success' | 'error' | 'info' | 'warn',
	{ title, message }: NotifyOptions,
	className: string,
	progressClassName: string
) => {
	if (!currentConfig.enabled) return;

	toast[type](renderContent(title, message), {
		...buildOptions(),
		className,
		progressClassName
	});
};

export const notification = {
	success: (opts: NotifyOptions) =>
		show('success', opts, 'toast-success', 'toast-progress-success'),

	error: (opts: NotifyOptions) =>
		show('error', opts, 'toast-error', 'toast-progress-error'),

	warn: (opts: NotifyOptions) =>
		show('warn', opts, 'toast-warn', 'toast-progress-warn'),

	info: (opts: NotifyOptions) =>
		show('info', opts, 'toast-info', 'toast-progress-info')
};
