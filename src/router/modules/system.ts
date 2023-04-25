import { LoadablePage } from '@/components/lazy-component';
import { createElement } from 'react';
import { RouteObject } from 'react-router-dom';
import { DEFAULT_LAYOUT } from '../constants';

const System: RouteObject = {
  path: '/system',
  element: createElement(DEFAULT_LAYOUT),
  children: [
    {
      path: 'staffs',
      element: createElement(LoadablePage, { path: 'system/staff' }),
    },
    {
      path: 'roles',
      element: createElement(LoadablePage, { path: 'system/role' }),
    },
    {
      path: 'menus',
      element: createElement(LoadablePage, { path: 'system/menu' }),
    },
    {
      path: 'organizations',
      element: createElement(LoadablePage, { path: 'system/organization' }),
    },
    {
      path: 'positions',
      element: createElement(LoadablePage, { path: 'system/position' }),
    },
    {
      path: 'dictionaries',
      element: createElement(LoadablePage, { path: 'system/dictionary' }),
    },
  ],
};

export default System;
