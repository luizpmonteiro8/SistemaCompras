/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { Component } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { FlatList, View } from 'react-native';
import { Text } from 'react-native-paper';
import { Category } from 'app/models/category';
import { DeleteCategory, LoadAllCategory } from '../store/actions/category';
import { setMessage } from '../store/actions/message';
import { CommonActions } from '@react-navigation/native';
import { DeleteModal } from '../components/deleteModal';
import { Line } from '../components/common/line';
import { Button } from '../components/common/button/index';

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

class CategoryList extends Component<Props> {
  state = {
    dialogDeleteShow: false,
    categorySelectDeleteName: '',
    categorySelectDeleteId: 0,
  };

  componentDidMount = () => {
    try {
      this.props.loadAllCategory();
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
          title="Deletar categoria"
          text={`Deseja deletar categoria ${this.state.categorySelectDeleteName}?`}
          onPress={async () => {
            try {
              await this.props.deleteCategory(
                this.state.categorySelectDeleteId,
              );
              this.setState({ ...this.state, dialogDeleteShow: false });
            } catch (err: any) {
              this.props.setMessage('Erro', err.message);
            }
          }}
        />

        {this.props.category.length >= 1 && (
          <FlatList
            keyExtractor={(item) => String(item.id)}
            data={this.props.category}
            renderItem={({ item: category }) => {
              return (
                <>
                  <View style={{ flexDirection: 'row' }}>
                    <View style={{ width: '70%', marginLeft: 10 }}>
                      <Text>id: {category.id}</Text>
                      <Text>Categoria: {category.name}</Text>
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
                                  name: 'CateforyForm',
                                  params: { category: category },
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
                            categorySelectDeleteName: category.name,
                            categorySelectDeleteId: category.id,
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

const mapStateToProps = ({ category, user }: any) => {
  return {
    category: category.category as Category[],
    user: user,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    setMessage: (title: string, text: string) =>
      dispatch(setMessage({ title, text })),
    loadAllCategory: () => dispatch(LoadAllCategory()),
    deleteCategory: (id: number) => dispatch(DeleteCategory(id)),
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
export default connector(CategoryList);
