import { TabBar, Typography } from '@rothko-ui/ui';
import React, { useState } from 'react';

const TabBarCard = () => {
  const [singleVal, setSingleVal] = useState<boolean>(false);
  const tabs = [
    { title: 'One', key: 'one', render: () => <Typography.h3>One</Typography.h3> },
    { title: 'Two', key: 'two', render: () => <Typography.h3>Two</Typography.h3> },
    { title: 'Three', key: 'three', render: () => <Typography.h3>Three</Typography.h3> },
  ] as const;

  return (
    <div className="white-padded-card">
      <Typography.h3 style={{ marginBottom: '1rem' }}>TabBar</Typography.h3>
      <div className="accordion-container">
        <TabBar kind="info" tabs={tabs} />
      </div>
    </div>
  );
};

export default TabBarCard;
