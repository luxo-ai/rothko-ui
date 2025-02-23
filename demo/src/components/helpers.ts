export const asUnionStr = (...arr: string[]): string => arr.map(item => `'${item}'`).join(' | ');
