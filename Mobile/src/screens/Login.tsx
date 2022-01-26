/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Login as Logar } from '../store/actions/user';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { User } from '../app/models/user';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Input } from './../components/common/input/index';
import { useUserService } from '../app/services';
import { setMessage } from '../store/actions/message';
import { Dialog, Paragraph, Portal } from 'react-native-paper';
import { Button } from '../components/common/button';

interface Props extends PropsFromRedux {
  navigation: any;
}

class Login extends Component<Props> {
  state = {
    id: 0,
    name: '',
    email: 'teste@teste.com.br',
    password: '12345678',
    service: useUserService(),
    visibleModal: false,
  };

  componentDidUpdate = async () => {
    if (this.props.user.token != null) {
      await AsyncStorage.setItem('token', this.props.user.token);
      await AsyncStorage.setItem('name', this.props.user.name);
      this.props.navigation.navigate('Home');
    }
  };

  login = () => {
    this.props.onLogin({ ...this.state });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.textTitle}>Sistema compras</Text>
        <Input
          keyboardType="email-address"
          label="Email"
          value={this.state.email}
          onChangeText={(email) => this.setState({ email })}
        />
        <Input
          keyboardType="default"
          label="Senha"
          value={this.state.password}
          onChangeText={(password) => this.setState({ password })}
          secureTextEntry={true}
        />

        <View style={styles.viewButton}>
          <TouchableOpacity onPress={this.login} style={styles.buttom}>
            <Text style={styles.buttomText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('Register');
            }}
            style={styles.buttom}
          >
            <Text style={styles.buttomText}>Cadastrar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.setState({ ...this.state, visibleModal: true })}
            style={styles.buttom}
          >
            <Text style={styles.buttomText}>Recuperar senha</Text>
          </TouchableOpacity>
        </View>
        <Portal>
          <Dialog
            visible={this.state.visibleModal}
            onDismiss={() =>
              this.setState({ ...this.state, visibleModal: false })
            }
          >
            <Dialog.Title>Recuperar senha</Dialog.Title>
            <Dialog.Content>
              <Paragraph>
                Deseja recuperar senha para o email:{this.state.email} ?
              </Paragraph>
            </Dialog.Content>
            <Dialog.Actions>
              <Button
                label="Ok"
                onPress={async () => {
                  this.setState({ ...this.state, visibleModal: false });
                  await this.state.service
                    .forgotPassword({ email: this.state.email })
                    .then(() =>
                      this.props.setMessage(
                        'Recuperar senha',
                        'Nova senha enviado por email!',
                      ),
                    )
                    .catch((err) => {
                      this.props.setMessage('Erro', err.response.data.message);
                    });
                }}
              />
              <Button
                label="Cancelar"
                onPress={() =>
                  this.setState({ ...this.state, visibleModal: false })
                }
                marginLeft={10}
              />
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttom: {
    marginTop: 30,
    padding: 10,
    backgroundColor: '#4286f4',
    marginEnd: 10,
  },
  buttomText: {
    fontSize: 20,
    color: '#FFF',
  },
  input: {
    marginTop: 20,
    width: '90%',
    backgroundColor: '#EEE',
    height: 40,
    borderWidth: 1,
    borderColor: '#333',
  },
  textTitle: {
    fontSize: 20,
  },
  viewButton: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

type State = {
  user: {
    name: string;
    email: string;
    isLoading: boolean;
    token: string;
    exp: Date;
  };
};

const mapStateToProps = ({ user }: State) => {
  return {
    user: user,
    isLoading: user.isLoading,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onLogin: (user: User) => dispatch(Logar(user)),
    setMessage: (title: string, text: string) =>
      dispatch(setMessage({ title, text })),
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Login);
