import catePostApi from './../api/catePostApi';
import Validator from './../components/ValidationForm';
import { resetRender } from './../utils';
import ListCatePost from './../components/ListCatePost';
import firebase from './../firebase';

const AddCatePost = {
    render () {
        return /*html*/ `
            <div class="container-fluid">
                <div class="row">
                    <div class="col-lg-12">
                        <h3 class="page-header">Add Category post</h3>
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
                                        <form role="form" id="form-add">
                                            <div class="form-group">
                                                <label>Tên danh mục</label>
                                                <input class="form-control" name="cate_post" type="text" placeholder="Eg" id="name-cate">
                                                <span class="error-message"></span>
                                            </div>
                                            <div class="form-group">
                                                <label>Ảnh danh mục</label>
                                                <input class="form-control" name="image" type="file" id="image-cate">
                                                <span class="error-message"></span>
                                            </div>
                                            <div class="form-group">
                                                <label>Mô tả</label>
                                                <textarea class="form-control" rows="3" name="description" id="des-cate"></textarea>
                                                <span class="error-message"></span>
                                            </div>
                                            <button class="btn btn-primary btn-add">Add category post</button>
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

        const addCatePost = (cate) => {
            const imgCate = cate.image;
            const storageRef = firebase.storage().ref(`images/${imgCate.name}`);
            storageRef.put(imgCate).then(() => {
                storageRef.getDownloadURL().then((url) => {
                    cate.image = url;
                    cate.id = Math.random().toString(36).substr(2, 9);
                    catePostApi.add(cate);
                    alert('Thêm danh mục thành công !');
                    window.location="/#/categories-post";
                    resetRender(ListCatePost, '#list-cate');
                })
            })
            
        }

        Validator({
            form: '#form-add',
            formGroupSelector: '.form-group',
            errorSelector: '.error-message',
            rules: [
              Validator.isRequired('#name-cate'),
              Validator.isRequired('#image-cate'),
              Validator.isRequired('#des-cate'),
            ],
            onSubmit: function (data) {
                addCatePost(data);
            }
        })
    }
}

export default AddCatePost;