/* eslint-disable react/no-multi-comp */
/* eslint-disable react/display-name */
import React, { lazy } from 'react';
import { Redirect } from 'react-router-dom';
import AuthLayout from './layouts/Auth';
import ErrorLayout from './layouts/Error';
import DashboardLayout from './layouts/Dashboard';
import OverviewView from './views/Overview';
import AuthGuard from './components/AuthGuard';

export default [
  {
    path: '/',
    exact: true,
    component: DashboardLayout,
    routes: [
      {
        path: '/',
        exact: true,
        component: () => (
          <AuthGuard roles={['USER']}>
            <OverviewView />
          </AuthGuard>
        )
      }
    ]
  },
  {
    path: '/auth',
    component: AuthLayout,
    routes: [
      {
        path: '/auth/login',
        exact: true,
        component: lazy(() => import('src/views/Login'))
      },
      {
        path: '/auth/register',
        exact: true,
        component: lazy(() => import('src/views/Register'))
      },
      {
        component: () => <Redirect to="/errors/error-404" />
      }
    ]
  },
  {
    path: '/errors',
    component: ErrorLayout,
    routes: [
      {
        path: '/errors/error-401',
        exact: true,
        component: lazy(() => import('src/views/Error401'))
      },
      {
        path: '/errors/error-404',
        exact: true,
        component: lazy(() => import('src/views/Error404'))
      },
      {
        path: '/errors/error-500',
        exact: true,
        component: lazy(() => import('src/views/Error500'))
      },
      {
        component: () => <Redirect to="/errors/error-404" />
      }
    ]
  },
  {
    route: '/dashboard',
    component: DashboardLayout,
    routes: [
      {
        path: '/calendar',
        exact: true,
        component: lazy(() => import('src/views/Calendar'))
      },
      {
        path: '/changelog',
        exact: true,
        component: lazy(() => import('src/views/Changelog'))
      },
      {
        path: '/bulletin-board',
        exact: true,
        component: lazy(() => import('src/views/BulletinBoard'))
      },
      {
        path: '/overview',
        exact: true,
        component: () => (
          <AuthGuard roles={['USER']}>
            {' '}
            <OverviewView />{' '}
          </AuthGuard>
        )
      },
      {
        path: '/pathways/create',
        exact: true,
        component: lazy(() => import('src/views/PathwayCreate'))
      },
      {
        path: '/pathways/:id',
        exact: true,
        component: lazy(() => import('src/views/PathwayDetails'))
      },
      {
        path: '/pathways/:id/:tab',
        exact: true,
        component: lazy(() => import('src/views/PathwayDetails'))
      },
      {
        path: '/pathways',
        exact: true,
        component: lazy(() => import('src/views/PathwayBrowse'))
      },
      {
        path: '/modules/create',
        exact: true,
        component: lazy(() => import('src/views/ModuleCreate'))
      },
      {
        path: '/modules/create/:id',
        exact: true,
        component: lazy(() => import('src/views/ModuleCreate'))
      },
      {
        path: '/modules',
        exact: true,
        component: lazy(() => import('src/views/ModuleBrowse'))
      },
      // { MAYBE IMPLEMENT LATER
      //   path: '/modules/:id',
      //   exact: true,
      //   component: lazy(() => import('src/views/ModuleDetails'))
      // },
      {
        path: '/settings',
        exact: true,
        component: lazy(() => import('src/views/Settings'))
      },
      {
        path: '/settings/:tab',
        exact: true,
        component: lazy(() => import('src/views/Settings'))
      },
      {
        component: () => <Redirect to="/errors/error-404" />
      }
    ]
  }
];
