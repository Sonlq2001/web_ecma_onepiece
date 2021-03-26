import { currentURL, $, resetRender } from './../utils';
import slidesApi from './../api/slidesApi';
import Validator from "./../components/ValidationForm";
import ListSlides from './../components/ListSlides';
import firebase from "./../firebase";

const EditSlidePage = {
    async render() {
        const id = currentURL().id;
        const { data: slide } = await slidesApi.get(id);
        return /*html*/ `
            <div class="container-fluid">
                <div class="row">
                    <div class="col-lg-12">
                        <h1 class="page-header">Edit Slide</h1>
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
                                    <form role="form" class="form-edit">
                                        <div class="form-group">
                                            <label>Ảnh slide</label>
                                            <input class="form-control" name="image" type="file" placeholder="Eg" id="edit-img-slide">
                                            <img src="${slide.image}" alt="" class="show-img-slide">
                                            <span class="error-message"></span>
                                        </div>
                                        <div class="form-group">
                                            <label>Đường dẫn liên kết</label>
                                            <input class="form-control" name="path_img" type="text" placeholder="Eg" id="edit-path-slide" value="${slide.path_img}">
                                            <span class="error-message"></span>
                                        </div>
                                        <button class="btn btn-primary btn-edit">Edit category</button>
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
        const { id } = currentURL();
        const { data: slide } = await slidesApi.get(id);
        Validator({
            form: ".form-edit",
            formGroupSelector: ".form-group",
            errorSelector: ".error-message",
            rules: [
                // Validator.isRequired("#edit-img-slide"),
                Validator.isRequired("#edit-path-slide"),
            ],
            onSubmit: function(data) {
                data.id = id;
                const file = data.image;

                // trường hợp ko sửa ảnh
                if (file == undefined) {
                    data.image = slide.image;

                    slidesApi.update(data, id);
                    alert('Sửa slide thành công !');
                    window.location.href = "http://localhost:4040/#/slides";
                    resetRender(ListSlides, '.list-slide');

                } else {
                    // trường hợp sửa ảnh
                    const storageRef = firebase.storage().ref(`images/${file.name}`);
                    storageRef.put(file).then(() => {
                        storageRef.getDownloadURL().then((url) => {
                            data.image = url;

                            slidesApi.update(data, id);
                            alert('Sửa slide thành công !');
                            window.location.href = "http://localhost:4040/#/slides";
                            resetRender(ListSlides, '.list-slide');
                        })
                    })
                }


            },
        });
    }
};

export default EditSlidePage;