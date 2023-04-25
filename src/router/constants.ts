import loadable from '@loadable/component';

export const DEFAULT_LAYOUT = loadable(() => import(`@/layouts/page-layout`));
