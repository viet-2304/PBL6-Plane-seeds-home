//Layouts
import DefaultLayout from '../components/Layout/DefaultLayout/DefaultLayout';
import AccountLayout from '../components/Layout/AccountLayout/AccountLayout';

//Pages
import Home from '../pages/Home/Home';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import History from '../pages/History/History';
import Cart from '../pages/Cart/Cart';
import Products from '../pages/Products/Products';
import Account from '../pages/Account/Account';

import routes from '../config/routes';
import SellerLayout from '../components/Layout/SellerLayout/SellerLayout';
import Product from '../pages/Seller/Product/Product';
import Order from '../pages/Seller/Order/Order';
import Delivery from '../pages/Seller/Delivery/Delivery';
import Dashboard from '../pages/Seller/Dashboard/Dashboard';
import SellerRegister from '../pages/Seller/SellerRegister/SellerRegister';
import Shop from '../pages/Shop/Shop';
import AdminLogin from '../pages/Admin/Login/Login';
import AdminLayout from '../components/Layout/AdminLayout/AdminLayout';
import AdminDashboard from '../pages/Admin/Dashboard/Dashboard';
import Profile from '../pages/Seller/Profile/Profile';
import ProductsAdmin from '../pages/Admin/Products/Products';
import Customers from '../pages/Admin/Customers/Customers';
import OrderAdmin from '../pages/Admin/Orders/Orders';
import Checkout from '../pages/Checkout/Checkout';
import Thankpage from '../components/Thankpage/Thankpage';
import OrderDetailAdmin from '../components/Admin/OrderDetail/OrderDetail';
import ShopAdmin from '../pages/Admin/ShopAdmin/ShopAdmin';

//Public routes
const publicRoutes = [
    { path: routes.cart, component: Cart, layout: DefaultLayout },
    { path: routes.checkout, component: Checkout, layout: AccountLayout },
    { path: routes.thankpage, component: Thankpage, layout: DefaultLayout },

    { path: routes.home, component: Home, layout: DefaultLayout },
    { path: routes.login, component: Login },
    { path: routes.register, component: Register },
    { path: routes.products, component: Products, layout: DefaultLayout },
    { path: routes.productsByCategory, component: Products, layout: DefaultLayout },
    { path: routes.productByID, component: Products, layout: DefaultLayout },
    { path: routes.shop, component: Shop, layout: AccountLayout },

    { path: routes.dashboard, component: Dashboard, layout: SellerLayout },
    { path: routes.order, component: Order, layout: SellerLayout, prop: 'all' },
    { path: routes.orderDetail, component: Order, layout: SellerLayout, prop: 'detail' },

    { path: routes.product, component: Product, layout: SellerLayout, prop: 'all' },
    { path: routes.createProduct, component: Product, layout: SellerLayout, prop: 'create' },
    { path: routes.updateProduct, component: Product, layout: SellerLayout, prop: 'update' },
    { path: routes.delivery, component: Delivery, layout: SellerLayout },
    { path: routes.registerSeller, component: SellerRegister },
    { path: routes.profileSeller, component: Profile, layout: SellerLayout, prop: 'profile' },
    { path: routes.loginAdmin, component: AdminLogin },
];

const privateRoutes = [
    { path: routes.registerSeller, component: SellerRegister },
    { path: routes.profile, component: Account, layout: AccountLayout, prop: 'profile' },
    { path: routes.history, component: History },
    // { path: routes.cart, component: Cart, layout: DefaultLayout },
    { path: routes.purchase, component: Account, layout: AccountLayout, prop: 'purchase' },
    { path: routes.password, component: Account, layout: AccountLayout, prop: 'password' },
    // Seller
    // { path: routes.dashboard, component: Dashboard, layout: SellerLayout },
    // { path: routes.order, component: Order, layout: SellerLayout },
    // { path: routes.product, component: Product, layout: SellerLayout, prop: 'all' },
    // { path: routes.createProduct, component: Product, layout: SellerLayout, prop: 'create' },
    // { path: routes.updateProduct, component: Product, layout: SellerLayout, prop: 'update' },
    // { path: routes.delivery, component: Delivery, layout: SellerLayout },
    // { path: routes.registerSeller, component: SellerRegister },
    // { path: routes.profileSeller, component: Profile, layout: SellerLayout, prop: 'profile' },

    //Admin
    { path: routes.dashboardAdmin, component: AdminDashboard, layout: AdminLayout },
    { path: routes.productsAdmin, component: ProductsAdmin, layout: AdminLayout, prop: 'all' },
    { path: routes.customers, component: Customers, layout: AdminLayout, prop: 'all' },
    { path: routes.ordersAdmin, component: OrderAdmin, layout: AdminLayout, prop: 'all' },
    { path: routes.shopAdmin, component: ShopAdmin, layout: AdminLayout, prop: 'all' },
    {
        path: routes.orderDetails,
        component: OrderDetailAdmin,
        layout: AdminLayout,
        prop: 'detail',
    },
    { path: routes.createUser, component: Customers, layout: AdminLayout, prop: 'create' },
    { path: routes.updateUser, component: Customers, layout: AdminLayout, prop: 'update' },
    { path: routes.editShop, component: ShopAdmin, layout: AdminLayout, prop: 'update' },
];

export { publicRoutes, privateRoutes };
