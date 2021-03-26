import { currentURL, $, resetRender } from './utils.js';
import Header from './components/Header.js';
import Footer from './components/Footer.js';

import HomePage from './pages/HomePage';
import SearchResultPage from './pages/SearchResultPage';

import ProductsPage from './pages/ProductsPage';
import ProductDetail from './pages/ProductDetail';

import CategoriesPage from './pages/CategoriesPage';

import CartPage from './pages/CartPage';
import PurchasePage from './pages/PurchasePage';

import PostPage from './pages/PostPage';
import PostDetailPage from './pages/PostDetailPage';

import FeedBackPage from './pages/FeedBackPage';

import SignIn from './pages/SignIn.js';
import SignUp from './pages/SignUp.js';
import LoginBackendPage from './pages/LoginBackendPage';

import Error404 from './pages/Error404';


// define path
const routes = {
    '/': HomePage,
    '/search-result': SearchResultPage,

    '/products': ProductsPage,
    '/products/:id': ProductsPage,
    '/product/:id': ProductDetail,

    '/categories/:id': CategoriesPage,

    '/posts': PostPage,
    '/posts/:id': PostPage,
    '/post/:id': PostDetailPage,

    '/carts': CartPage,
    '/purchase': PurchasePage,

    '/feed-back': FeedBackPage,

    '/sign-in': SignIn,
    '/sign-up': SignUp,
    '/login-admin': LoginBackendPage
}

const router = async () => {
    // handle path
    const { resource , id } = currentURL(); 
    const handlePath = (resource ? `/${resource}` : '/') + (id ? `/:id` : '');
    const page = routes[handlePath] ? routes[handlePath] : Error404;

  
    // header
    $('.header').innerHTML = await Header.render();
    if(Header.afterRender !== undefined || Header.afterRender !== ''){
        Header.afterRender();
    }

    // main
    $('.main').innerHTML = await page.render();
    if(page.afterRender !== undefined) {
        await page.afterRender();
    }

    // footer
    $('.footer').innerHTML = await Footer.render();
}

// event
window.addEventListener('DOMContentLoaded', router);
window.addEventListener('hashchange', router);