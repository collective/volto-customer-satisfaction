import loadable from '@loadable/component';
import CSToolbar from './components/manage/CSToolbar';
import CSPanel from './components/manage/CSPanel/CSPanel';
import {
  submitCustomerSatisfaction as submitCustomerSatisfactionReducer,
  exportCsvCustomerSatisfactionData,
  deleteAllFeedbacks,
  getCustomerSatisfaction,
} from './reducers';

export {
  submitCustomerSatisfaction,
  exportCsvCustomerSatisfactionData,
  deleteAllFeedbacks,
  getCustomerSatisfaction,
} from './actions';
export { default as GoogleReCaptchaWidget } from './components/widgets/GoogleReCaptchaWidget';
export { default as CustomerSatisfaction } from './components/CustomerSatisfaction/CustomerSatisfaction';

export default function applyConfig(config) {
  config.settings.loadables['GoogleReCaptcha'] = loadable(() =>
    import('react-google-recaptcha-v3'),
  );

  config.addonReducers = {
    ...config.addonReducers,
    submitCustomerSatisfaction: submitCustomerSatisfactionReducer,
    exportCsvCustomerSatisfactionData,
    deleteAllFeedbacks,
    getCustomerSatisfaction,
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
