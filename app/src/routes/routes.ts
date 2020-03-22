import { MaximPage } from 'pages/Maxim/MaximPage';
// import ErrorPage from './error-page/ErrorPage';

const routes: IRoutes = {
  maxim: {
    path: '/maxim',
    component: MaximPage
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
  path?: string;
  component: any;
}
