import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@shared/hooks/store.hooks';
import { useForm } from '@shared/hooks/useForm';
import { type Project } from '@entities/project';
import { projectEditRequest } from '../model/projectEditSlice';
import { getProjectRequest } from '@features/project/model/projectSlice';
import { Role } from '@shared/types/role.types';

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
		useForm<Project>(
			{
				id: project?.id || '',
				title: project?.title || '',
				description: project?.description || '',
				deadline: project?.deadline || '',
				owner: project?.owner || { email: '', role: Role.INDIVIDUAL },
				members: project?.members || [],
				archived: project?.archived || false,
				createdAt: project?.createdAt || '',
				updatedAt: project?.updatedAt || ''
			},
			'projectEdit'
		);

	useEffect(() => {
		if (project) {
			setValues({
				id: project.id,
				title: project.title,
				description: project.description,
				deadline: project.deadline,
				owner: project.owner,
				members: project.members,
				archived: project.archived,
				createdAt: project.createdAt,
				updatedAt: project.updatedAt
			});
		}
	}, [project, setValues]);

	const handleEdit = () => setIsEditing(true);

	const handleCancel = () => {
		if (project) {
			setValues({
				id: project.id,
				title: project.title,
				description: project.description,
				deadline: project.deadline,
				owner: project.owner,
				members: project.members,
				archived: project.archived,
				createdAt: project.createdAt,
				updatedAt: project.updatedAt
			});
		}
		setIsEditing(false);
	};

	const handleSave = (e: React.FormEvent) => {
		e.preventDefault();
		dispatch(projectEditRequest(values));
		setIsEditing(false);
	};

	return (
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
				<button type='button' onClick={handleEdit} disabled={isLoading}>
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
	);
};

export default ProjectEditForm;
