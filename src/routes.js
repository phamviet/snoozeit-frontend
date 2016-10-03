
import App from './containers/App'
import MainPage from './containers/MainPage';
import ReportPage from './containers/ReportPage';
import LoginPage from './containers/LoginPage';

import PostsMain from './components/posts/main'
import Accounts from './components/accounts/main'

// https://github.com/ReactTraining/react-router/blob/master/docs/API.md
// https://github.com/ReactTraining/react-router/blob/master/examples/auth-flow/app.js
// https://github.com/ReactTraining/react-router/blob/master/upgrade-guides/v2.0.0.md#mixins-are-deprecated
const rootRoute = {
    childRoutes: [{
        component: App,
        childRoutes: [
            {
                path: '/',
                component: MainPage,

                /*getComponent(nextState, cb) {
                    cb(null, MainPage)
                },*/
                indexRoute: { component: PostsMain }, // getIndexRoute
                childRoutes: [
                    {
                        path: '/accounts',
                        component: Accounts,
                    },
                    {
                        path: '/reports',
                        component: ReportPage,
                    },
                ]
            },
            {
                path: '/login',
                component: LoginPage,
            },
        ]
    }]
};

export default  rootRoute;