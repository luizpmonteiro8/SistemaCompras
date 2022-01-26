/* eslint-disable @typescript-eslint/no-explicit-any */
import { Market } from 'app/models/market';
import { Formik } from 'formik';
import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { connect, ConnectedProps } from 'react-redux';
import { setMessage } from '../store/actions/message';
import { SaveMarket, UpdateMarket } from '../store/actions/market';
import { Input } from './../components/common/input/index';
import { Button } from './../components/common/button/index';
import * as Yup from 'yup';
import { CheckBox } from './../components/common/checkbox';
import { ScrollView } from 'react-native-gesture-handler';

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

const validationScheme = Yup.object().shape({
  name: Yup.string().trim().required('Campo obrigatório.'),
  blocked: Yup.boolean().required('Campo obrigatório.'),
  cnpj: Yup.number()
    .notRequired()
    .nullable(true)
    .typeError('Campo obrigatório.')
    .test(
      'len',
      'Maximo de 14 caracteres',
      (val: any) => String(val).length <= 14,
    )
    .test(
      'len',
      'Mínimo de 14 caracteres',
      (val: any) =>
        val == null || String(val) == '' || String(val).length == 14,
    ),
});

const initialValues = {
  market: { id: 0, name: '', cnpj: null, blocked: false } as Market,
};

class MarketForm extends Component<Props> {
  state = {
    ...initialValues,
  };

  componentDidMount = () => {
    if (typeof this.props.route.params != 'undefined') {
      const market = this.props.route.params.market;
      market.cnpj == 0 ? (market.cnpj = null) : null;
      this.setState({ ...this.state, market });
    }
  };

  render() {
    return (
      <Formik
        initialValues={{ ...this.state.market }}
        onSubmit={async (values, { setSubmitting }) => {
          if (values.id == 0) {
            if (await this.props.saveMarket(values)) {
              this.props.navigation.navigate('MarketList');
            }
          } else {
            if (await this.props.updateMarket(values)) {
              this.props.navigation.navigate('MarketList');
            }
          }
          setSubmitting(false);
        }}
        validationSchema={validationScheme}
        enableReinitialize
      >
        {({
          handleChange,
          handleSubmit,
          values,
          errors,
          isSubmitting,
          touched,
          setFieldValue,
          resetForm,
        }) => (
          <ScrollView>
            <View style={styles.container}>
              <Input
                label="Id"
                value={values.id === 0 ? '' : values.id.toString()}
                onChangeText={handleChange('id')}
                error={errors.id}
                disabled={true}
              />
              <Input
                label="Nome"
                value={values.name}
                onChangeText={handleChange('name')}
                error={touched.name ? errors.name : ''}
              />
              <Input
                label="Cnpj"
                keyboardType="numeric"
                value={String(values.cnpj != null ? values.cnpj : '')}
                onChangeText={handleChange('cnpj')}
                error={touched.cnpj ? errors.cnpj : ''}
              />
              <CheckBox
                label="Bloqueado"
                status={values.blocked ? 'checked' : 'unchecked'}
                onPress={() => setFieldValue('blocked', !values.blocked)}
              />

              <View style={styles.viewButton}>
                <Button
                  label="Enviar"
                  onPress={handleSubmit}
                  disabled={isSubmitting}
                />

                <Button
                  label="Limpar"
                  onPress={() => {
                    this.setState({ ...this.state, ...initialValues });
                    resetForm();
                  }}
                  marginLeft={10}
                />
              </View>
            </View>
          </ScrollView>
        )}
      </Formik>
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
  button: {
    marginTop: 20,
    marginLeft: 5,
  },
  viewButton: {
    flexDirection: 'row',
  },
});

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    setMessage: (title: string, text: string) =>
      dispatch(setMessage({ title, text })),
    saveMarket: (market: Market) => dispatch(SaveMarket(market)),
    updateMarket: (market: Market) => dispatch(UpdateMarket(market)),
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
export default connector(MarketForm);
