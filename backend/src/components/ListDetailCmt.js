import { currentURL, $, resetRender } from './../utils';
import commentsApi from './../api/commentsApi';
import usersApi from './../api/usersApi';
import DetailCmtPage from './../pages/DetailCmtPage';

const ListDetailCmt = {
    async render () {
        const idPrd = currentURL().id;
        const { data : userCmt } = await usersApi.getAll();
        const { data : dataCmt } = await commentsApi.getAll();

        // lấy ra các cmt trùng id
        const listCmt = dataCmt.map(cmt => {
            if(cmt.idPrd == idPrd) {
                return cmt;
            }
        })
        
        // loại bỏ các giá trị undefined
        const filterCmt = listCmt.filter(cmt => {
            return cmt != null;
        })
        
        // lấy ra các comment trùng với tên người bình luận
        const listDetailCmt = [];
        userCmt.forEach(user => {
            const detailCmt =  filterCmt.map(cmt => {
                if(cmt.idUser == user.id)
                    return {
                        id: cmt.id,
                        content: cmt.content,
                        timeCmt: cmt.timeCmt,
                        userCmt: user.name,
                    }
            })
            
            const filterDetailCmt = detailCmt.filter(cmt => {
                return cmt != null;
            })
            listDetailCmt.push(...filterDetailCmt)
        })      


        return /*html*/ `
            <div class="table-responsive" id="list-detail-cmt">
                <table class="table table-striped table-bordered table-hover table-cate" id="dataTables-example">
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Nội dung</th>
                            <th>Ngày bình luận</th>
                            <th>Người bình luận</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${
                            listDetailCmt.map((cmt, index) => {
                                return /*html*/ `
                                    <tr>
                                        <td>${index + 1}</td>
                                        <td>${cmt.content}</td>
                                        <td>${cmt.timeCmt}</td>
                                        <td>${cmt.userCmt}</td>
                                        <td class="d-flex justify-content-between">
                                            <button type="button" class="btn btn-danger btn-remove" data-id="${cmt.id}">
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

    async afterRender () {
        const btnRemoves = $('.btn');
        if(Array.isArray(btnRemoves)) {
            btnRemoves.forEach(btn => {
                btn.onclick = async () => {
                    const id = btn.dataset.id;
                    const question = confirm('Bạn có muốn xóa');
                    if(question) {
                        await commentsApi.remove(id);
                        await resetRender(ListDetailCmt, '#list-detail-cmt');
                        await resetRender(DetailCmtPage, '#detail-cmt-page');
                    }
                }
            })
        }
    }
}

export default ListDetailCmt;