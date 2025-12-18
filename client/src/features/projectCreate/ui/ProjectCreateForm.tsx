import React from 'react';
import { useAppDispatch, useAppSelector } from '@shared/hooks/store.hooks';
import { useForm } from '@shared/hooks/useForm';
import { projectCreateRequest, setIsOpen } from '../model/projectCreateSlice';
import { Modal } from '@shared/ui/modal';

const ProjectCreateForm: React.FC = () => {
	const dispatch = useAppDispatch();
	const isOpen = useAppSelector(state => state.projectCreate.isOpen);

	const { values, handleChange, isLoading, errors, hasErrors } = useForm(
		{
			title: '',
			description: '',
			deadline: ''
		},
		'projectCreate'
	);
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		dispatch(projectCreateRequest(values));
	};

	return (
		<Modal isOpen={isOpen} onClose={() => dispatch(setIsOpen(false))}>
			<form onSubmit={handleSubmit}>
				<input
					name='title'
					value={values.title}
					onChange={handleChange}
					placeholder='Название'
				/>
				{errors.title && <span>{errors.title}</span>}

				<input
					name='description'
					value={values.description}
					onChange={handleChange}
					placeholder='Пароль обязательное поле'
				/>
				{errors.description && <span>{errors.description}</span>}

				<input
					name='deadline'
					type='date'
					value={values.deadline}
					onChange={handleChange}
					placeholder='Дедлайн готовности проекта'
				/>
				{errors.deadline && <span>{errors.deadline}</span>}

				<button type='submit' disabled={isLoading || hasErrors}>
					Создать
				</button>
			</form>
		</Modal>
	);
};

export default ProjectCreateForm;
