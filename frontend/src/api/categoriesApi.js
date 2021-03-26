import { axiosClient } from './axiosClient';

// đường link phải trùng với tên bảng
const categoriesApi = {
    getAll () {
        const url = `/categories`;
        return axiosClient.get(url);
    },

    get(id) {
        const url = `/categories/${id}`;
        return axiosClient.get(url);
    } 
}

export default categoriesApi;