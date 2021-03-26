import Validator from './../components/ValidationForm'; 
import { $ } from './../utils';
import userApi from './../api/userApi';
import ordersSaveApi from './../api/ordersSaveApi';


const SignIn = {
    async render () {
        window.scrollTo(0,0);
        return /* html */ `
            <div class="container">
                <div class="row">
                    <div class="col-12">
                        <div class="box-from">
                            <div class="form-left">
                                <div class="form-left-group">
                                    <h3 class="form-left__title">Đăng nhập</h3>
                                    <p class="form-left__des">
                                        Đăng nhập để theo dõi đơn hàng, lưu
                                        danh sách sản phẩm yêu thích, nhận
                                        nhiều ưu đãi hấp dẫn.
                                    </p>
                                </div>
                                <img src="./images/login.png" alt="" class="form-left__img">
                            </div>
                            <form action="" class="form-login">
                                <h4 class="title-form">Đăng nhập</h4>
                                <div class="group-form">
                                    <label for="" class="title-input">Tài khoản: </label>
                                    <input type="text" placeholder="Email/Số điện thoại" class="txt-input acc-input" name="account">
                                    <span class="err-message"></span>
                                </div>
                                <div class="group-form">
                                    <label for="" class="title-input">Mật khẩu: </label>
                                    <input type="password" placeholder="Mật khẩu" class="txt-input pwd-input" name="password">
                                    <span class="err-message"></span>
                                </div>
                                <button class="btn btn-login">Sign in</button>
                                <div class="group-action">
                                    <a href="/#/sign-up" class="sign-up">Đăng kí tài khoản ?</a>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    async afterRender () {
        const { data : dataUser } = await userApi.getAll();
        const { data : orderSave } = await ordersSaveApi.getAll();
        const checkInfo = (account, password) => {
            dataUser.forEach(user => {
                if((user.phone === account || user.email === account) && (user.password === password)) {
                    window.location.href = '/#/';
                    // Tạo đối tượng và đẩy lên localStorage
                    const objUser = {
                        id: user.id,
                        account: user.name,
                        statusCart: user.statusCart,
                        role: user.role
                    }
                    localStorage.setItem('user', JSON.stringify(objUser));


                    // đẩy đơn hàng đã lưu lên local
                    let storageOrder = [];
                    orderSave.forEach(order => {
                        if(order.idUser == user.id) {
                            storageOrder.push(order);
                            localStorage.setItem('prdInCart', JSON.stringify(storageOrder));
                        }
                    })

                } 
            })
        }


        Validator({
            form: '.form-login',
            formGroupSelector: '.group-form',
            errorSelector: '.err-message',
            rules: [
              Validator.isRequired('.acc-input'),
              Validator.isRequired('.pwd-input'),
            ],
            onSubmit: function (info) {
                checkInfo(info.account, info.password);
            }
        })
    }
}

export default SignIn;