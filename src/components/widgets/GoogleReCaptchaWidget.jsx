import React from 'react';
import { useIntl } from 'react-intl';
import { Grid } from 'semantic-ui-react';
import { injectLazyLibs } from '@plone/volto/helpers/Loadable/Loadable';

const GoogleReCaptchaWidget = ({ onVerify, GoogleReCaptcha, action }) => {
  const intl = useIntl();
  const {
    GoogleReCaptcha: ReCaptcha,
    GoogleReCaptchaProvider,
  } = GoogleReCaptcha;

  return __CLIENT__ ? (
    <GoogleReCaptchaProvider
      reCaptchaKey={
        process.env.RAZZLE_RECAPTCHA_KEY ?? window.env.RAZZLE_RECAPTCHA_KEY
      }
      language={intl.locale ?? 'en'}
    >
      <Grid.Row centered className="row-padded-top">
        <Grid.Column textAlign="center">
          <ReCaptcha onVerify={onVerify} action={action} />
        </Grid.Column>
      </Grid.Row>
    </GoogleReCaptchaProvider>
  ) : (
    <></>
  );
};

export default injectLazyLibs(['GoogleReCaptcha'])(GoogleReCaptchaWidget);
