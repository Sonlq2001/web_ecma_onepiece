import categoriesApi from './../api/categoriesApi';
import productApi from './../api/productApi';
import slidesApi from './../api/slidesApi';

import { $, resetRender } from './../utils';
import { slide } from '../components/effect';
import Header from './../components/Header';

const HomePage = {
    async render() {
        window.scrollTo(0,0);
        const { data : categories } = await categoriesApi.getAll();
        const { data : products  } = await productApi.getAll();
        const { data : slides } = await slidesApi.getAll();
        
        return /*html*/`
        <div class="container">
        <!-- slide -->
            <div class="row">
                <div class="col-lg-3">

                <!-- Danh mục sản phẩm -->
                    <nav class="nav-cate">
                        <h4 class="title-nav">Danh mục sản phẩm</h4>
                        <ul class="list-cate">
                            ${
                                categories.map(category => {
                                    return /*html*/`
                                        <li class="item-cate">
                                            <a href="/#/products/${category.id}" class="link-cate">
                                                <img src="./../images/zoro.png" alt="" class="img-cate">
                                                ${category.name}
                                            </a>
                                        </li>
                                    `;
                                }).join('')
                            }
                        </ul>
                    </nav>
                </div>

                <div class="col-lg-9">
                    <div class="box">
                        
                    <!-- slide -->
                        <div class="box__slide">
                            ${
                                slides.map(slide => {
                                    return /*html*/ `
                                        <div class="slide">
                                            <img src="${slide.image}" alt="" class="img-slide">
                                        </div>
                                    `;
                                }).join('')
                            }
                        </div>
                        <div class="control">
                            <button class="button btn-prev">
                                <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                                </svg>
                            </button>
                            <button class="button btn-next">
                                <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- row cate product -->
            <div class="row-products">
                <div class="row">
                    <div class="group-categories">
                        <span class="run-title">
                            <marquee behavior="" direction="">
                                <i class="icon-gift fas fa-gift"></i>
                                <i class="icon-gift fas fa-gift"></i>
                                Shop đồ chơi, phụ kiên, Anime One piece hàng đầu tại việt nam và có rất nhiều phần quà hấp dẫn đang chơ bạn !!!
                            </marquee>
                        </span>
                    </div>
                </div>
            </div>

           <!-- product -->
			<div class="row-products">
                <h3 class="row-title">
                    HOT SALE
                    <img src="./images/lightning.png" alt="" class="img-hot-sale">
                </h3>

                <!-- product sale -->
                <div class="row">
                    ${
                        products.map((product, index) => {
                            if(product.sale !== '' && product.sale !== undefined && product.sale !== null) {
                                let priceSale = ((100 - product.sale) / 100) * product.price;
                                return /*html*/ `
                                    <div class="col-lg-2 col-md-4 col-6 mt-4">
                                        <div class="card cart-prd">
                                            <a href="/#/product/${product.id}">
                                                <img src="${product.image}" class="card-img-top cart-img-prd" alt="...">
                                            </a>
                                            <div class="card-body">
                                                <h5 class="card-title">
                                                    <a href="/#/product/${product.id}" class="card-title-fix">${product.name}</a>
                                                </h5>
                                                <span class="card-price">Giá:
                                                    <span class="card-price__detail"> ${Math.ceil(priceSale).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} đ</span>
                                                </span>
                                                <span class="card-status">Trạng thái: ${product.status ? 'Còn' : 'Hết'} </span>
                                                <button class="btn btn-card add-cart" data-id="${product.id}">Add to cart</button>
                                            </div>
                                            <span class="price-sale">${product.sale}%</span>
                                        </div>
                                    </div>
                                `;
                            }
                        }).join('')
                    }
                </div>
            </div>


            <!-- product -->
            <div class="row-products">
                <h3 class="row-title">Sản phẩm đặc biệt</h3>
                <div class="row">
                    ${
                        products.map((product, index) => {
                            if((product.sale == '' || product.sale == null) && product.type_prd == 2) {
                                return /*html*/ `
                                    <div class="col-lg-2 col-md-4 col-6 mt-4">
                                        <div class="card">
                                            <a href="/#/product/${product.id}">
                                                <img src="${product.image}" class="card-img-top cart-img-prd" alt="...">
                                            </a>
                                            <div class="card-body">
                                            <h5 class="card-title">
                                                <a href="/#/product/${product.id}" class="card-title-fix">${product.name}</a>
                                            </h5>
                                            <span class="card-price">Giá:
                                                <span class="card-price__detail"> ${product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} đ</span>
                                            </span>
                                            <span class="card-status">Trạng thái: ${product.status ? 'Còn' : 'Hết'} </span>
                                            <button class="btn btn-card add-cart" data-id="${product.id}">Add to cart</button>
                                            </div>
                                        </div>
                                    </div>
                                `;
                            }
                        }).join('')
                    }
                </div>
            </div>

            <!-- row cate product -->
            <div class="row-products">
                <div class="row">
                    <div class="group-categories">
                        <h3 class="row-title">Danh mục</h3>
                        <ul class="list-categories">
                            ${
                                categories.map(category => {
                                    return /*html*/`
                                    <li class="item-categories">
                                        <a href="/#/products/${category.id}" class="path-categories">
                                            <img src="${category.image}" alt="" class="img-categories">
                                            <span class="name-categories">${category.name}</span>
                                        </a>
                                    </li>
                                    `;
                                }).join('')
                            }
                        </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        `;
    },

    async afterRender() {
        // data products
        const { data : dataPrd } = await productApi.getAll();

        // slide
        slide($('.box'), $('.box__slide'), $('.slide'));

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
            if(dataPrd) {
                let filtered = dataPrd.find(product => {
                    return product.id == id;
                })
                return filtered;
            }
        }

        // create
        let listCart;
        const dataCart = localStorage.getItem('prdInCart');
        if(dataCart) {
            listCart = JSON.parse(dataCart);
        } else {
            listCart = [];
        }

        // get user on localStorage
        const infoUser = JSON.parse(localStorage.getItem('user'));
        const addCart = $('.add-cart');
        if(addCart) {
            addCart.forEach(function (product) {
                product.onclick = function () {
                    if(infoUser !== null) {
                        let idPrd = this.dataset.id;
                        const lengthCart = listCart.length;
                        let flag = false;
                        let i;
                        const productFiltered =  filters(idPrd);
    
                        // create object product
                        let objPrd = {
                            idUser: infoUser.id,
                            ...productFiltered
                        }
                    
                        for(i = 0; i < lengthCart; i++){
                            if(listCart[i].id == idPrd){
                                flag = true;
                                break;
                            }
                        }
 
                        // call
                        checkQuantity(flag, i, objPrd, listCart);
                        resetRender(Header, '.header');
                    } else {
                        window.location.href = "/#/sign-in";
                    }
                } 
            })
        }
        

       


    }

}

export default HomePage;