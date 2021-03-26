import ListCatePost from './../components/ListCatePost';

const CatePostAdminPage = {
    async render () {
        return /*html*/ `
            <div class="container-fluid" id="list_cate_post">
                <div class="row">
                    <div class="col-lg-12">
                        <h3 class="page-header">Danh sách thể loại bài đăng</h3>
                    </div>
                    <!-- /.col-lg-12 -->
                </div>
                <!-- /.row -->
                <div class="row">
                    <div class="col-lg-12">
                        <div class="panel panel-default">
                            <div class="panel-heading">
                                <a href="/#/add-cate-post" class="btn btn-primary">Add Category post</a>
                            </div>
                            <!-- /.panel-heading -->
                            <div class="panel-body" id="listCate">

                                ${await ListCatePost.render()}
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
        ListCatePost.afterRender();
    }
}

export default CatePostAdminPage;