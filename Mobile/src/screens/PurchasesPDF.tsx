import { usePurchasesService } from '../app/services';
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import Pdf from 'react-native-pdf';

export class PurchasesPDF extends Component {
  state = {
    service: usePurchasesService(),
    blob: {},
  };

  componentDidMount = async () => {
    if (Platform.OS === 'android') {
      if (await requestWritePermission()) {
        const service = usePurchasesService();
        const res = await service.loadReportPurchases();
        const path = res.path();
        console.log(path);
        this.setState({ ...this.state, blob: path });
      }
    }
  };

  render() {
    const source = {
      uri: 'file://' + this.state.blob,
    };
    console.log(source);
    return (
      <View style={styles.container}>
        {!!this.state.blob && <Pdf source={source} style={styles.pdf} />}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 25,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

const requestWritePermission = async () => {
  let returnValue = false;
  try {
    await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
    ]).then((result) => {
      if (
        result['android.permission.READ_EXTERNAL_STORAGE'] &&
        result['android.permission.WRITE_EXTERNAL_STORAGE'] === 'granted'
      ) {
        returnValue = true;
      }
    });
  } catch (err) {
    null;
  }
  return returnValue;
};
