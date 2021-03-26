import ListOrders from './../components/ListOrders';
const OrderAdminPage = {
    async render () {
        return /*html*/ `
        <div class="container-fluid" id="load">
            <div class="row">
                <div class="col-lg-12">
                    <h3 class="page-header">Danh sách đơn hàng</h3>
                </div>
                <!-- /.col-lg-12 -->
            </div>
            <!-- /.row -->
            <div class="row">
                <div class="col-lg-12">
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            sonel
                        </div>
                        <!-- /.panel-heading -->
                        <div class="panel-body" id="listCate">
                            ${await ListOrders.render()}
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
    async afterRender () {
        await ListOrders.afterRender();
    }
}

export default OrderAdminPage;