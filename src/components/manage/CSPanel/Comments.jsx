import React, { useState, useEffect } from 'react';
import { Modal, Button, Table, Label } from 'semantic-ui-react';
import moment from 'moment';
import { useIntl, defineMessages } from 'react-intl';
import { Icon } from '@plone/volto/components';

import ThumbsUp from '../../../icons/thumbs-up-regular.svg';
import ThumbsDown from '../../../icons/thumbs-down-regular.svg';

const messages = defineMessages({
  close: {
    id: 'customer_satisfaction_close_comments',
    defaultMessage: 'Close',
  },
  vote: {
    id: 'customer_satisfaction_vote',
    defaultMessage: 'Vote',
  },
  comment: {
    id: 'customer_satisfaction_comment',
    defaultMessage: 'Comment',
  },
  date: {
    id: 'customer_satisfaction_comment_date',
    defaultMessage: 'Date',
  },
});
const Comments = ({ item, onClose = () => {} }) => {
  const intl = useIntl();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (item && item.comments?.length > 0) {
      setOpen(true);
    }
  }, [item, setOpen]);

  const close = () => {
    setOpen(false);
    onClose();
  };

  return (
    <Modal
      onClose={() => close()}
      onOpen={() => setOpen(true)}
      open={open}
      id="customer-satisfaction-comments-modal"
    >
      <Modal.Header>{item?.title}</Modal.Header>
      <Modal.Content>
        <Table selectable compact attached fixed>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell width={1}>
                {intl.formatMessage(messages.vote)}
              </Table.HeaderCell>
              <Table.HeaderCell width={9}>
                {intl.formatMessage(messages.comment)}
              </Table.HeaderCell>
              <Table.HeaderCell width={2}>
                {intl.formatMessage(messages.date)}
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {item?.comments?.map((c) => (
              <tr key={c.date}>
                <Table.Cell>
                  <Label
                    color={c.vote === 'ok' ? 'green' : 'red'}
                    className="vote-label"
                  >
                    <Icon
                      name={c.vote === 'ok' ? ThumbsUp : ThumbsDown}
                      size="15px"
                    />
                  </Label>
                </Table.Cell>
                <Table.Cell>{c.comment}</Table.Cell>
                <Table.Cell>
                  {moment(c.date).format('DD/MM/YYYY HH:mm')}
                </Table.Cell>
              </tr>
            ))}
          </Table.Body>
        </Table>
      </Modal.Content>
      <Modal.Actions>
        <Button
          color="black"
          onClick={() => {
            close();
          }}
        >
          Close
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default Comments;
