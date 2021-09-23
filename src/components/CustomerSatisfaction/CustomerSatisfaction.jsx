import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useIntl, defineMessages } from 'react-intl';
import { Form, Button, TextArea } from 'semantic-ui-react';
import { Icon } from '@plone/volto/components';
import ThumbsUp from '../../icons/thumbs-up-regular.svg';
import ThumbsDown from '../../icons/thumbs-down-regular.svg';
import GoogleReCaptchaWidget from '../widgets/GoogleReCaptchaWidget';
import { submitCustomerSatisfaction } from '../../actions';
import './customer-satisfaction.css';

const messages = defineMessages({
  title: {
    id: 'customer_satisfaction_title',
    defaultMessage: 'Was this page useful to you?',
  },
  yes: {
    id: 'customer_satisfaction_yes',
    defaultMessage: 'Yes',
  },
  no: {
    id: 'customer_satisfaction_no',
    defaultMessage: 'No',
  },
  suggestions_placeholder: {
    id: 'customer_satisfaction_suggestions_placeholder',
    defaultMessage:
      'Explain us why, and help us improve the quality of the site',
  },
  submit: {
    id: 'customer_satisfaction_submit',
    defaultMessage: 'Submit your comment',
  },
});

const CustomerSatisfaction = () => {
  const intl = useIntl();
  const location = useLocation();
  const path = location.pathname;
  const dispatch = useDispatch();
  const [satisfaction, setSatisfaction] = useState(null);
  const [formData, setFormData] = useState({});
  const captcha = !!process.env.RAZZLE_RECAPTCHA_KEY ? 'GoogleReCaptcha' : null;
  const submitResults = useSelector(
    (state) => state.submitCustomerSatisfaction,
  );
  console.log(submitResults);
  const changeSatisfaction = (e, s) => {
    e.stopPropagation();
    e.preventDefault();

    if (s === satisfaction) {
      setSatisfaction(null);
    } else {
      setSatisfaction(s);
    }
  };

  useEffect(() => {
    setFormData({
      ...formData,
      vote:
        satisfaction === true ? 'ok' : satisfaction === false ? 'kok' : null,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [satisfaction]);

  let validToken = useRef('');
  const onVerifyCaptcha = useCallback(
    (token) => {
      validToken.current = token;
    },
    [validToken],
  );

  const sendFormData = () => {
    console.log({
      validToken: validToken,
      formData: formData,
    });

    dispatch(
      submitCustomerSatisfaction(path, {
        ...formData,
        'g-recaptcha-response': validToken.current,
      }),
    );
  };

  return (
    <div className="customer-satisfaction">
      <h2 id="cs-radiogroup-label">{intl.formatMessage(messages.title)}</h2>
      <Form
        onSubmit={() => {
          sendFormData();
        }}
      >
        <div className="buttons" aria-labelledby="cs-radiogroup-label">
          <Button
            animated={
              satisfaction == null || satisfaction !== true ? 'fade' : null
            }
            color="green"
            onClick={(e) => {
              changeSatisfaction(e, true);
            }}
            aria-controls="cs-more"
            active={satisfaction === true}
          >
            <Button.Content hidden>
              {intl.formatMessage(messages.yes)}
            </Button.Content>
            {(satisfaction == null || satisfaction !== true) && (
              <Button.Content visible>
                <Icon name={ThumbsUp} size="1.5rem" />
              </Button.Content>
            )}
          </Button>

          <Button
            animated={
              satisfaction == null || satisfaction !== false ? 'fade' : null
            }
            color="red"
            onClick={(e) => {
              changeSatisfaction(e, false);
            }}
            aria-controls="cs-more"
            active={satisfaction === false}
          >
            <Button.Content hidden>
              {intl.formatMessage(messages.no)}
            </Button.Content>
            {(satisfaction == null || satisfaction !== false) && (
              <Button.Content visible>
                <Icon name={ThumbsDown} size="1.5rem" />
              </Button.Content>
            )}
          </Button>
        </div>

        <div
          id="cs-more"
          role="region"
          aria-expanded={satisfaction !== null}
          aria-hidden={satisfaction != null}
        >
          <div className="comment">
            <TextArea
              placeholder={intl.formatMessage(messages.suggestions_placeholder)}
              onChange={(e, v) => {
                setFormData({ ...formData, comment: v.value });
              }}
            />
          </div>
          <GoogleReCaptchaWidget onVerify={onVerifyCaptcha} />

          <div className="submit-wrapper">
            <Button
              type="submit"
              content={intl.formatMessage(messages.submit)}
              primary
              disabled={captcha && !validToken?.current}
            />
          </div>
        </div>
      </Form>
    </div>
  );
};

export default CustomerSatisfaction;
