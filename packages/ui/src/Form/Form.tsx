import clsx from 'clsx';
import get from 'lodash/get';
// import moment from 'moment-timezone';
import React from 'react';
import type { RegisterOptions } from 'react-hook-form';
import { Controller, useFormContext } from 'react-hook-form';
// import InputMask from 'react-input-mask';
import { Checkbox } from '../Checkbox';
import { Dropdown } from '../Dropdown';
import type { FormControlProps } from './FormControl';
import { FormControl } from './FormControl';
// import { validatePhoneNumber } from './FormValidators';
import type { InputProps, TextareaProps } from '../Input';
import { Input, Textarea } from '../Input';
import { OptionGroup } from '../OptionGroup';
import { RadioGroup } from '../Radio';
import { MultiSlider, Range, Slider } from '../Slider';
import { Toggle } from '../Toggle/Toggle';

type ControllerRenderProps = Parameters<Parameters<typeof Controller>[0]['render']>[0]['field'];

type FormRules = Pick<
  RegisterOptions,
  'required' | 'validate' | 'min' | 'max' | 'pattern' | 'maxLength' | 'minLength'
>;

type FormElement<T> = {
  name: string;
  rules?: FormRules;
  noControl?: boolean; // omit form control
  controlProps?: Omit<FormControlProps, 'name'>;
} & Omit<T, 'onChange' | 'onSelect' | 'value' | 'onBlur'>;

type FactoryArgs<T> = {
  component: (props: T) => JSX.Element;
  propMapper: (ctrl: Omit<ControllerRenderProps, 'ref'>, props: FormElement<T>) => T;
  defaultDefaultValue?: any;
};

function withControllerFactory<T>({
  component: C,
  propMapper,
  defaultDefaultValue = null,
}: FactoryArgs<T>) {
  return (props: FormElement<T>) => {
    const { name, controlProps, rules, noControl } = props;
    const { required, ...control } = controlProps ?? {};
    const { formState } = useFormContext();
    const error = get(formState.errors, name);
    const Wrapper: React.FC<FormControlProps> = noControl ? React.Fragment : FormControl;

    return (
      <Wrapper
        name={name}
        error={error?.message as string}
        required={!!rules?.required || required}
        {...control}
      >
        <Controller
          defaultValue={defaultDefaultValue}
          name={name}
          rules={rules}
          // don't include the ref (no need in this setup) -- will cause warning error
          render={({ field: { ref, ...renderProps } }) => {
            return <C error={!!error} name={name} id={name} {...propMapper(renderProps, props)} />;
          }}
        />
      </Wrapper>
    );
  };
}

export const DropdownRHF = withControllerFactory({
  component: Dropdown,
  propMapper: (ctrl, props) => ({ id: ctrl.name, ...ctrl, ...props }),
});

export const ToggleRHF = withControllerFactory({
  component: Toggle,
  propMapper: ({ value, ...rest }, props) => ({ toggled: value, ...rest, ...props }),
});

export const RadioGroupRHF = withControllerFactory({
  component: RadioGroup,
  propMapper: ({ onChange, value }, props) => ({ ...props, onChange, value }),
});

export const CheckboxRHF = withControllerFactory({
  component: Checkbox,
  propMapper: ({ value, ...rest }, props) => ({ checked: value, ...rest, ...props }),
  defaultDefaultValue: false,
});

export const OptionGroupRHF = withControllerFactory({
  component: OptionGroup,
  propMapper: (ctrl, props) => ({ ...ctrl, ...props }),
});

export const SliderRHF = withControllerFactory({
  component: Slider,
  propMapper: ({ onChange, value }, props) => ({ ...props, onChange, value }),
});

export const MultiSliderRHF = withControllerFactory({
  component: MultiSlider,
  propMapper: ({ onChange, value }, props) => ({
    ...props,
    onChange,
    value,
  }),
});

export const InputRHF = ({
  name,
  rules,
  controlProps,
  className,
  type = 'text',
  ...props
}: FormElement<InputProps>) => {
  const { formState, register } = useFormContext();
  const { required, ...control } = controlProps ?? {};
  const error = get(formState.errors, name);
  return (
    <FormControl
      name={name}
      error={error?.message as string}
      required={!!rules?.required || required}
      {...control}
    >
      <Input
        id={name}
        {...props}
        type={type}
        className={clsx(error && 'error', className)}
        aria-invalid={!!error}
        aria-required={!!rules?.required}
        {...register(name, rules)}
      />
    </FormControl>
  );
};

export const TextareaRHF = ({
  name,
  rules,
  controlProps,
  className,
  ...props
}: FormElement<TextareaProps>) => {
  const { formState, register } = useFormContext();
  const { required, ...control } = controlProps ?? {};
  const error = get(formState.errors, name);
  return (
    <FormControl
      name={name}
      error={error?.message as string}
      required={!!rules?.required || required}
      {...control}
    >
      <Textarea
        id={name}
        {...props}
        className={clsx(error && 'error', className)}
        aria-invalid={!!error}
        aria-required={!!rules?.required}
        {...register(name, rules)}
      />
    </FormControl>
  );
};

type MaskedInputProps = InputProps & { mask: string };

/*
export const MaskedInputRHF = ({
  name,
  rules,
  controlProps,
  className,
  type = 'text',
  size,
  ...props
}: FormElement<MaskedInputProps>) => {
  const { formState, register } = useFormContext();
  const { required, ...control } = controlProps ?? {};
  const error = get(formState.errors, name);
  return (
    <FormControl
      name={name}
      error={error?.message as string}
      required={!!rules?.required || required}
      {...control}
    >
      <InputMask
        id={name}
        {...props}
        type={type}
        className={clsx(error && 'error', className)}
        aria-invalid={!!error}
        aria-required={!!rules?.required}
        {...register(name, rules)}
      >
        {(p: InputProps) => <Input {...p} size={size} ref={register(name, rules).ref} />}
      </InputMask>
    </FormControl>
  );
};
*/

/*
export const DateInputRHF = ({ rules, ...props }: FormElement<Omit<MaskedInputProps, 'mask'>>) => (
  <MaskedInputRHF
    mask="99/99/9999"
    rules={{
      validate: {
        validDate: (value: string) =>
          moment(value, 'MM/DD/YYYY').isValid() || 'Please enter a valid date.',
        format: (value: string) =>
          /^\d{2}\/\d{2}\/\d{4}$/.test(value) || 'Enter date in MM/DD/YYYY format.',
        ...(rules?.validate ?? {}),
      },
      ...rules,
    }}
    {...props}
  />
);
*/
/*
export const PhoneInputRHF = ({ rules, ...props }: FormElement<Omit<MaskedInputProps, 'mask'>>) => (
  <MaskedInputRHF
    mask="(999) 999-9999"
    rules={{
      validate: {
        format: validatePhoneNumber,
        ...(rules?.validate ?? {}),
      },
      ...rules,
    }}
    {...props}
  />
);
*/
