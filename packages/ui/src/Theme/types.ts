const semanticNames = ['success', 'info', 'warning', 'danger', 'basic'] as const;
type SemanticName = typeof semanticNames[number];

const brandName = ['primary', 'secondary'] as const;
type BrandName = typeof brandName[number];

export const isRothkoKind = (v: string): v is RothkoKind => {
  return ([...semanticNames, ...brandName] as string[]).includes(v);
};

export type KindProps = {
  kind?: RothkoKind;
};

export type HexColor = `#${string}`;
export type RGBColor = `rgba(${string})`;

export type Color = HexColor | RGBColor;

export type RothkoKind = SemanticName | BrandName;
export type RothkoSize = 'xs' | 's' | 'm' | 'l' | 'xl';
