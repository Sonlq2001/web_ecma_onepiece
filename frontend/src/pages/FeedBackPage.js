import Validator from './../components/ValidationForm'; 
import { $, resetRender } from './../utils';
import feedbackApi from './../api/feedbackApi';


const FeedBackPage = {
    render () {
        window.scrollTo(0, 0);

        return /*html*/ `
            <div class="container">
                <div class="row">
                    <div class="col-12">
                        <form action="" class="form-feed-back">
                            <h3 class="title-form-fb">Phản hổi của khách hàng</h3>
                            <div class="group-form">
                                <label for="" class="title-input">Họ tên: </label>
                                <input type="text" placeholder="Họ tên khách hàng" class="txt-input name-input" name="name">
                                <span class="err-message"></span>
                            </div>
                            <div class="group-form">
                                <label for="" class="title-input">SĐT: </label>
                                <input type="number" placeholder="Số điện thoại liên hệ" class="txt-input phone-input" name="phone">
                                <span class="err-message"></span>
                            </div>
                            <div class="group-form">
                                <label for="" class="title-input">Email: </label>
                                <input type="email" placeholder="Email khách hàng" class="txt-input email-input" name="email">
                                <span class="err-message"></span>
                            </div>
                            <div class="group-form">
                                <label for="" class="title-input">Nội dung liên hệ: </label>
                                <textarea name="content" id="" cols="30" rows="10" placeholder="Nội dung liên hệ ?" class="content-fb"></textarea>
                                <span class="err-message"></span>
                            </div>
                            <button class="btn btn-login">Liên hệ</button>
                        </form>
                    </div>
                </div>
            </div>
        `;
    },

    afterRender () {

        const feedbackUser = (feedback) => {
            const userFb = JSON.parse(localStorage.getItem('user'));
            if(userFb) {
                const timeNow = new Date();
                const timeFb = `${timeNow.getHours()}:${timeNow.getMinutes()}/${timeNow.getDate()}/${timeNow.getMonth() + 1}/${timeNow.getFullYear()}`;
                
                feedback.id = Math.random().toString(36).substr(2, 9);
                feedback.idUser = userFb.id;
                feedback.timeFb = timeFb;
                feedbackApi.add(feedback);
                alert('Phản hồi của bạn đã được thực hiện, chúng tôi sẽ liên hệ với bạn sớm nhất !');
                resetRender(FeedBackPage);
            } else {
                window.location.href="/#/sign-in";
            }
        }

        Validator({
            form: '.form-feed-back',
            formGroupSelector: '.group-form',
            errorSelector: '.err-message',
            rules: [
              Validator.isRequired('.name-input', 'Vui lòng nhập họ tên'),
              Validator.isRequired('.phone-input', 'Vui lòng nhập SĐT'),
              Validator.isRequired('.email-input', 'Vui lòng nhập email'),
              Validator.isEmail('.email-input', 'Trường này phải là Email'),
              Validator.isRequired('.content-fb', 'Vui lòng nhập nội dung phản hồi'),
            ],
            onSubmit: function (feedback) {
                feedbackUser(feedback);
            }
        })
    }
}

export default FeedBackPage;