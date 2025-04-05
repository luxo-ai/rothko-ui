import { Heading3 } from '@rothko-ui/react';
import NextLink from 'next/link';

import styles from './Card.module.scss';

const Usage = () => (
  <Heading3 className={styles.hashLinkableHeader} id="usage">
    <NextLink href="#usage" scroll>
      Usage
    </NextLink>
  </Heading3>
);

export default Usage;
