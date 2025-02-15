import React from 'react';

type PopupBodyProps = {
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
};

const PopupBody = ({ id, style, className, children }: PopupBodyProps) => {
  return (
    <div id={id} style={style} className={className}>
      {children}
    </div>
  );
};

export default PopupBody;
