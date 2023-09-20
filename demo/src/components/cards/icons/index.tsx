import * as Icons from '@rothko-ui/icons';
import type { Accessory, Option } from '@rothko-ui/ui';
import {
  Alert,
  Container,
  Flex,
  FlexItem,
  MaxWidth,
  OptionGroup,
  SearchBar,
  ToastContextConsumer,
  Typography,
} from '@rothko-ui/ui';
import FuzzySearch from 'fuzzy-search';
import { noop } from 'lodash';
import React, { useMemo, useState } from 'react';
import Card from '../Card';
import CodeExample, { CodeLanguage } from '../CodeExample';
import iconographyCopy from './copy';
import { filledIconList, outlineIconList } from './iconsList';
import styles from './icons.module.scss';
import CopyToClipboard from 'react-copy-to-clipboard';

enum IconKind {
  Outline,
  Filled,
}

const EXAMPLE_LOOKUP: Record<CodeLanguage, string> = {
  [CodeLanguage.TS]: `
import { ActivityOutline } from '@rothko-ui/icons';

const Example = () => {
  return <ActivityOutline height={20} width={20}/>
}
`,
  [CodeLanguage.JS]: `
import { ActivityOutline } from '@rothko-ui/icons';

const Example = () => {
  return <ActivityOutline height={20} width={20}/>
}
`,
};

const outlineIconSearcher = new FuzzySearch([...outlineIconList]);
const filledIconSearcher = new FuzzySearch([...filledIconList]);

const iconKindOptions: Option<IconKind, { accessoryLeft: Accessory }>[] = [
  {
    id: IconKind.Filled,
    label: 'Filled',
    data: {
      accessoryLeft: ({ size, color }) => <Icons.Moon width={size} height={size} fill={color} />,
    },
  },
  {
    id: IconKind.Outline,
    label: 'Outline',
    data: {
      accessoryLeft: ({ size, color }) => (
        <Icons.MoonOutline width={size} height={size} fill={color} />
      ),
    },
  },
];

const IconsCard = () => {
  const [query, setQuery] = useState<string | null>(null);
  const [iconKind, setIconKind] = useState<IconKind>(IconKind.Filled);

  const iconList = useMemo(() => {
    if (!query) {
      return iconKind === IconKind.Outline ? outlineIconList : filledIconList;
    }
    if (iconKind === IconKind.Outline) {
      return outlineIconSearcher.search(query);
    }
    return filledIconSearcher.search(query);
  }, [query, iconKind]);

  return (
    <Card copy={iconographyCopy}>
      <section>
        <CodeExample initial={CodeLanguage.TS} examplesLookup={EXAMPLE_LOOKUP} />
      </section>
      <Flex as="section" flexDirection="column" rowGap="1.5rem">
        <Typography.h3>Availabe Icons</Typography.h3>
        <div>
          <SearchBar
            onQueryChange={q => setQuery(q)}
            onSubmit={noop}
            placeholder="Search for an icon..."
            query={query}
          />
        </div>
        <Container>
          <MaxWidth maxW="13rem">
            <OptionGroup
              withoutBorder
              optionsWithRadius
              maxCol={2}
              kind="primary"
              // kind="secondary"
              optionGap="0.75rem"
              size="xs"
              value={iconKind}
              options={iconKindOptions}
              onChange={v => setIconKind(v)}
            />
          </MaxWidth>
        </Container>
        <div style={{ position: 'relative' }}>
          <div className={styles.icons}>
            {iconList.map(iconName => {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const C = Icons[iconName] as React.FC<any>;
              return (
                <div className={styles.icon} key={iconName}>
                  <ToastContextConsumer>
                    {({ addToast }) => (
                      <CopyToClipboard
                        text={`<${iconName} width={20} height={20} />`}
                        onCopy={() => addToast({ content: 'Added to clipboard!', withLife: true })}
                      >
                        <button aria-label={iconName}>
                          <Flex flexDirection="column" alignItems="center" gap="1rem">
                            <C width={30} height={30} />
                            <Typography.bodySmall>{iconName}</Typography.bodySmall>
                          </Flex>
                        </button>
                      </CopyToClipboard>
                    )}
                  </ToastContextConsumer>
                </div>
              );
            })}
          </div>
        </div>
        {iconList.length === 0 && (
          <FlexItem flex={1} width="100%" margin="auto" maxWidth="40rem">
            <Alert style={{ textAlign: 'center' }}>No results. Please try another search...</Alert>
          </FlexItem>
        )}
      </Flex>
    </Card>
  );
};

export default IconsCard;
