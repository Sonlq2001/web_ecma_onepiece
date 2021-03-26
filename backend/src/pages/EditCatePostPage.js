
import catePostApi from './../api/catePostApi';
import { currentURL, $, resetRender } from './../utils.js';
import ListCatePost from './../components/ListCatePost';
import Validator from './../components/ValidationForm';
import firebase from './../firebase';



const EditCategoryPage = {
    async render () {
        const { id } = currentURL();
        const { data : catePost } = await catePostApi.get(id);

        return /*html*/ `
            <div class="container-fluid">
                <div class="row">
                    <div class="col-lg-12">
                        <h1 class="page-header">Edit Category post</h1>
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
                                                <input class="form-control" name="cate_post" type="text" placeholder="Eg" id="name-cate" value="${catePost.cate_post}">
                                                <span class="error-message"></span>
                                            </div>
                                            <div class="form-group">
                                                <label>Ảnh danh mục</label>
                                                <input class="form-control" name="image" type="file" id="name-cate">
                                                <img src="${catePost.image}" alt="" width="80px" height="80px">
                                                <span class="error-message"></span>
                                            </div>
                                            <div class="form-group">
                                                <label>Mô tả</label>
                                                <textarea class="form-control" rows="3" name="description" id="des-cate">${catePost.description}</textarea>
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
        const { data : catePost } = await catePostApi.get(id);

        const editCatePost = (newCate) => {
            const imgCate = newCate.image;
            // ko sửa ảnh
            if(imgCate == undefined) {
                newCate.id = id;
                newCate.image = catePost.image;
                
                catePostApi.update(newCate, id);
                alert('Sửa danh mục thành công !');
                window.location="/#/categories-post";
                resetRender(ListCatePost, '#list-cate-post');
            } else {
                const storageRef = firebase.storage().ref(`images/${imgCate.name}`);
                storageRef.put(imgCate).then(() =>{
                    storageRef.getDownloadURL().then((url) => {
                        newCate.id = id;
                        newCate.image = url;
                        catePostApi.update(newCate, id);
                        alert('Sửa danh mục thành công !');
                        window.location="/#/categories-post";
                        resetRender(ListCatePost, '#list-cate-post');
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
               editCatePost(data);
            }
        })
    }
}

export default EditCategoryPage;