import { axiosClient } from './axiosClient';

const ordersDetailApi = {
    add (ordersDetail) {
        const url = `/order-detail`;
        return axiosClient.post(url, ordersDetail);
    },

    getAll() {
        const url = `/order-detail`;
        return axiosClient.get(url);
    }
}

export default ordersDetailApi;