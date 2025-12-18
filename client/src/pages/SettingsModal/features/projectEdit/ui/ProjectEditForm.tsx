import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@shared/hooks/store.hooks';
import { useForm } from '@shared/hooks/useForm';
import { projectEditRequest } from '../model/projectEditSlice';
import {
	deleteProjectRequest,
	getProjectRequest
} from '@features/project/model/projectSlice';
import type { EditProjectPayload } from '@pages/SettingsModal/entities/projectEdit/model/projectEdit.types';

const ProjectEditForm = () => {
	const dispatch = useAppDispatch();
	const projectId = useAppSelector(state => state.settings.projectId);
	const project = useAppSelector(state => state.project.project);
	const [isEditing, setIsEditing] = useState(false);

	useEffect(() => {
		if (projectId) {
			dispatch(getProjectRequest({ id: projectId }));
		}
	}, [dispatch, projectId]);

	const { values, handleChange, isLoading, errors, setValues } =
		useForm<EditProjectPayload>(
			{
				title: project?.title || '',
				description: project?.description || '',
				deadline: project?.deadline || ''
			},
			'projectEdit'
		);

	useEffect(() => {
		if (project) {
			setValues({
				title: project.title,
				description: project.description,
				deadline: project.deadline
			});
		}
	}, [project, setValues]);

	const handleEdit = () => setIsEditing(true);

	const handleCancel = () => {
		if (project) {
			setValues({
				title: project.title,
				description: project.description,
				deadline: project.deadline
			});
		}
		setIsEditing(false);
	};

	const handleSave = (e: React.FormEvent) => {
		e.preventDefault();
		dispatch(projectEditRequest({ id: projectId || '', project: values }));
		setIsEditing(false);
	};

	return (
		<div>
			<form
				onSubmit={handleSave}
				style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}
			>
				<input
					name='title'
					placeholder='Название проекта'
					value={values.title}
					onChange={handleChange}
					disabled={!isEditing}
				/>
				{errors.title && <span>{errors.title}</span>}

				<input
					name='description'
					placeholder='Описание проекта'
					value={values.description}
					onChange={handleChange}
					disabled={!isEditing}
				/>
				{errors.description && <span>{errors.description}</span>}

				<input
					name='deadline'
					type='date'
					placeholder='Дедлайн'
					value={values.deadline}
					onChange={handleChange}
					disabled={!isEditing}
				/>
				{errors.deadline && <span>{errors.deadline}</span>}

				{!isEditing ? (
					<button
						type='button'
						onClick={handleEdit}
						disabled={isLoading}
					>
						Редактировать
					</button>
				) : (
					<div style={{ display: 'flex', gap: '8px' }}>
						<button type='submit' disabled={isLoading}>
							Сохранить
						</button>
						<button
							type='button'
							onClick={handleCancel}
							disabled={isLoading}
						>
							Отмена
						</button>
					</div>
				)}
			</form>

			<button
				onClick={() =>
					dispatch(deleteProjectRequest({ id: projectId || '' }))
				}
			>
				Удалить проект
			</button>
		</div>
	);
};

export default ProjectEditForm;
