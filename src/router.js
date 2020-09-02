// 引入
import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

import Main from './pages/Main'

var router = new VueRouter({
    routes: [{
            path: '/',
            name: 'default',
            component: Main,
            children: [{
                path: '/products',
                name: 'products',
                component: () => import('./pages/main/Products'),
            },
            {
                path: '/evaluate',
                name: 'evaluate',
                component: () => import('./pages/main/Evaluate'),
            },{
                path: '/merchant',
                name: 'merchant',
                component: () => import('./pages/main/Merchant'),
            },
         ]
        },
        {
            path: '/productlist',
            name: 'productlist',
            component: () => import('./pages/ProductList'),
        },
    ]
})



//暴露
export default router