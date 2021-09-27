import React from 'react';
import { useIntl, defineMessages } from 'react-intl';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { Icon } from '@plone/volto/components';
import { Plug } from '@plone/volto/components/manage/Pluggable';
import CustomerSatisfactionSVG from '../../icons/customer-satisfaction.svg';
import './cstoolbar.css';

const messages = defineMessages({
  customer_satisfaction: {
    id: 'Cutomer satisfaction control panel',
    defaultMessage: 'Customer satisfaction control panel',
  },
});

export const CSToolbar = () => {
  const intl = useIntl();
  const token = useSelector((state) => state.userSession?.token);
  return token ? (
    <Plug pluggable="main.toolbar.bottom" id="customer-satisfaction-toolbar">
      <Link
        to="/customer-satisfaction-panel"
        aria-label={intl.formatMessage(messages.customer_satisfaction)}
        tabIndex={0}
        className="deleteBlocks"
        id="toolbar-customer-satisfaction-panel"
      >
        <Icon name={CustomerSatisfactionSVG} size="30px" />
      </Link>
    </Plug>
  ) : null;
};

export default CSToolbar;
