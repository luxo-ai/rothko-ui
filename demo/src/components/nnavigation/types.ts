export type NavigationSectionLeaf = Readonly<{
  label: string;
  to: string;
}>;

export type NavigationSection =
  | Readonly<{
      label: string;
      children: NavigationSection[];
    }>
  | NavigationSectionLeaf;

export type NavigationSectionWithoutTo =
  | Readonly<{
      label: string;
      children: NavigationSectionWithoutTo[];
    }>
  | Omit<NavigationSectionLeaf, 'to'>;
