/* eslint-disable @typescript-eslint/no-var-requires */
import CategoryListing from 'components/form/category/listing/index';
import { mount } from 'enzyme';
import mockAxios from './../../../../../__mocks__/axios';
import storeConfig from 'store/storeConfig';
import { Provider } from 'react-redux';
import { CookiesProvider } from 'react-cookie';

jest.mock('next-auth/react');

let messageErrorMock;

let useRouter;
const store = storeConfig;
const mockCategory = [
  {
    id: 1,
    name: 'Cereais',
  },
  {
    id: 2,
    name: 'Frios',
  },
];

describe('<CategoryListing />', () => {
  beforeEach(async () => {
    jest.clearAllMocks();

    useRouter = jest.spyOn(require('next/dist/client/router'), 'useRouter');
    useRouter.mockImplementation(() => ({
      query: '',
      replace: jest.fn(),
    }));

    messageErrorMock = jest.spyOn(require('../../../common/toastr/index'), 'messageError');
  });

  it('should loal all category in table', async () => {
    const wrapper = mount(
      <CookiesProvider>
        <Provider store={store}>
          <CategoryListing />
        </Provider>
      </CookiesProvider>,
    );

    expect(mockAxios.get).toHaveBeenCalledWith('/categories');
    expect(mockAxios.get).toBeCalledTimes(1);
    mockAxios.mockResponse({
      data: mockCategory,
      status: 200,
    });
    await new Promise(process.nextTick);
    wrapper.update();

    const categoryListing = wrapper.find('CategoryListing');
    const propCategory = categoryListing.prop('category');

    expect(messageErrorMock).toBeCalledTimes(0);
    expect(propCategory).toHaveLength(2);
  });

  it('should call update page', async () => {
    const funReplace = jest.fn();
    const mockRouter = {
      query: { id: 1 },
      replace: funReplace,
    };

    useRouter.mockReturnValue(mockRouter);

    const wrapper = mount(
      <CookiesProvider>
        <Provider store={store}>
          <CategoryListing />
        </Provider>
      </CookiesProvider>,
    );
    const buttonUpdate = wrapper.find('a').at(0);
    buttonUpdate.simulate('click');
    expect(funReplace).toBeCalledTimes(1);
  });

  it('should show modal when click to delete', async () => {
    const wrapper = mount(
      <CookiesProvider>
        <Provider store={store}>
          <CategoryListing />
        </Provider>
      </CookiesProvider>,
    );

    const modalPropBeforeClick = wrapper.find('Modal').at(0).prop('show');
    expect(modalPropBeforeClick).toBe(false);

    const buttonDelete = wrapper.find('button').at(0);
    buttonDelete.simulate('click');
    wrapper.update();

    const modalPropAfterClick = wrapper.find('Modal').at(0).prop('show');
    expect(modalPropAfterClick).toBe(true);
  });

  it('should show modal with name category', async () => {
    const wrapper = mount(
      <CookiesProvider>
        <Provider store={store}>
          <CategoryListing />
        </Provider>
      </CookiesProvider>,
    );

    const buttonDelete = wrapper.find('button').at(0);
    buttonDelete.simulate('click');
    wrapper.update();

    const modalBody = wrapper.find("div[className='modal-body']");
    expect(modalBody.html()).toMatch('Deseja deletar item Cereais?');
  });

  it('should show off click on cancelar', async () => {
    const wrapper = mount(
      <CookiesProvider>
        <Provider store={store}>
          <CategoryListing />
        </Provider>
      </CookiesProvider>,
    );

    const buttonDelete = wrapper.find('button').at(0);
    buttonDelete.simulate('click');
    wrapper.update();

    const modalPropsBeforeClickCancelar = wrapper.find('Modal').at(0).prop('show');
    expect(modalPropsBeforeClickCancelar).toBe(true);

    const modal = wrapper.find('Modal').at(0);
    const buttonCancelar = modal.find('button').at(2);
    buttonCancelar.simulate('click');
    wrapper.update();

    const modalPropsAfterClickCancelar = wrapper.find('Modal').at(0).prop('show');

    expect(modalPropsAfterClickCancelar).toBe(false);
  });

  it('should detele category', async () => {
    const wrapper = mount(
      <CookiesProvider>
        <Provider store={store}>
          <CategoryListing />
        </Provider>
      </CookiesProvider>,
    );
    const storeCategoryPropsBeforeDelete = wrapper.find('Provider').prop('store').getState().category.category;
    expect(storeCategoryPropsBeforeDelete).toHaveLength(2);

    const buttonDelete = wrapper.find('button').at(0);
    buttonDelete.simulate('click');
    wrapper.update();

    const modal = wrapper.find('Modal').at(0);
    const buttonDeleteModal = modal.find('button').at(1);
    buttonDeleteModal.simulate('click');

    expect(mockAxios.delete).toHaveBeenCalledWith('/categories/1');
    let firstRequestInfo = mockAxios.lastPromiseGet();
    mockAxios.mockResponse(
      {
        status: 204,
      },
      firstRequestInfo,
      false,
    );
    await new Promise(process.nextTick);

    const storeCategoryPropsAfterDelete = wrapper.find('Provider').prop('store').getState().category.category;
    expect(storeCategoryPropsAfterDelete).toHaveLength(1);
  });

  it('should show error when server off', async () => {
    const wrapper = mount(
      <CookiesProvider>
        <Provider store={storeConfig}>
          <CategoryListing />
        </Provider>
      </CookiesProvider>,
    );

    expect(mockAxios.get).toHaveBeenCalledWith('/categories');
    expect(mockAxios.get).toBeCalledTimes(1);
    mockAxios.mockError({
      message: 'Network Error',
    });
    await new Promise(process.nextTick);
    wrapper.update();

    expect(messageErrorMock).toBeCalledTimes(1);
  });

  it('should show error when delete category in use', async () => {
    const wrapper = mount(
      <CookiesProvider>
        <Provider store={store}>
          <CategoryListing />
        </Provider>
      </CookiesProvider>,
    );

    const buttonDelete = wrapper.find('button').at(0);
    buttonDelete.simulate('click');
    wrapper.update();

    const modal = wrapper.find('Modal').at(0);
    const buttonDeleteModal = modal.find('button').at(1);
    buttonDeleteModal.simulate('click');

    expect(mockAxios.delete).toHaveBeenCalledWith('/categories/2');
    let firstRequestInfo = mockAxios.lastPromiseGet();
    mockAxios.mockError(
      {
        response: {
          data: {
            timestamp: 1642643613909,
            status: 400,
            error: 'Integridade de dados',
            message: 'Não é possível deletar categoria com produtos cadastrado!',
            path: '/categories/2',
          },
        },
      },
      firstRequestInfo,
    );
    await new Promise(process.nextTick);

    expect(messageErrorMock).toBeCalledTimes(1);
  });
});
