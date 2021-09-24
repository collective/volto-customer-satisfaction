import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Container,
  Segment,
  Menu,
  Button,
  Table,
  Loader,
} from 'semantic-ui-react';
import { Pagination } from '@plone/volto/components';
import { Helmet } from '@plone/volto/helpers';
import { defineMessages, useIntl } from 'react-intl';
import { Icon } from '@plone/volto/components';
import downloadSVG from '@plone/volto/icons/download.svg';
import trashSVG from '@plone/volto/icons/delete.svg';

import {
  exportCsvCustomerSatisfactionData,
  deleteAllFeedbacks,
  getCustomerSatisfaction,
} from '../../../actions';
import './cs-panel.css';

const messages = defineMessages({
  cs_controlpanel: {
    id: 'Customer satisfaction',
    defaultMessage: 'Customer satisfaction',
  },
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
  all: {
    id: 'customer_satisfaction_all',
    defaultMessage: 'All',
  },
  page: {
    id: 'customer_satisfaction_page',
    defaultMessage: 'Page',
  },
  positive_votes: {
    id: 'customer_satisfaction_positive_votes',
    defaultMessage: 'Positive votes',
  },
  negative_votes: {
    id: 'customer_satisfaction_negative_votes',
    defaultMessage: 'Negative votes',
  },
  last_vote: {
    id: 'customer_satisfaction_last_vote',
    defaultMessage: 'Last vote',
  },
  comments: {
    id: 'customer_satisfaction_comments',
    defaultMessage: 'Comments',
  },
});
const CSPanel = () => {
  const intl = useIntl();
  const dispatch = useDispatch();

  const b_size = 50;

  const [sort_on, setSort_on] = useState('last_vote');
  const [sort_order, setSort_order] = useState('descending');

  const [currentPage, setCurrentPage] = useState(0);

  const customerSatisfaction = useSelector(
    (state) => state.getCustomerSatisfaction,
  );
  console.log(customerSatisfaction);
  useEffect(() => {
    dispatch(
      getCustomerSatisfaction({
        b_size,
        b_start: currentPage * b_size - 1,
        sort_on,
        sort_order,
      }),
    );
  }, [dispatch, b_size, currentPage, sort_order, sort_on]);

  return (
    <Container
      id="page-customer-satisfaction"
      className="controlpanel-customer-satisfaction"
    >
      <Helmet title={intl.formatMessage(messages.cs_controlpanel)} />
      <Segment.Group raised>
        <Segment className="primary">
          {intl.formatMessage(messages.cs_controlpanel)}
        </Segment>

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
                    window.confirm(
                      intl.formatMessage(messages.confirm_delete_all),
                    )
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
        <Segment>
          {customerSatisfaction.loading && <Loader active inline="centered" />}
          {customerSatisfaction.loaded && (
            <>
              <Table selectable compact singleLine attached>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>
                      {intl.formatMessage(messages.page)}
                    </Table.HeaderCell>
                    <Table.HeaderCell textAlign="center">
                      {intl.formatMessage(messages.positive_votes)}
                    </Table.HeaderCell>
                    <Table.HeaderCell textAlign="center">
                      {intl.formatMessage(messages.negative_votes)}
                    </Table.HeaderCell>
                    <Table.HeaderCell textAlign="center">
                      {intl.formatMessage(messages.last_vote)}
                    </Table.HeaderCell>
                    <Table.HeaderCell textAlign="center">
                      {intl.formatMessage(messages.comments)}
                    </Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {customerSatisfaction.result.items?.map((item) => (
                    <tr key={item.uid}>
                      <Table.Cell>{item.title}</Table.Cell>
                      <Table.Cell textAlign="center">{item.ok}</Table.Cell>
                      <Table.Cell textAlign="center">{item.nok}</Table.Cell>
                      <Table.Cell textAlign="center">
                        {item.last_vote}
                      </Table.Cell>
                      <Table.Cell textAlign="center">
                        {item.comments?.length > 0 ? item.comments.length : ''}
                      </Table.Cell>
                    </tr>
                  ))}
                </Table.Body>
              </Table>

              <div className="contents-pagination">
                <Pagination
                  current={currentPage}
                  total={Math.ceil(customerSatisfaction.total / b_size)}
                  pageSize={b_size}
                  onChangePage={(p) => {
                    setCurrentPage(p);
                  }}
                />
              </div>
            </>
          )}
        </Segment>
      </Segment.Group>
    </Container>
  );
};

export default CSPanel;
