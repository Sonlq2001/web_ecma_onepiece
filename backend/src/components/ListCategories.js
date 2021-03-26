import categoriesApi from './../api/categoriesApi';
import { $, resetRender } from '../utils';
import CategoriesAdmin from './../pages/CategoriesAdmin';

const ListCategories = {
    async render () {
        const { data : categories } = await categoriesApi.getAll();
        return /*html*/ `
            <div class="table-responsive" id="list-cate">
                <table class="table table-striped table-bordered table-hover table-cate" id="dataTables-example">
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Tên Danh mục</th>
                            <th>Ảnh danh mục</th>
                            <th>Mô tả</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${
                            categories.map( (category, index) => {
                                return /*html*/ `
                                    <tr class="gradeA even" role="row">
                                        <td>${index + 1}</td>
                                        <td>${category.name}</td>
                                        <td>
                                            <img src="${category.image}" alt="" width="80px" height="80px">
                                        </td>
                                        <td>${category.description}</td>
                                        <td class="d-flex justify-content-between">
                                            <a href="/#/edit-category/${category.id}" class="btn btn-primary mr-5">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                                    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                                </svg>
                                            </a>
                                            <button type="button" class="btn btn-danger" data-id="${category.id}">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                                    <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                                                </svg>
                                            </button>
                                        </td>
                                        
                                    </tr>
                                `;
                            }).join('')
                        }
                        
                    </tbody>
                </table>
            </div>
        `;
    },

    async afterRender () {
        const {data : dataCate} = await categoriesApi.getAll();
        const buttons = $('.table-cate .btn');
        
        buttons.forEach(button => {
            button.addEventListener('click', async () => {
                const idCate =  button.dataset.id;
                if(button.classList.contains('btn-danger')){
                    const question = confirm("Bạn có muốn xóa ?");
                    if(question) {
                        await categoriesApi.remove(idCate);
                        await resetRender(ListCategories, '#list-cate');
                        await resetRender(CategoriesAdmin, '#cate-admin');
                    }
                }
            })
        })
                
            
        
        
        
    }
}

export default ListCategories;