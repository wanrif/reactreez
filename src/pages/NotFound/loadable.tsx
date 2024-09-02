import LoaderComp from '@components/LoaderComp';

import loadable from '@utils/loadable';

export default loadable(() => import('./index'), {
  fallback: <LoaderComp />,
});
