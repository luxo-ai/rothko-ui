import { Heading3 } from '@rothko-ui/react';
import Link from 'next/link';

import styles from './Card.module.scss';

const Usage = () => (
  <Heading3 className={styles.headerIdk} id="usage">
    <Link href="#usage" scroll>
      Usage
    </Link>
  </Heading3>
);

export default Usage;
