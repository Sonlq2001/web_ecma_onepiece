import { currentURL, $ } from "./utils.js";
import Navbar from "./components/Navbar";

import Dashboard from "./components/Dashboard";

import ProductsAdmin from "./pages/ProductsAdmin";
import AddProductPage from "./pages/AddProductPage";
import EditProductPage from "./pages/EditProductPage";

import CategoriesAdmin from "./pages/CategoriesAdmin";
import AddCategories from "./pages/AddCategory";
import EditCategories from "./pages/EditCategoryPage";

import OrderAdminPage from "./pages/OrderAdminPage";
import DetailOrderPage from './pages/DetailOrderPage';

import SlidesAdminPage from "./pages/SlidesAdminPage";
import AddSlidePage from "./pages/AddSlidePage";
import EditSlidePage from "./pages/EditSlidePage";

import CmtsAdminPage from './pages/CmtsAdminPage';
import DetailCmtPage from './pages/DetailCmtPage';

import CatePostAdminPage from './pages/CatePostAdminPage';
import AddCatePost from './pages/AddCatePost';
import EditCatePostPage from './pages/EditCatePostPage';

import PostAdminPage from './pages/PostAdminPage';
import AddPostPage from './pages/AddPostPage';

import UsersAdminPage from "./pages/UsersAdminPage";
import LoginAdminPage from './pages/LoginAdminPage';

import FeedbackAdminPage from './pages/FeedbackAdminPage';
import Error404 from "./pages/Error404";

const routes = {
    "/": Dashboard,
    "/products": ProductsAdmin,
    "/add-product": AddProductPage,
    "/edit-product/:id": EditProductPage,

    "/categories": CategoriesAdmin,
    "/add-category": AddCategories,
    "/edit-category/:id": EditCategories,

    "/orders": OrderAdminPage,
    "/order-detail/:id": DetailOrderPage,

    "/slides": SlidesAdminPage,
    "/add-slide": AddSlidePage,
    "/edit-slide/:id": EditSlidePage,

    "/comments" : CmtsAdminPage,
    "/detail-comments/:id": DetailCmtPage,

    "/categories-post": CatePostAdminPage,
    "/add-cate-post": AddCatePost,
    "/edit-cate-post/:id": EditCatePostPage,

    "/posts" : PostAdminPage,
    "/add-post": AddPostPage,

    "/feedbacks": FeedbackAdminPage,

    "/users": UsersAdminPage,
    '/login-admin': LoginAdminPage
    
};

const router = async() => {
    const { resource, id } = currentURL();
    const handleURL = (resource ? `/${resource}` : "/") + (id ? `/:id` : "");
    const pageAdmin = routes[handleURL] ? routes[handleURL] : Error404;

    $("#navbar").innerHTML = Navbar.render();
    $(".main-content").innerHTML = await pageAdmin.render();

    if (pageAdmin.afterRender !== undefined && pageAdmin.afterRender !== "") {
        await pageAdmin.afterRender();
    }
};

window.addEventListener("DOMContentLoaded", router);
window.addEventListener("hashchange", router);