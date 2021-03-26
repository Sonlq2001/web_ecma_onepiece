import commentsApi from './../api/commentsApi';
import productApi from './../api/productApi';

const ListCmts = {
    async render () {
        const { data : dataPrd } = await productApi.getAll();
        const { data : dataCmt } = await commentsApi.getAll();

        const listCmt = dataPrd.map(prd => {
            // lấy ra cmt của từng sp
            const cmtInPrd = dataCmt.filter(cmt => {
                return prd.id == cmt.idPrd;
            })

            // lấy ra thời gian của từng cmt theo từng sp
            const timeCmt = cmtInPrd.map((cmt) => {
                if(cmt.idPrd == prd.id) {
                    return cmt.timeCmt;
                }
            })
            
            // lấy ra tên sp cmt;
            const listName = cmtInPrd.map(cmt => {
                if(cmt.idPrd == prd.id) {
                    return prd.name;
                }
            }) 

            // loại bỏ giá trị tên giống nhau 
            const handleName = Array.from (new Set(listName));
            
            
            const cmt = {
                idPrd: prd.id,
                name: handleName[0],
                quantity: listName.length,
                newTime: timeCmt[cmtInPrd.length - 1], 
                oldTime: timeCmt[0]
            }
            return cmt;
        })
        
        return /*html*/ `
            <div class="table-responsive" id="list-cate">
                <table class="table table-striped table-bordered table-hover table-cate" id="dataTables-example">
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Tên sản phẩm</th>
                            <th>Số lượng BL</th>
                            <th>Mới nhất</th>
                            <th>Cũ nhất</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                       ${
                            listCmt.map((cmt, index) => {
                                if(cmt.name !== undefined) {
                                    return /*html*/ `
                                        <tr>
                                            <td>${index + 1}</td>
                                            <td>${cmt.name}</td>
                                            <td>${cmt.quantity}</td>
                                            <td>${cmt.newTime}</td>
                                            <td>${cmt.oldTime}</td>
                                            <td class="d-flex justify-content-between">
                                                <a href="/#/detail-comments/${cmt.idPrd}" class="btn btn-primary mr-5">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-info-circle" viewBox="0 0 16 16">
                                                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                                        <path d="M8.93 6.588l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                                                    </svg>
                                                </a>
                                            </td>
                                        </tr>
                                    `;
                                }
                            }).join('')

                       }
                        
                    </tbody>
                </table>
            </div>
        `;
    }
}

export default ListCmts;