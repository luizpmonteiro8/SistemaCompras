/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { Component } from 'react';
import { Formik } from 'formik';
import { itemPurchaseDTO } from '../../../app/models/purchasesDTO';
import { Category } from '../../../app/models/category';
import { setMessage } from '../../../store/actions/message';
import { LoadAllCategory } from '../../../store/actions/category';
import { connect, ConnectedProps } from 'react-redux';
import { View, StyleSheet } from 'react-native';
import { Product } from '../../../app/models/product';
import { ValueType } from 'react-native-dropdown-picker';
import { AutoComplete } from '../../autoComplete/index';
import * as Yup from 'yup';
import { Input } from './../../common/input/index';
import { InputCalendar } from '../../datePicker';
import { Button } from '../../common/button/index';

interface Props extends PropsFromRedux {
  navigation?: {
    navigate: any;
    toggleDrawer: any;
    closeDrawer: any;
    openDrawer: any;
    dispatch: any;
  };
  route?: {
    params: any;
  };
  itemPurchasesSelected: itemPurchaseDTO;
  product: Product[];
  onSubmit: (item: itemPurchaseDTO, { resetForm, setSubmitting }: any) => void;
}

const validationScheme = Yup.object().shape({
  quantity: Yup.number()
    .required('Campo obrigatório.')
    .positive('Deve ser número positivo.')
    .typeError('Campo obrigatório.'),
  price: Yup.number()
    .required('Campo obrigatório.')
    .positive('Deve ser número positivo.')
    .typeError('Campo obrigatório.'),
  productId: Yup.number()
    .required('Campo obrigatório.')
    .typeError('Campo obrigatório.')
    .positive('Campo obrigatório.'),
});

class ItemPurchasesForm extends Component<Props> {
  state = {
    validatyDateModal: false,
    productFilter: [] as Product[],
  };

  componentDidMount = async () => {
    await this.props.loadAllCategory();
  };

  render() {
    return (
      <Formik
        initialValues={this.props.itemPurchasesSelected}
        onSubmit={this.props.onSubmit}
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
          resetForm,
          touched,
        }) => (
          <View style={styles.containerForm}>
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
                  const productSelected = this.props.product.filter((item) => {
                    return item.id == value;
                  })[0];
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

            <Input
              keyboardType="numeric"
              label="Preço"
              value={values.price === 0 ? '' : values.price.toString()}
              onChangeText={handleChange('price')}
              error={touched.price ? errors.price : ''}
            />

            <InputCalendar
              label="Validade"
              value={
                values.validaty?.toDateString() !== 'Invalid Date' &&
                values.validaty != null
                  ? new Date(values.validaty).toLocaleDateString()
                  : ''
              }
              date={new Date()}
              onConfirm={(date: any) => {
                this.setState({
                  ...this.state,
                  validatyDateModal: false,
                });
                setFieldValue('validaty', date);
              }}
            />

            <View style={styles.viewButton}>
              <Button
                label={values.id > 0 ? 'Editar produto' : 'Adicionar produto'}
                onPress={handleSubmit}
                disabled={isSubmitting}
              />

              {values.id > 0 && (
                <Button
                  label=" Limpar"
                  onPress={() => {
                    resetForm();
                  }}
                  disabled={isSubmitting}
                  marginLeft={10}
                />
              )}
            </View>
          </View>
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
  containerForm: {
    width: '100%',
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
    marginTop: 20,
    marginBottom: 20,
  },
  viewCalendar: {
    flexDirection: 'row',
    width: '90%',
    alignItems: 'center',
  },
  buttonCalendar: {
    marginTop: 20,
    marginStart: 10,
  },
  viewValidaty: {
    flexDirection: 'row',
    width: '90%',
    alignItems: 'center',
  },
  viewPurchasesList: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  descriptionItemPurchases: { width: '80%' },
});

const equals = (a: any, b: any) =>
  a.length === b.length && a.every((v: any, i: any) => v === b[i]);

const mapStateToProps = ({ category }: any) => {
  return {
    category: category.category as Category[],
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    setMessage: (title: string, text: string) =>
      dispatch(setMessage({ title, text })),
    loadAllCategory: () => dispatch(LoadAllCategory()),
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
export default connector(ItemPurchasesForm);
