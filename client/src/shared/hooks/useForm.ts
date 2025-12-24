import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './store.hooks';

interface SliceState {
	isLoading?: boolean;
	errors?: Record<string, string>;
}

type FormElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useForm = <T extends Record<string, any>>(
	initialValues: T,
	sliceName: string
) => {
	const dispatch = useAppDispatch();
	const state = useAppSelector(
		state => state[sliceName as keyof typeof state] as SliceState
	);

	const [values, setValues] = useState<T>(initialValues);
	const [fieldErrors, setFieldErrors] = useState<
		Partial<Record<keyof T, string>>
	>({});

	useEffect(() => {
		setFieldErrors({});
		dispatch({ type: `${sliceName}/clearAllErrors` });
	}, [dispatch, sliceName]);

	const handleChange = (e: React.ChangeEvent<FormElement>) => {
		const { name, value, type } = e.target;

		const newValue =
			type === 'checkbox'
				? (e.target as HTMLInputElement).checked
				: value;

		setValues(prev => ({
			...prev,
			[name]: newValue
		}));

		const hasLocalError = fieldErrors[name as keyof T];
		const hasStoreError = state?.errors?.[name];

		if (hasLocalError) {
			setFieldErrors(prev => ({
				...prev,
				[name]: undefined
			}));
		}

		if (hasStoreError) {
			dispatch({
				type: `${sliceName}/clearFieldError`,
				payload: name
			});
		}
	};

	const errors = state?.errors || {};

	return {
		values,
		setValues,
		handleChange,
		isLoading: state?.isLoading || false,
		errors,
		hasErrors: Object.values(errors).some(Boolean)
	};
};
