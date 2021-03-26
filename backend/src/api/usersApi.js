import { axiosClient } from './axiosClient';

const usersApi = {
    getAll() {
        const url = `/user`;
        return axiosClient.get(url);
    },
   
}

export default usersApi;