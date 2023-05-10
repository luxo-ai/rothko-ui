import { Typography, Flex, FlexItem, Grid, Container } from '@rothko-ui/ui';
import * as Icons from '@rothko-ui/icons';
import React, { useState } from 'react';
import iconsList from './iconsList';

const IconsCard = () => {
  const [value, setValue] = useState<string>('');

  return (
    <div className="white-padded-card">
      <Typography.h3>Icons</Typography.h3>
      <Grid gridTemplateColumns="1fr 1fr 1fr">
        {iconsList.map(iconName => {
          const C = Icons[iconName] as React.FC<any>;
          return (
            <Container marginBottom="2rem" key={iconName}>
              <Flex alignItems="center" gap="1rem">
                <Typography.bodySmall>{iconName}</Typography.bodySmall>
                <C width={24} height={24} />
              </Flex>
            </Container>
          );
        })}
      </Grid>
    </div>
  );
};

export default IconsCard;
