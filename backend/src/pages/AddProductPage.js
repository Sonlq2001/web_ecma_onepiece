import { $, resetRender } from "./../utils.js";
import Validator from "./../components/ValidationForm";

import productApi from "./../api/productApi";
import categoriesApi from "./../api/categoriesApi";
import firebase from "../firebase";
import ListProducts from "./../components/ListProducts";

const AddProductPage = {
  async render() {
    const { data: categories } = await categoriesApi.getAll();
    return /*html*/ `
            <div class="container-fluid add-product-page">
                <div class="row">
                    <div class="col-lg-12">
                        <h1 class="page-header">Add product</h1>
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
                                
                                <form role="form" id="form-add" class="row" enctype="multipart/form-data">
                                    <div class="col-lg-6">
                                        <div class="form-group">
                                            <label>Tên sản phẩm</label>
                                            <input class="form-control" name="name" type="text" placeholder="Tên sản phẩm" id="name-product">
                                            <span class="error-message"></span>
                                        </div>
                                        <div class="form-group">
                                            <label>Danh mục</label>
                                            <select class="form-control" id="cate-id" name="cateId">
                                                <option value="">--Chọn danh mục--</option>
                                                ${
                                                    categories.map((category) => {
                                                    return /*html*/ `
                                                            <option value="${category.id}">${category.name}</option>
                                                        `;
                                                    }).join("")
                                                }
                                            </select>
                                            <span class="error-message"></span>
                                        </div>
                                        <div class="form-group">
                                            <label>Giá sản phẩm</label>
                                            <input class="form-control check-number" name="price" type="number" placeholder="Giá" id="price-product">
                                            <span class="error-message"></span>
                                        </div>
                                        <div class="form-group">
                                            <label>Giá sale</label>
                                            <input class="form-control check-number" name="sale" type="number" placeholder="sale" id="sale-product">
                                            <span class="error-message"></span>
                                        </div>
                                    </div>

                                    <div class="col-lg-6">
                                        <div class="form-group">
                                            <label>Ảnh sản phẩm</label>
                                            <input type="file" name="image" class="image-input form-control">
                                            <span class="error-message"></span>
                                        </div>
                                        <div class="form-group">
                                            <label>Loại sản phẩm</label>
                                            <label class="radio-inline">
                                                <input type="radio" name="type_prd" id="optionsRadiosInline1" value="1" checked> Sản phẩm thường
                                            </label>
                                            <label class="radio-inline">
                                                <input type="radio" name="type_prd" id="optionsRadiosInline1" value="2" > Sản phẩm đặc biệt
                                            </label>
                                            <span class="error-message"></span>
                                        </div>
                                        <div class="form-group">
                                            <label>Mô tả</label>
                                            <textarea class="form-control description" rows="3" name="description"></textarea>
                                            <span class="error-message"></span>
                                        </div>
                                        
                                        <div class="form-group">
                                            <label>Trạng thái</label>
                                            <input type="checkbox" class="ml-4" name="status" name="" id="status">
                                            <span class="error-message"></span>
                                        </div>
                                    </div>
                                    <div class="col-lg-12">
                                        <button class="btn btn-primary btn-add">Add product</button>
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
    const checkNumber = $('.check-number');

    checkNumber.forEach(input => {
        input.oninput = () => {
            if(input.value < 0){
                alert('Giá trị không hợp lệ');
                resetRender(AddProductPage);
            }
        }
    })

    function addProduct (product) {
        if(product.price == ''){
            alert("Còn để trống giá trị");
        } else {
            product.id = Math.random();
            product.price = parseInt(product.price);
            product.sale = parseInt(product.sale);
            const file = product.image;
            let storageRef = firebase.storage().ref(`images/${file.name}`);
            storageRef.put(file).then(() => {
                storageRef.getDownloadURL().then((url) => {
                    product.image = url;
                    productApi.add(product);
                    alert("Thêm sản phẩm thành công !");
                    window.location.href = "http://localhost:4040/#/products";
                    resetRender(ListProducts, ".list-product");
                });
            });
        }                
    }

    Validator({
        form: "#form-add",
        formGroupSelector: ".form-group",
        errorSelector: ".error-message",
        rules: [
          Validator.isRequired("#name-product"),
          Validator.isRequired("#cate-id"),
        //   Validator.isRequired("#price-product"),
          Validator.isRequired(".image-input"),
          Validator.isRequired(".description"),
        ],
        onSubmit: function (data) {
            addProduct(data);
  
          // window.location.reload();
        },
    });
    


    
  },
};

export default AddProductPage;
