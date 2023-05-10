import { BackLinkButton, Button, Typography } from '@rothko-ui/ui';
import React, { useState } from 'react';

const ButtonCard = () => {
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [loading3, setLoading3] = useState(false);

  return (
    <div className="white-padded-card">
      <Typography.h3>Button</Typography.h3>
      <div>
        <Button
          shape="circle"
          loading={loading1}
          appearance="outline"
          kind="danger"
          onClick={() => setLoading1(!loading1)}
          style={{ maxWidth: 200, marginBottom: '1rem' }}
        >
          Click me
        </Button>
      </div>
      <div>
        <Button
          loading={loading2}
          size="l"
          onClick={() => setLoading2(!loading2)}
          style={{ maxWidth: 200, marginBottom: '1rem' }}
        >
          Big Button
        </Button>
      </div>
      <div>
        <Button
          loading={loading3}
          onClick={() => setLoading3(!loading3)}
          style={{ maxWidth: 200, marginBottom: '1rem' }}
        >
          Small Button
        </Button>
        <div>
          <BackLinkButton />
        </div>
      </div>
    </div>
  );
};

export default ButtonCard;
