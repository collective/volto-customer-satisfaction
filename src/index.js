import loadable from '@loadable/component';
import { submitCustomerSatisfaction as submitCustomerSatisfactionReducer } from './reducers';

export { submitCustomerSatisfaction } from './actions';
export { default as GoogleReCaptchaWidget } from './components/widgets/GoogleReCaptchaWidget';
export { default as CustomerSatisfaction } from './components/CustomerSatisfaction/CustomerSatisfaction';

export default function applyConfig(config) {
  config.settings.loadables['GoogleReCaptcha'] = loadable(() =>
    import('react-google-recaptcha-v3'),
  );

  config.addonReducers = {
    ...config.addonReducers,
    submitCustomerSatisfaction: submitCustomerSatisfactionReducer,
  };

  return config;
}
