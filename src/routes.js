import React from 'react';




const Dashboard = React.lazy(() => import('./views/Dashboard'));
const Facultets = React.lazy(() => import('./views/Facultets/Facultets'));
const Groups = React.lazy(() => import('./views/Groups/Groups'));
const Students = React.lazy(() => import('./views/Students/Students'));


// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/facultets', name: 'Facultets', component: Facultets },
  { path: '/groups', name: 'Groups', component: Groups },
  { path: '/students', name: 'Students', component: Students},

  
];

export default routes;
