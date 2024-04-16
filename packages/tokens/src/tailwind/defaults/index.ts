import type { DeepRequired } from '@rothko-ui/utils';

import type { LayoutConfig } from '../types';
import * as layout from '../../tokens/layout';
import { DARK_PALETTE, LIGHT_PALETTE } from './palettes';
import { DARK_COMPONENTS, LIGHT_COMPONENTS } from './components';

const LAYOUT: DeepRequired<LayoutConfig> = {
  spacingUnit: layout.SPACING_UNIT,
  disabledOpacity: layout.DISABLED_OPACITY,
  dividerWeight: layout.DIVIDER_WEIGHT,
  fontSize: {
    body: layout.FONT_SIZE_BODY,
    h1: layout.FONT_SIZE_H_1,
    h2: layout.FONT_SIZE_H_2,
    h3: layout.FONT_SIZE_H_3,
    h4: layout.FONT_SIZE_H_4,
    h5: layout.FONT_SIZE_H_5,
    h6: layout.FONT_SIZE_H_6,
    bodySmall: layout.FONT_SIZE_BODY_SMALL,
    label: layout.FONT_SIZE_LABEL,
    caption: layout.FONT_SIZE_CAPTION,
    code: layout.FONT_SIZE_CODE,
  },
  lineHeight: {
    body: layout.LINE_HEIGHT_BODY,
    h1: layout.LINE_HEIGHT_H_1,
    h2: layout.LINE_HEIGHT_H_2,
    h3: layout.LINE_HEIGHT_H_3,
    h4: layout.LINE_HEIGHT_H_4,
    h5: layout.LINE_HEIGHT_H_5,
    h6: layout.LINE_HEIGHT_H_6,
    bodySmall: layout.LINE_HEIGHT_BODY_SMALL,
    label: layout.LINE_HEIGHT_LABEL,
    caption: layout.LINE_HEIGHT_CAPTION,
    code: layout.LINE_HEIGHT_CODE,
  },
  radius: {
    xs: layout.RADIUS_XS,
    s: layout.RADIUS_S,
    m: layout.RADIUS_M,
    l: layout.RADIUS_L,
  },
  borderWidth: {
    xs: layout.BORDER_WIDTH_XS,
    s: layout.BORDER_WIDTH_S,
    m: layout.BORDER_WIDTH_M,
    l: layout.BORDER_WIDTH_L,
  },
  hoverOpacity: layout.HOVER_OPACITY,
  font: {
    regular: layout.FONT_FAMILY_REGULAR,
    italic: layout.FONT_FAMILY_ITALIC,
    bold: layout.FONT_FAMILY_BOLD,
    light: layout.FONT_FAMILY_LIGHT,
    heading: layout.FONT_FAMILY_HEADING,
  },
};

export default {
  layout: LAYOUT,
  light: {
    components: LIGHT_COMPONENTS,
    colors: LIGHT_PALETTE,
  },
  dark: {
    components: DARK_COMPONENTS,
    colors: DARK_PALETTE,
  },
};
