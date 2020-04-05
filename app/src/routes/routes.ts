import { MaximPage } from 'pages/MaximPage';
import { UserProfile } from 'pages/UserProfile';

const routes: IRoutes = {
  maxim: {
    path: ['/maxim-:maximNumber'],
    component: MaximPage
  },
  userProfile: {
    path: '/user',
    component: UserProfile
  },
  invalidPage: {
    component: UserProfile
  }
};

export default routes;

interface IRoutes {
  [routeReference: string]: IRoute;
}

interface IRoute {
  path?: string | string[];
  component: any;
}
