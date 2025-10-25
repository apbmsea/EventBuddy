import { $api } from '@shared/api/instance';
import type { VerifyPayload } from '../model/verify.types';

export async function verify(data: VerifyPayload) {
    const response = await $api.post('/verify', data);
    return response.data;
}
