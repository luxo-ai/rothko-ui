export const getOffsetFactory = (args: { min: number; max: number }) => {
  return (v: number) => {
    const ratio = (v - args.min) / (args.max - args.min);
    return `${Math.max(0, ratio * 100)}%` as const;
  };
};
