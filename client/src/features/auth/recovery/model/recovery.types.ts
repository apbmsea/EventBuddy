export interface RecoveryPayload {
	password: string | number | readonly string[] | undefined;
	email: string;
}
