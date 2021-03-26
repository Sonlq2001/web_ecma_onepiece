import { currentURL, $, resetRender } from './../utils';
import commentsApi from './../api/commentsApi';
import userApi from './../api/userApi';
import ProductDetail from './../pages/ProductDetail';

const CommentDetail = {
    async render () {
        let idPrd = currentURL().id;
        const { data : comments } = await commentsApi.getAll();
        const { data : users } = await userApi.getAll();
        
        let userCmt = [];
        comments.forEach(cmt => {
            // lấy ra user cmt
            const user = users.filter(user => {
                return user.id == cmt.idUser;
            })
            
            // lấy ra cmt theo sp và theo user cmt
            const handleCmt = user.map(item => {
                if(item.id == cmt.idUser && cmt.idPrd == idPrd){
                    return { 
                        id: cmt.id,
                        name: item.name,
                        content: cmt.content,
                        timeCmt: cmt.timeCmt,
                        avatar: item.file
                    }
                }
            })
            
            userCmt.push(...handleCmt);
        })

        // sort comments
        const sortCmt = userCmt.sort((cmt1, cmt2) => {
            return cmt2.id - cmt1.id;
        })

        // get avatar user
        let avatarUser;
        const userLogin = JSON.parse(localStorage.getItem('user'));
        if(userLogin){
            const findUser = users.find(user => {
                return user.id == userLogin.id;
            })
            avatarUser = findUser.file;
        } else {
            avatarUser = './images/avatar.jpg';
        }
        

        return /*html*/ `
            <div class="box-comment">
                <h3 class="box-comment__title">Đánh giá sản phẩm</h3>
                <div class="form-cmt">
                    <div class="group-cmt">
                        <div class="group-cmt-info">
                            <img src="${avatarUser}" alt="" class="group-cmt-info__avatar">
                            <input type="text" placeholder="Bình luận đánh giá về sản phẩm" class="group-cmt-info__value">
                        </div>
                        <div class="group-cmt-action active">
                            <button class="btn btn-cmt-close">Hủy</button>
                            <button class="btn btn-post">Bình luận</button>
                        </div>
                    </div>
                </div>

                ${
                    userCmt.map(cmt => {
                        if(cmt !== undefined) {
                            return /*html*/ `
                                <div class="cmt-other">
                                    <div class="cmt-avatar">
                                        <img src="${cmt.avatar}" alt="" class="group-cmt-info__avatar">
                                    </div>
                                    <div class="cmt-body">
                                        <div class="cmt-content">
                                            <span class="cmt-content__author">${cmt.name}</span>
                                            <p class="cmt-content__text">${cmt.content}</p>
                                        </div>
                                        <div class="cmt-time">
                                            <span class="cmt-like active">Thích</span>
                                            <span class="cmt-reply">Trả lời</span>
                                            <span class="cmt-time-post">${cmt.timeCmt}</span>
                                        </div>
                                    </div>
                                </div>
                            `;
                        }
                    }).join('')
                }

            </div>
        `;
    },

    async afterRender () {
        const inputComment = $('.group-cmt-info__value');
        const btnAction = $('.group-cmt-action');
        const btnPostCmt = $('.btn-post');
        let valueCmt;

        // khi click
        inputComment.onclick = () => {
            btnAction.classList.remove('active');
            btnPostCmt.style.cursor = 'default';
        }
        // khi nhập
        inputComment.oninput = () => {
            valueCmt = inputComment.value.trim();
            if(valueCmt !== '') {
                btnPostCmt.classList.add('active');
                btnPostCmt.style.cursor = 'pointer';
            } else {
                btnPostCmt.classList.remove('active');
            }
        }
        // khi hủy cmt
        if(btnAction) {
            $('.btn-cmt-close').onclick = () => {
                btnAction.classList.add('active');
            }
        }

        // post comment
        let idPrd = currentURL().id;
        btnPostCmt.onclick = () => {
            const user = JSON.parse(localStorage.getItem('user'));
            const timeNow = new Date();
            const timeCmt = `${timeNow.getHours()}:${timeNow.getMinutes()}/${timeNow.getDate()}/${timeNow.getMonth() + 1}/${timeNow.getFullYear()} `;
            if(user) {
                valueCmt = inputComment.value.trim();
                if(valueCmt !== ''){
                    const comment = {
                        idUser: user.id,
                        idPrd: idPrd,
                        content: valueCmt,
                        timeCmt: timeCmt
                    }
                    commentsApi.add(comment);
                    resetRender(CommentDetail, '.box-comment');
                    // resetRender(ProductDetail, '.cmt-product');
                }
            } else {
                window.location.href="http://localhost:8080/#/sign-in";
            }
        }
    }
}

export default CommentDetail;