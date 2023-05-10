import { List, ListItem, Typography } from '@rothko-ui/ui';
import React from 'react';

const ListCard = () => {
  return (
    <div className="white-padded-card">
      <Typography.h3>List</Typography.h3>
      <List kind="none">
        <ListItem>
          <Typography.body>One</Typography.body>
        </ListItem>
        <List kind="none">
          <ListItem>
            <Typography.body>One-A</Typography.body>
          </ListItem>
          <ListItem>
            <Typography.body>One-B</Typography.body>
          </ListItem>
          <ListItem>
            <Typography.body>One-C</Typography.body>
          </ListItem>
          <List kind="none">
            <ListItem>
              <Typography.body>One-C-I</Typography.body>
            </ListItem>
            <ListItem>
              <Typography.body>One-C-II</Typography.body>
            </ListItem>
            <ListItem>
              <Typography.body>One-C-III</Typography.body>
            </ListItem>
          </List>
        </List>
        <ListItem>
          <Typography.body>Two</Typography.body>
        </ListItem>
        <ListItem>
          <Typography.body>Three</Typography.body>
        </ListItem>
      </List>
    </div>
  );
};

export default ListCard;
