import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/general/Home.vue'
import Register from '@/views/general/Register'
import Login from '@/views/general/Login'
import Help from '@/views/Help/Help.vue'
import BomProtocol from '@/views/Help/HelpBomProtocol.vue'
import Validate from '@/views/Projects/ProjectViewValidateBom.vue'
import Atoms from '@/views/Atoms/Index'
import Products from '@/views/Products/ProductIndex.vue'
import Projects from '@/views/Projects/ProjectsPanel'
import ViewAtom from '@/views/Atoms/AtomView'
import ViewProduct from '@/views/Products/ProductView'
//I DONNO but you need to add ".vue" otherwise vue looks for ".js"
import ProductTreeView from '@/views/Products/ProductTreeView.vue'
import CreateAtom from '@/views/Atoms/AtomCreate'
import CreateCompound from '@/views/Compounds/CompoundCreate'
//I DONNO but you need to add ".vue" otherwise vue looks for ".js"
import CreateAssembly from '@/views/Assemblies/AssemblyCreate.vue'
import ViewProject from '@/views/Projects/ProjectView'
import Experiments from '@/views/Experiments/Experiments.vue'
import AdminBoard from '@/views/Admin/AdminBoard.vue'
import Todos from '@/views/Todos/Todos.vue'
import UserPanel from '@/views/Users/UserPanel.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },  
   {
    path: '/login',
    name: 'login',
    component: Login
  },
   {
    path: '/help',
    name: 'help',
    component: Help
  },
   {
    path: '/validate',
    name: 'validate',
    component: Validate
  },
   {
    path: '/bomprotocol',
    name: 'bomprotocol',
    component: BomProtocol
  },
   {
    path: '/atoms',
    name: 'atoms',
    component: Atoms
  },
  {
    path: '/atoms/:atomId',
    name: 'atom',
    component: ViewAtom
  },
  {
    path: '/atoms/create',
    name: 'atoms-create',
    component: CreateAtom
  },
  {
    path: '/compounds/create',
    name: 'compounds-create',
    component: CreateCompound
  },
  {
    path: '/assemblies/create',
    name: 'assemblies-create',
    component: CreateAssembly
  },
   {
    path: '/products',
    name: 'products',
    component: Products
  },
  {
    path: '/products/:productId',
    name: 'product',
    component: ViewProduct
  },
  {
    path: '/products/tree/:productId',
    name: 'tree',
    component: ProductTreeView
  },
  {
    path: '/projects',
    name: 'projects',
    component: Projects
  },
  {
    path: '/projects/:projectId',
    name: 'project',
    component: ViewProject
  },
  {
    path: '/experiments',
    name: 'experiments',
    component: Experiments
  },
  {
    path: '/adminboard',
    name: 'adminboard',
    component: AdminBoard
  },
  {
    path: '/todos',
    name: 'todos',
    component: Todos
  },
  {
    path: '/userPanel',
    name: 'userPanel',
    component: UserPanel
  },
  {
    path: '*',
    redirect: 'atoms'
  },
  {
    path: '/profile',
    name: 'profile',
    // lazy-loaded
    component: () => import('../views/general/Profile.vue')
  },
  {
    path: '/admin',
    name: 'admin',
    // lazy-loaded
    component: () => import('../views/general/BoardAdmin.vue')
  },
  {
    path: '/assembler',
    name: 'assembler',
    // lazy-loaded
    component: () => import('../views/general/BoardAssembler.vue')
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/general/About.vue')
  // }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
