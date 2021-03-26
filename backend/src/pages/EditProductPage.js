import { currentURL, $, resetRender } from "./../utils.js";
import Validator from "./../components/ValidationForm";

import productApi from "./../api/productApi";
import categoriesApi from "./../api/categoriesApi";

import firebase from "./../firebase";
import ListProducts from "./../components/ListProducts";

const EditProductPage = {
    async render() {
        const { data: categories } = await categoriesApi.getAll();
        const { id } = currentURL();
        const { data: product } = await productApi.get(id);
        
        return /*html*/ `
            <div class="container-fluid">
                <div class="row">
                    <div class="col-lg-12">
                        <h1 class="page-header">Edit product</h1>
                    </div>
                    <!-- /.col-lg-12 -->
                </div>
                <!-- /.row -->
                <div class="row">
                    <div class="col-lg-12">
                        <div class="panel panel-default">
                            <div class="panel-heading">
                                sonel
                            </div>
                            <div class="panel-body">
                                    
                                <form role="form" id="form-edit" class="row">
                                    <div class="col-lg-6">
                                        <div class="form-group">
                                            <label>Tên sản phẩm</label>
                                            <input class="form-control" name="name" type="text" placeholder="Eg" id="name-product" value="${product.name}">
                                            <span class="error-message"></span>
                                        </div>
                                        <div class="form-group">
                                            <label>Danh mục</label>
                                            <select class="form-control" id="cate-id" name="cateId">
                                                <option value="">--Chọn danh mục--</option>
                                                ${
                                                    categories.map((category) => {
                                                        let selected;
                                                        if (category.id == product.cateId) {
                                                            selected = "selected";
                                                        } else {
                                                            selected = "";
                                                        }
                                                        return /*html*/ ` 
                                                        <option value = "${category.id}" ${selected } > ${category.name } </option>
                                                        `;
                                                    }).join("")
                                                }      
                                            </select>
                                            <span class="error-message"></span>
                                        </div>
                                        <div class="form-group">
                                            <label>Giá sản phẩm</label>
                                            <input class="form-control check-number" name="price" type="number" placeholder="Giá" id="price-product" value="${product.price}">
                                            <span class="error-message"></span>
                                        </div>
                                        <div class="form-group">
                                            <label>Giá sale</label>
                                            <input class="form-control check-number" name="sale" type="number" placeholder="sale" id="sale-product" value="${product.sale}">
                                            <span class="error-message"></span>
                                        </div>
                                    </div>
                                    
                                    <div class="col-lg-6">
                                        <div class="form-group">
                                            <label>Ảnh sản phẩm</label>
                                            <input type="file" name="image">
                                            <span class="error-message"></span>
                                            <div>
                                                <img src="${product.image}" alt="" class="image-product">
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label>Loại sản phẩm</label>
                                            <label class="radio-inline">
                                                <input type="radio" name="type_prd" id="optionsRadiosInline1" value="1" ${product.type_prd == 1 ? 'checked' : '' }> Sản phẩm thường
                                            </label>
                                            <label class="radio-inline">
                                                <input type="radio" name="type_prd" id="optionsRadiosInline1" value="2" ${product.type_prd == 2 ? 'checked' : '' }> Sản phẩm đặc biệt
                                            </label>
                                            <span class="error-message"></span>
                                        </div>
                                        <div class="form-group">
                                            <label>Mô tả</label>
                                            <textarea class="form-control description" rows="3" name="description">${product.description}</textarea>
                                            <span class="error-message"></span>
                                        </div>
                                        
                                        <div class="form-group">
                                            <label for="status">Trạng thái</label>
                                            <input type="checkbox" class="ml-4" name="status" name="" id="status" ${product.status ? "checked" : ''} >
                                            <span class="error-message"></span>
                                        </div>
                                    </div>
                                    <div class="col-lg-12">
                                        <button class="btn btn-primary btn-add">Edit product</button>
                                    </div>
                                </form>
                                    
                                    
                                <!-- /.row (nested) -->
                            </div>
                            <!-- /.panel-body -->
                        </div>
                        <!-- /.panel -->
                    </div>
                    <!-- /.col-lg-12 -->
                </div>
                <!-- /.row -->
            </div>
        `;
    },

    async afterRender() {
        const { id } = currentURL();
        const { data: product } = await productApi.get(id);

        // giá trị âm
        const checkNumber = $('.check-number');
        checkNumber.forEach(input => {
            input.onchange = () => {
                if(input.value < 0){
                    alert('Giá trị không hợp lệ');
                    resetRender(EditProductPage);
                }
            }
        })

        const editProduct = (data) => {
            data.id = id;
            const file = data.image;
            // ko sửa ảnh
            if (file == undefined) {
                data.image = product.image;
                productApi.update(data, id);
                alert("Sửa sản phẩm thành công !");
                window.location.href = "http://localhost:4040/#/products";
                resetRender(ListProducts, ".list-product");
            } else {
                // sửa ảnh
                let storageRef = firebase.storage().ref(`images/${file.name}`);
                storageRef.put(file).then(() => {
                    storageRef.getDownloadURL().then((url) => {
                        data.image = url;
                        productApi.update(data, id);
                        alert("Sửa sản phẩm thành công !");
                        window.location.href = "http://localhost:4040/#/products";
                        resetRender(ListProducts, ".list-product");
                    });
                });
            }
        }

        Validator({
            form: "#form-edit",
            formGroupSelector: ".form-group",
            errorSelector: ".error-message",
            rules: [
                Validator.isRequired("#name-product"),
                Validator.isRequired("#cate-id"),
                Validator.isRequired("#price-product"),
                Validator.isRequired(".description"),
            ],
            onSubmit: function(data) {
                editProduct(data);

                //    productApi.update(data, id);
                //     window.location="http://localhost:4040/#/products";
            },
        });
    },
};

export default EditProductPage;