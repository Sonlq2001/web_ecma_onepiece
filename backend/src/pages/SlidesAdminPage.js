import ListSlides from './../components/ListSlides';

const SlidesAdminPage = {
    async render() {
        return /*html*/ `
            <div class="container-fluid" id="slide-page">
                <div class="row">
                    <div class="col-lg-12">
                        <h3 class="page-header">Danh sách slides ảnh</h3>
                    </div>
                    <!-- /.col-lg-12 -->
                </div>
                <!-- /.row -->
                <div class="row">
                    <div class="col-lg-12">
                        <div class="panel panel-default">
                            <div class="panel-heading">
                                <a href="/#/add-slide" class="btn btn-primary">Add slide</a>
                            </div>
                            <!-- /.panel-heading -->
                            <div class="panel-body" id="listCate">
                                ${await ListSlides.render()}
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
        return `${await ListSlides.afterRender()}`;
    },
}

export default SlidesAdminPage;