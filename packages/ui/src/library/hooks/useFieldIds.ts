import useId from './useId';

type HookArgs = {
  elementId?: string;
  labelId?: string;
  errorMessageId?: string;
};

const useFieldIds = (args: HookArgs = {}) => {
  const elementId = useId(args.elementId);
  const labelId = useId(args.labelId);
  const errorMessageId = useId(args.errorMessageId);
  return {
    elementId,
    labelId,
    errorMessageId,
  };
};

export default useFieldIds;
