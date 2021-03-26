import postsApi from './../api/postsApi';
import catePostApi from './../api/catePostApi';
import usersApi from './../api/usersApi';

const ListPost = {
    async render () {
        const { data : posts } = await postsApi.getAll();
        const { data : users } = await usersApi.getAll();
        const { data : catePost } = await catePostApi.getAll();
        
        let listPost = [];
        users.forEach(user => {
            // lấy ra các bài post trùng với cả user post
            const dataPost = posts.filter(post => {
                return user.id == post.idUser;
            })
            
            // lấy ra tên người post
            const userPost = dataPost.map(post => {
                if(post.idUser == user.id){
                    return {
                        id: post.id,
                        catePost: post.idCatePost,
                        userPost: user.name,
                        headerPost: post.header_post,
                        timePost: post.timePost
                    }   
                }
            })
            listPost.push(...userPost);
        })
        
        // lấy ra tên danh mục post
        let finalResult = []
        catePost.forEach(cate => {
            const findCateName = listPost.map(post => {
                if(post.catePost == cate.id) {
                    post.catePost = cate.cate_post;
                    return {
                        ...post
                    }
                }
            })
            finalResult.push(...findCateName);
        })
        
        const listUserPost = finalResult.filter(userPost => {
            return userPost != undefined;
        })
        
        let result = listUserPost.length > 1 ? listUserPost : listPost;
        
        return /*html*/ `
        <div class="table-responsive list-post">
            <table class="table table-striped table-bordered table-hover table-slide" id="dataTables-example">
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Người đăng</th>
                        <th>Danh mục</th>
                        <th>Tiêu đề</th>
                        <th>Thời gian</th>
                        <th>Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    ${
                        result.map((userPost, index) => {
                            return /*html*/ `
                                <tr>
                                    <td>${index + 1}</td>
                                    <td>${userPost.userPost}</td>
                                    <td>${userPost.catePost}</td>
                                    <td>${userPost.headerPost}</td>
                                    <td>${userPost.timePost}</td>
                                    <td>Chi tiết</td>
                                </tr>
                            `;
                        }).join('')
                    }
                </tbody>
            </table>
        </div>
    `;
    },

    afterRender () {
        
    }
}

export default ListPost;