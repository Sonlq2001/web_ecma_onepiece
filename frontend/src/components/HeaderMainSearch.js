import { $ } from './../utils';
import productApi from './../api/productApi';

const HeaderMainSearch = {
    render() {
        return /*html */ `
            <form action="" class="form-search">
                <input type="text" placeholder="Tìm kiếm..." class="input-search">
                <button class="btn-search">Tìm kiếm</button>
            </form>
        `;
    },

    async afterRender() {
        const { data: dataPrd } = await productApi.getAll();
        const btnSearch = $('.form-search');

        btnSearch.addEventListener('submit', (e) => {
            e.preventDefault();
            const valueSearch = $('.input-search').value.toLowerCase().trim();

            if(valueSearch) {
                const searchResults = dataPrd.filter(product => {
                    return product.name.toLowerCase().includes(valueSearch);
                })
                
                // đẩy lên local
                localStorage.setItem('search-results', JSON.stringify(searchResults));
                window.location.href="/#/search-result";
            } else {
                alert('nhập tìm kiếm');
            }
        })
    }
}

export default HeaderMainSearch;