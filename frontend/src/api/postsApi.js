import { axiosClient } from './axiosClient';

const postsApi = {
    getAll () {
        const url = `/posts`;
        return axiosClient.get(url);
    },
    get(id) {
        const url = `/posts/${id}`;
        return axiosClient.get(url);
    },
    add (post) {
        const url = `/posts`;
        return axiosClient.post(url, post);
    },
    update (post, id){
        const url = `/posts/${id}`;
        return axiosClient.put(url, post);
    },
    remove (id){
        const url = `/posts/${id}`;
        return axiosClient.delete(url);
    }
}

export default postsApi;