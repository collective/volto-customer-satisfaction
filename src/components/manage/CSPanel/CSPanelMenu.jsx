import React from 'react';
import { useDispatch } from 'react-redux';
import { Menu, Button } from 'semantic-ui-react';

import { defineMessages, useIntl } from 'react-intl';
import { Icon } from '@plone/volto/components';
import downloadSVG from '@plone/volto/icons/download.svg';
import trashSVG from '@plone/volto/icons/delete.svg';

import {
  exportCsvCustomerSatisfactionData,
  deleteAllFeedbacks,
} from '../../../actions';

const messages = defineMessages({
  export_csv: {
    id: 'customer_satisfaction_export_csv',
    defaultMessage: 'Export in CSV',
  },
  delete_all: {
    id: 'customer_satisfaction_delete_all',
    defaultMessage: 'Delete all feedbacks',
  },
  confirm_delete_all: {
    id: 'customer_satisfaction_confirm_delete_all',
    defaultMessage: 'Are you sure you want to delete all feedbacks?',
  },
});
const CSPanelMenu = () => {
  const intl = useIntl();
  const dispatch = useDispatch();

  return (
    <Menu secondary>
      <Menu.Item>
        <Button
          primary
          icon
          labelPosition="right"
          onClick={() => {
            dispatch(exportCsvCustomerSatisfactionData());
          }}
        >
          {intl.formatMessage(messages.export_csv)}
          <i className="icon">
            <Icon name={downloadSVG} size="20px" />
          </i>
        </Button>
      </Menu.Item>

      <Menu.Menu position="right">
        <Menu.Item>
          <Button
            color="red"
            icon
            labelPosition="right"
            onClick={() => {
              if (
                // eslint-disable-next-line no-alert
                window.confirm(intl.formatMessage(messages.confirm_delete_all))
              ) {
                dispatch(deleteAllFeedbacks());
              }
            }}
          >
            {intl.formatMessage(messages.delete_all)}
            <i className="icon">
              <Icon name={trashSVG} size="20px" />
            </i>
          </Button>
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
};

export default CSPanelMenu;
