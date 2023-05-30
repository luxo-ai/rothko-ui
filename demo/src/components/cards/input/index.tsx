import { Input } from '@rothko-ui/ui';
import React, { useState } from 'react';
import Card from '../Card';
import { CodeLanguage } from '../CodeExample';
import inputCopy from './copy';

const EXAMPLE_LOOKUP: Record<CodeLanguage, string> = {
  [CodeLanguage.TS]: `
import React, { useState } from 'react';
import { Input } from '@rothko-ui/ui';

const Example: React.FC = () => {
  const [value, setValue] = useState<string>('');

  return (
    <Input value={value} onChange={e => setValue(e.currentTarget.value)} />
  );
};
`,
  [CodeLanguage.JS]: `
import React, { useState } from 'react';
import { Input } from '@rothko-ui/ui';

const Example = () => {
  const [value, setValue] = useState('');

  return (
    <Input value={value} onChange={e => setValue(e.currentTarget.value)} />
  );
};
`,
};

const InputCard = () => {
  const [value, setValue] = useState<string>('');

  return (
    <Card copy={inputCopy} codeSnippet={{ examplesLookup: EXAMPLE_LOOKUP }}>
      <section>
        <Input value={value} onChange={e => setValue(e.currentTarget.value)} />
      </section>
    </Card>
  );
};

export default InputCard;
