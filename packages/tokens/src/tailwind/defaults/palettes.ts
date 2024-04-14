import type { ColourPalette } from '../types';
import * as dark from '../../tokens/dark';
import * as light from '../../tokens/light';

const DARK_PRIMARY_PALETTE: ColourPalette = {
  100: dark.PRIMARY_100,
  200: dark.PRIMARY_200,
  300: dark.PRIMARY_300,
  400: dark.PRIMARY_400,
  500: dark.PRIMARY_500,
  600: dark.PRIMARY_600,
  700: dark.PRIMARY_700,
  800: dark.PRIMARY_800,
  900: dark.PRIMARY_900,
  foreground: dark.PRIMARY_FOREGROUND,
};

const DARK_SECONDARY_PALETTE: ColourPalette = {
  100: dark.SECONDARY_100,
  200: dark.SECONDARY_200,
  300: dark.SECONDARY_300,
  400: dark.SECONDARY_400,
  500: dark.SECONDARY_500,
  600: dark.SECONDARY_600,
  700: dark.SECONDARY_700,
  800: dark.SECONDARY_800,
  900: dark.SECONDARY_900,
  foreground: dark.SECONDARY_FOREGROUND,
};

const DARK_SUCCESS_PALETTE: ColourPalette = {
  100: dark.SUCCESS_100,
  200: dark.SUCCESS_200,
  300: dark.SUCCESS_300,
  400: dark.SUCCESS_400,
  500: dark.SUCCESS_500,
  600: dark.SUCCESS_600,
  700: dark.SUCCESS_700,
  800: dark.SUCCESS_800,
  900: dark.SUCCESS_900,
  foreground: dark.SUCCESS_FOREGROUND,
};

const DARK_INFO_PALETTE: ColourPalette = {
  100: dark.INFO_100,
  200: dark.INFO_200,
  300: dark.INFO_300,
  400: dark.INFO_400,
  500: dark.INFO_500,
  600: dark.INFO_600,
  700: dark.INFO_700,
  800: dark.INFO_800,
  900: dark.INFO_900,
  foreground: dark.INFO_FOREGROUND,
};

const DARK_WARNING_PALETTE: ColourPalette = {
  100: dark.WARNING_100,
  200: dark.WARNING_200,
  300: dark.WARNING_300,
  400: dark.WARNING_400,
  500: dark.WARNING_500,
  600: dark.WARNING_600,
  700: dark.WARNING_700,
  800: dark.WARNING_800,
  900: dark.WARNING_900,
  foreground: dark.WARNING_FOREGROUND,
};

const DARK_DANGER_PALETTE: ColourPalette = {
  100: dark.DANGER_100,
  200: dark.DANGER_200,
  300: dark.DANGER_300,
  400: dark.DANGER_400,
  500: dark.DANGER_500,
  600: dark.DANGER_600,
  700: dark.DANGER_700,
  800: dark.DANGER_800,
  900: dark.DANGER_900,
  foreground: dark.DANGER_FOREGROUND,
};

const LIGHT_PRIMARY_PALETTE: ColourPalette = {
  100: light.PRIMARY_100,
  200: light.PRIMARY_200,
  300: light.PRIMARY_300,
  400: light.PRIMARY_400,
  500: light.PRIMARY_500,
  600: light.PRIMARY_600,
  700: light.PRIMARY_700,
  800: light.PRIMARY_800,
  900: light.PRIMARY_900,
  foreground: light.PRIMARY_FOREGROUND,
};

const LIGHT_SECONDARY_PALETTE: ColourPalette = {
  100: light.SECONDARY_100,
  200: light.SECONDARY_200,
  300: light.SECONDARY_300,
  400: light.SECONDARY_400,
  500: light.SECONDARY_500,
  600: light.SECONDARY_600,
  700: light.SECONDARY_700,
  800: light.SECONDARY_800,
  900: light.SECONDARY_900,
  foreground: light.SECONDARY_FOREGROUND,
};

const LIGHT_SUCCESS_PALETTE: ColourPalette = {
  100: light.SUCCESS_100,
  200: light.SUCCESS_200,
  300: light.SUCCESS_300,
  400: light.SUCCESS_400,
  500: light.SUCCESS_500,
  600: light.SUCCESS_600,
  700: light.SUCCESS_700,
  800: light.SUCCESS_800,
  900: light.SUCCESS_900,
  foreground: light.SUCCESS_FOREGROUND,
};

const LIGHT_INFO_PALETTE: ColourPalette = {
  100: light.INFO_100,
  200: light.INFO_200,
  300: light.INFO_300,
  400: light.INFO_400,
  500: light.INFO_500,
  600: light.INFO_600,
  700: light.INFO_700,
  800: light.INFO_800,
  900: light.INFO_900,
  foreground: light.INFO_FOREGROUND,
};

const LIGHT_WARNING_PALETTE: ColourPalette = {
  100: light.WARNING_100,
  200: light.WARNING_200,
  300: light.WARNING_300,
  400: light.WARNING_400,
  500: light.WARNING_500,
  600: light.WARNING_600,
  700: light.WARNING_700,
  800: light.WARNING_800,
  900: light.WARNING_900,
  foreground: light.WARNING_FOREGROUND,
};

const LIGHT_DANGER_PALETTE: ColourPalette = {
  100: light.DANGER_100,
  200: light.DANGER_200,
  300: light.DANGER_300,
  400: light.DANGER_400,
  500: light.DANGER_500,
  600: light.DANGER_600,
  700: light.DANGER_700,
  800: light.DANGER_800,
  900: light.DANGER_900,
  foreground: light.DANGER_FOREGROUND,
};

export const LIGHT_PALETTE = {
  primary: LIGHT_PRIMARY_PALETTE,
  secondary: LIGHT_SECONDARY_PALETTE,
  success: LIGHT_SUCCESS_PALETTE,
  info: LIGHT_INFO_PALETTE,
  warning: LIGHT_WARNING_PALETTE,
  danger: LIGHT_DANGER_PALETTE,
};

export const DARK_PALETTE = {
  primary: DARK_PRIMARY_PALETTE,
  secondary: DARK_SECONDARY_PALETTE,
  success: DARK_SUCCESS_PALETTE,
  info: DARK_INFO_PALETTE,
  warning: DARK_WARNING_PALETTE,
  danger: DARK_DANGER_PALETTE,
};
