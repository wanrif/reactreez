import { loginApi } from '@pages/Login/reducer';
import { appApi } from '@app/reducer';

const apiMiddleware = [appApi.middleware, loginApi.middleware];

export default apiMiddleware;
