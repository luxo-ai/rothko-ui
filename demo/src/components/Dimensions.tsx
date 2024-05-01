import styles from './Dimensions.module.scss';

type Props = React.CSSProperties & {
  children: React.ReactNode;
};

export const MobileOnly = ({ children, ...style }: Props) => {
  return (
    <div style={style} className={styles['mobile-only']}>
      {children}
    </div>
  );
};

export const DesktopOnly = ({ children, ...style }: Props) => {
  return (
    <div style={style} className={styles['desktop-only']}>
      {children}
    </div>
  );
};
