import { axiosClient } from './axiosClient';

const ordersSaveApi = {
    get(id) {
        const url = `/orderSave/${id}`;
        return axiosClient.get(url);
    },

    add (orderSave) {
        const url = `/orderSave`;
        return axiosClient.post(url, orderSave);
    },

    getAll() {
        const url = `/orderSave`;
        return axiosClient.get(url);
    },
    update (newOrderSave, id) {
        const url = `/orderSave/${id}`;
        return axiosClient.put(url, newOrderSave);
    }


}

export default ordersSaveApi;