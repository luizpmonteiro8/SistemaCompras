/* eslint-disable @typescript-eslint/no-explicit-any */
import { PurchasesDTO, itemPurchaseDTO } from '../app/models/purchasesDTO';
import { Formik } from 'formik';
import React, { Component } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, DefaultTheme } from 'react-native-paper';
import { connect, ConnectedProps } from 'react-redux';
import { setMessage } from '../store/actions/message';
import { SavePurchases, UpdatePurchases } from '../store/actions/purchases';
import { Market } from '../app/models/market';
import { LoadAllMarket } from '../store/actions/market';
import { LoadAllProduct } from '../store/actions/product';
import { AutoComplete } from './../components/autoComplete/index';
import { ValueType } from 'react-native-dropdown-picker';
import { Product } from '../app/models/product';
import formatMoney from './../app/util/MoneyFormat';
import totalFormat from './../app/util/TotalFormat';
import Icon from 'react-native-vector-icons/AntDesign';
import { Purchases } from 'app/models/purchases';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions } from '@react-navigation/native';
import ItemPurchasesForm from './../components/form/ItemPurchasesForm';
import * as Yup from 'yup';
import { Input } from './../components/common/input/index';
import { InputCalendar } from './../components/datePicker';
import { Button } from './../components/common/button/index';
import { Line } from './../components/common/line';

interface Props extends PropsFromRedux {
  navigation: {
    navigate: any;
    toggleDrawer: any;
    closeDrawer: any;
    openDrawer: any;
    dispatch: any;
    setOptions: any;
  };
  route: {
    params: any;
  };
}

const initialValues = {
  purchases: {
    id: 0,
    marketId: 0,
    status: 'Em rota',
    date: new Date(),
    itemPurchaseDTOList: [] as itemPurchaseDTO[],
  } as PurchasesDTO,
};

const initialValuesItem = {
  itemPurchases: {
    id: 0,
    quantity: 0,
    validaty: new Date(''),
    price: 0,
    productId: 0,
  } as itemPurchaseDTO,
};

const validationScheme = Yup.object().shape({
  marketId: Yup.number()
    .required('Campo obrigatório.')
    .typeError('Campo obrigatório.')
    .positive('Campo obrigatório.'),
  date: Yup.date()
    .required('Campo obrigatório.')
    .typeError('Campo obrigatório.'),
});

class PurchasesForm extends Component<Props> {
  state = {
    dateModal: false,
    itemPurchasesSelected: initialValuesItem.itemPurchases,
    ...initialValues,
  };

  componentDidMount = async () => {
    await this.props.loadAllMarket();
    await this.props.loadAllProduct();

    if (typeof this.props.route.params?.purchases != 'undefined') {
      const purchases: Purchases = this.props.route.params.purchases;
      const purchasesDto = purchasesToPurchasesDTO(purchases);
      if (this.state.purchases.id != purchasesDto.id) {
        this.setState({
          ...this.state,
          purchases: purchasesDto,
        });
      }
      this.props.navigation.setOptions({
        title: `Alteração de compra`,
      });
    } else {
      const newListStorage =
        (await AsyncStorage.getItem('PurchasesList')) || '';
      this.setState({
        ...this.state,
        purchases: {
          ...initialValues.purchases,
          itemPurchaseDTOList: newListStorage ? JSON.parse(newListStorage) : [],
        },
      });
    }
  };

  render() {
    return (
      <Formik
        initialValues={{ ...this.state.purchases }}
        onSubmit={async (values, { setSubmitting }) => {
          if (values.status == 'Em rota') values.status = '1';
          if (values.status == 'Entregue') values.status = '2';

          if (values.id == 0) {
            if (await this.props.savePurchases(values)) {
              await AsyncStorage.removeItem('PurchasesList');
              this.props.navigation.navigate('PurchasesList');
            }
          } else {
            if (await this.props.updatePurchases(values)) {
              this.props.navigation.navigate('PurchasesList');
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
          setValues,
          setFieldValue,
          touched,
        }) => (
          <ScrollView>
            <View style={styles.container}>
              <Input
                label="Id"
                value={values.id === 0 ? '' : values.id.toString()}
                onChangeText={handleChange('id')}
                error={touched.id ? errors.id : ''}
                disabled={true}
              />

              {this.props.market.length >= 1 && (
                <AutoComplete
                  label="Mercado"
                  items={this.props.market}
                  onChangeValue={(value: ValueType | ValueType[] | null) => {
                    if (values.marketId != value) {
                      setFieldValue('marketId', value);
                    }
                  }}
                  placeholder="Selecione um mercado"
                  itemValue={values.marketId}
                  error={touched.marketId ? errors.marketId : ''}
                />
              )}

              <InputCalendar
                label="Data da compra"
                value={new Date(values.date).toLocaleDateString()}
                date={new Date()}
                onConfirm={(date) => {
                  this.setState({ ...this.state, dateModal: false });
                  setFieldValue('date', date);
                }}
              />

              <AutoComplete
                label="Status"
                items={[
                  { id: 1, name: 'Em rota' },
                  { id: 2, name: 'Entregue' },
                ]}
                onChangeValue={(value: ValueType | ValueType[] | null) => {
                  if (values.status != value) {
                    const valueStatus = value == 1 ? 'Em rota' : 'Entregue';
                    if (values.status != valueStatus) {
                      setFieldValue('status', valueStatus);
                    }
                  }
                }}
                placeholder="Selecione o status"
                itemValue={
                  values.status == 'Em rota'
                    ? 1
                    : values.status == 'Entregue'
                    ? 2
                    : 0
                }
                searchable={false}
              />
              <Line />
              <ItemPurchasesForm
                product={this.props.product}
                itemPurchasesSelected={this.state.itemPurchasesSelected}
                onSubmit={async (
                  itemPurchasesDTO: itemPurchaseDTO,
                  { resetForm, setSubmitting }: any,
                ) => {
                  let newItemPurchasesList =
                    this.state.purchases.itemPurchaseDTOList;
                  if (itemPurchasesDTO.id == 0) {
                    if (newItemPurchasesList.length >= 1) {
                      itemPurchasesDTO.id =
                        newItemPurchasesList[newItemPurchasesList.length - 1]
                          .id + 1;
                    } else {
                      itemPurchasesDTO.id = 1;
                    }
                    newItemPurchasesList =
                      newItemPurchasesList.concat(itemPurchasesDTO);
                  } else {
                    //remove item AsyncStorage
                    newItemPurchasesList = newItemPurchasesList.map((item) => {
                      if (item.id == itemPurchasesDTO.id) {
                        item = itemPurchasesDTO;
                      }
                      return item;
                    });
                  }
                  this.setState({
                    ...this.state,
                    purchases: {
                      ...this.state.purchases,
                      itemPurchaseDTOList: newItemPurchasesList,
                    },
                    itemPurchasesSelected: initialValuesItem.itemPurchases,
                  });
                  setFieldValue(
                    'itemPurchaseDTOList',
                    this.state.purchases.itemPurchaseDTOList,
                  );
                  if (this.state.purchases.id == 0) {
                    try {
                      await AsyncStorage.setItem(
                        'PurchasesList',
                        JSON.stringify(
                          this.state.purchases.itemPurchaseDTOList,
                        ),
                      );
                    } catch (err) {
                      null;
                    }
                  }
                  resetForm();
                  setSubmitting(false);
                }}
              />

              {this.state.purchases.itemPurchaseDTOList.map((item, index) => {
                return (
                  <View key={index}>
                    <View style={styles.viewPurchasesList}>
                      <View style={styles.descriptionItemPurchases}>
                        <Text>Id: {item.id}</Text>
                        {!!this.props.product && (
                          <Text>
                            Produto:
                            {item.productId != 0
                              ? this.props.product.filter((product) => {
                                  return product.id == item.productId;
                                })[0].name
                              : ''}
                          </Text>
                        )}
                        <Text>
                          Quantidade:
                          {' ' + item.quantity.toString().replace('.', ',')}
                        </Text>
                        <Text>Preço: {formatMoney(item.price)}</Text>
                        <Text>
                          Total: {totalFormat(item.price, item.quantity)}
                        </Text>
                        <Text>
                          {item.validaty?.toString() != 'Invalid Date' &&
                          item.validaty != null
                            ? 'Validade: ' +
                              new Date(item.validaty).toLocaleDateString()
                            : ''}
                        </Text>
                      </View>

                      <View style={styles.viewButton}>
                        <Icon
                          name="edit"
                          size={30}
                          color={DefaultTheme.colors.primary}
                          onPress={() => {
                            if (
                              this.state.itemPurchasesSelected.id != item.id
                            ) {
                              this.setState({
                                ...this.state,
                                itemPurchasesSelected: item,
                              });
                            }
                          }}
                        />
                        <Icon
                          name="delete"
                          size={30}
                          style={styles.buttonDelete}
                          color={DefaultTheme.colors.primary}
                          onPress={() => {
                            let newItemPurchasesList =
                              this.state.purchases.itemPurchaseDTOList;
                            newItemPurchasesList = newItemPurchasesList.filter(
                              (itemPurchases) => {
                                return itemPurchases.id != item.id;
                              },
                            );
                            this.setState({
                              ...this.state,
                              purchases: {
                                ...this.state.purchases,
                                itemPurchaseDTOList: newItemPurchasesList,
                              },
                            });
                            setFieldValue(
                              'itemPurchaseDTOList',
                              this.state.purchases.itemPurchaseDTOList,
                            );
                            if (values.id == 0) {
                              AsyncStorage.setItem(
                                'PurchasesList',
                                JSON.stringify(newItemPurchasesList),
                              );
                            }
                          }}
                        />
                      </View>
                    </View>
                    <Line />
                  </View>
                );
              })}

              <View style={styles.viewButton}>
                <Button
                  label="Enviar"
                  onPress={handleSubmit}
                  disabled={isSubmitting}
                />

                <Button
                  label=" Limpar"
                  onPress={() => {
                    setValues(initialValues.purchases);
                    AsyncStorage.removeItem('PurchasesList');
                    this.setState({
                      ...this.state,
                      ...initialValues,
                      ...initialValuesItem,
                    });
                    this.props.navigation.dispatch(
                      CommonActions.reset({
                        index: 0,
                        routes: [
                          {
                            name: 'PurchasesForm',
                          },
                        ],
                      }),
                    );
                  }}
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
  containerForm: {
    width: '100%',
    alignItems: 'center',
  },
  viewButton: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  viewPurchasesList: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  descriptionItemPurchases: { width: '80%' },
  buttonDelete: { marginLeft: 20 },
});

const purchasesToPurchasesDTO = (purchases: Purchases) => {
  const newItemList = [] as itemPurchaseDTO[];
  purchases.itemPurchaseList.forEach((item) => {
    const itemPurchasesDTO: itemPurchaseDTO = {
      id: item.id,
      quantity: item.quantity,
      validaty: item.validaty,
      price: item.price,
      productId: item.stock.product.id,
    };
    newItemList.push(itemPurchasesDTO);
  });

  const purchasesDto: PurchasesDTO = {
    id: purchases.id,
    marketId: purchases.market.id,
    date: purchases.date,
    status: purchases.status,
    itemPurchaseDTOList: newItemList,
  };
  return purchasesDto;
};

const mapStateToProps = ({ market, product }: any) => {
  return {
    market: market.market as Market[],
    product: product.product as Product[],
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    setMessage: (title: string, text: string) =>
      dispatch(setMessage({ title, text })),
    loadAllMarket: () => dispatch(LoadAllMarket()),
    loadAllProduct: () => dispatch(LoadAllProduct()),
    savePurchases: (purchases: PurchasesDTO) =>
      dispatch(SavePurchases(purchases)),
    updatePurchases: (purchases: PurchasesDTO) =>
      dispatch(UpdatePurchases(purchases)),
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
export default connector(PurchasesForm);
