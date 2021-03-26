import { $, resetRender } from "../utils";
import ListProducts from "./../components/ListProducts";
import productApi from './../api/productApi';

const ProductsAdmin = {
  async render() {
    return /*html*/ `
            <div class="container-fluid main" id="product-admin">
                <div class="row">
                    <div class="col-lg-12">
                        <h3 class="page-header">Danh sách sản phẩm</h3>
                    </div>
                    <!-- /.col-lg-12 -->
                </div>
                <!-- /.row -->
                <div class="row">
                    <div class="col-lg-12">
                        <div class="panel panel-default">
                            
                            <!-- /.panel-heading -->
                            <!--<div class="panel-body" id= "ok"> -->                             
                                ${await ListProducts.render()}
                           <!-- </div> -->
                            <!-- /.panel-body -->
                        </div>
                        <!-- /.panel -->
                    </div>
                    <!-- /.col-lg-12 -->
                </div>
                <!-- /.row -->
            </div>
        `;
  },

    async afterRender() {
        await ListProducts.afterRender();

       

        
        
    },
};

export default ProductsAdmin;
