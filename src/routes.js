/*!

=========================================================
* Argon Dashboard React - v1.2.1
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Index from 'views/Index.js';
import Articles from 'views/articles/Articles';
import Construction from 'views/Construction';
import Newsletters from 'views/newsletters/Newsletters';
import Users from 'views/Users';
import Profile from 'views/Profile.js';
import Maps from 'views/Maps.js';
import Register from 'views/Register.js';
import Login from 'views/Login.js';
import Tables from 'views/Tables.js';
import Icons from 'views/Icons.js';
import Creators from './views/Creators';
import Admins from './views/Admins';
import { Store } from 'StoreContext';

var routes = [
  {
    path: '/index',
    name: 'Articles',
    icon: 'ni ni-single-copy-04 text-yellow',
    component: Articles,
    layout: '/admin',
  },

  {
    path: '/admins',
    name: 'Admins',
    icon: 'ni ni-planet text-teal',
    component: Admins,
    layout: '/admin',
  },

  {
    path: '/Users',
    name: 'Users',
    icon: 'ni ni-single-02 text-red',
    component: Users,
    layout: '/admin',
  },
  {
    path: '/creators',
    name: 'Creators',
    icon: 'ni ni-satisfied text-green',
    component: Creators,
    layout: '/admin',
  },
  // {
  //   path: "/newsletters/user",
  //   name: "Gamers",
  //   icon: "ni ni-single-02 text-red",
  //   component: Newsletters,
  //   layout: "/admin"
  // },

  // {
  //   path: '',
  //   name: 'Evaluators',
  //   icon: 'ni ni-single-copy-04 text-red',
  //   component: '',
  //   layout: '/admin',
  // },
  {
    path: '/newsletters/all',
    name: 'Newsletters',
    icon: 'ni ni-email-83 text-blue',
    component: Newsletters,
    layout: '/admin',
  },
  // {
  //   path: '/user-profile',
  //   name: 'User Profile',
  //   icon: 'ni ni-circle-08 text-yellow',
  //   component: BasicInfo,
  //   layout: '/admin',
  // },
  {
    path: '/register',
    name: 'Register',
    icon: 'ni ni-key-25 text-info',
    component: Register,
    layout: '/auth',
  },
  {
    path: '/login',
    name: 'Login',
    icon: 'ni ni-circle-08 text-pink',
    component: Login,
    layout: '/auth',
  },
];
export default routes;
