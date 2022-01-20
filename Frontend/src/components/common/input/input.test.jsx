import { render, screen } from '@testing-library/react';
import { Input, InputMoney } from './index';
import { shallow } from 'enzyme';
import '@testing-library/jest-dom';

describe('<Input />', () => {
  it('should render input with label', async () => {
    render(<Input id={'Test'} name={'Test'} label={'Test'} />);

    const input = screen.getByLabelText('Test');
    expect(input).toBeInTheDocument();
  });

  it('should call function when click on button', async () => {
    const onChange = jest.fn();
    const input = shallow(<Input onChange={onChange} value="custom value" />);
    input.find('input').simulate('change', { target: { value: 'matched' } });
    expect(onChange).toBeCalledWith({ target: { value: 'matched' } });
  });

  it('should disabled input when disabled is true', async () => {
    render(<Input id={'Test'} name={'Test'} label={'Test'} disabled={true} />);
    const input = screen.getByLabelText('Test');

    expect(input).toBeDisabled();
  });

  it('should show input with mask money', async () => {
    render(<InputMoney id={'Test'} name={'Test'} label={'Test'} />);

    const input = screen.getByLabelText('Test');
    expect(input).toBeInTheDocument();
  });
});
