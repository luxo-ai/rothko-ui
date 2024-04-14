import type { DeepRequired } from '@rothko-ui/utils';
import type { ComponentColors } from '../types';
import * as light from '../../tokens/light';
import * as dark from '../../tokens/dark';

export const LIGHT_COMPONENTS: DeepRequired<ComponentColors> = {
  background: light.BACKGROUND,
  border: light.BORDER,
  color: light.FOREGROUND,
  svg: {
    fill: light.SVG_FILL,
    stroke: light.SVG_STROKE,
  },
  link: light.LINK,
  slider: {
    handle: {
      border: light.SLIDER_HANDLE_BORDER,
      background: light.SLIDER_HANDLE_BACKGROUND,
    },
    range: {
      background: light.SLIDER_RANGE_BACKGROUND,
    },
    track: {
      background: light.SLIDER_TRACK_BACKGROUND,
    },
  },
  dropdown: {
    background: light.DROPDOWN_BACKGROUND,
    'border.minimal': light.DROPDOWN_BORDER_MINIMAL,
    multiselect: {
      text: light.DROPDOWN_MULTISELECT_TEXT,
      background: light.DROPDOWN_MULTISELECT_BACKGROUND,
    },
    option: {
      '::selected': {
        background: light.DROPDOWN_OPTION_BACKGROUND_SELECTED,
      },
    },
  },
  search: {
    background: light.SEARCH_BACKGROUND,
    option: {
      '::selected': {
        background: light.SEARCH_OPTION_BACKGROUND_SELECTED,
      },
    },
  },
  tabBar: {
    border: light.TAB_BAR_BORDER,
  },
  radio: {
    border: light.RADIO_BORDER,
    background: light.RADIO_BACKGROUND,
    '::selected': {
      background: light.RADIO_BACKGROUND_SELECTED,
    },
  },
  table: {
    header: {
      background: light.BACKGROUND,
    },
    row: {
      border: light.BORDER,
    },
  },
  toast: {
    color: light.FOREGROUND,
    background: light.BACKGROUND,
    life: {
      filled: light.TOAST_LIFE_FILLED,
      empty: light.TOAST_LIFE_EMPTY,
    },
  },
  box: {
    background: light.BOX_BACKGROUND,
    border: light.BOX_BORDER,
  },
  accordion: {
    border: light.ACCORDION_BORDER,
    background: light.ACCORDION_BACKGROUND,
  },
  checkbox: {
    background: light.RADIO_BACKGROUND,
    '::selected': {
      background: light.RADIO_BACKGROUND_SELECTED,
    },
  },
  input: {
    background: light.BACKGROUND,
    color: light.FOREGROUND,
  },
  skeleton: {
    background: light.BACKGROUND,
    foreground: light.FOREGROUND,
  },
};

export const DARK_COMPONENTS: DeepRequired<ComponentColors> = {
  background: dark.BACKGROUND,
  border: dark.BORDER,
  color: dark.FOREGROUND,
  svg: {
    fill: dark.SVG_FILL,
    stroke: dark.SVG_STROKE,
  },
  link: dark.LINK,
  slider: {
    handle: {
      border: dark.SLIDER_HANDLE_BORDER,
      background: dark.SLIDER_HANDLE_BACKGROUND,
    },
    range: {
      background: dark.SLIDER_RANGE_BACKGROUND,
    },
    track: {
      background: dark.SLIDER_TRACK_BACKGROUND,
    },
  },
  dropdown: {
    background: dark.DROPDOWN_BACKGROUND,
    'border.minimal': dark.DROPDOWN_BORDER_MINIMAL,
    multiselect: {
      text: dark.DROPDOWN_MULTISELECT_TEXT,
      background: dark.DROPDOWN_MULTISELECT_BACKGROUND,
    },
    option: {
      '::selected': {
        background: dark.DROPDOWN_OPTION_BACKGROUND_SELECTED,
      },
    },
  },
  search: {
    background: dark.SEARCH_BACKGROUND,
    option: {
      '::selected': {
        background: dark.SEARCH_OPTION_BACKGROUND_SELECTED,
      },
    },
  },
  tabBar: {
    border: dark.TAB_BAR_BORDER,
  },
  radio: {
    border: dark.RADIO_BORDER,
    background: dark.RADIO_BACKGROUND,
    '::selected': {
      background: dark.RADIO_BACKGROUND_SELECTED,
    },
  },
  table: {
    header: {
      background: dark.BACKGROUND,
    },
    row: {
      border: dark.BORDER,
    },
  },
  toast: {
    color: dark.FOREGROUND,
    background: dark.BACKGROUND,
    life: {
      filled: dark.TOAST_LIFE_FILLED,
      empty: dark.TOAST_LIFE_EMPTY,
    },
  },
  box: {
    background: dark.BOX_BACKGROUND,
    border: dark.BOX_BORDER,
  },
  accordion: {
    border: dark.ACCORDION_BORDER,
    background: dark.ACCORDION_BACKGROUND,
  },
  checkbox: {
    background: dark.RADIO_BACKGROUND,
    '::selected': {
      background: dark.RADIO_BACKGROUND_SELECTED,
    },
  },
  input: {
    background: dark.BACKGROUND,
    color: dark.FOREGROUND,
  },
  skeleton: {
    background: dark.BACKGROUND,
    foreground: dark.FOREGROUND,
  },
};

export default { light: LIGHT_COMPONENTS, dark: DARK_COMPONENTS };
