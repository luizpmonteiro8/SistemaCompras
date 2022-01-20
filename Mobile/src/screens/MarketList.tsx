/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { Component } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { FlatList, View } from 'react-native';
import { Text } from 'react-native-paper';
import { Market } from 'app/models/market';
import { DeleteMarket, LoadAllMarket } from '../store/actions/market';
import { setMessage } from '../store/actions/message';
import { CommonActions } from '@react-navigation/native';
import { DeleteModal } from './../components/deleteModal';
import { Line } from './../components/common/line';
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

class MarketList extends Component<Props> {
  state = {
    dialogDeleteShow: false,
    marketSelectDeleteName: '',
    marketSelectDeleteId: 0,
  };

  componentDidMount = () => {
    try {
      this.props.loadAllMarket();
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
          title="Deletar mercado"
          text={` Deseja deletar categoria ${this.state.marketSelectDeleteName}?`}
          onPress={async () => {
            try {
              await this.props.deleteMarket(this.state.marketSelectDeleteId);
              this.setState({ ...this.state, dialogDeleteShow: false });
            } catch (err: any) {
              this.props.setMessage('Erro', err.message);
            }
          }}
        />

        {this.props.market.length >= 1 && (
          <FlatList
            keyExtractor={(item) => String(item.id)}
            data={this.props.market}
            renderItem={({ item: market }) => {
              return (
                <>
                  <View style={{ flexDirection: 'row' }}>
                    <View style={{ width: '70%', marginLeft: 10 }}>
                      <Text>id: {market.id}</Text>
                      <Text>Mercado: {market.name}</Text>
                      {market.cnpj ? <Text>Cnpj: {market.cnpj}</Text> : null}
                      <Text>Bloqueado: {market.blocked ? 'Sim' : 'Não'}</Text>
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
                                  name: 'MarketForm',
                                  params: { market: market },
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
                            marketSelectDeleteName: market.name,
                            marketSelectDeleteId: market.id,
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

const mapStateToProps = ({ market, user }: any) => {
  return {
    market: market.market as Market[],
    user: user,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    setMessage: (title: string, text: string) =>
      dispatch(setMessage({ title, text })),
    loadAllMarket: () => dispatch(LoadAllMarket()),
    deleteMarket: (id: number) => dispatch(DeleteMarket(id)),
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
export default connector(MarketList);
