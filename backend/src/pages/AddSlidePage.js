import { resetRender } from './../utils';
import slidesApi from '../api/slidesApi';
import Validator from './../components/ValidationForm';
import firebase from './../firebase';
import ListSlides from './../components/ListSlides';

const AddSlidePage = {
    async render() {
        return /*html*/ `
            <div class="container-fluid">
                <div class="row">
                    <div class="col-lg-12">
                        <h1 class="page-header">Add Slide</h1>
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
                                                <label>Ảnh slide</label>
                                                <input class="form-control" name="image" type="file" placeholder="Eg" id="img-slide">
                                                <span class="error-message"></span>
                                            </div>
                                            <div class="form-group">
                                                <label>Đường dẫn</label>
                                                <input class="form-control" name="path_img" type="text" placeholder="Đường dẫn" id="path-slide">
                                                <span class="error-message"></span>
                                            </div>
                                            <button class="btn btn-primary btn-add">Add slide</button>
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

    async afterRender() {
        Validator({
            form: '#form-add',
            formGroupSelector: '.form-group',
            errorSelector: '.error-message',
            rules: [
                Validator.isRequired('#img-slide', 'Vui lòng chọn ảnh'),
                Validator.isRequired('#path-slide', 'Vui nhập đường dẫn liên kết'),
            ],
            onSubmit: function(file) {
                const fileImg = file.image;
                const storageRef = firebase.storage().ref(`images/${fileImg.name}`);
                storageRef.put(fileImg).then(() => {
                    storageRef.getDownloadURL().then((url) => {
                        file.image = url;
                        slidesApi.add(file);
                        alert('Thêm slide thành công !');
                        window.location.href = "http://localhost:4040/#/slides";
                        resetRender(ListSlides, '#list-slide');
                    })
                })
            }
        })
    }
}

export default AddSlidePage;