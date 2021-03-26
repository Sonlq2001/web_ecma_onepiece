import ListFeedback from './../components/ListFeedback';

const FeedbackAdminPage = {
    async render () {
        return /*html*/ `
            <div class="container-fluid" id="fb-page">
                <div class="row">
                    <div class="col-lg-12">
                        <h3 class="page-header">Danh sách bài viết</h3>
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
                                ${await ListFeedback.render()}
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

    afterRender () {
        ListFeedback.afterRender();
    }
}

export default FeedbackAdminPage;