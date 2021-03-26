import productApi from "../api/productApi";
import ProductsAdmin from "../pages/ProductsAdmin";
import { $, resetRender } from "../utils";
import categoriesApi from './../api/categoriesApi';


const ListProducts = {
    async render(filterProduct) {
        const { data: categories } = await categoriesApi.getAll();
        // let products;
        // if(filterProduct == undefined) {
        //     let data  = await productApi.getAll();
        //     products = data.data;
        // } else {
        //     products = filterProduct;
        // }
        // console.log(products);

        const { data : products}  = await productApi.getAll();
      

        return /*html*/ `
            <div class="panel-heading">
                <div class="d-flex">
                    <a href="/#/add-product" class="btn btn-primary">Add Product</a>
                    <form role="form" id="form-search">
                        <div class="form-group">
                            <input class="form-control" name="name" type="text" placeholder="Search product" id="filter-product">
                            <span class="error-message"></span>
                        </div>
                    </form>
                </div>
            </div>

            <div class="panel-body">
                <div class="table-responsive list-product">
                    <table class="table table-striped table-bordered table-hover table-products" id="dataTables-example">
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>Tên sản phẩm</th>
                                <th>Ảnh sản phẩm</th>
                                <th>Danh mục</th>
                                <th>Giá</th>
                                <th>Trạng thái</th>
                                <th>Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${
                                products.map((product, index) => {
                                    let cateName;
                                    categories.map((cate) => {
                                        if (cate.id == product.cateId) {
                                            cateName = cate.name;
                                        }
                                    })
                                    return /*html*/ `
                                        <tr class="gradeA even" role="row">
                                            <td>${index + 1}</td>
                                            <td class="name-prd">${product.name}</td>
                                            <td>
                                                <img src="${product.image}" alt="" width="120px" height="80px">
                                            </td>
                                            <td>
                                                ${cateName}
                                            </td>
                                            <td>${product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</td>
                                            <td>${product.status ? "Còn" : "Hết"}</td>
                                            <td class="d-flex justify-content-between">
                                                <a href="/#/edit-product/${product.id}" type="button" class="btn btn-primary mr-5">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                                        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                                    </svg>
                                                </a>
                                                <button type="button" class="btn btn-danger btn-remove" data-id="${product.id}">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                                        <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                                                    </svg>
                                                </button>
                                            </td>
                                        </tr>
                                        `;
                                }).join("")
                                
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    },

    async afterRender() {
        const { data: dataPrd } = await productApi.getAll();
        const buttons = $(".table-products .btn");

        // if (Array.isArray(buttons)) {
        buttons.forEach((button) => {
            const idPrd = button.dataset.id;
            button.addEventListener("click", async () => {
                if (button.classList.contains("btn-remove")) {
                    const question = confirm("Bạn có muốn xóa ?");
                    if (question) {
                        await productApi.remove(idPrd);
                        await resetRender(ListProducts, ".list-product");
                        await resetRender(ProductsAdmin, "#product-admin");
                    }
                }
            });
        });
        // } else {
        //   buttons.addEventListener("click", async () => {
        //     const idPrd = buttons.dataset.id;
        //     const question = confirm("Bạn có muốn xóa ?");
        //     if (question) {
        //       await productApi.remove(idPrd);
        //       await resetRender(ProductsAdmin, "#list-product");
        //     }
        //   });
        // }

        
        // const { data : dataPrd } = await productApi.getAll();
        // const inputSearch = $('#filter-product');
        // const listProduct = $(".gradeA.even");

        // inputSearch.addEventListener('keyup', (e) => {
        //     let valueInput = e.target.value.toLowerCase();
        //     // const result = dataPrd.filter (product => {
        //     //     return product.name.toLowerCase().includes(valueInput);
        //     // })
        //     // // ListProducts.render(result);
        //     // resetRender(ListProducts,'', result);
            
        //     listProduct.forEach(product => {
        //         let name = product.getElementsByClassName('name-prd');
        //         if(name[0].innerHTML.toLowerCase().indexOf(valueInput) > -1){
        //             product.style.display = 'flex;';
        //         } else {
        //             product.style.display = 'none';
        //         }
        //     })
        //     resetRender(ListProducts,'.list-product')
           
        // })

    },
};

export default ListProducts;