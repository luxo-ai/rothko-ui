import type { DeepRequired } from '@rothko-ui/utils';
import type { ComponentColors } from '../types';
import * as light from '../../tokens/light';
import * as dark from '../../tokens/dark';

export const LIGHT_COMPONENTS: DeepRequired<ComponentColors> = {
  background: light.BACKGROUND,
  border: light.BORDER,
  foreground: light.FOREGROUND,
  typography: {
    link: light.TYPOGRAPHY_LINK_COLOR,
    body: light.TYPOGRAPHY_BODY_COLOR,
    heading: light.TYPOGRAPHY_HEADING_COLOR,
  },
  icon: {
    background: light.ICON_BACKGROUND,
    border: light.ICON_BORDER,
  },
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
    multiselect: {
      foreground: light.DROPDOWN_MULTISELECT_FOREGROUND,
      background: light.DROPDOWN_MULTISELECT_BACKGROUND,
    },
    option: {
      'background::focus': light.DROPDOWN_OPTION_BACKGROUND_FOCUS,
    },
  },
  search: {
    background: light.SEARCH_BACKGROUND,
    option: {
      'background::focus': light.SEARCH_OPTION_BACKGROUND_FOCUS,
    },
  },
  tabBar: {
    border: light.TAB_BAR_BORDER,
  },
  radio: {
    border: light.RADIO_BORDER,
    background: light.RADIO_BACKGROUND,
    'background::focus': light.RADIO_BACKGROUND_FOCUS,
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
      filled: {
        background: light.TOAST_LIFE_FILLED_BACKGROUND,
      },
      empty: {
        background: light.TOAST_LIFE_EMPTY_BACKGROUND,
      },
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
    'background::focus': light.RADIO_BACKGROUND_FOCUS,
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
  foreground: dark.FOREGROUND,
  typography: {
    link: dark.TYPOGRAPHY_LINK_COLOR,
    body: dark.TYPOGRAPHY_BODY_COLOR,
    heading: dark.TYPOGRAPHY_HEADING_COLOR,
  },
  icon: {
    background: dark.ICON_BACKGROUND,
    border: dark.ICON_BORDER,
  },
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
    multiselect: {
      foreground: dark.DROPDOWN_MULTISELECT_FOREGROUND,
      background: dark.DROPDOWN_MULTISELECT_BACKGROUND,
    },
    option: {
      'background::focus': dark.DROPDOWN_OPTION_BACKGROUND_FOCUS,
    },
  },
  search: {
    background: dark.SEARCH_BACKGROUND,
    option: {
      'background::focus': dark.SEARCH_OPTION_BACKGROUND_FOCUS,
    },
  },
  tabBar: {
    border: dark.TAB_BAR_BORDER,
  },
  radio: {
    border: dark.RADIO_BORDER,
    background: dark.RADIO_BACKGROUND,
    'background::focus': dark.RADIO_BACKGROUND_FOCUS,
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
      filled: {
        background: dark.TOAST_LIFE_FILLED_BACKGROUND,
      },
      empty: {
        background: dark.TOAST_LIFE_EMPTY_BACKGROUND,
      },
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
    'background::focus': dark.RADIO_BACKGROUND_FOCUS,
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
