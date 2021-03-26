import { $, resetRender } from './../utils';
import catePostApi from './../api/catePostApi';
import Validator from './../components/ValidationForm';
import postsApi from './../api/postsApi';
import ListPost from './../components/ListPost';
import firebase from './../firebase';

const AddPostPage = {
    async render () {

        const { data : catePost } = await catePostApi.getAll();

        return /*html*/ `
        <div class="container-fluid">
            <div class="row">
                <div class="col-lg-12">
                    <h3 class="page-header">Add post</h3>
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
                            <form class="row" role="form" id="form-add" enctype="multipart/form-data">
                                <div class="col-lg-6">
                                    <div class="form-group">
                                        <label>Danh mục bài viết</label>
                                        <select class="form-control cate_post" name="idCatePost">
                                            <option value="">--Chọn danh mục bài viết--</option>
                                            ${
                                                catePost.map((cate) => {
                                                return /*html*/ `
                                                        <option value="${cate.id}">${cate.cate_post}</option>
                                                    `;
                                                }).join("")
                                            }
                                        </select>
                                        <span class="error-message"></span>
                                    </div>
                                    <div class="form-group">
                                        <label>Tiêu đề bài viết</label>
                                        <textarea class="form-control description header_post" rows="3" name="header_post"></textarea>
                                        <span class="error-message"></span>
                                    </div>
                                    <div class="form-group">
                                        <label>Mô tả bài viết</label>
                                        <textarea class="form-control description des_post" rows="3" name="des_post"></textarea>
                                        <span class="error-message"></span>
                                    </div>
                                    <div class="form-group">
                                        <label>Mở đầu bài viết</label>
                                        <textarea class="form-control description preamble_post" rows="3" name="preamble_post"></textarea>
                                        <span class="error-message"></span>
                                    </div>
                                </div>
                                <div class="col-lg-6">
                                    <div class="form-group">
                                        <label>Ảnh bài viết</label>
                                        <input type="file" name="image_post" multiple class="image-input form-control">
                                        <span class="error-message"></span>
                                    </div>
                                    <div class="form-group">
                                        <label>Nội dung chính</label>
                                        <textarea class="form-control description content_post" rows="3" name="content_post"></textarea>
                                        <span class="error-message"></span>
                                    </div>
                                    
                                    
                                    
                                    <div class="form-group">
                                        <label>Kết bài</label>
                                        <textarea class="form-control description footer_post" rows="3" name="footer_post"></textarea>
                                        <span class="error-message"></span>
                                    </div>
                                </div>   
                                <div class="col-lg-12">
                                    <button class="btn btn-primary btn-add">Add post</button>
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

    async afterRender () {

        const AddPost = (post) => {

            const admin = JSON.parse(localStorage.getItem('user'));
            const file = $('.image-input');
            const timeNow = new Date();
            const timePost = `${timeNow.getHours()}:${timeNow.getMinutes()}/${timeNow.getDate()}/${timeNow.getMonth() + 1}/${timeNow.getFullYear()}`;
            post.id = Math.random().toString(36).substr(2, 9);
            post.timePost = timePost;
            
            let arrayImg = []; 
            const imgsPost = [...file.files];
            
            imgsPost.forEach(img => {
                let storageRef = firebase.storage().ref(`images/${img.name}`);
                storageRef.put(img).then(() => {
                    storageRef.getDownloadURL().then((url) => {
                        arrayImg.push(url);
                    })
                })
            })

            // up Api
            setTimeout(() => {
                post.idUser = admin.id;
                post.image_post = arrayImg;
                postsApi.add(post);
                alert('Đăng bài thành công !');
                window.location.href="/#/posts";
                resetRender(ListPost, '.list-post');
            }, 2000)
            
        }

        Validator({
            form: "#form-add",
            formGroupSelector: ".form-group",
            errorSelector: ".error-message",
            rules: [
                Validator.isRequired(".cate_post", 'Vui lòng chọn danh mục bài viết'),
                Validator.isRequired(".header_post", 'Vui lòng nhập tiêu đề'),
                Validator.isRequired(".des_post", 'Vui lòng nhập Mô tả'),
                Validator.isRequired(".preamble_post", 'Vui lòng nhập mở bài'),
                Validator.isRequired(".image-input", 'Chọn thêm ảnh mô tả bài viết'),
                Validator.isRequired(".content_post", 'Vui lòng nhập nội dung bài viết'),
                Validator.isRequired(".footer_post", 'Vui lòng nhập kết bài'), 
            ],
            onSubmit (post) {
                AddPost(post);
            }
        })
    }
}

export default AddPostPage;