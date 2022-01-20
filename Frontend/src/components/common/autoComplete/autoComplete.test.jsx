import { fireEvent, getByLabelText, getByText, render, screen } from '@testing-library/react';
import { AutoComplete } from './index';
import { shallow, mount } from 'enzyme';
import '@testing-library/jest-dom';

describe('<AutoComplete />', () => {
  it('should render autocomplete with placeholder', async () => {
    render(<AutoComplete id={'Test'} placeholder={'PlaceHolderTest'} />);

    const placeholder = screen.getByText('PlaceHolderTest');
    expect(placeholder).toBeInTheDocument();
  });

  it('should render autocomplete with values', async () => {
    const tela = mount(
      <AutoComplete
        id={'Test'}
        placeholder={'PlaceHolderTest'}
        value={[
          { value: 1, label: 'test' },
          { value: 2, label: 'test2' },
        ]}
      />,
    );
    // console.log(tela.debug());
    // console.log(tela.find('input').getElements().at(0).get);
    tela.find('ForwardRef').simulate('click');
    //console.log(tela.find('ForwardRef').getElement());

    // console.log(tela.props());

    //expect(screen.getByText('test2')).toBeInTheDocument();
  });
});
