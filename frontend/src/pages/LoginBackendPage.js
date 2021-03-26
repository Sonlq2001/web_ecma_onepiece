import Validator from './../components/ValidationForm'; 
import { $, resetRender } from './../utils';
import userApi from './../api/userApi';

const LoginBackendPage = {
    render () {
        return /*html*/ `
            <div class="container">
                <div class="row">
                    <div class="col-12">
                        <form action="" class="form-feed-back form-admin">
                            <h3 class="title-form-fb">Đăng nhập với tư cách Admin</h3>
                            <div class="group-form">
                                <label for="" class="title-input">Tài khoản: </label>
                                <input type="text" placeholder="Email/Số điện thoại" class="txt-input acc-input" name="account">
                                <span class="err-message"></span>
                            </div>
                            <div class="group-form">
                                <label for="" class="title-input">Mật khẩu: </label>
                                <input type="password" placeholder="Nhập mật khẩu" class="txt-input pwd-input" name="password">
                                <span class="err-message"></span>
                            </div>
                            <div class="btn-login-admin">
                                <button class="btn btn-login">Đăng nhập</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        `; 
    },

    async afterRender () {
        const infoAdmin = JSON.parse(localStorage.getItem('user'));
        const { data : user } = await userApi.get(infoAdmin.id);

        const checkAdmin = (account, password) => {
            if(infoAdmin && user) {
                if((user.phone == account && user.password == password) || (user.email == account && user.password == password)) {
                    // window.open("http://localhost:4040/");
                    // resetRender(LoginBackendPage);
                    postMessage(JSON.stringify({a: 'le quang son'}), "http://localhost:4040/");
                    

                } else {
                   alert('Sai tài khoản hoặc mật khẩu !');
                }
            }
            
        }

        Validator({
            form: '.form-admin',
            formGroupSelector: '.group-form',
            errorSelector: '.err-message',
            rules: [
                Validator.isRequired('.acc-input', 'Vui lòng nhập tài khoản Admin'),
                Validator.isRequired('.pwd-input', 'Vui lòng nhập mật khẩu Admin'),
            ],
            onSubmit: function (admin) {
                checkAdmin(admin.account, admin.password);
            }
        })
    }
}

export default LoginBackendPage;