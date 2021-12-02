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
}: props) => {
  const valueFunction = () => {
    let idSelect;
    if (idValue) {
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
        className="basic-single"
        classNamePrefix="select"
        isDisabled={disabled ? disabled : false}
        isLoading={loading ? loading : false}
        isClearable={true}
        isSearchable={true}
        name={id}
        placeholder={placeholder}
        options={data}
        onChange={onChange}
        value={valueFunction() || value}
        onBlur={onBlur}
      />
    </Styled.Wrapper>
  );
};
