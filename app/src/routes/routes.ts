import { MaximPage } from 'pages/MaximPage';
import { UserProfile } from 'pages/UserProfile';
// import ErrorPage from './error-page/ErrorPage';

const routes: IRoutes = {
  maxim: {
    path: ['/maxim', '/maxim/:maximNumber'],
    component: MaximPage
  },
  userProfile: {
    path: '/user',
    component: UserProfile
  }
  // invalidPage: {
  // 	component: ErrorPage
  // }
};

export default routes;

interface IRoutes {
  [routeReference: string]: IRoute;
}

interface IRoute {
  path?: string | string[];
  component: any;
}
