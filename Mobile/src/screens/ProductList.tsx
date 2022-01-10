/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { Component } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Product } from '../app/models/product';
import { FlatList, View } from 'react-native';
import { LoadAllProduct } from './../store/actions/product';
import { DeleteProduct } from './../store/actions/product';
import { Text } from 'react-native-paper';
import { CommonActions } from '@react-navigation/native';
import { setMessage } from './../store/actions/message';
import { Line } from './../components/common/line';
import { DeleteModal } from './../components/deleteModal';
import { Button } from './../components/common/button/index';

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

class ProductList extends Component<Props> {
  state = {
    dialogDeleteShow: false,
    productSelectDeleteName: '',
    productSelectDeleteId: 0,
  };

  componentDidMount = async () => {
    try {
      await this.props.loadAllProduct();
    } catch (err: any) {
      this.props.setMessage('Erro', err.message);
    }
  };

  render() {
    return (
      <View>
        <DeleteModal
          visible={this.state.dialogDeleteShow}
          onDismiss={() => {
            this.setState({ ...this.state, dialogDeleteShow: false });
          }}
          title="Deletar produto"
          text={` Deseja deletar produto ${this.state.productSelectDeleteName}?`}
          onPress={async () => {
            try {
              await this.props.deleteProduct(this.state.productSelectDeleteId);
              this.setState({ ...this.state, dialogDeleteShow: false });
            } catch (err: any) {
              this.props.setMessage('Erro', err.message);
            }
          }}
        />

        {this.props.product.length >= 1 && (
          <FlatList
            keyExtractor={(item) => String(item.id)}
            data={this.props.product}
            renderItem={({ item: product }) => {
              return (
                <>
                  <View style={{ flexDirection: 'row' }}>
                    <View style={{ width: '70%', marginLeft: 10 }}>
                      <Text>id: {product.id}</Text>
                      <Text>Categoria: {product.category.name}</Text>
                      <Text>Nome: {product.name}</Text>
                      <Text>
                        Quant. min.:
                        {' ' + product.quantMin.toString().replace('.', ',')}
                      </Text>
                      <Text>Bloqueado: {product.blocked ? 'Sim' : 'Não'}</Text>
                    </View>
                    <View style={{ justifyContent: 'center' }}>
                      <Button
                        label="Alterar"
                        onPress={() => {
                          this.props.navigation.dispatch(
                            CommonActions.reset({
                              index: 0,
                              routes: [
                                {
                                  name: 'ProductForm',
                                  params: { product: product },
                                },
                              ],
                            }),
                          );
                        }}
                        marginTop={10}
                      />

                      <Button
                        label="Deletar"
                        onPress={() => {
                          this.setState({
                            ...this.state,
                            dialogDeleteShow: true,
                            productSelectDeleteName: product.name,
                            productSelectDeleteId: product.id,
                          });
                        }}
                        marginTop={10}
                        marginBottom={10}
                      />
                    </View>
                  </View>
                  <Line />
                </>
              );
            }}
          />
        )}
      </View>
    );
  }
}

const mapStateToProps = ({ product }: any) => {
  return {
    product: product.product as Product[],
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    setMessage: (title: string, text: string) =>
      dispatch(setMessage({ title, text })),
    loadAllProduct: () => dispatch(LoadAllProduct()),
    deleteProduct: (id: number) => dispatch(DeleteProduct(id)),
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
export default connector(ProductList);
