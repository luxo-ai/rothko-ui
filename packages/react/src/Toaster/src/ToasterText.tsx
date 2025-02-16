import React from 'react';

type ToasterLabelProps = {
  id?: string;
  children: string;
};

export const ToasterLabel = ({ id, children }: ToasterLabelProps) => {
  return (
    <p className="m-0 p-0 rothko-font-bold" id={id}>
      {children}
    </p>
  );
};

type ToasterContentProps = {
  children: string;
};

export const ToasterContent = ({ children }: ToasterContentProps) => {
  return <p className="m-0 p-0">{children}</p>;
};
