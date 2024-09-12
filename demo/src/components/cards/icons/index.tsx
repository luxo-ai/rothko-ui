import FuzzySearch from 'fuzzy-search';
import React, { useMemo, useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';

import * as Icons from '@rothko-ui/icons';
import {
  Alert,
  Container,
  Flex,
  FlexItem,
  ButtonGroup,
  ToastContextConsumer,
  Typography,
  Button,
} from '@rothko-ui/ui';

import { truncateString } from '@rothko-ui/utils';
import { JSXCode } from '../../Code';
import Card from '../Card';
import styles from './Icons.module.scss';
import iconographyCopy from './copy';
import { filledIconList, outlineIconList } from './iconsList';
import { BASIC } from './usage/sourceCode';
import SearchBar from '../../SearchBar';

const GITHUB_URL = 'https://github.com/luxo-ai/rothko-ui/tree/main/packages/icons';

type IconKind = 'filled' | 'outline';

const outlineIconSearcher = new FuzzySearch([...outlineIconList]);
const filledIconSearcher = new FuzzySearch([...filledIconList]);

const IconsCard = () => {
  const [query, setQuery] = useState<string>('');
  const [iconKind, setIconKind] = useState<IconKind>('filled');

  const iconList = useMemo(() => {
    if (!query.length) {
      return iconKind === 'filled' ? filledIconList : outlineIconList;
    }
    return iconKind === 'filled'
      ? filledIconSearcher.search(query)
      : outlineIconSearcher.search(query);
  }, [iconKind, query]);

  return (
    <Card codeUrl={GITHUB_URL} copy={iconographyCopy}>
      <section>
        <JSXCode sourceCode={BASIC} />
      </section>
      <Flex as="section" flexDirection="column" rowGap="1.5rem">
        <Typography.h3>Availabe Icons</Typography.h3>
        <div>
          <SearchBar
            onQueryChange={q => setQuery(q)}
            placeholder="Search for an icon..."
            query={query}
          />
        </div>
        <Container maxWidth="13rem">
          <ButtonGroup noEffect kind="primary" size="xs" variant="pill">
            <Button
              accessoryLeft={({ size, color }) => (
                <Icons.Moon width={size} height={size} fill={color} />
              )}
              appearance={iconKind === 'filled' ? 'filled' : 'outline'}
              onClick={() => setIconKind('filled')}
            >
              Filled
            </Button>
            <Button
              accessoryRight={({ size, color }) => (
                <Icons.MoonOutline width={size} height={size} fill={color} />
              )}
              appearance={iconKind === 'outline' ? 'filled' : 'outline'}
              onClick={() => setIconKind('outline')}
            >
              Outline
            </Button>
          </ButtonGroup>
        </Container>
        <div style={{ position: 'relative' }}>
          {iconList.length > 0 && (
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
                          onCopy={() =>
                            addToast({ content: 'Added to clipboard!', withLife: true })
                          }
                        >
                          <button aria-label={iconName}>
                            <Flex flexDirection="column" alignItems="center" gap="1rem">
                              <C width={30} height={30} />
                              <Typography.bodySmall>
                                {truncateString(iconName, 18)}
                              </Typography.bodySmall>
                            </Flex>
                          </button>
                        </CopyToClipboard>
                      )}
                    </ToastContextConsumer>
                  </div>
                );
              })}
            </div>
          )}
          {iconList.length === 0 && (
            <FlexItem flex={1} width="100%" margin="auto" maxWidth="40rem">
              <Alert appearance="outline" kind="primary" style={{ textAlign: 'center' }}>
                No results. Please try another search...
              </Alert>
            </FlexItem>
          )}
        </div>
      </Flex>
    </Card>
  );
};

export default IconsCard;
