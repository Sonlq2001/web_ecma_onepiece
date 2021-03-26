import { axiosClient } from './axiosClient';

const feedbacksApi = {
    getAll () {
        const url = '/feedback';
        return axiosClient.get(url);
    },

    get(id) {
        const url = `/feedback/${id}`;
        return axiosClient.get(url);
    },

    remove (id) {
        const url = `/feedback/${id}`;
        return axiosClient.delete(url);
    }

}

export default feedbacksApi;