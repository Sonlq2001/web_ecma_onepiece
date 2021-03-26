import { axiosClient } from './axiosClient.js';

const ordersApi = {
    getAll () {
        const url = `/order`;
        return axiosClient.get(url);
    }
}

export default ordersApi;