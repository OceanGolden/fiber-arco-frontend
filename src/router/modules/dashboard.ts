import { DEFAULT_LAYOUT } from '../constants';
import { LoadablePage } from '@/components/lazy-component';
import { RouteObject } from 'react-router-dom';
import { createElement } from 'react';

const Dashboard: RouteObject = {
  path: '/dashboard',
  element: createElement(DEFAULT_LAYOUT),
  children: [
    {
      path: 'workplace',
      element: createElement(LoadablePage, { path: 'dashboard/workplace' }),
    },

    {
      path: 'monitor',
      element: createElement(LoadablePage, { path: 'dashboard/monitor' }),
    },
  ],
};

export default Dashboard;
