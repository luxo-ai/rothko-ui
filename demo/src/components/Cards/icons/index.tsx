import * as Icons from '@rothko-ui/icons';
import {
  Alert,
  Container,
  Flex,
  MaxWidth,
  OptionGroup,
  SearchBar,
  Typography,
  useRothko,
} from '@rothko-ui/ui';
import FuzzySearch from 'fuzzy-search';
import { noop } from 'lodash';
import React, { useMemo, useState } from 'react';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import Card from '../Card';
import CodeSnippet, { CodeLanguage } from '../CodeSnippet';
import iconographyCopy from './copy';
import { filledIconList, outlineIconList } from './iconsList';

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

const IconsCard = () => {
  const [query, setQuery] = useState<string | null>(null);
  const [iconKind, setIconKind] = useState<IconKind>(IconKind.Filled);
  const { mode } = useRothko();
  const [openTooltip, setOpenTooltip] = useState<string | null>(null);

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
      <Container marginTop="2rem">
        <CodeSnippet alwaysExpanded initial={CodeLanguage.TS} examplesLookup={EXAMPLE_LOOKUP} />
        <Typography.h3>Availabe Icons</Typography.h3>
        <Container marginTop="2rem">
          <SearchBar
            onQueryChange={q => setQuery(q)}
            onSubmit={noop}
            placeholder="Search for an icon..."
            query={query}
          />
        </Container>
        <Container marginTop="2rem">
          <MaxWidth maxW="13rem">
            <OptionGroup
              withoutBorder
              maxCol={2}
              kind="secondary"
              optionGap="0.75rem"
              size="s"
              value={iconKind}
              options={[
                {
                  id: IconKind.Filled,
                  label: 'Filled',
                  data: {
                    accessoryLeft: ({ size, color }) => (
                      <Icons.Moon width={size} height={size} fill={color} />
                    ),
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
              ]}
              onChange={v => setIconKind(v)}
            />
          </MaxWidth>
        </Container>
        <Flex margin="2rem auto" flexWrap="wrap" gap="3rem">
          {iconList.map(iconName => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const C = Icons[iconName] as React.FC<any>;
            return (
              <div key={iconName}>
                <div style={{ display: 'inline-block' }} data-tooltip-id="my-tooltip">
                  <Container
                    onClick={() => {
                      if (openTooltip === iconName) {
                        setOpenTooltip(null);
                      } else {
                        setOpenTooltip(iconName);
                      }
                    }}
                    ariaLabel={iconName}
                    as="button"
                    borderWidth={1}
                    borderStyle="solid"
                    borderColor="basic"
                    padding="1.25rem"
                    className="phantom-button"
                  >
                    <Flex flexDirection="column" alignItems="center" gap="1rem">
                      <C width={32} height={32} />
                    </Flex>
                  </Container>
                </div>
              </div>
            );
          })}
        </Flex>
        {iconList.length === 0 && (
          <Container margin="auto" maxWidth="40rem">
            <Alert style={{ textAlign: 'center' }}>No results. Please try another search...</Alert>
          </Container>
        )}
      </Container>
      <ReactTooltip
        style={{
          zIndex: 100000,
          backgroundColor: mode === 'dark' ? '#fff' : '#000',
          color: mode === 'dark' ? '#000' : '#fff',
        }}
        clickable
        id="my-tooltip"
        content={openTooltip || ''}
        openOnClick
      />
    </Card>
  );
};

export default IconsCard;
