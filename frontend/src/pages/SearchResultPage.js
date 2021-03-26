import ProductControl from './../components/ProductControl';
import ProductPagination from './../components/ProductPagination';

const SearchResultPage = {
    render () {
        window.scrollTo(0, 0);
        const searchResults = JSON.parse(localStorage.getItem('search-results'));
        
        const results = () => {
            if(searchResults.length >= 1) {
                const results = searchResults.map(result => {
                    return /*html*/ `
                        <div class="col-lg-2 col-md-4 col-6">
                            <div class="card mt-4">
                                <a href="/#/product/${result.id}">
                                    <img src="${result.image}" class="card-img-top cart-img-prd" alt="...">
                                </a>
                                <div class="card-body">
                                <h5 class="card-title">
                                    <a href="/#/product/${result.id}" class="card-title-fix">${result.name}</a>
                                </h5>
                                <span class="card-price">Giá:
                                    <span class="card-price__detail"> ${result.price} đ</span>
                                </span>
                                <span class="card-status">Trạng thái: ${result.status ? 'Còn' : 'Hết'} </span>
                                <button class="btn btn-card add-cart" data-id=>Add to cart</button>
                                </div>
                            </div>
                        </div>
                    `;
                }).join('')
                return results;
            } else {
                return /*html*/ `
                    <div class="empty-result">
                        <img src="./images/no_results_found.png" alt="" class="empty-result__img">
                    </div>
                `;
            }
        }
        return /*html*/`
            <div class="container" id='list-products'>		
                <div class="row">
                    <div class="col-12">
                        <div class="search-result">
                            <h4 class="search-result__value">
                                Kết quả tìm kiếm cho từ khóa '
                                <span class="key-search"></span> '
                            </h4>
                        </div>
                    </div>
                </div>

                <!-- row control product -->
                ${ProductControl.render()}
    
                <!-- product -->
                <div class="row-products" id="sort">
                    <div class="row">
                        
                            ${results()}
                        
                    </div>
                </div>
    
                <!-- paginate -->
                ${ProductPagination.render()}
            </div>
            `;
    },

    afterRender () {
        
    }
}

export default SearchResultPage;