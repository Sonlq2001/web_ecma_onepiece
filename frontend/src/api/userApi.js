import { axiosClient } from './axiosClient';

const userApi = {
    getAll() {
        const url = `/user`;
        return axiosClient.get(url);
    },
    add(user) {
        const url = `/user`;
        return axiosClient.post(url, user);
    },

    get(id) {
        const url = `/user/${id}`;
        return axiosClient.get(url);
    },

    update (status, idUser) {
        const url = `/user/${idUser}`;
        return axiosClient.put(url, status)
    }

}

export default userApi;