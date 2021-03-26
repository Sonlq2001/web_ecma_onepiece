import ListPost from './../components/ListPost';

const PostAdminPage = {
    async render () {
        return /*html*/ `
            <div class="container-fluid" id="load">
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
                                <a href="/#/add-post" class="btn btn-primary">Add post</a>
                            </div>
                            <!-- /.panel-heading -->
                            <div class="panel-body" id="listCate">
                                ${await ListPost.render()}
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

export default PostAdminPage;