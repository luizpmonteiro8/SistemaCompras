/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import * as Styled from './styles';
import { formatReal } from 'app/util/money/index';

interface InputProps extends React.LinkHTMLAttributes<HTMLInputElement> {
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
  type?: string;
  min?: string;
  step?: string;
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
  type,
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
          type={type}
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

export const InputPassword: React.FC<InputProps> = ({ id, name, label, onChange, value, error }: InputProps) => {
  const [visibled, setVisibled] = useState(false);
  return (
    <Styled.Wrapper>
      <label>{label}</label>
      <div className="pass-wrapper">
        <input
          className={'form-control ' + (error ? 'is-invalid' : '')}
          id={id}
          name={name}
          type={visibled ? 'text' : 'password'}
          onChange={onChange}
          value={value}
        />
        {!error && <i className={visibled ? 'bi-eye-slash' : 'bi-eye'} onClick={() => setVisibled(!visibled)}></i>}
      </div>
      <div className="invalid-feedback">{error}</div>
    </Styled.Wrapper>
  );
};
