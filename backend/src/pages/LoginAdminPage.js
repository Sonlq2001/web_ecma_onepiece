import usersApi from './../api/usersApi';
import Validator from './../components/ValidationForm';

const LoginAdminPage = {
    render () {
        return /*html*/ `
            <div class="container-fluid" id="load">
                <div class="row">
                    <div class="col-md-4 col-md-offset-4">
                        <div class="login-panel panel panel-default">
                            <div class="panel-heading">
                                <h3 class="panel-title">Please Sign In</h3>
                            </div>
                            <div class="panel-body">
                                <form role="form" class="form-admin">
                                    <fieldset>
                                        <div class="form-group group-form">
                                            <input class="form-control acc-input" placeholder="E-mail" name="account" type="text" autofocus>
                                            <span class="err-message"></span>
                                        </div>
                                        <div class="form-group group-form">
                                            <input class="form-control pwd-input" placeholder="Password" name="password" type="password" value="">
                                            <span class="err-message"></span>
                                        </div>
                                       
                                        <!-- Change this to a button or input when using this as a form -->
                                        <button class="btn btn-lg btn-success btn-block">Login</button>
                                    </fieldset>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    async afterRender () {
        const { data : dataUser } = await usersApi.getAll();
        // kiểm tra admin đăng nhập
        const checkInfo = (account, password) => {
            dataUser.forEach(user => {
                if((user.phone === account || user.email === account) && (user.password === password) && user.role == 1) {
                    window.location.href = 'http://localhost:4040/#/';
                    const objUser = {
                        id: user.id,
                        account: user.name,
                        statusCart: user.statusCart,
                        role: user.role
                    }
                    localStorage.setItem('user', JSON.stringify(objUser));
                } 
            })
        }


        Validator({
            form: '.form-admin',
            formGroupSelector: '.group-form',
            errorSelector: '.err-message',
            rules: [
              Validator.isRequired('.acc-input'),
              Validator.isRequired('.pwd-input'),
            ],
            onSubmit: function (admin) {
                checkInfo(admin.account, admin.password);
            }
        })
    }
}
export default LoginAdminPage;