import { baseURL, protectedURL } from '../constants';
import { axiosService } from './axiosService';

export const auth0Service = {
    getUserInfo: (token) => axiosService.get(protectedURL, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }),
    getTestAPI: () => axiosService.get(baseURL),
};
