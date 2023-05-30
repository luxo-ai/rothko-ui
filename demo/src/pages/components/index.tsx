import { Container, Flex, Typography, useRothko } from '@rothko-ui/ui';
import startCase from 'lodash/startCase';
import Link from 'next/link';
import WithNavigation from '../../components/WithNavigation';

const COMPONENTS = [
  'accordion',
  'alert',
  'bottomPopup',
  'breadCrumbs',
  'button',
  'checkbox',
  'drawer',
  'dropdown',
  'dropdown',
  'multiDropdown',
  'nestedDropdown',
  'input',
  'modal',
  'radioGroup',
  'search',
  'skeleton',
  'slider',
  'slider',
  'multiSlider',
  'tabBar',
  'tag',
  'toast',
  'toggle',
] as const;

const COMPONENTS_COPY: Record<typeof COMPONENTS[number], string> = {
  accordion: 'A component for displaying collapsible content sections.',
  alert: 'A component for displaying informative or warning messages.',
  bottomPopup: 'A component for displaying content in a popup that appears from the bottom.',
  breadCrumbs: 'A component for displaying hierarchical navigation links.',
  button: 'A component for triggering actions or events when clicked.',
  checkbox: 'A component for selecting one or more options from a list.',
  drawer: 'A component for displaying a sliding panel from the edge of the screen.',
  dropdown: 'A component for selecting an option from a dropdown menu.',
  multiDropdown: 'A component for selecting multiple options from a dropdown menu.',
  nestedDropdown: 'A component for selecting options from nested dropdown menus.',
  input: 'A component for capturing user input, such as text or numbers.',
  modal: 'A component for displaying content in a modal dialog overlay.',
  radioGroup: 'A component for selecting a single option from a group of radio buttons.',
  search: 'A component for searching and filtering content.',
  skeleton: 'A component for displaying placeholder content while loading or processing data.',
  slider: 'A component for selecting a value from a range using a sliding handle.',
  multiSlider: 'A component for selecting multiple values from a range using sliding handles.',
  tabBar: 'A component for displaying tabbed navigation.',
  tag: 'A component for displaying contextual labels or tags.',
  toast: 'A component for displaying temporary informational or alert messages.',
  toggle: 'A component for switching between two states, like on/off or true/false.',
};

const ComponentsPage = () => {
  const { mode } = useRothko();
  return (
    <WithNavigation>
      <Typography.h1>Rothko-UI Components</Typography.h1>
      <Flex flexWrap="wrap" gap="2rem" marginTop="2.5rem">
        {COMPONENTS.map(component => (
          <Container
            borderColor={mode === 'light' ? '#000' : '#fff'}
            borderWidth={1}
            borderStyle="solid"
            padding="1rem"
            key={component}
            width="13.5rem"
            height="13rem"
            display="flex"
            flex-direction="column"
            rowGap="1.25rem"
          >
            <div style={{ height: '100%', flex: 1, width: '100%' }}>
              <Typography.h6>{startCase(component)}</Typography.h6>
              <Typography.bodySmall style={{ marginTop: '0.75rem' }}>
                {COMPONENTS_COPY[component]}
              </Typography.bodySmall>
            </div>
            <Link href={`/components/${component}`}>
              <Typography.linkButtonSmall as="span">Learn more</Typography.linkButtonSmall>
            </Link>
          </Container>
        ))}
      </Flex>
    </WithNavigation>
  );
};

export default ComponentsPage;
