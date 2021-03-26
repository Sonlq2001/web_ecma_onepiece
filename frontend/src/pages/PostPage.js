import postsApi from './../api/postsApi';
import catePostApi from './../api/catePostApi';
import userApi from './../api/userApi';
import SideBarPost from './../components/SideBarPost';
import { currentURL, $ } from './../utils';


const PostPage  = {
    async render () {
        window.scrollTo(0,0);
        const { data : posts } = await postsApi.getAll();
        const { data : catePost } = await catePostApi.getAll();
        const { data : users } = await userApi.getAll();
        
        const idCate = currentURL().id;
        let authorPost = [];
        if(idCate === undefined) {
            posts.forEach(post => {
                // lấy ra các user đã đăng bài viết
                const filterUserPost = users.filter(user => {
                    return user.id == post.idUser;
                })
                
                // lấy ra các user đã đăng bài viết, và thông tin bài viết
                const usersPost = filterUserPost.map(userPost => {
                    if(userPost.id == post.idUser) {
                        return{
                            name: userPost.name,
                            avatar: userPost.file,
                            ...post
                        }
                    }
                })
                
                authorPost.push(...usersPost);
            })
        } else {
            posts.forEach(post => {
                // lấy ra tác giả của các bài post
                const filterUserPost = users.filter(user => {
                    return user.id == post.idUser;
                })
                // lấy ra các user đã đăng bài viết, và thông tin bài viết
                const usersPost = filterUserPost.map(userPost => {
                    if(userPost.id == post.idUser && post.idCatePost == idCate) {
                        return{
                            name: userPost.name,
                            avatar: userPost.file,
                            ...post
                        }
                    }
                })
                authorPost.push(...usersPost);
            })
        }

        


        return /*html*/ `
            <div class="container">
                <div class="row">
                    
                    <div class="col-3">
                        <!-- SideBarPost -->
                        ${await SideBarPost.render()}
                    </div>

                    <div class="col-9">
                        <div class="main-post">

                             <!-- option -->
                            <div class="group-option">
                                <button class="btn btn-option">
                                    Mới nhất
                                    <i class="icon-option fas fa-caret-down"></i>
                                </button>
                                <ul class="list-option active">
                                    <li class="item-option">
                                        <a href="javascript:void(0)" class="select-option">Mới nhất</a>
                                    </li>
                                    <li class="item-option">
                                        <a href="javascript:void(0)" class="select-option">Cũ nhất</a>
                                    </li>
                                </ul>
                            </div>
                            
                             <!-- list post -->
                            <div class="group-post">
                                ${
                                    authorPost.map(post => {
                                        if(post !== undefined){
                                            return /*html*/ `
                                                <div class="post">
                                                    <div class="author-post">
                                                        <img src="${post.avatar}" alt="" class="author-post__img">
                                                    </div>
                                                    <a href="/#/post/${post.id}" class="body-post">
                                                        <div class="content-post">
                                                            <h4 class="title-post">${post.header_post}</h4>
                                                            <p class="des-post">${post.des_post ? post.des_post : ''}</p>
                                                            <span class="time-post">${post.timePost}</span>
                                                        </div>
                                                        <div class="cate-post">
                                                            ${
                                                                catePost.map(cate => {
                                                                    if(cate.id == post.idCatePost) {
                                                                        return /*html*/ `
                                                                            <span class="cate-post__name">${cate.cate_post}</span>
                                                                        `;
                                                                    }
                                                                }).join('')
                                                            }
                                                        </div>
                                                        <div class="view-post">
                                                            <span class="cmt-post">
                                                                <i class="icon-chat far fa-comment"></i>
                                                                2
                                                            </span>
                                                            <span class="view-post__qt">
                                                                <i class="icon-view far fa-eye"></i>
                                                                1k
                                                            </span>
                                                        </div>
                                                    </a>
                                                </div>
                                            `;
                                        }
                                    }).join('')
                                }
                                
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    async afterRender () {
        await SideBarPost.afterRender();

        const btnOption = $('.btn-option');
        const listOption = $('.list-option');

        btnOption.onclick = () => {
            listOption.classList.toggle('active');
        }
    }
}

export default PostPage;