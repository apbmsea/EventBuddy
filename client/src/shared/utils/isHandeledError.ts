import type { HandledError } from "@shared/types/error.types";


export function isHandledError(error: unknown): error is HandledError {
	if (typeof error !== 'object' || error === null) {
		return false;
	}

	const isHandled = error as Partial<HandledError>;

	if (typeof isHandled.status !== 'number') return false;
	if (typeof isHandled.data !== 'object' || isHandled.data === null) return false;
	if (typeof isHandled.data.message !== 'string') return false;

	return true;
}
