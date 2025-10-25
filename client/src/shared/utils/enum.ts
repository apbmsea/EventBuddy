export const createEnum = <T extends Record<string, string>>(obj: T) => obj;
export type ValueOf<T> = T[keyof T];