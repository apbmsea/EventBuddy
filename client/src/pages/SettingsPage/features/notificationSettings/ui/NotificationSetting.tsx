import { useAppDispatch, useAppSelector } from '@shared/hooks/store.hooks';
import { useForm } from '@shared/hooks/useForm';
import { useEffect } from 'react';
import { notificationSettingsRequest } from '../model/notificationSettingSlice';

const NotificationSetting = () => {
	const config = useAppSelector(
		state => state.user.user?.settings?.notifications
	);
	const dispatch = useAppDispatch();

	const { values, handleChange, setValues, isLoading, errors, hasErrors } =
		useForm(
			{
				enabled: true,
				autoClear: true,
				view: 'BOTTOM',
				duration: 3
			},
			'notification'
		);

	useEffect(() => {
		if (config) {
			setValues({
				enabled: config.system.enabled,
				autoClear: config.system.autoClear,
				view: config.system.view,
				duration: config.system.duration
			});
		}
	}, [config, setValues]);

	if (!config) return null;

	const handleSave = (e: React.FormEvent) => {
		e.preventDefault();
		dispatch(notificationSettingsRequest(values));
	};

	return (
		<div>
			<h3>Системные</h3>
			<form onSubmit={handleSave}>
				<div>
					<label>
						Уведомления{' '}
						<input
							type='checkbox'
							name='enabled'
							checked={values.enabled}
							disabled={isLoading}
							onChange={handleChange}
						/>
					</label>
				</div>

				<div>
					<label>Отображать</label>
					<br />
					<select
						name='view'
						value={values.view}
						disabled={isLoading || !values.enabled}
						onChange={handleChange}
					>
						<option value='BOTTOM'>Снизу</option>
						<option value='TOP'>Сверху</option>
					</select>
				</div>

				<div>
					<label>
						Автоочистка{' '}
						<input
							type='checkbox'
							name='autoClear'
							checked={values.autoClear}
							disabled={isLoading || !values.enabled}
							onChange={handleChange}
						/>
					</label>
				</div>

				<div>
					<label>Задержка перед отчисткой</label>
					<br />
					<input
						type='number'
						name='duration'
						value={values.duration}
						disabled={
							isLoading || !values.enabled || !values.autoClear
						}
						onChange={handleChange}
					/>
					{errors.duration && <span>{errors.duration}</span>}
				</div>

				<button type='submit' disabled={isLoading}>
					Сохранить
				</button>
				<button
					type='button'
					onClick={() => {
						if (config) {
							setValues({
								enabled: config.system.enabled,
								autoClear: config.system.autoClear,
								view: config.system.view,
								duration: config.system.duration
							});
						}
					}}
					disabled={isLoading || hasErrors}
				>
					Отмена
				</button>
			</form>
			<hr />
		</div>
	);
};

export default NotificationSetting;
