import { axiosClient } from './axiosClient';

const catePostApi = {
    getAll () {
        const url = '/categories-post';
        return axiosClient.get(url);
    },

    get(id) {
        const url = `/categories-post/${id}`;
        return axiosClient.get(url);
    },

    add (catePost) {
        const url = `/categories-post`;
        return axiosClient.post(url, catePost);
    },

    remove (id) {
        const url = `/categories-post/${id}`;
        return axiosClient.delete(url);
    },

    update (newCate, id) {
        const url = `/categories-post/${id}`;
        return axiosClient.put(url, newCate);
    }

}

export default catePostApi;