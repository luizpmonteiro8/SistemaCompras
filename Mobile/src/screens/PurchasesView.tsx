/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { Component } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { TextInput, Text } from 'react-native-paper';
import formatMoney from './../app/util/MoneyFormat';
import totalFormat from './../app/util/TotalFormat';
import { itemPurchase, Purchases } from './../app/models/purchases';
import { Market } from './../app/models/market';

interface Props {
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
  purchases: {
    id: 0,
    market: { id: 0, name: '' } as Market,
    status: '',
    date: new Date(),
    total: 0,
    itemPurchaseList: [] as itemPurchase[],
  } as Purchases,
};

class PurchasesView extends Component<Props> {
  state = {
    ...initialValues,
  };

  componentDidMount = () => {
    if (typeof this.props.route.params?.purchases != 'undefined') {
      const purchases: Purchases = this.props.route.params.purchases;

      this.setState({
        ...this.state,
        purchases: purchases,
      });
    }
  };

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <TextInput
            mode="outlined"
            style={styles.input}
            label="Id"
            value={this.state.purchases.id.toString()}
            disabled={true}
          />

          <TextInput
            mode="outlined"
            style={styles.input}
            label="market"
            value={this.state.purchases.market.name}
            disabled={true}
          />

          <TextInput
            mode="outlined"
            style={styles.input}
            label="date"
            value={new Date(this.state.purchases.date).toLocaleDateString()}
            disabled={true}
          />

          <TextInput
            mode="outlined"
            style={styles.input}
            label="status"
            value={this.state.purchases.status}
            disabled={true}
          />
        </View>
        {this.state.purchases.itemPurchaseList.map((item, index) => {
          return (
            <View key={index} style={styles.viewPurchasesList}>
              <View style={styles.descriptionItemPurchases}>
                <Text>Id: {item.id}</Text>

                <Text>
                  Produto:
                  {item.stock.product.name}
                </Text>

                <Text>
                  Quantidade:
                  {' ' + item.quantity.toString().replace('.', ',')}
                </Text>
                <Text>Preço: {formatMoney(item.price)}</Text>
                <Text>Total: {totalFormat(item.price, item.quantity)}</Text>
                <Text>
                  {item.validaty?.toString() != 'Invalid Date' &&
                  item.validaty != null
                    ? 'Validade: ' +
                      new Date(item.validaty).toLocaleDateString()
                    : ''}
                </Text>
              </View>
              <Text
                style={{
                  height: 2,
                  borderBottomColor: '#91a3b0',
                  borderBottomWidth: 2,
                  width: '100%',
                  marginStart: 35,
                }}
              ></Text>
            </View>
          );
        })}
      </ScrollView>
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
  viewPurchasesList: {
    width: '90%',
    alignItems: 'center',
  },
  descriptionItemPurchases: { width: '90%' },
});

export default PurchasesView;
