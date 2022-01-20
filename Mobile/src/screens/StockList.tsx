/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { Component } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Stock } from '../app/models/stock';
import { FlatList, View } from 'react-native';
import { LoadAllStock } from '../store/actions/stock';
import { Button, Text } from 'react-native-paper';

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

class StockList extends Component<Props> {
  state = {};

  componentDidMount = () => {
    try {
      this.props.loadAllStock();
    } catch (err) {
      console.log('erro', err);
    }
  };

  render() {
    return (
      <View>
        {this.props.stock.length >= 1 && (
          <FlatList
            keyExtractor={(item) => String(item.id)}
            data={this.props.stock}
            renderItem={({ item: stock }) => {
              return (
                <>
                  <View style={{ flexDirection: 'row' }}>
                    <View style={{ width: '70%', marginLeft: 10 }}>
                      <Text>Id: {stock.id}</Text>
                      <Text>Produto:{stock.product.name}</Text>
                      <Text>
                        Quantidade:{' '}
                        {stock.quantity.toString().replace('.', ',')}
                      </Text>
                    </View>
                  </View>
                  <Text
                    style={{
                      height: 1,
                      borderBottomColor: '#91a3b0',
                      borderBottomWidth: 1,
                    }}
                  ></Text>
                </>
              );
            }}
          />
        )}

        <Button
          mode="contained"
          onPress={() => {
            this.props.loadAllStock();
          }}
          style={{
            marginTop: 20,
            marginLeft: 5,
            width: 150,
            alignSelf: 'center',
          }}
        >
          Atualizar
        </Button>
      </View>
    );
  }
}

const mapStateToProps = ({ stock }: any) => {
  return {
    stock: stock.stock as Stock[],
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    loadAllStock: () => dispatch(LoadAllStock()),
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
export default connector(StockList);
