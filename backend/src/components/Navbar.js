
const Navbar = {
    render () {

        const admin = JSON.parse(localStorage.getItem('user'));
        if(admin != undefined && admin.role == 1) { 
            return /*html*/ `
                <div class="navbar-header">
                    <a class="navbar-brand" href="index.html">Admin sonel</a>
                </div>
    
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
    
                <ul class="nav navbar-nav navbar-left navbar-top-links">
                    <li><a href="#"><i class="fa fa-home fa-fw"></i> Website</a></li>
                </ul>
    
                
                <!-- /.navbar-top-links -->
    
                <div class="navbar-default sidebar" role="navigation">
                    <div class="sidebar-nav navbar-collapse">
                        <ul class="nav" id="side-menu">
                            <li class="sidebar-search">
                                <div class="input-group custom-search-form">
                                    <input type="text" class="form-control" placeholder="Search...">
                                    <span class="input-group-btn">
                                        <button class="btn btn-primary" type="button">
                                            <i class="fa fa-search"></i>
                                        </button>
                                </span>
                                </div>
                                <!-- /input-group -->
                            </li>
                            <li>
                                <a href="/" class="active"><i class="fa fa-dashboard fa-fw"></i> Dashboard</a>
                            </li>
                            <li>
                                <a href="/#/categories"><i class="fa fa-edit fa-fw"></i> Categories</a>
                            </li>
                            <li>
                                <a href="/#/products"><i class="fa fa-table fa-fw"></i> Products</a>
                            </li>
                            <li>
                                <a href="/#/orders"><i class="fa fa-files-o fa-fw"></i> Orders</a>
                            </li>
                            <li>
                                <a href="/#/slides"><i class="fa fa-files-o fa-fw"></i> Slides</a>
                            </li>
                            <li>
                                <a href="/#/users"><i class="fa fa-files-o fa-fw"></i> user</a>
                            </li>
                            <li>
                                <a href="/#/comments"><i class="fa fa-files-o fa-fw"></i> Comments</a>
                            </li>
                            <li>
                                <a href="/#/categories-post"><i class="fa fa-files-o fa-fw"></i> Categories Post</a>
                            </li>
                            <li>
                                <a href="/#/posts"><i class="fa fa-files-o fa-fw"></i> Post</a>
                            </li>
                            <li>
                                <a href="/#/feedbacks"><i class="fa fa-files-o fa-fw"></i> Feedback</a>
                            </li>
                        </ul>
                    </div>
                </div>
            `;
        } else {
            window.location.href="http://localhost:4040/#/login-admin";
        }

    }
}

export default Navbar;