import categoriesApi from './../api/categoriesApi';
import { currentURL, $, resetRender } from './../utils.js';
import ListCategories from './../components/ListCategories';
import Validator from './../components/ValidationForm';
import firebase from './../firebase';


const EditCategoryPage = {
    async render () {
       const { id } = currentURL();
       const { data : category } = await categoriesApi.get(id);
        return /*html*/ `
            <div class="container-fluid">
                <div class="row">
                    <div class="col-lg-12">
                        <h1 class="page-header">Edit Category</h1>
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
                                <div class="row">
                                    <div class="col-lg-6">
                                        <form role="form" id="form-edit">
                                            <div class="form-group">
                                                <label>Tên danh mục</label>
                                                <input class="form-control" name="name" type="text" placeholder="Eg" id="name-cate" value="${category.name}">
                                                <span class="error-message"></span>
                                            </div>
                                            <div class="form-group">
                                                <label>Ảnh danh mục</label>
                                                <input class="form-control" name="image" type="file" id="name-cate">
                                                <img src="${category.image}" alt="" width="80px" height="80px">
                                                <span class="error-message"></span>
                                            </div>
                                            <div class="form-group">
                                                <label>Mô tả</label>
                                                <textarea class="form-control" rows="3" name="description" id="des-cate">${category.description}</textarea>
                                                <span class="error-message"></span>
                                            </div>
                                            <button class="btn btn-primary btn-add">Edit category</button>
                                        </form>
                                    </div>
                                </div>
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

    async afterRender () {
        const { id } = currentURL();
        const { data : category } = await categoriesApi.get(id);

        const editCate = (newCate) => {
            const imgCate = newCate.image;
            
            if(imgCate == undefined) {
                newCate.id = id;
                newCate.image = category.image;
                categoriesApi.update(newCate, id);
                alert('Sửa danh mục thành công !');
                window.location="http://localhost:4040/#/categories";
                resetRender(ListCategories, '#list-cate');
            } else {
                const storageRef = firebase.storage().ref(`images/${imgCate.name}`);
                storageRef.put(imgCate).then(() =>{
                    storageRef.getDownloadURL().then((url) => {
                        newCate.id = id;
                        newCate.image = url;
                        categoriesApi.update(newCate, id);
                        alert('Sửa danh mục thành công !');
                        window.location="http://localhost:4040/#/categories";
                        resetRender(ListCategories, '#list-cate');
                    })
                })
            }
        }


        Validator({
            form: '#form-edit',
            formGroupSelector: '.form-group',
            errorSelector: '.error-message',
            rules: [
              Validator.isRequired('#name-cate'),
            ],
            onSubmit: function (data) {
               editCate(data);
            }
        })
    }
}

export default EditCategoryPage;