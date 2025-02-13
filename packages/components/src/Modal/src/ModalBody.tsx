import React from 'react';

type ModalBodyProps = {
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
};

const ModalBody = ({ id, className, style, children }: ModalBodyProps) => {
  return (
    <div id={id} style={style} className={className}>
      {children}
    </div>
  );
};

export default ModalBody;
