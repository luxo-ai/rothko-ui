import { Avatar } from '@rothko-ui/ui';
import React from 'react';
import Card from '../Card';
import { CodeLanguage } from '../CodeSnippet';
import avatarCopy from './copy';
import avatarProps from './props';

const EXAMPLE_LOOKUP: Record<CodeLanguage, string> = {
  [CodeLanguage.TS]: `
  import { Avatar } from '@rothko-ui/ui';

  type ExampleProps = {
    url: string;
  }

  const Example = ({ url }: ExampleProps) => {
      return (
        <Avatar url={url} />
      );
  }
`,
  [CodeLanguage.JS]: `
  import { Avatar } from '@rothko-ui/ui';

  const Example = ({ url }) => {
    return <Avatar url={url} /> 
  }
`,
};

const AvatarCard = () => {
  return (
    <Card
      copy={avatarCopy}
      codeSnippet={{ examplesLookup: EXAMPLE_LOOKUP }}
      propsMeta={{ meta: avatarProps, description: avatarCopy.description }}
    >
      <Avatar url="/assets/dog.png" />
    </Card>
  );
};

export default AvatarCard;
