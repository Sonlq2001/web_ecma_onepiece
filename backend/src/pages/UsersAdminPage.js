import ListUsers from './../components/ListUsers';

const UsersAdminPage = {
    async render () {
        return /*html*/ `
            <div class="container-fluid" id="main">
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
                                <a href="/#/add-product" class="btn btn-primary">Add Product</a>
                            </div>
                            <!-- /.panel-heading -->
                            <div class="panel-body" id="list-product">
                                
                                ${await ListUsers.render()}
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
    }
}

export default UsersAdminPage;