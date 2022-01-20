/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import storeConfig from 'store/storeConfig';
import { CookiesProvider } from 'react-cookie';
import { useSession } from 'next-auth/react';
import CategoryRegistration from 'components/form/category/registration/index';
import { ToastContainer } from 'react-toastify';
import mockAxios from 'jest-mock-axios';

jest.mock('next/dist/client/router', () => ({
  useRouter() {
    return {
      query: '',
      replace: jest.fn(),
    };
  },
}));

jest.mock('next-auth/react');
jest.mock('../../../common/toastr/index');

let messageSucessMock;
let messageErrorMock;
let useRouter;

describe('<CategoryRegistration />', () => {
  beforeEach(async () => {
    jest.clearAllMocks();

    useRouter = jest.spyOn(require('next/dist/client/router'), 'useRouter');
    useRouter.mockImplementation(() => ({
      query: '',
      replace: jest.fn(),
    }));

    const mockSession = {
      status: 'authenticated',
    };
    useSession.mockReturnValueOnce([mockSession, false]);

    messageSucessMock = jest.spyOn(require('../../../common/toastr/index'), 'messageSucess');
    messageErrorMock = jest.spyOn(require('../../../common/toastr/index'), 'messageError');
  });

  it('should call messageSucess when category save with sucess', async () => {
    const mockCategory = { id: '', name: 'Test' };
    const resetForm = jest.fn();

    //render
    const wrapper = await mount(
      <CookiesProvider>
        <Provider store={storeConfig}>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          <CategoryRegistration />
        </Provider>
      </CookiesProvider>,
    );

    //objects
    const categoryForm = wrapper.find('CategoryForm');
    const onSubmit = categoryForm.prop('onSubmit');

    const promise = onSubmit(mockCategory, { resetForm });

    expect(mockAxios.post).toHaveBeenCalledWith('/categories', { id: '', name: 'Test' });
    expect(mockAxios.post).toBeCalledTimes(1);
    mockAxios.mockResponse({
      data: '',
      status: 201,
      statusText: '',
      headers: {
        location: 'http://192.168.1.10:8080/categories/1',
      },
      request: {},
    });

    await promise;
    //sucess
    expect(messageSucessMock).toBeCalledTimes(1);
    expect(messageErrorMock).toBeCalledTimes(0);
    expect(resetForm).toBeCalledTimes(1);
  });

  it('should call messageErro when category save is duplicate', async () => {
    const mockCategory = { id: '', name: 'Test' };
    const resetForm = jest.fn();

    //render
    const wrapper = await mount(
      <CookiesProvider>
        <Provider store={storeConfig}>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          <CategoryRegistration />
        </Provider>
      </CookiesProvider>,
    );

    //objects
    const categoryForm = wrapper.find('CategoryForm');
    const onSubmit = categoryForm.prop('onSubmit');

    const promise = onSubmit(mockCategory, { resetForm });

    expect(mockAxios.post).toHaveBeenCalledWith('/categories', { id: '', name: 'Test' });
    expect(mockAxios.post).toBeCalledTimes(1);
    mockAxios.mockError({
      response: {
        data: {
          timestamp: 1642496672621,
          status: 400,
          error: 'Integridade de dados',
          message: 'Duplicado',
          path: '/categories',
        },
      },
    });

    await promise;
    //error
    expect(messageErrorMock).toBeCalledTimes(1);
    expect(messageSucessMock).toBeCalledTimes(0);
    expect(resetForm).toBeCalledTimes(1);
  });

  it('should update name category', async () => {
    const mockRouter = {
      query: { id: 1 },
      replace: jest.fn(),
    };

    useRouter.mockReturnValue(mockRouter);

    const mockCategory = { id: 1, name: 'Test' };
    const resetForm = jest.fn();
    const setValues = jest.fn();

    //render
    const wrapper = await mount(
      <CookiesProvider>
        <Provider store={storeConfig}>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          <CategoryRegistration />
        </Provider>
      </CookiesProvider>,
    );

    expect(wrapper.find('CategoryRegistration').prop('category')).toHaveLength(1);

    //objects
    const categoryForm = wrapper.find('CategoryForm');
    const onSubmit = categoryForm.prop('onSubmit');

    expect(categoryForm.prop('category')).toBeDefined();

    const promise = onSubmit(mockCategory, { resetForm, setValues });

    expect(mockAxios.put).toHaveBeenCalledWith('/categories/1', { id: 1, name: 'Test' });
    expect(mockAxios.put).toBeCalledTimes(1);
    mockAxios.mockResponse({
      data: '',
      status: 201,
      statusText: '',
      headers: {
        location: 'http://192.168.1.10:8080/categories/1',
      },
      request: {},
    });

    await promise;
    //sucess
    expect(messageErrorMock).toBeCalledTimes(0);
    expect(messageSucessMock).toBeCalledTimes(1);
    expect(resetForm).toBeCalledTimes(1);
  });

  it('should show erro when update name category', async () => {
    const mockRouter = {
      query: { id: 1 },
      replace: jest.fn(),
    };

    useRouter.mockReturnValue(mockRouter);

    const mockCategory = { id: 1, name: 'Test' };
    const resetForm = jest.fn();
    const setValues = jest.fn();

    //render
    const wrapper = await mount(
      <CookiesProvider>
        <Provider store={storeConfig}>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          <CategoryRegistration />
        </Provider>
      </CookiesProvider>,
    );

    expect(wrapper.find('CategoryRegistration').prop('category')).toHaveLength(1);

    //objects
    const categoryForm = wrapper.find('CategoryForm');
    const onSubmit = categoryForm.prop('onSubmit');

    expect(categoryForm.prop('category')).toBeDefined();

    const promise = onSubmit(mockCategory, { resetForm, setValues });

    expect(mockAxios.put).toHaveBeenCalledWith('/categories/1', { id: 1, name: 'Test' });
    expect(mockAxios.put).toBeCalledTimes(1);
    mockAxios.mockError({
      response: {
        data: {
          timestamp: 1642643613909,
          status: 400,
          error: 'Integridade de dados',
          message: 'Não é possível deletar categoria com produtos cadastrado!',
          path: '/categories/2',
        },
      },
    });

    await promise;
    //sucess
    expect(messageErrorMock).toBeCalledTimes(1);
    expect(messageSucessMock).toBeCalledTimes(0);
    expect(resetForm).toBeCalledTimes(1);
  });
});
