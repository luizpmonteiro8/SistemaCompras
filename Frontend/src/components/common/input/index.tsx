/* eslint-disable @typescript-eslint/no-explicit-any */

import { formatReal } from 'app/util/money';
import { useState } from 'react';

interface InputProps extends React.HTMLProps<typeof Input> {
  id: string;
  label: string;
  columnClasses?: string;
  error?: string;
  formatter?: (value: string) => string;
  autoFocusValue?: boolean;
  onChange: (item: any) => void;
  disabled?: boolean;
  name: string;
  value: string | number;
}

export const Input: React.FC<InputProps> = ({
  label,
  id,
  error,
  formatter,
  onChange,
  autoFocusValue,
  disabled,
  name,
  value,
  ...inputProps
}: InputProps) => {
  const onInputChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;

    const formattedValue = (formatter && formatter(value as string)) || value;

    onChange({
      ...event,
      target: {
        name,
        value: formattedValue,
      },
    });
  };

  const [firstLoading, setFirstLoading] = useState<boolean>(true);

  return (
    <div className="form-group">
      <label className="form-label mb-0" htmlFor={id}>
        {label}
      </label>
      <div>
        <input
          className={'form-control ' + (error ? 'is-invalid' : '')}
          onChange={onInputChange}
          id={id}
          disabled={disabled}
          name={name}
          value={value}
          ref={
            autoFocusValue && firstLoading
              ? function (input) {
                  if (input != null) {
                    input.focus();
                    setFirstLoading(false);
                  }
                }
              : undefined
          }
          di
          {...inputProps}
        />
        <div className="invalid-feedback">{error}</div>
      </div>
    </div>
  );
};

export const InputMoney: React.FC<InputProps> = (props: InputProps) => {
  return <Input {...props} formatter={formatReal} />;
};
