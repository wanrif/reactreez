import Loader from '@components/Loader';

import loadable from '@utils/loadable';

export default loadable(() => import('./index'), {
  fallback: <Loader />,
});
