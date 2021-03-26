import { $ } from './../utils';

const ProductPagination = {
    render () {
        return /*html */ `
            <div class="row">
                <div class="col-lg-12">
                    <nav class="pagination">
                        <ul class="pagination-list">
                            <li class="pagination-item">
                                <a href="javascript:void(0)" class="pagination-link btn-minus">
                                    <svg xmlns="http:ww.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                                    </svg>
                                </a>
                            </li>
                            <li class="pagination-item">
                                <a href="" class="pagination-link active-p">
                                    1
                                </a>
                            </li>
                            <li class="pagination-item">
                                <a href="" class="pagination-link">
                                    2
                                </a>
                            </li>
                            <li class="pagination-item">
                                <a href="?_page=1&_limit=3" class="pagination-link btn-plus">
                                    <svg xmlns="http:ww.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                                    </svg>
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        `
    },

    afterRender () {
        
    }
}

export default ProductPagination;