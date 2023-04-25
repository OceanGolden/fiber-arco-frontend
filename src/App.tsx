import { atom, useAtomValue } from 'jotai';
import { Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { Spin } from '@arco-design/web-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { defaultRoutes } from './router';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});
export const routesAtom = atom(defaultRoutes);

function App() {
  const routes = useAtomValue(routesAtom);
  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<Spin />}>
        <RouterProvider router={createBrowserRouter(routes)} fallbackElement={<Spin />} />
      </Suspense>
    </QueryClientProvider>
  );
}

export default App;
