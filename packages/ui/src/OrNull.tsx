import React from 'react';

type OrNullProps = React.HTMLProps<HTMLDivElement> & {
  lookupKey: string;
};

export function orNullFactory(lookup: Record<string, React.FC>) {
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
