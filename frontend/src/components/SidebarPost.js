import postsApi from './../api/postsApi';
import catePostApi from './../api/catePostApi';
import { $,resetRender } from './../utils';
import PostPage from './../pages/PostPage';
import firebase from './../firebase';

const SideBarPost = {
    async render () {
        const { data : posts } = await postsApi.getAll();
        const { data : catePost } = await catePostApi.getAll();
        
        // trả ra bài post khớp với id post
        let listPost = [];
        catePost.forEach(cate => {
            const postCate = posts.filter(post => {
                return post.idCatePost == cate.id;
            })
            listPost.push(postCate);
        })
        

        return /*html*/ `
            <div class="post-let">
                <div class="sidebar-post">
                    <button class="btn btn-create-post">Đăng bài viết</button>

                    <span class="hashtag">
                        <i class="icon-hashtag fas fa-hashtag"></i>
                        Thẻ
                    </span>

                    <!-- list cate-post -->
                    <ul class="list-hashtag">
                        <li class="item-hashtag">
                            <a href="/#/posts" class="cate-hashtag">
                                <span class="icon-tag"></span> 
                                Tất cả
                            </a>
                            ${
                                catePost.map(cate => {
                                    return /*html*/ `
                                   <a href="/#/posts/${cate.id}" class="cate-hashtag">
                                        <span class="icon-tag"></span> 
                                        ${cate.cate_post}
                                    </a>
                                    `;
                                }).join("")
                            }
                        </li>
                    </ul>
                </div>

                <!-- toast post -->
                <div class="model-post">
                    <div class="box-post">
                        <div class="top-post">
                            <h3 class="note-post">Tạo bài viết</h3>
                        </div>

                        <div class="close-post">
                            <i class="fas fa-times"></i>
                        </div>

                        <div class="box-body-post">
                            <div class="person-post">
                                <img src="./images/fire.png" alt="" class="person-post__img">
                                <div class="model-option">
                                    <span class="person-name">son son</span>
                                    <select name="idCatePost" id="" class="list-cate-post">
                                         ${
                                            catePost.map(cate => {
                                                return /*html*/ `
                                                    <option value="${cate.id}">${cate.cate_post}</option>
                                                `;
                                            }).join("")
                                        }
                                    </select>
                                </div>
                            </div>
                            <div class="group-title">
                                <label for="" class="name-post">Tiêu đề: </label>
                                <input type="text" class="txt-post" name="header_post">
                            </div>
                            <div class="frame-post">
                                <textarea name="content_post" id="" cols="30" rows="10" class="text-post" placeholder="Nội dung bài viết ?"></textarea>
                            </div>
                        </div>
                        
                        <div class="editor">
                            <span class="note-editor">Thêm vào bài viết</span>
                            <ul class="list-editor">
                                <li class="item-editor">
                                    <input type="file" class="open-file" id="open-file" name="image_post">
                                    <label for="open-file" class="file-image">
                                        <i class="icon-file fas fa-image"></i>
                                    </label>
                                </li>
                                <li class="item-editor">
                                    <i class="icon-tags fas fa-tags"></i>
                                </li>
                                <li class="item-editor">
                                    <i class="icon-map fas fa-map-marker-alt"></i>
                                </li>
                                <li class="item-editor">
                                    <i class="icon-laugh far fa-laugh"></i>
                                </li>
                                <li class="item-editor">
                                    <i class="icon-dot fas fa-ellipsis-h"></i>
                                </li>
                            </ul>
                        </div>

                        <button class="btn btn-get-out">Đăng bài</button>
                    </div>
                </div>
            </div>    
        `;
    },

    async afterRender () {
        // handle model post
        const btnCreatPost = $('.btn-create-post');
        const modelPost = $('.model-post');
        btnCreatPost.onclick = () => {
            modelPost.classList.add('active-model');
        }
       
        $('.close-post').onclick = () => {
            modelPost.classList.remove('active-model');
        }
        window.onclick = (e) => {
            if(e.target == modelPost) {
                modelPost.classList.remove('active-model');
            }
        }

        // add post
        const catePost = $('.list-cate-post');
        const titlePost = $('.txt-post');
        const contentPost = $('.text-post');
        const imgPost = $('.open-file');
        const btnPost = $('.btn-get-out');
        const timeNow = new Date();
        const timeOrder = `${timeNow.getHours()}:${timeNow.getMinutes()}/${timeNow.getDate()}/${timeNow.getMonth() + 1}/${timeNow.getFullYear()}`;
        const userPost = JSON.parse(localStorage.getItem('user'));

        // sử lý khi nhập ( event )
        titlePost.oninput = () => {
            if(titlePost.value !== ''){
               btnPost.classList.add('active');
            } else {
                btnPost.classList.remove('active');
            }
        }

        // add post
        btnPost.onclick = () => {
            if(userPost) {
                if(titlePost.value !== '' && contentPost.value !== '') {
                    const post = {
                        id: Math.random().toString(36).substr(2, 9),
                        idCatePost: catePost.value,
                        idUser: userPost.id,
                        header_post: titlePost.value,
                        content_post: contentPost.value,
                        timePost: timeOrder
                    }

                    const file = imgPost.files[0];
                    const storageRef = firebase.storage().ref(`images/${file.name}`);
                    storageRef.put(file).then(() => {
                        storageRef.getDownloadURL().then((url) => {
                            post.image_post = [url];
                            postsApi.add(post);
                            modelPost.classList.remove('active-model');
                            resetRender(SideBarPost, '.post-let');
                            resetRender(PostPage);
                        })
                    })

                    
                    // window.scrollTo(0,0);
                }
            } else {
                window.location.href="/#/sign-in";
            }
        }


    }
}

export default SideBarPost;