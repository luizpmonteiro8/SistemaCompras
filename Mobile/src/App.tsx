/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { Component } from 'react';
import { Alert } from 'react-native';
import { connect, ConnectedProps } from 'react-redux';
import NavigatorMenu from './Navigator';
import { setMessage } from './store/actions/message';

class App extends Component<PropsFromRedux> {
  componentDidUpdate = () => {
    if (this.props.text && this.props.text.toString().trim()) {
      Alert.alert(this.props.title || 'Mensagem', this.props.text.toString());
      this.props.clearMessage();
    }
  };

  render() {
    return <NavigatorMenu />;
  }
}

type Message = {
  message: {
    title: string;
    text: string;
  };
};

const mapStateToProps = ({ message }: Message) => {
  return {
    title: message.title,
    text: message.text,
  };
};

const mapDispatchToProps = (
  dispatch: (arg0: {
    type: string;
    payload: { title: string; text: string };
  }) => any,
) => {
  return {
    clearMessage: () => dispatch(setMessage({ title: '', text: '' })),
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(App);
