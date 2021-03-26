
import ListDetailCmt from './../components/ListDetailCmt';


const DetailCmtPage = {
    async render () {
        return /*html*/ `
            <div class="container-fluid" id="detail-cmt-page">
                <div class="row">
                    <div class="col-lg-12">
                        <h3 class="page-header">Chi tiết comment</h3>
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
                                ${await ListDetailCmt.render()}
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
    afterRender() {
        ListDetailCmt.afterRender();
    }
}

export default DetailCmtPage;