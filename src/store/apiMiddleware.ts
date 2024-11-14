import { appApi } from '@app/reducer';
import { loginApi } from '@pages/Login/reducer';

const apiMiddleware = [appApi.middleware, loginApi.middleware];

export default apiMiddleware;
