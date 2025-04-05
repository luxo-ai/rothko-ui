const skeletonProps = [
  {
    name: 'backgroundColor',
    type: 'Color',
    defaultValue: null,
    description: 'Background color of the skeleton',
  },
  {
    name: 'foregroundColor',
    type: 'Color',
    defaultValue: null,
    description: 'Foreground color of the skeleton',
  },
  {
    name: 'gradientProps',
    type: 'SVGAttributes<SVGLinearGradientElement>',
    defaultValue: null,
    description: 'Props for the SVG linear gradient element',
  },
  {
    name: 'speed',
    type: 'number',
    defaultValue: 1.5,
    description: 'Speed factor of the skeleton animation in seconds',
  },
] as const;

export default skeletonProps;
