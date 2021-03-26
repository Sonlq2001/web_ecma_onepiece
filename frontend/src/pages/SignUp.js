import Validator from './../components/ValidationForm'; 
import { $ } from './../utils';
import userApi from './../api/userApi';
import firebase from '../firebase';

const SignUp = {
    render () {
        window.scrollTo(0,0);
        return /* html */ `
            <div class="container">
                <div class="row">
                    <div class="col-12">
                        <div class="box-from">
                            <div class="form-left">
                                <div class="form-left-group">
                                    <h3 class="form-left__title">Tạo tài khoản</h3>
                                    <p class="form-left__des">
                                        Đăng nhập để theo dõi đơn hàng, lưu
                                        danh sách sản phẩm yêu thích, nhận
                                        nhiều ưu đãi hấp dẫn.
                                    </p>
                                </div>
                                <img src="./images/login.png" alt="" class="form-left__img">
                            </div>
                            <form action="" class="form-login">
                                <h4 class="title-form">Tạo tài khoản</h4>
                                <div class="group-form">
                                    <label for="" class="title-input">Họ tên: </label>
                                    <input type="text" placeholder="Nhập họ tên" class="txt-input name-input" name="name">
                                    <span class="err-message"></span>
                                </div>
                                <div class="group-form">
                                    <label for="" class="title-input">SĐT: </label>
                                    <input type="number" placeholder="Nhập số điện thoại" class="txt-input phone-input" name="phone">
                                    <span class="err-message"></span>
                                </div>
                                <div class="group-form">
                                    <label for="" class="title-input">Email: </label>
                                    <input type="email" placeholder="Nhập email" class="txt-input email-input" name="email">
                                    <span class="err-message"></span>
                                </div>
                                <div class="group-form">
                                    <label for="" class="title-input">Mật khẩu: </label>
                                    <input type="password" placeholder="Nhập mật khẩu" class="txt-input pwd-input" name="password">
                                    <span class="err-message"></span>
                                </div>
                                <div class="group-form">
                                    <label for="" class="title-input">Hình đại diện: </label>
                                    <input type="file" class="file-input" name="file">
                                    <span class="err-message"></span>
                                </div>
                                <button class="btn btn-login">Sign up</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
    `;
    },

    afterRender () {
        const getInfo = (infoUser) => {
            userApi.add(infoUser);
            alert('Đăng kí tài khoản thành công !');
            window.location.href = "/#/sign-in";
        }

        Validator({
            form: '.form-login',
            formGroupSelector: '.group-form',
            errorSelector: '.err-message',
            rules: [
              Validator.isRequired('.name-input', 'Vui lòng nhập họ tên'),
              Validator.isRequired('.phone-input', 'Vui lòng nhập SĐT'),
              Validator.isRequired('.email-input', 'Vui lòng nhập email'),
              Validator.isEmail('.email-input'),
              Validator.isRequired('.pwd-input', 'Vui lòng nhập mật khẩu'),
              Validator.isRequired('.file-input', 'Bạn chưa chọn ảnh đại diện'),
            ],
            onSubmit: function (info) {
                const file = info.file;
                const storageRef = firebase.storage().ref(`images/${file.name}`);
                storageRef.put(file).then(() => {
                    storageRef.getDownloadURL().then((url) => {
                        info.file = url;
                        info.statusCart = false;
                        info.role = 2;
                        getInfo(info);
                    })
                })
            }
        })
    }
}

export default SignUp;