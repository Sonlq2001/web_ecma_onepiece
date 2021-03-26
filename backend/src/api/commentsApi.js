import { axiosClient } from './axiosClient';

const commentsApi = {
    getAll () {
        const url = '/comments';
        return axiosClient.get(url);
    },

    get(id) {
        const url = `/comments/${id}`;
        return axiosClient.get(url);
    },

    remove (id) {
        const url = `/comments/${id}`;
        return axiosClient.delete(url);
    }

}

export default commentsApi;