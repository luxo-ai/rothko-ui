import styles from './Dimensions.module.scss';

type Props = React.CSSProperties & {
  children: React.ReactNode;
};

export const DesktopOnly = ({ children, ...style }: Props) => {
  return (
    <div style={style} className={styles['desktop-only']}>
      {children}
    </div>
  );
};
