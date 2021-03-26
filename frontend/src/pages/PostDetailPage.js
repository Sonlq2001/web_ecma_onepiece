import { currentURL } from './../utils';
import postsApi from './../api/postsApi';
import userApi from './../api/userApi';

const PostDetailPage = {
    async render () {
        window.scrollTo(0,0);
        const idPost = currentURL().id;
        const { data : post } = await postsApi.get(idPost);
        const { data : users } = await userApi.getAll();
        
        // get author post
        const userPost = users.find(user => {
            return user.id == post.idUser
              
        })

        let imgPost1 = '';
        let imgPost2 = '';
        if(post.image_post) {
            imgPost1 = ` <img src="${post.image_post[0] }" alt="" class="img-note-article">`;
            imgPost2 = ` <img src="${post.image_post[1] }" alt="" class="img-note-article">`;
        } 
        

        return /*html*/ `
            <div class="container">
                <div class="row">
                    <div class="col-2">
                        <div class="author-article">
                            <img src="${userPost.file}" alt="" class="author-article__avatar">
                            <span class="author-article__name">${userPost.name}</span>
                        </div>
                        <div class="action-follow">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star" viewBox="0 0 16 16">
                                <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.523-3.356c.329-.314.158-.888-.283-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767l-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288l1.847-3.658 1.846 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.564.564 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"/>
                            </svg>
                            <span class="follow-author">Theo dõi</span>
                        </div>
                    </div>

                    <div class="col-7">
                        <div class="article-content">
                            <h3 class="header-article">
                                ${post.header_post}
                            </h3>

                            <span class="time-article">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clock" viewBox="0 0 16 16">
                                <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>
                                <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/>
                                </svg>
                                <span class="time-now">${post.timePost}</span>
                            </span>

                            <p class="des-article">${post.des_post ? post.des_post : ''}</p>

                            <p class="preface-article">${post.preamble_post ? post.preamble_post : ''}</p>

                            <div class="img-article">
                               ${imgPost1}
                                <!--<span class="caption-img">
                                    và lao lên làm việc đúng đắn, để tạo ra một điều phi 
                                </span> -->
                            </div>

                            <p class="body-article">${post.content_post}</p>

                            <div class="img-article">
                                
                               <!--<span class="caption-img">
                                    và lao lên làm việc đúng đắn, để tạo ra một điều phi 
                                </span> -->
                            </div>

                            <div class="footer-article">${post.footer_post ? post.footer_post : ''}</div>

                        </div>
                    </div>

                    <div class="col-3">
                    
                    </div>
                </div>
            </div>
        `;
    }
}

export default PostDetailPage;