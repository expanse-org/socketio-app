// These are the pages you can go to.
// They are all wrapped in the App component, which should contain the navbar etc
// See http://blog.mxstbr.com/2016/01/react-apps-with-pages for more information
// about the code splitting business
import { getAsyncInjectors } from 'utils/asyncInjectors';

const errorLoading = (err) => {
  console.error('Dynamic page loading failed', err); // eslint-disable-line no-console
};

const loadModule = (cb) => (componentModule) => {
  cb(null, componentModule.default);
};

export default function createRoutes(store) {
  // Create reusable async injectors using getAsyncInjectors factory
  const { injectReducer, injectSagas } = getAsyncInjectors(store); // eslint-disable-line no-unused-vars

  return [
    {
      path: '/',
      name: 'home',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/HomePage/reducer'),
          import('containers/HomePage/saga'),
          import('containers/HomePage'),
          import('containers/NavigationContainer/reducer'),
          import('containers/NavigationContainer/sagas'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([
                              HomePagereducer,
                              HomePagesagas,
                              HomePagecomponent,
                              NavigationReducer,
                              Navigationsagas,
                            ]) => {
          injectReducer('home', HomePagereducer.default);
          injectReducer('navigation', NavigationReducer.default);
          injectSagas(HomePagesagas.default);
          injectSagas(Navigationsagas.default);

          renderRoute(HomePagecomponent);
        });

        importModules.catch(errorLoading);
      },
    },{
      path: '/features',
      name: 'features',
      getComponent(nextState, cb) {
        import('containers/FeaturePage')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    },{
      path: '/tokenlab_form',
      name: 'tokenlab_form',
      getComponent(nextState, cb) {
        import('containers/TokenlabForm')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    },{
      path: '/chatcontainer',
      name: 'chatcontainer',
      getComponent(nextState, cb) {
        import('containers/chatcontainer')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    }, {
      path: '*',
      name: 'notfound',
      getComponent(nextState, cb) {
        import('containers/NotFoundPage')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    },
  ];
}
