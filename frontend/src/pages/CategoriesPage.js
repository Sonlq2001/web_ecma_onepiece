import { currentURL } from './../utils.js';
import productApi from './../api/productApi';


const CategoriesPage = {
    async render () {
        const { id } = currentURL();
        const { data : products } = await productApi.getAll();
        const result = products.filter( product => product.cateId === id);
        return /*html*/ `
        <div class="container">			
            <div class="row-control">
                <div class="row">
                    <div class="col-lg-9">
                            <div class="model-control">
                                <h4 class="title-control">Sắp xếp</h4>
                                <button type="button" class="btn btn-hot btn-control btn-active">Bán chạy</button>
                                <button type="button" class="btn btn-common btn-control">Phổ biến</button>
                                <button type="button" class="btn btn-new btn-control">Mới nhất</button>
                            </div>
                    </div>
                    <div class="col-lg-3">
                        <select class="form-select form-select-lg" aria-label=".form-select-lg example">
                        <option selected>Sắp xếp theo giá</option>
                        <option value="1">Giá: Từ thấp đến Cao</option>
                        <option value="2">Giá: Từ Cao đến Thấp</option>
                        </select>
                    </div>
                </div>
            </div>

            <!-- product -->
            <div class="row-products">
                <div class="row">
                    ${
                        result.map(product => {
                            return /*html*/ `
                                <div class="col-lg-2 col-md-4 col-6">
                                    <div class="card mt-4">
                                        <img src="${product.avatar}" class="card-img-top" alt="...">
                                        <div class="card-body">
                                        <h5 class="card-title">
                                            <a href="/#/products/${product.id}" class="card-title-fix">${product.name}</a>
                                        </h5>
                                        <span class="card-price">Giá:
                                            <span class="card-price__detail"> 192495 đ</span>
                                        </span>
                                        <span class="card-status">Trạng thái: </span>
                                        <a href="#" class="btn btn-card">Add to cart</a>
                                        </div>
                                    </div>
                                </div>
                            `;
                        }).join('')
                    }
                </div>
            </div>

            <!-- paginate -->
            <div class="row">
                <div class="col-lg-12">
                    <nav class="pagination">
                        <ul class="pagination-list">
                            <li class="pagination-item">
                                <a href="" class="pagination-link">
                                    <svg xmlns="http:ww.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                                    </svg>
                                </a>
                            </li>
                            <li class="pagination-item">
                                <a href="" class="pagination-link active-p">
                                    1
                                </a>
                            </li>
                            <li class="pagination-item">
                                <a href="" class="pagination-link">
                                    2
                                </a>
                            </li>
                            <li class="pagination-item">
                                <a href="" class="pagination-link">
                                    <svg xmlns="http:ww.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                                    </svg>
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
        `;
    }
}

export default CategoriesPage;