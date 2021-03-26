import { axiosClient } from './axiosClient';

const feedbackApi = {
    add (cmt) {
        const url = `/feedback`;
        return axiosClient.post(url, cmt);
    },

    getAll() {
        const url = `/feedback`;
        return axiosClient.get(url);
    },

    get(idPrd) {
        const url = `/feedback/${idPrd}`;
        return axiosClient.get(url, idPrd);
    }
}

export default feedbackApi;