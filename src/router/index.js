import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home/Home'

import Users from '@/views/Users/Users'
import addUser from '@/views/Users/Add'
import editUser from '@/views/Users/Edit'

import Clinics from '@/views/Clinics/Clinics'
import editClinic from '@/views/Clinics/Edit'
import addClinic from '@/views/Clinics/Add'

import AuthLogin from '@/views/Auth/Login'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      auth: true,
      title: 'Home Page'
    }
  },
  
  {
    path: '/users',
    name: 'users',
    component: Users,
    meta: {
      auth: true,
      title: 'All Users'
    }
  },

  {
    path: '/user/add',
    name: 'addUser',
    component: addUser,
    meta: {
      auth: true,
      title: 'Add New User'
    }
  },

  {
    path: '/user/edit/:id',
    name: 'editUser',
    component: editUser,
    meta: {
      auth: true,
      title: 'Edit User'
    }
  },

  {
    path: '/clinics',
    name: "clinics",
    component: Clinics,
    meta: {
      auth: true,
      title: 'All Clinics'
    }
  },

  {
    path: '/clinic/add',
    name: "addClinic",
    component: addClinic,
    meta: {
      auth: true,
      title: 'Add Clinic'
    }
  },

  {
    path: '/clinic/edit/:id',
    name: "editClinic",
    component: editClinic,
    meta: {
      auth: true,
      title: 'Edit Clinic'
    }
  },
  {
    path: '/auth/login',
    name: 'login',
    component: AuthLogin,
    meta: {
      auth: false,
      title: 'Login'
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
export default router
