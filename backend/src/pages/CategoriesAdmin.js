import ListCategories from '../components/ListCategories';
import { $, resetRender } from './../utils';


const CategoriesAdmin = {
    async render () {
        return /*html*/ `
            <div class="container-fluid" id="cate-admin">
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
                            <div class="panel-heading">
                                <a href="/#/add-category" class="btn btn-primary">Add Category</a>
                            </div>
                            <!-- /.panel-heading -->
                            <div class="panel-body" id="listCate">

                                ${await ListCategories.render()}
                            </div>
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
        return `${await ListCategories.afterRender()}`
    }  
}

export default CategoriesAdmin;