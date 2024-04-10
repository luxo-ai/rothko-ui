import { Typography } from '@rothko-ui/ui';
import Link from 'next/link';
import styles from './Cards.module.scss';

const Usage = () => (
  <Typography.h3 className={styles.headerIdk} id="usage">
    <Link href="#usage" scroll>
      Usage
    </Link>
  </Typography.h3>
);

export default Usage;
