
import { axiosClient } from './axiosClient';

const slidesApi = {
    getAll () {
        const url = `/slides`;
        return axiosClient.get(url);
    }
}

export default slidesApi;