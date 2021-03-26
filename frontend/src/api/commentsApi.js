import { axiosClient } from './axiosClient';

const commentsApi = {
    add (cmt) {
        const url = `/comments`;
        return axiosClient.post(url, cmt);
    },

    getAll() {
        const url = `/comments`;
        return axiosClient.get(url);
    },

    get(idPrd) {
        const url = `/comments/${idPrd}`;
        return axiosClient.get(url, idPrd);
    }
}

export default commentsApi;