/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { Component } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { FlatList, View } from 'react-native';
import { Text } from 'react-native-paper';
import { EntraceExit } from 'app/models/entraceexit';
import {
  DeleteEntraceExit,
  LoadAllEntraceExit,
} from '../store/actions/entraceexit';
import { setMessage } from '../store/actions/message';
import { CommonActions } from '@react-navigation/native';
import { DeleteModal } from '../components/deleteModal';
import { Button } from '../components/common/button/index';
import { Line } from '../components/common/line';
import { LoadAllProduct } from '../store/actions/product';
import { Product } from 'app/models/product';

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

class EntraceExitList extends Component<Props> {
  state = {
    dialogDeleteShow: false,
    entraceexitSelectDeleteId: 0,
  };

  componentDidMount = async () => {
    try {
      await this.props.loadAllProduct();
      await this.props.loadAllEntraceExit();
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
          title="Deletar entrada/saida"
          text={`Deseja deletar entrada/saida id: {this.state.entraceexitSelectDeleteId}?`}
          onPress={async () => {
            await this.props.deleteEntraceExit(
              this.state.entraceexitSelectDeleteId,
            );
            this.setState({ ...this.state, dialogDeleteShow: false });
          }}
        />

        {this.props.entraceexit.length >= 1 && this.props.product.length >= 1 && (
          <FlatList
            keyExtractor={(item) => String(item.id)}
            data={this.props.entraceexit}
            renderItem={({ item: entraceexit }) => {
              return (
                <>
                  <View style={{ flexDirection: 'row' }}>
                    <View style={{ width: '70%', marginLeft: 10 }}>
                      <Text>id: {entraceexit.id}</Text>
                      <Text>
                        Produto:
                        {this.props.product.map((item, index) => {
                          if (item.id == entraceexit.productId)
                            return <Text key={index}>{item.name}</Text>;
                        })}
                      </Text>
                      <Text>Quantidade: {entraceexit.quantity}</Text>
                      <Text>
                        Tipo: {entraceexit.type == 0 ? 'Entrada' : 'Saida'}
                      </Text>
                      <Text>
                        Status:
                        {entraceexit.status == true ? 'Ativo' : 'Desativado'}
                      </Text>
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
                                  name: 'EntraceExitForm',
                                  params: { entraceexit: entraceexit },
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
                            entraceexitSelectDeleteId: entraceexit.id,
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

const mapStateToProps = ({ entraceExit, product }: any) => {
  return {
    entraceexit: entraceExit.entraceExit as EntraceExit[],
    product: product.product as Product[],
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    setMessage: (title: string, text: string) =>
      dispatch(setMessage({ title, text })),
    loadAllEntraceExit: () => dispatch(LoadAllEntraceExit()),
    loadAllProduct: () => dispatch(LoadAllProduct()),
    deleteEntraceExit: (id: number) => dispatch(DeleteEntraceExit(id)),
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
export default connector(EntraceExitList);
