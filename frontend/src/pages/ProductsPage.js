import productApi from './../api/productApi';
import categoriesApi from './../api/categoriesApi';
import { currentURL, $, resetRender, pagination } from './../utils';
import Header from './../components/Header';
import ProductControl from './../components/ProductControl';
import ProductPagination from './../components/ProductPagination';

const ProductsPage = {
    async render(data) {
        window.scrollTo(0, 0);
        let idCate = currentURL().id;
        let products;
        let cateName;

        if (idCate === undefined) {
            // show all prd
            // sort products
            if (data !== undefined) {
                products = data;
            } else {
                let data = await productApi.getAll();
                products = data.data;
            }
        } else {
            // lọc theo danh mục
            if (data !== undefined) {
                products = data;
            } else {
                let data = await productApi.getAll();
                products = data.data;
            }

            // lấy sản phẩm theo danh mục
            products = products.filter(product => product.cateId === idCate);

            // lấy tên theo danh mục
            const cate = await categoriesApi.get(idCate);
            cateName = cate.data;
        }
        
        // hiển thị theo tên danh mục
        let result;
        if(cateName && idCate !== undefined) {
            result = `<div class="search-result">
                    <h4 class="search-result__value">
                        Danh mục sản phẩm '
                        <span class="key-search">${cateName.name}</span> '
                    </h4>
                </div>`
        } else {
            result = `
            <div class="search-result">
                <h4 class="search-result__value">
                    Tất cả sản phẩm 
                </h4>
            </div>
            `;
        }
        return /*html*/`
            <div class="container" id='list-products'>	
                <div class="row">
                    <div class="col-12">
                        ${result}
                    </div>
                </div>

                <!-- row control product -->
                ${ProductControl.render()}		
    
                <!-- product -->
                <div class="row-products" id="sort">
                    <div class="row" id="sale">
                        ${products.map((product, index) => {

                            // giá sale
                            let checkSale;
                            let priceSale;
                            if(product.sale == undefined || product.sale == '') {
                                checkSale = `<span class=""></span>`;
                            } else {
                                priceSale = ((100 - product.sale) / 100) * product.price;
                                checkSale = `<span class="price-sale ">${product.sale}%</span>`
                            }

                            return /*html*/`
                                <div class="col-lg-2 col-md-4 col-6">
                                    <div class="card mt-4 cart-prd">
                                        <a href="/#/product/${product.id}">
                                            <img src="${product.image}" class="card-img-top cart-img-prd" alt="...">
                                        </a>
                                        <div class="card-body">
                                            <h5 class="card-title">
                                                <a href="/#/product/${product.id}" class="card-title-fix">${product.name}</a>
                                            </h5>
                                            <span class="card-price">Giá:
                                                <span class="card-price__detail"> ${priceSale ? priceSale.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") : product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} đ</span>
                                            </span>
                                            <span class="card-status">Trạng thái: ${product.status ? 'Còn' : 'Hết'} </span>
                                            <button class="btn btn-card add-cart" data-id=${product.id}>Add to cart</button>
                                        </div>
                                        ${checkSale}
                                    </div>
                                </div>
                            `;
                            }).join('')
                        }
                    </div>
                </div>
    
                <!-- paginate -->
                ${ProductPagination.render()}
            `;

    },

    async afterRender() {
        // data products
        const { data: dataPrd } = await productApi.getAll();

        // sort products 
        ProductControl.afterRender();

        // check quantity
        const checkQuantity = (flag, i, objPrd, listCart) => {
            if (flag === false) {
                objPrd.quantity = 1;
                listCart.push(objPrd);
                window.localStorage.setItem('prdInCart', JSON.stringify(listCart));
            } else {
                listCart[i].quantity += 1;
                window.localStorage.setItem('prdInCart', JSON.stringify(listCart));
            }

        }

        // get value product 
        const filters = (id) => {
            if (dataPrd) {
                let filtered = dataPrd.find(product => {
                    return product.id == id;
                })
                return filtered;
            }
        }

        // handle cart
        let listCart;
        const dataCart = localStorage.getItem('prdInCart');
        if (dataCart) {
            listCart = JSON.parse(dataCart);
        } else {
            listCart = [];
        }
       
        
        // khi click
        const addToCart = (_this) => {
            if (infoUser !== null) {
                let idPrd = _this.dataset.id;
                const lengthCart = listCart.length;
                let flag = false;
                let i;

                const productFiltered = filters(idPrd);
                // create object product
                let objPrd = {
                    ...productFiltered
                }
                // check product
                for (i = 0; i < lengthCart; i++) {
                    if (listCart[i].id == idPrd) {
                        flag = true;
                        break;
                    }
                }
                
                checkQuantity(flag, i, objPrd, listCart);
                resetRender(Header, '.header');
            } else {
                window.location.href = "http://localhost:8080/#/sign-in";
            }
        }

        // get user on localStorage
        const infoUser = JSON.parse(localStorage.getItem('user'));
        const btnAdd = $('.add-cart');
        if (Array.isArray(btnAdd)) {
            btnAdd.forEach(function (product) {
                product.onclick = function () {
                    addToCart(this);
                }
            })
        } else {
            btnAdd.addEventListener('click', function () {
                addToCart(this);
            })
        }


        ProductPagination.afterRender();
    }
}

export default ProductsPage;