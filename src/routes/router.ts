import React from 'react'
import routesMap from './routesMap';
// import asyncComponent from '../components/AsyncComponent';

// const Progran2 = asyncComponent(() => import("./Program2"));

const Index = React.lazy(() => import('../pages/home'))
const About = React.lazy(() => import('../pages/about'))
const Users = React.lazy(() => import('../pages/users'))

// import Index from '../pages/home'

const routes = [
  {
    path: routesMap.home,
    component: Index,
    exact: true,
  },
  {
    path: routesMap.about,
    component: About,
  },
  {
    path: routesMap.users,
    component: Users,
  },
]

export default routes