import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)


const routes = [
    {
        path: '/',
        redirect: '/login' 
    },
    {
        path: '/login',
        component: () => import('../page/Login.vue')
    },
    {
        path: '/manage',
        component: () => import('../page/Index.vue'),
        children: [
            {
                path: '',
                component: () => import('../page/Manage.vue')
            },
            {
                path: 'duty',
                component: () => import('../page/Duty.vue'),
                children: [
                    {
                        path: '/',
                        redirect: 'duty'
                    },
                    {
                        path: 'duty',
                        component: () => import('../components/duty/Duty.vue')
                    },
                    {
                        path: 'org',
                        component: () => import('../components/duty/Org.vue')
                    },
                    {
                        path: 'member',
                        component: () => import('../components/duty/Member.vue')
                    }
                ]
            },
            {
                path: 'setting',
                component: () => import('../page/Setting.vue'),
                children: [
                    {
                        path: '/',
                        redirect: 'org'
                    },
                    {
                        path: 'org',
                        component: () => import('../components/setting/Org.vue')
                    },
                    {
                        path: 'account',
                        component: () => import('../components/setting/Account.vue')
                    },
                    {
                        path: 'role',
                        component: () => import('../components/setting/Role.vue')
                    },
                    {
                        path: 'log',
                        component: () => import('../components/setting/Log.vue')
                    },
                    {
                        path: 'profile',
                        component: () => import('../components/setting/Profile.vue')
                    },
                    {
                        path: 'modifyPwd',
                        component: () => import('../components/setting/ModifyPwd.vue')
                    }
                ]
            }
        ] 
    },
    {
        path: '*',
        component: () => import('../page/NotFound.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router;


