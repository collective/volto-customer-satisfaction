import loadable from '@loadable/component';
import CSToolbar from './components/manage/CSToolbar';
import CSPanel from './components/manage/CSPanel/CSPanel';
import {
  submitCustomerSatisfaction as submitCustomerSatisfactionReducer,
  exportCsvCustomerSatisfactionData,
  deleteAllFeedbacks,
  getCustomerSatisfaction,
  deleteFeedbacks,
} from './reducers';

export {
  submitCustomerSatisfaction,
  exportCsvCustomerSatisfactionData,
  deleteAllFeedbacks,
  getCustomerSatisfaction,
  deleteFeedbacks,
  resetSubmitCustomerSatisfaction,
  resetDeleteFeedbacks,
} from './actions';
export { default as GoogleReCaptchaWidget } from './components/widgets/GoogleReCaptchaWidget';
export { default as CustomerSatisfaction } from './components/CustomerSatisfaction/CustomerSatisfaction';

export default function applyConfig(config) {
  config.settings.loadables['GoogleReCaptcha'] = loadable(() =>
    import('react-google-recaptcha-v3'),
  );

  config.settings.nonContentRoutes = [
    ...config.settings.nonContentRoutes,
    '/customer-satisfaction-panel',
  ];

  config.addonReducers = {
    ...config.addonReducers,
    submitCustomerSatisfaction: submitCustomerSatisfactionReducer,
    exportCsvCustomerSatisfactionData,
    deleteAllFeedbacks,
    getCustomerSatisfaction,
    deleteFeedbacks,
  };

  config.settings.appExtras = [
    ...config.settings.appExtras,
    {
      match: '',
      component: CSToolbar,
    },
  ];

  // config.addonRoutes.push({
  //   path: '/customer-satisfaction-panel',
  //   component: CSPanel,
  // });

  config.addonRoutes = [
    ...config.addonRoutes,
    {
      path: '/customer-satisfaction-panel',
      component: CSPanel,
    },
  ];

  return config;
}
