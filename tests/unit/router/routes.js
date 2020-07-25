import NestedRoute from "@/components/test/NestedRoute.vue"
import Home from '@/views/Home.vue'
import Register from '@/views/Register'
import Login from '@/views/Login'
import Atoms from '@/views/Atoms/Index'
import Atms from '@/views/Atoms/Atoms'
import Products from '@/views/Products/Index'
import Projects from '@/views/Projects/ProjectsPanel'
import ViewAtom from '@/views/Atoms/AtomView'
import ViewProduct from '@/views/Products/ProductView'
//I DONNO but you need to add ".vue" otherwise vue looks for ".js"
import ProductTreeView from '@/views/Products/ProductTreeView.vue'
// import ProductTreeTest from '@/views/Products/ProductTreeTest.vue'
import CreateAtom from '@/views/Atoms/AtomCreate'
import CreateCompound from '@/views/Compounds/CompoundCreate'
//I DONNO but you need to add ".vue" otherwise vue looks for ".js"
import CreateAssembly from '@/views/Assemblies/AssemblyCreate.vue'
import CreateProject from '@/views/Projects/ProjectCreate.vue'
import ViewProject from '@/views/Projects/ProjectView'
// import ProjectView from '@/views/Projects/ProjectView.vue'
import Experiments from '@/views/Experiments/Experiments.vue'
import Todos from '@/views/Todos/Todos.vue'

export default [
  { path: "/nested-route",
   component: NestedRoute 
  },
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
    path: '/atoms',
    name: 'atoms',
    component: Atoms
  },
   {
    path: '/atms',
    name: 'atms',
    component: Atms
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
    path: '/projects/create',
    name: 'projects-create',
    component: CreateProject
  },
  {
    path: '/experiments',
    name: 'experiments',
    component: Experiments
  },
  {
    path: '/todos',
    name: 'todos',
    component: Todos
  },
  {
    path: '*',
    redirect: 'atoms'
  },
  {
    path: '/profile',
    name: 'profile',
    // lazy-loaded
    component: () => import('../views/Profile.vue')
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
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/general/About.vue')
  }
]
