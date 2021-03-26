import { axiosClient } from './axiosClient';

const ordersApi = {
    get(id) {
        const url = `/order/${id}`;
        return axiosClient.get(url);
    },

    add (addressCustomer) {
        const url = `/order`;
        return axiosClient.post(url, addressCustomer);
    },

    getAll() {
        const url = `/order`;
        return axiosClient.get(url);
    }


}

export default ordersApi;