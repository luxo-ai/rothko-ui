import { Container, Flex } from '@rothko-ui/ui';
import React from 'react';

import { useIsMobileOrTablet } from '../../../hooks/useIsMobileOrTablet';
import Code from '../../Code';
import Card from '../Card';
import themeCopy from './copy';

const JsonCode = React.memo(({ code }: { code: string }) => <Code language="json" code={code} />);
JsonCode.displayName = 'JsonCode';

const typographyJsonOverride = `{
  "typography": {
    "body": {
      "regular": { "value": '"Helvetica Neue", "Helvetica", Arial, sans-serif' },
      "bold": { "value": "'LabGrotesque-Bold'" },
      "italic": { "value": "'LabGrotesque-Italic'" },
      "light": { "value": "'LabGrotesque-Light'" },
    },
    "header": { "value": "'LabGrotesque-Regular'" },
  },
},`;

const semanticJsonOverride = `{
  "primary": {
    100: { "value": '#000' },
    200: { "value": '#000' },
    300: { "value": '#000' },
    400: { "value": '#000' },
    500: { "value": '#000' },
    600: { "value": '#000' },
    700: { "value": '#000' },
    800: { "value": '#000' },
    900: { "value": '#000' },
    "transparent": {
      100: { "value": '#000' },
      200: { "value": '#000' },
      300: { "value": '#000' },
      400: { "value": '#000' },
      500: { "value": '#000' },
      600: { "value": '#000' },
    },
  },
},`;

const componentJsonOverride = `{
  "background": { "value": '#000' },
  "border": { "value": '#000' },
  "color": { "value": '#000' },
  "svg": {
    "fill": { "value": '#000' },
    "stroke": { "value": '#000' },
  },
  "link": { "value": '#000' },
  "slider": {
    "handle": {
      "border": { "value": '#000' },
      "background": { "value": '#000' },
    },
    "range": {
      "background": { "value": '#000' },
    },
    "track": {
      "background": { "value": '#000' },
    },
  },
  "dropdown": {
    "background": { "value": '#000' },
    "multiselect": {
      "text": { "value": '#000' },
      "background": { "value": '#000' },
    },
    "option": {
    "background_selected": { "value": '#000' },
    },
  },
  "search": {
    "background": { "value": '#000' },
    "option": {
    "background_selected": { "value": '#000' },
    },
  },
  "tabBar": {
    "border": { "value": '#000' },
  },
  "button": {
    "primary": {
      "color": { "value": '#000' },
    },
    "secondary": {
      "color": { "value": '#000' },
    },
    "success": {
      "color": { "value": '#000' },
    },
    "info": {
      "color": { "value": '#000' },
    },
    "warning": {
      "color": { "value": '#000' },
    },
    "danger": {
      "color": { "value": '#000' },
    },
    "basic": {
      "color": { "value": '#000' },
    },
  },
  "radio": {
    "border": { "value": '#000' },
    "background": { "value": '#000' },
    "background_selected": { "value": '#000' },
  },
};`;

const ThemeCard = () => {
  const isMobileOrTablet = useIsMobileOrTablet();
  return (
    <Card copy={themeCopy}>
      <Container maxWidth={isMobileOrTablet ? undefined : '26rem'} marginTop="2rem">
        <Flex columnGap="1rem">ok</Flex>
      </Container>
      <JsonCode code={typographyJsonOverride} />
      <JsonCode code={semanticJsonOverride} />
      <JsonCode code={componentJsonOverride} />
    </Card>
  );
};

export default ThemeCard;
