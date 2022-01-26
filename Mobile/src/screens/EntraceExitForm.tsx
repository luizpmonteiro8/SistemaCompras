/* eslint-disable @typescript-eslint/no-explicit-any */
import { EntraceExit } from 'app/models/entraceexit';
import { Formik } from 'formik';
import React, { Component } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { connect, ConnectedProps } from 'react-redux';
import { setMessage } from '../store/actions/message';
import {
  SaveEntraceExit,
  UpdateEntraceExit,
} from '../store/actions/entraceexit';
import { LoadAllCategory } from '../store/actions/category';
import { LoadAllProduct } from '../store/actions/product';
import { Product } from '../app/models/product';
import { Category } from '../app/models/category';
import { AutoComplete } from './../components/autoComplete/index';
import { ValueType } from 'react-native-dropdown-picker';
import { Input } from './../components/common/input/index';
import { Button } from './../components/common/button/index';
import * as Yup from 'yup';

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
  entraceexit: { id: 0, quantity: 0, productId: 0, type: 1 } as EntraceExit,
};

const validationScheme = Yup.object().shape({
  productId: Yup.number()
    .required('Campo obrigatório.')
    .typeError('Campo obrigatório.')
    .positive('Campo obrigatório.'),
  quantity: Yup.number()
    .required('Campo obrigatório.')
    .typeError('Campo obrigatório.')
    .positive('Campo obrigatório.'),
  type: Yup.number()
    .required('Campo obrigatório.')
    .typeError('Campo obrigatório.'),
});

class EntraceExitForm extends Component<Props> {
  state = {
    ...initialValues,
    productFilter: [] as Product[],
  };

  componentDidMount = () => {
    this.props.loadAllCategory();
    this.props.loadAllProduct();

    if (typeof this.props.route.params != 'undefined') {
      const entraceexit = this.props.route.params.entraceexit;
      this.setState({ ...this.state, entraceexit });
    }
  };

  render() {
    return (
      <Formik
        initialValues={{ ...this.state.entraceexit }}
        onSubmit={async (values, { setSubmitting }) => {
          if (values.id == 0) {
            if (await this.props.saveEntraceExit(values)) {
              this.props.navigation.navigate('EntraceExitList');
            }
          } else {
            if (await this.props.updateEntraceExit(values)) {
              this.props.navigation.navigate('EntraceExitList');
            }
          }
          setSubmitting(false);
        }}
        validationSchema={validationScheme}
        enableReinitialize
      >
        {({
          handleChange,
          handleSubmit,
          values,
          errors,
          isSubmitting,
          setFieldValue,
          touched,
          resetForm,
        }) => (
          <ScrollView contentContainerStyle={{ flex: 1 }}>
            <View style={styles.container}>
              <Input
                label="Id"
                value={values.id === 0 ? '' : values.id.toString()}
                onChangeText={handleChange('id')}
                error={touched.id ? errors.id : ''}
                disabled={true}
              />

              <AutoComplete
                label="Tipo"
                items={[
                  { id: 0, name: 'Entrada' },
                  { id: 1, name: 'Saida' },
                ]}
                onChangeValue={(value: ValueType | ValueType[] | null) => {
                  if (values.type != value) {
                    setFieldValue('type', value);
                  }
                }}
                placeholder="Selecione o tipo"
                itemValue={values.type}
                error={touched.type ? errors.type : ''}
              />

              {this.props.category.length >= 1 && (
                <AutoComplete
                  label="Categoria"
                  items={this.props.category}
                  onChangeValue={(value: ValueType | ValueType[] | null) => {
                    const productFilter: Product[] = this.props.product.filter(
                      (item) => {
                        return item.category.id === value;
                      },
                    );
                    if (
                      !!value &&
                      !equals(this.state.productFilter, productFilter)
                    ) {
                      this.setState({ ...this.state, productFilter });
                    }
                  }}
                  placeholder="Selecione uma categoria"
                />
              )}
              {this.props.product.length >= 1 && (
                <AutoComplete
                  label="Produtos"
                  items={
                    this.state.productFilter.length >= 1
                      ? this.state.productFilter
                      : this.props.product
                  }
                  itemValue={values.productId}
                  onChangeValue={(value: ValueType | ValueType[] | null) => {
                    const productSelected = this.props.product.filter(
                      (item) => {
                        return item.id == value;
                      },
                    )[0];
                    if (!!value && values.productId !== productSelected?.id) {
                      setFieldValue('productId', value);
                    }
                  }}
                  placeholder="Selecione um produto"
                  error={touched.productId ? errors.productId : ''}
                />
              )}

              <Input
                keyboardType="numeric"
                label="Quantidade"
                value={values.quantity === 0 ? '' : values.quantity.toString()}
                onChangeText={handleChange('quantity')}
                error={touched.quantity ? errors.quantity : ''}
              />

              <View style={styles.viewButton}>
                <Button
                  label="Enviar"
                  onPress={handleSubmit}
                  disabled={isSubmitting}
                />

                <Button
                  label="Limpar"
                  onPress={() => {
                    this.setState({ ...this.state, ...initialValues });
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
  viewButton: {
    flexDirection: 'row',
    marginTop: 20,
  },
});

const equals = (a: any, b: any) =>
  a.length === b.length && a.every((v: any, i: any) => v === b[i]);

const mapStateToProps = ({ product, category }: any) => {
  return {
    product: product.product as Product[],
    category: category.category as Category[],
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    setMessage: (title: string, text: string) =>
      dispatch(setMessage({ title, text })),
    saveEntraceExit: (entraceexit: EntraceExit) =>
      dispatch(SaveEntraceExit(entraceexit)),
    updateEntraceExit: (entraceexit: EntraceExit) =>
      dispatch(UpdateEntraceExit(entraceexit)),
    loadAllCategory: () => dispatch(LoadAllCategory()),
    loadAllProduct: () => dispatch(LoadAllProduct()),
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
export default connector(EntraceExitForm);
