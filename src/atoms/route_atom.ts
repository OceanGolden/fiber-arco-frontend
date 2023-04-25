import { atom } from 'jotai';
import { RouteObject } from 'react-router-dom';

import { defaultRoutes } from '@/router';

export const routesAtom = atom<RouteObject[]>(defaultRoutes);
