import { asUnionStr } from '@helpers';

export const rothkoKinds = ['primary', 'secondary', 'success', 'danger', 'warning', 'info'];
export const rothkoSizes = ['xs', 's', 'm', 'l'];

export const rothkoKindPropStr = asUnionStr(...rothkoKinds);
export const rothkoSizePropStr = asUnionStr(...rothkoSizes);
