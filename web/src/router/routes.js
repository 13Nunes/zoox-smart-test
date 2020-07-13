
import Login from 'pages/Login'
import DefaultPanelLayout from 'layouts/DefaultPanelLayout.vue'

const routes = [
  {
    path: '/',
    component: Login
  },
  {
    path: '/forgotPassword',
    component: () => import('pages/ForgotPassword.vue')
  },
  {
    path: '/userPreferences',
    component: DefaultPanelLayout,
    children: [
      { path: '', component: () => import('pages/UserPreferences.vue') }
    ]
  },
  {
    path: '/dashboard',
    component: DefaultPanelLayout,
    children: [
      { path: '', component: () => import('pages/Dashboard.vue') }
    ]
  },
  {
    path: '/states',
    component: DefaultPanelLayout,
    children: [
      { path: '', component: () => import('pages/States.vue') },
      { path: 'form', component: () => import('pages/StatesForm.vue') }
    ]
  },
  {
    path: '/cities',
    component: DefaultPanelLayout,
    children: [
      { path: '', component: () => import('pages/Cities.vue') },
      { path: 'form', component: () => import('pages/CitiesForm.vue') }
    ]
  },
  {
    path: '/settings',
    component: DefaultPanelLayout,
    children: [
      { path: '', component: () => import('pages/Settings.vue') }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
