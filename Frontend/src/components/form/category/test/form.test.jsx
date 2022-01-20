/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-empty-function */
import { CategoryForm } from 'components/form/category/registration/form';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';

jest.mock('next/dist/client/router', () => ({
  useRouter() {
    return {
      replace: jest.fn(),
    };
  },
}));
const mockCategory = { id: 1, name: 'Cereais' };
let useRouter;

describe('<AutoComplete />', () => {
  beforeEach(async () => {
    jest.clearAllMocks();
    useRouter = jest.spyOn(require('next/dist/client/router'), 'useRouter');
    useRouter.mockImplementation(() => ({
      replace: jest.fn(),
    }));
  });

  it('should load mockCategory', async () => {
    const onSubmit = jest.fn();
    const wrapper = mount(<CategoryForm category={mockCategory} onSubmit={onSubmit} isLoading={false} />);

    const nameInput = wrapper.find("input[name='name']").prop('value');
    expect(nameInput).toBe('Cereais');
  });

  it('should change input name to Test', async () => {
    const onSubmit = jest.fn();
    const wrapper = mount(<CategoryForm category={mockCategory} onSubmit={onSubmit} isLoading={false} />);

    const nameInput = wrapper.find("input[name='name']");
    await act(async () => {
      nameInput.simulate('change', {
        persist: () => {},
        target: {
          name: 'name',
          value: 'Test',
        },
      });
    });
    expect(nameInput.html()).toMatch('Test');
  });

  it('should submit form', async () => {
    const onSubmit = jest.fn();
    const wrapper = mount(<CategoryForm category={mockCategory} onSubmit={onSubmit} isLoading={false} />);

    const buttonSubmit = wrapper.find("button[type='submit']");
    await act(async () => {
      buttonSubmit.simulate('submit', {
        persist: () => {},
        target: {
          name: 'name',
          value: 'Test',
        },
      });
    });
    expect(onSubmit).toBeCalledTimes(1);
  });

  it('should call error when submit name empty', async () => {
    const onSubmit = jest.fn();
    const wrapper = mount(<CategoryForm category={null} onSubmit={onSubmit} isLoading={false} />);

    const nameInput = wrapper.find("Input[id='name']");
    const buttonSubmit = wrapper.find("button[type='submit']");
    await act(async () => {
      buttonSubmit.simulate('submit', {
        persist: () => {},
        target: {
          name: 'name',
          value: 'Test',
        },
      });
    });
    expect(onSubmit).toBeCalledTimes(0);
    expect(nameInput.html()).toMatch('Campo obrigatório.');
  });

  it('should click button Limpar', async () => {
    const mockRouter = {
      replace: jest.fn(),
    };

    useRouter.mockReturnValue(mockRouter);

    const onSubmit = jest.fn();
    const wrapper = mount(<CategoryForm category={null} onSubmit={onSubmit} isLoading={false} />);

    const buttonClean = wrapper.find('a');
    await act(async () => {
      buttonClean.simulate('click');
    });
    expect(mockRouter.replace).toHaveBeenCalledWith('/cadastros/categorias');
  });
});
