export interface HandledErrorData {
    message: string;
    errors: Record<string, string>;
}

export interface HandledError {
    status: number;
    data: HandledErrorData;
}