import Vue from 'vue';
import VueRouter from 'vue-router';
import Index from './components/Index'
import Details from './components/Details'
Vue.use(VueRouter);

export default new VueRouter({
    mode : 'history',

    routes: [
        {
            path: '/',
            name: 'Index',
            component: Index
        },
        {
            path: '/detail/:id',
            name: 'Details',
            component: Details
        }
    ]
})
