import { axiosClient } from './axiosClient';

const slidesApi = {
    getAll() {
        const url = `/slides`;
        return axiosClient.get(url);
    },
    add(file) {
        const url = `/slides`;
        return axiosClient.post(url, file);
    },
    get(id) {
        const url = `/slides/${id}`;
        return axiosClient.get(url);
    },
    update(slide, id) {
        const url = `/slides/${id}`;
        return axiosClient.put(url, slide);
    },
    remove(id) {
        const url = `/slides/${id}`;
        return axiosClient.delete(url);
    }
}

export default slidesApi;