import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Home',
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/Home.vue')
    },
    {
        path: '/daftar-rute-:cityname',
        name: 'DaftarRutePerKota',
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/DaftarRute.vue')
    },
    {
        path: '/daftar-harga-tiket-bus-dan-travel-:ruteName',
        name: 'HargaTiketPerRute',
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/LihatHarga.vue')
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router