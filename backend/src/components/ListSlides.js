import slidesApi from "./../api/slidesApi";
import { $, resetRender } from './../utils';
import SlidesAdminPage from './../pages/SlidesAdminPage';

const ListSlides = {
    async render() {
        const { data: slides } = await slidesApi.getAll();
        return /*html*/ `
            <div class="table-responsive list-slide">
                <table class="table table-striped table-bordered table-hover table-slide" id="dataTables-example">
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Ảnh slide</th>
                            <th>Đường dẫn liên kết</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${slides.map((slide, index) => {
                            return /*html*/ `
                                <tr class="gradeA even" role="row">
                                    <td>${index + 1}</td>
                                    <td>
                                        <img src="${slide.image}" alt="" width="300px" height="100px">
                                    </td>
                                    <td>
                                        ${slide.path_img}
                                        <a href="${slide.path_img}" target="_blank">Link thử</a>
                                    </td>
                                    <td class="d-flex justify-content-between">
                                        <a href="/#/edit-slide/${slide.id}" class="btn btn-primary mr-5">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                            </svg>
                                        </a>
                                        <button type="button" class="btn btn-danger" data-id="${slide.id}">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                                <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                                            </svg>
                                        </button>
                                    </td>
                                </tr>
                            `;
                        }).join("")}
                    </tbody>
                </table>
            </div>
        `;
    },

    async afterRender() {
        const btnRemoves = $('.table-slide .btn');

        btnRemoves.forEach(btn => {
            if (btn.classList.contains('btn-danger')) {
                btn.addEventListener('click', async () => {
                    const idSlide = btn.dataset.id;
                    const question = confirm('Bạn có muốn xóa ?');
                    if (question) {
                        await slidesApi.remove(idSlide);
                        await resetRender(ListSlides, '.list-slide');
                        await resetRender(SlidesAdminPage, '#slide-page');
                    }
                })

            }
        })
    }
};

export default ListSlides;