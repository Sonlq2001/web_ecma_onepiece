import { $, resetRender } from './../utils';
import feedbacksApi from './../api/feedbacksApi';
import usersApi from './../api/usersApi';
import FeedbackAdminPage from './../pages/FeedbackAdminPage';

const ListFeedback = {
    async render () {
        const { data : feedbacks } = await feedbacksApi.getAll();
        const { data : users } = await usersApi.getAll();
        let listFeedback = [];
        feedbacks.forEach(fb => {
            // lấy ra user fb
            const userFb = users.filter(user => {
                return user.id == fb.idUser;
            })
            
            // lấy tên user đã fb
            const fbs = userFb.map(user => {
                if(user.id == fb.idUser){
                    return {
                        id: fb.id,
                        user: user.name,
                        phone: fb.phone,
                        email: fb.email,
                        content: fb.content,
                        timeFb: fb.timeFb
                    }
                }
            })
            listFeedback.push(...fbs);
        })
        

        return /*html*/ `
            <div class="table-responsive" id="list-fb">
                <table class="table table-striped table-bordered table-hover table-fb" id="dataTables-example">
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Tên khách hàng</th>
                            <th>SĐT</th>
                            <th>Email</th>
                            <th>Nội dung phản hồi</th>
                            <th>Thời gian</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                       ${
                            listFeedback.map((fb, index) => {
                                return /*html*/ `
                                    <tr>
                                        <td>${index + 1}</td>
                                        <td>${fb.user}</td>
                                        <td>${fb.phone}</td>
                                        <td>${fb.email}</td>
                                        <td>${fb.content}</td>
                                        <td>${fb.timeFb}</td>
                                        <td class="d-flex justify-content-between">
                                            <button type="button" class="btn btn-danger btn-remove" data-id="${fb.id}">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                                    <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                                                </svg>
                                            </button>
                                        </td>
                                    </tr>
                                `;
                            }).join('')
                       } 
                    </tbody>
                </table>
            </div>
        `;
    },

    async afterRender (){
        const btnRemoves = $('.table-fb .btn');

        
        if(Array.isArray(btnRemoves)) {
            btnRemoves.forEach(btn => {
                if (btn.classList.contains('btn-remove')) {
                    btn.addEventListener('click', async () => {
                        const idSlide = btn.dataset.id;
                        const question = confirm('Bạn có muốn xóa ?');
                        if (question) {
                            await feedbacksApi.remove(idSlide);
                            await resetRender(ListFeedback, '#list-fb');
                            await resetRender(FeedbackAdminPage, '#fb-page');
                        }
                    })
    
                }
            })
        } else {
            btnRemoves.onclick = () => {
                if (btnRemoves.classList.contains('btn-remove')) {
                    const idSlide = btnRemoves.dataset.id;
                    const question = confirm('Bạn có muốn xóa ?');
                    if (question) {
                        feedbacksApi.remove(idSlide);
                        resetRender(ListFeedback, '#list-fb');
                        resetRender(FeedbackAdminPage, '#fb-page');
                    }
                }
            }
        }
    }
}

export default ListFeedback;