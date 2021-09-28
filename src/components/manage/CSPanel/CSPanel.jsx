import React, { useState, useEffect } from 'react';
import { Portal } from 'react-portal';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import {
  Container,
  Segment,
  Checkbox,
  Button,
  Table,
  Loader,
  Form,
  Input,
  Message,
} from 'semantic-ui-react';
import { Pagination, Toolbar } from '@plone/volto/components';
import { Helmet } from '@plone/volto/helpers';
import { defineMessages, useIntl } from 'react-intl';

import Comments from './Comments';
import moment from 'moment';

import { getCustomerSatisfaction, deleteFeedbacks } from '../../../actions';
import CSPanelMenu from './CSPanelMenu';
import './cs-panel.css';

const messages = defineMessages({
  cs_controlpanel: {
    id: 'Customer satisfaction',
    defaultMessage: 'Customer satisfaction',
  },

  select_item: {
    id: 'customer_satisfaction_select_item',
    defaultMessage: 'Select item',
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
  filter_title: {
    id: 'customer_satisfaction_filter_title',
    defaultMessage: 'Filter title',
  },
  items_selected: {
    id: 'customer_satisfaction_items_selected',
    defaultMessage: 'items selected.',
  },
  reset_feedbacks: {
    id: 'customer_satisfaction_reset_feedbacks',
    defaultMessage: 'Reset feedbacks',
  },
  confirm_delete_selected: {
    id: 'customer_satisfaction_confirm_delete_selected',
    defaultMessage: "Are you sure you want to reset this page's feedbacks?",
  },
});
const CSPanel = () => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const location = useLocation();
  const pathname = location.pathname ?? '/';
  const [b_size, setB_size] = useState(50);

  const [sort_on, setSort_on] = useState('last_vote');
  const [sort_order, setSort_order] = useState('descending');

  const [currentPage, setCurrentPage] = useState(0);

  const [searchableText, setSearchableText] = useState('');
  const [text, setText] = useState('');
  const [isClient, setIsClient] = useState(false);

  const [itemsSelected, setItemsSelected] = useState([]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setText(searchableText);
      // Send Axios request here
    }, 1200);

    return () => clearTimeout(delayDebounceFn);
  }, [searchableText]);

  const [viewComments, setViewComments] = useState(null);
  const customerSatisfaction = useSelector(
    (state) => state.getCustomerSatisfaction,
  );

  useEffect(() => {
    setIsClient(true);
  }, []);

  const doSearch = () => {
    return dispatch(
      getCustomerSatisfaction({
        b_size,
        b_start: currentPage * b_size,
        sort_on,
        sort_order,
        text: text && text.length > 0 ? text + '*' : null,
      }),
    );
  };

  useEffect(() => {
    doSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [b_size, currentPage, sort_order, sort_on, text]);

  const changeSort = (column) => {
    if (sort_on === column) {
      if (sort_order === 'ascending') {
        setSort_order('descending');
      } else {
        setSort_order('ascending');
      }
    } else {
      setSort_on(column);
    }
  };

  const resetFeedbacks = (items) => {
    let items_titles = '';
    items.forEach((i) => {
      items_titles += i.title + '\n';
    });

    if (
      // eslint-disable-next-line no-alert
      window.confirm(
        intl.formatMessage(messages.confirm_delete_selected) +
          '\n' +
          items_titles,
      )
    ) {
      // eslint-disable-next-line no-unused-expressions
      items?.forEach((item) => {
        dispatch(deleteFeedbacks(item));
      });
      doSearch().then(() => {
        setItemsSelected([]);
      });
    }
  };

  return (
    <>
      <Container
        id="page-customer-satisfaction"
        className="controlpanel-customer-satisfaction"
      >
        <Helmet title={intl.formatMessage(messages.cs_controlpanel)} />
        <Segment.Group raised>
          <Segment className="primary">
            {intl.formatMessage(messages.cs_controlpanel)}
          </Segment>

          <CSPanelMenu />

          <Segment>
            {itemsSelected.length > 0 && (
              <Message className="selected-items" color="teal">
                <div className="text">
                  {itemsSelected?.length}{' '}
                  {intl.formatMessage(messages.items_selected)}
                </div>
                <div className="actions">
                  <Button
                    color="red"
                    onClick={() => {
                      resetFeedbacks(itemsSelected);
                    }}
                  >
                    {intl.formatMessage(messages.reset_feedbacks)}
                  </Button>
                </div>
              </Message>
            )}
            {customerSatisfaction.loading && (
              <Loader active inline="centered" />
            )}
            {customerSatisfaction.loaded && !customerSatisfaction.error && (
              <>
                <Form className="search-form">
                  <Input
                    fluid
                    icon="search"
                    value={searchableText}
                    onChange={(e) => {
                      setSearchableText(e.target.value);
                    }}
                    placeholder={intl.formatMessage(messages.filter_title)}
                  />
                </Form>
                <Table selectable compact singleLine attached sortable fixed>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell width={1}></Table.HeaderCell>
                      <Table.HeaderCell
                        sorted={sort_on === 'title' ? sort_order : null}
                        onClick={() => changeSort('title')}
                        width={4}
                      >
                        {intl.formatMessage(messages.page)}
                      </Table.HeaderCell>
                      <Table.HeaderCell
                        sorted={sort_on === 'ok' ? sort_order : null}
                        onClick={() => changeSort('ok')}
                        textAlign="center"
                      >
                        {intl.formatMessage(messages.positive_votes)}
                      </Table.HeaderCell>
                      <Table.HeaderCell
                        sorted={sort_on === 'nok' ? sort_order : null}
                        onClick={() => changeSort('nok')}
                        textAlign="center"
                      >
                        {intl.formatMessage(messages.negative_votes)}
                      </Table.HeaderCell>
                      <Table.HeaderCell
                        sorted={sort_on === 'last_vote' ? sort_order : null}
                        onClick={() => changeSort('last_vote')}
                        textAlign="center"
                        width={3}
                      >
                        {intl.formatMessage(messages.last_vote)}
                      </Table.HeaderCell>
                      <Table.HeaderCell textAlign="center">
                        {intl.formatMessage(messages.comments)}
                      </Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {customerSatisfaction.result?.items?.map((item) => (
                      <tr key={item.uid}>
                        <Table.Cell>
                          <Checkbox
                            toggle
                            title={intl.formatMessage(messages.select_item)}
                            label={intl.formatMessage(messages.select_item)}
                            onChange={(e, o) => {
                              if (o.checked) {
                                let s = [...itemsSelected];
                                s.push(item);
                                setItemsSelected(s);
                              } else {
                                setItemsSelected(
                                  itemsSelected.filter(
                                    (i) => i.url !== item.url,
                                  ),
                                );
                              }
                            }}
                          />
                        </Table.Cell>
                        <Table.Cell>
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noreferrer noopener"
                          >
                            {item.title}
                          </a>
                        </Table.Cell>
                        <Table.Cell textAlign="center">{item.ok}</Table.Cell>
                        <Table.Cell textAlign="center">{item.nok}</Table.Cell>
                        <Table.Cell textAlign="center">
                          {moment(item.last_vote).format('DD/MM/YYYY HH:mm:ss')}
                        </Table.Cell>
                        <Table.Cell
                          textAlign="center"
                          className="comments-column"
                        >
                          {item.comments?.length > 0 && (
                            <Button
                              size="mini"
                              onClick={() => {
                                setViewComments(item);
                              }}
                            >
                              {item.comments.length}
                            </Button>
                          )}
                        </Table.Cell>
                      </tr>
                    ))}
                  </Table.Body>
                </Table>

                <div className="contents-pagination">
                  <Pagination
                    current={currentPage}
                    total={Math.ceil(
                      customerSatisfaction?.result?.items_total / b_size,
                    )}
                    pageSize={b_size}
                    pageSizes={[50, intl.formatMessage(messages.all)]}
                    onChangePage={(e, p) => {
                      setCurrentPage(p.value);
                    }}
                    onChangePageSize={(e, s) => setB_size(s.value)}
                  />
                </div>
              </>
            )}
            <Comments
              item={viewComments}
              onClose={() => {
                setViewComments(null);
              }}
            />
          </Segment>
        </Segment.Group>
      </Container>
      {isClient && (
        <Portal node={document.getElementById('toolbar')}>
          <Toolbar pathname={pathname} inner={<span />} />
        </Portal>
      )}
    </>
  );
};

export default CSPanel;
