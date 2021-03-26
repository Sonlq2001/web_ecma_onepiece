import { axiosClient } from './axiosClient';

const ordersDetail = {
    getAll () {
        const url = `/order-detail`;
        return axiosClient.get(url);
    }
}

export default ordersDetail;