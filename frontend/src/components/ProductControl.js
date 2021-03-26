import productApi from './../api/productApi';
import { currentURL, $, resetRender, pagination } from './../utils';
import ProductsPage from './../pages/ProductsPage';


const ProductControl = {
    render () {
        return /*html*/ `
            <div class="row-control">
                <div class="row">
                    <div class="col-lg-9">
                            <div class="model-control">
                                <h4 class="title-control">Sắp xếp</h4>
                                <button type="button" class="btn btn-all btn-control btn-active">Tất cả</button>
                                <button type="button" class="btn btn-especially btn-control">Đặc biệt</button>
                                <button type="button" class="btn btn-sale btn-control">Giảm giá</button>
                            </div>
                    </div>
                    <div class="col-lg-3">
                        <select class="form-select form-select-lg" aria-label=".form-select-lg example" id="order-price">
                            <option value="0">Sắp xếp theo giá</option>
                            <option value="1">Giá: Từ thấp đến Cao</option>
                            <option value="2">Giá: Từ Cao đến Thấp</option>
                        </select>
                    </div>
                </div>
            </div>
        `;
    },

    async afterRender () {
        // sort product
        const { data: dataPrd } = await productApi.getAll();

        let selectPrice = $('#order-price');
        selectPrice.addEventListener('change', () => {
            const newProducts = dataPrd.sort((item1, item2) => {
                if (selectPrice.value == 1) {
                    return item1.price - item2.price;
                } else if (selectPrice.value == 2) {
                    return item2.price - item1.price;
                }
            })
            resetRender(ProductsPage, '.main', newProducts);
        })

        // classify  product

        // btn control
        const btnControl = $('.btn-control');
        btnControl.forEach(btn => {
            btn.onclick = () => {
                $('.btn-control.btn-active').classList.remove('btn-active');
                btn.classList.add('btn-active');

                if(btn.classList.contains('btn-sale')){
                    const prdSale = dataPrd.filter(prd => {
                        return prd.sale != undefined && prd.sale != '';
                    })
                    resetRender(ProductsPage, '.main', prdSale);
                } else if(btn.classList.contains('btn-all')){
                    resetRender(ProductsPage, '.main', dataPrd);
                } else if (btn.classList.contains('btn-especially')){
                    const prdEspecially = dataPrd.filter(prd => {
                        return (prd.sale != undefined || prd.sale != '') && prd.type_prd == 2;
                    })
                    resetRender(ProductsPage, '.main', prdEspecially);
                }

            }
        })
    }
}

export default ProductControl;