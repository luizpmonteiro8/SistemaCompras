import { InputHTMLAttributes } from 'react';
import { formatReal } from 'app/util/money';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  columnClasses?: string;
  error?: string;
  formatter?: (value: string) => string;
}

export const Input: React.FC<InputProps> = ({ label, id, error, formatter, onChange, ...inputProps }: InputProps) => {
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

  return (
    <div className="form-group">
      <label className="form-label " htmlFor={id}>
        {label}
      </label>
      <div>
        <input
          className={'form-control ' + (error ? 'is-invalid' : '')}
          onChange={onInputChange}
          id={id}
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
