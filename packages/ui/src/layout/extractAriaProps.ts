type Props<T> = React.AriaAttributes & T;

const extractAriaProps = <T>({
  'aria-activedescendant': ariaActivedescendant,
  'aria-atomic': ariaAtomic,
  'aria-autocomplete': ariaAutocomplete,
  'aria-busy': ariaBusy,
  'aria-checked': ariaChecked,
  'aria-colcount': ariaColcount,
  'aria-colindex': ariaColindex,
  'aria-colspan': ariaColspan,
  'aria-controls': ariaControls,
  'aria-current': ariaCurrent,
  'aria-describedby': ariaDescribedby,
  'aria-description': ariaDescription,
  'aria-details': ariaDetails,
  'aria-disabled': ariaDisabled,
  'aria-errormessage': ariaErrormessage,
  'aria-expanded': ariaExpanded,
  'aria-flowto': ariaFlowto,
  'aria-haspopup': ariaHaspopup,
  'aria-hidden': ariaHidden,
  'aria-invalid': ariaInvalid,
  'aria-keyshortcuts': ariaKeyshortcuts,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledby,
  'aria-level': ariaLevel,
  'aria-live': ariaLive,
  'aria-modal': ariaModal,
  'aria-multiline': ariaMultiline,
  'aria-multiselectable': ariaMultiselectable,
  'aria-setsize': ariaSetsize,
  'aria-sort': ariaSort,
  'aria-valuemax': ariaValuemax,
  'aria-valuemin': ariaValuemin,
  'aria-valuenow': ariaValuenow,
  'aria-valuetext': ariaValuetext,
  'aria-orientation': ariaOrientation,
  'aria-owns': ariaOwns,
  'aria-placeholder': ariaPlaceholder,
  'aria-posinset': ariaPosinset,
  'aria-pressed': ariaPressed,
  'aria-readonly': ariaReadonly,
  'aria-relevant': ariaRelevant,
  'aria-required': ariaRequired,
  'aria-roledescription': ariaRoledescription,
  'aria-rowcount': ariaRowcount,
  'aria-rowindex': ariaRowindex,
  'aria-rowspan': ariaRowspan,
  'aria-selected': ariaSelected,
  ...props
}: Props<T>) => {
  return {
    ariaAttributes: {
      'aria-activedescendant': ariaActivedescendant,
      'aria-atomic': ariaAtomic,
      'aria-autocomplete': ariaAutocomplete,
      'aria-busy': ariaBusy,
      'aria-checked': ariaChecked,
      'aria-colcount': ariaColcount,
      'aria-colindex': ariaColindex,
      'aria-colspan': ariaColspan,
      'aria-controls': ariaControls,
      'aria-current': ariaCurrent,
      'aria-describedby': ariaDescribedby,
      'aria-description': ariaDescription,
      'aria-details': ariaDetails,
      'aria-disabled': ariaDisabled,
      'aria-errormessage': ariaErrormessage,
      'aria-expanded': ariaExpanded,
      'aria-flowto': ariaFlowto,
      'aria-haspopup': ariaHaspopup,
      'aria-hidden': ariaHidden,
      'aria-invalid': ariaInvalid,
      'aria-keyshortcuts': ariaKeyshortcuts,
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledby,
      'aria-level': ariaLevel,
      'aria-live': ariaLive,
      'aria-modal': ariaModal,
      'aria-multiline': ariaMultiline,
      'aria-multiselectable': ariaMultiselectable,
      'aria-setsize': ariaSetsize,
      'aria-sort': ariaSort,
      'aria-valuemax': ariaValuemax,
      'aria-valuemin': ariaValuemin,
      'aria-valuenow': ariaValuenow,
      'aria-valuetext': ariaValuetext,
      'aria-orientation': ariaOrientation,
      'aria-owns': ariaOwns,
      'aria-placeholder': ariaPlaceholder,
      'aria-posinset': ariaPosinset,
      'aria-pressed': ariaPressed,
      'aria-readonly': ariaReadonly,
      'aria-relevant': ariaRelevant,
      'aria-required': ariaRequired,
      'aria-roledescription': ariaRoledescription,
      'aria-rowcount': ariaRowcount,
      'aria-rowindex': ariaRowindex,
      'aria-rowspan': ariaRowspan,
      'aria-selected': ariaSelected,
    },
    props,
  };
};

export default extractAriaProps;
