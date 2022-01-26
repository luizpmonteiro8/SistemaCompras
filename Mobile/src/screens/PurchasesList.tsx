/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { Component } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Purchases } from '../app/models/purchases';
import { FlatList, View } from 'react-native';
import { LoadAllPurchases } from '../store/actions/purchases';
import { DeletePurchases } from '../store/actions/purchases';
import { Text } from 'react-native-paper';
import { CommonActions } from '@react-navigation/native';
import formatMoney from './../app/util/MoneyFormat';
import { DeleteModal } from './../components/deleteModal';
import { setMessage } from './../store/actions/message';
import { Button } from '../components/common/button';
import { Line } from '../components/common/line';

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

class PurchasesList extends Component<Props> {
  state = { dialogDeleteShow: false, purchasesSelectDeleteId: 0 };

  componentDidMount = async () => {
    try {
      await this.props.loadAllPurchases();
    } catch (err) {
      null;
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
          title="Deletar compra"
          text={` Deseja deletar compra ${this.state.purchasesSelectDeleteId}?`}
          onPress={async () => {
            await this.props.deletePurchases(
              this.state.purchasesSelectDeleteId,
            );
            this.setState({ ...this.state, dialogDeleteShow: false });
          }}
        />
        {this.props.purchases.length >= 1 && (
          <FlatList
            keyExtractor={(item) => String(item.id)}
            data={this.props.purchases}
            renderItem={({ item: purchases }) => {
              return (
                <>
                  <View style={{ flexDirection: 'row' }}>
                    <View style={{ width: '65%', marginLeft: 10 }}>
                      <Text>Id: {purchases.id}</Text>
                      <Text>
                        Data:
                        {new Date(purchases.date).toLocaleDateString()}
                      </Text>
                      <Text>Mercado: {purchases.market?.name}</Text>
                      <Text>Status: {purchases.status}</Text>
                      <Text>Total: {formatMoney(purchases.total || 0)}</Text>
                    </View>
                    <View style={{ justifyContent: 'center' }}>
                      <Button
                        label={
                          purchases.status == 'Entregue'
                            ? 'Visualizar'
                            : 'Alterar'
                        }
                        onPress={() => {
                          this.props.navigation.dispatch(
                            CommonActions.reset({
                              index: 0,
                              routes: [
                                {
                                  name:
                                    purchases.status == 'Entregue'
                                      ? 'PurchasesView'
                                      : 'PurchasesForm',
                                  params: { purchases: purchases },
                                },
                              ],
                            }),
                          );
                        }}
                      />

                      <Button
                        label="Deletar"
                        onPress={() => {
                          this.setState({
                            ...this.state,
                            dialogDeleteShow: true,
                            purchasesSelectDeleteId: purchases.id,
                          });
                        }}
                        marginTop={10}
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

const mapStateToProps = ({ purchases }: any) => {
  return {
    purchases: purchases.purchases as Purchases[],
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    setMessage: (title: string, text: string) =>
      dispatch(setMessage({ title, text })),
    loadAllPurchases: () => dispatch(LoadAllPurchases()),
    deletePurchases: (id: number) => dispatch(DeletePurchases(id)),
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
export default connector(PurchasesList);
