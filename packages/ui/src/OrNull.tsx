import React from 'react';

type OrNullProps = React.HTMLProps<HTMLDivElement> & {
  lookupKey: string;
};

function orNullFactory(lookup: Record<string, React.FC>) {
  // eslint-disable-next-line react/display-name
  return ({ lookupKey, ...props }: OrNullProps) => {
    const E = lookup[lookupKey];
    if (!E) return null;
    return (
      <div {...props}>
        <E />
      </div>
    );
  };
}

export default orNullFactory;
