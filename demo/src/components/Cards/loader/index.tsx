import { InlineRythmLoader, InlineSpinnerLoader, Typography } from '@rothko-ui/ui';
import React from 'react';

const LoaderCard = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="white-padded-card">
      <Typography.h3>Loader</Typography.h3>
      <InlineRythmLoader size="m" />
      <p>
        <InlineSpinnerLoader size="s" />
      </p>
    </div>
  );
};

export default LoaderCard;
