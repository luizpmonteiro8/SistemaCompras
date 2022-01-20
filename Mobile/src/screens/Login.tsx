/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Login as Logar } from '../store/actions/user';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { User } from '../app/models/user';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Props extends PropsFromRedux {
  navigation: any;
}

class Login extends Component<Props> {
  state = {
    id: 0,
    name: '',
    email: 'luizpmonteiro8@hotmail.com',
    password: '1234',
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
        <TextInput
          placeholder="Email"
          style={styles.input}
          keyboardType="email-address"
          value={this.state.email}
          onChangeText={(email) => this.setState({ email })}
        />
        <TextInput
          placeholder="Senha"
          style={styles.input}
          secureTextEntry={true}
          value={this.state.password}
          onChangeText={(password) => this.setState({ password })}
        />
        <TouchableOpacity onPress={this.login} style={styles.buttom}>
          <Text style={styles.buttomText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('Register');
          }}
          style={styles.buttom}
        >
          <Text style={styles.buttomText}>Criar nova conta...</Text>
        </TouchableOpacity>
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
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Login);
