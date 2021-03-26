import usersApi from './../api/usersApi';

const ListUsers = {
    async render () {
        const { data : dataUsers } = await usersApi.getAll();

        return /*html*/ `
            <div class="table-responsive" id="list-product">
                <table class="table table-striped table-bordered table-hover table-products" id="dataTables-example">
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Họ tên</th>
                            <th>Số điện thoại</th>
                            <th>Email</th>
                            <th>Hình đại diện</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${
                            dataUsers.map( (user, index) => {
                                return /*html*/ `
                                    <tr class="gradeA even" role="row">
                                        <td>${index + 1}</td>
                                        <td>${user.name}</td>
                                        <td>${user.phone}</td>
                                        <td>${user.email}</td>
                                        <td>
                                            <img src="${user.file}" alt="" width="120px" height="80px">
                                        </td>
                                        <td class="d-flex justify-content-between">
                                            <button type="button" class="btn btn-danger btn-remove" data-id="${user.id}">
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
    }
}

export default ListUsers;