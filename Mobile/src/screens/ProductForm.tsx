/* eslint-disable @typescript-eslint/no-explicit-any */
import { Category } from 'app/models/category';
import { ProductDTO } from 'app/models/productDTO';
import { Formik } from 'formik';
import React, { Component } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { connect, ConnectedProps } from 'react-redux';
import { LoadAllCategory } from '../store/actions/category';
import { setMessage } from '../store/actions/message';
import { ValueType } from 'react-native-dropdown-picker';
import { AutoComplete } from './../components/autoComplete/index';
import {
  LoadAllProductDTO,
  SaveProduct,
  UpdateProduct,
} from '../store/actions/product';
import * as Yup from 'yup';
import { Input } from './../components/common/input/index';
import { CheckBox } from './../components/common/checkbox';
import { Button } from './../components/common/button/index';
import { CommonActions } from '@react-navigation/native';

interface Props extends PropsFromRedux {
  navigation: {
    navigate: any;
    toggleDrawer: any;
    closeDrawer: any;
    openDrawer: any;
    dispatch: any;
  };
  route: {
    params: any;
  };
}

const initialValues = {
  product: {
    id: 0,
    name: '',
    blocked: false,
    quantMin: 0,
    categoryId: 0,
  } as ProductDTO,
};

const validationScheme = Yup.object().shape({
  name: Yup.string().trim().required('Campo obrigatório.'),
  blocked: Yup.boolean().required('Campo obrigatório.'),
  categoryId: Yup.number()
    .required('Campo obrigatório.')
    .typeError('Campo obrigatório.')
    .positive('Campo obrigatório.'),
});

class ProductForm extends Component<Props> {
  state = {
    ...initialValues,
  };

  componentDidMount = async () => {
    await this.props.loadCategory();
    if (typeof this.props.route.params != 'undefined') {
      const product: ProductDTO = this.props.route.params.product;
      product.categoryId = this.props.route.params.product.category.id;
      this.setState({ ...this.state, product });
    }
  };

  render() {
    return (
      <Formik
        initialValues={{ ...this.state.product }}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          try {
            if (values.id == 0) {
              await this.props.saveProduct(values);
            } else {
              await this.props.updateProduct(values);
            }

            this.props.navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [
                  {
                    name: 'ProductList',
                  },
                ],
              }),
            );
            resetForm();
            setSubmitting(false);
          } catch (err: any) {
            setSubmitting(false);
            this.props.setMessage('Erro', err.message);
          }
        }}
        validationSchema={validationScheme}
        enableReinitialize
      >
        {({
          handleChange,
          handleSubmit,
          values,
          errors,
          setFieldValue,
          setValues,
          touched,
          resetForm,
        }) => (
          <ScrollView>
            <View style={styles.container}>
              <Input
                label="id"
                value={values.id === 0 ? '' : values.id.toString()}
                onChangeText={handleChange('id')}
                error={touched.id ? errors.id : ''}
                disabled={true}
              />
              {this.props.category.length >= 1 && (
                <AutoComplete
                  label="Categoria"
                  items={this.props.category}
                  onChangeValue={(value: ValueType | ValueType[] | null) => {
                    if (values.categoryId != value) {
                      setFieldValue('categoryId', value);
                    }
                  }}
                  placeholder="Selecione uma categoria"
                  itemValue={values.categoryId}
                  error={touched.categoryId ? errors.categoryId : ''}
                />
              )}
              <Input
                label="Nome"
                value={values.name}
                onChangeText={handleChange('name')}
                error={touched.name ? errors.name : ''}
              />

              <Input
                label="Quantidade Minima"
                value={
                  values.quantMin === 0
                    ? ''
                    : values.quantMin.toString().replace('.', ',')
                }
                onChangeText={handleChange('quantMin')}
                keyboardType="numeric"
                error={touched.quantMin ? errors.quantMin : ''}
              />

              <CheckBox
                label="Bloqueado"
                status={values.blocked ? 'checked' : 'unchecked'}
                onPress={() => setFieldValue('blocked', !values.blocked)}
              />

              <View style={styles.viewButton}>
                <Button label="Enviar" onPress={handleSubmit} />

                <Button
                  label="Limpar"
                  onPress={() => {
                    setValues(initialValues.product);
                    resetForm();
                  }}
                  marginLeft={10}
                />
              </View>
            </View>
          </ScrollView>
        )}
      </Formik>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  input: {
    marginTop: 20,
    width: '90%',
  },
  button: {
    marginTop: 20,
    marginLeft: 5,
  },
  viewButton: {
    flexDirection: 'row',
    marginTop: 10,
  },
  viewBlocked: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    marginTop: 20,
  },
  fontBlocked: {
    fontSize: 18,
    color: '#747474',
  },
});

const mapStateToProps = ({ category }: any) => {
  return {
    category: category.category as Category[],
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    setMessage: (title: string, text: string) =>
      dispatch(setMessage({ title, text })),
    loadCategory: () => dispatch(LoadAllCategory()),
    loadProductDTO: (id: number) => dispatch(LoadAllProductDTO(id)),
    saveProduct: (product: ProductDTO) => dispatch(SaveProduct(product)),
    updateProduct: (product: ProductDTO) => dispatch(UpdateProduct(product)),
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
export default connector(ProductForm);
