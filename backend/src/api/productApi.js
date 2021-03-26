import { axiosClient } from './axiosClient';

const productApi = {
    getAll () {
        const url = `/products`;
        return axiosClient.get(url);
    },
    get(id) {
        const url = `/products/${id}`;
        return axiosClient.get(url);
    },
    add (product) {
        const url = `/products`;
        return axiosClient.post(url, product);
    },
    update (product, id){
        const url = `/products/${id}`;
        return axiosClient.put(url, product);
    },
    remove (id){
        const url = `/products/${id}`;
        return axiosClient.delete(url);
    }
}

export default productApi;