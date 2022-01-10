import * as Styled from './styles';
import Select from 'react-select';

export type dataAutoComplete = {
  value: number;
  label: string;
};

type props = {
  title?: string;
  id: string;
  loading?: boolean;
  disabled?: boolean;
  placeholder: string;
  data: dataAutoComplete[];
  value?: any;
  idValue?: number;
  onChange: (e: any) => void;
  onBlur?: (e: any) => void;
  error?: string;
};

export const AutoComplete = ({
  title,
  id,
  loading,
  disabled,
  placeholder,
  data,
  value,
  idValue,
  onChange,
  onBlur,
  error,
}: props) => {
  const valueFunction = () => {
    let idSelect;
    if (idValue >= 0) {
      idSelect = data.filter((i) => {
        return i.value === idValue;
      });
    }
    return idSelect;
  };

  return (
    <Styled.Wrapper>
      <span className="mb-5 ajustSpan">{title}</span>
      <Select
        className={'basic-single' + (error ? 'is-invalid' : '')}
        classNamePrefix="select"
        isDisabled={disabled ? disabled : false}
        isLoading={loading ? loading : false}
        isClearable={true}
        isSearchable={true}
        name={id}
        placeholder={placeholder}
        options={data}
        onChange={onChange}
        value={valueFunction() || value || null}
        onBlur={onBlur}
        noOptionsMessage={() => 'Nenhum dado encontrado.'}
        styles={{
          control: (base, state) => ({
            ...base,
            borderColor: error ? 'red' : base.borderColor,
          }),

          menuList: (base, state) => ({
            ...base,
            background: '#CBD5D7',
          }),
        }}
      />
      <span style={{ fontSize: '14px' }} className="text-danger">
        {error}
      </span>
    </Styled.Wrapper>
  );
};
