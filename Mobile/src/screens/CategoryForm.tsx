/* eslint-disable @typescript-eslint/no-explicit-any */
import { Category } from 'app/models/category';
import { Formik } from 'formik';
import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { connect, ConnectedProps } from 'react-redux';
import { setMessage } from '../store/actions/message';
import { SaveCategory, UpdateCategory } from '../store/actions/category';
import * as Yup from 'yup';
import { Input } from '../components/common/input/index';
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

const initialValues = {
  category: { id: 0, name: '' } as Category,
};

const validationScheme = Yup.object().shape({
  name: Yup.string().trim().required('Campo obrigatório.'),
});

class CategoryForm extends Component<Props> {
  state = {
    ...initialValues,
  };

  componentDidMount = () => {
    if (typeof this.props.route.params != 'undefined') {
      const category = this.props.route.params.category;
      this.setState({ ...this.state, category });
    }
  };

  render() {
    return (
      <Formik
        initialValues={{ ...this.state.category }}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          try {
            if (values.id == 0) {
              await this.props.saveCategory(values);
            } else {
              await this.props.updateCategory(values);
            }

            this.props.navigation.navigate('CategoryList');
            resetForm();
            setSubmitting(false);
          } catch (err: any) {
            setSubmitting(false);
            this.props.setMessage('Erro', err.message);
          }
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
          setValues,
          resetForm,
          touched,
        }) => (
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

            <View style={styles.viewButton}>
              <Button
                label="Enviar"
                onPress={handleSubmit}
                disabled={isSubmitting}
              />

              <Button
                label="Limpar"
                onPress={() => {
                  setValues(initialValues.category);
                  resetForm();
                }}
                marginLeft={10}
              />
            </View>
          </View>
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

  viewButton: {
    flexDirection: 'row',
    marginTop: 20,
  },
});

const mapDispatchToProps = (dispatch: any) => {
  return {
    setMessage: (title: string, text: string) =>
      dispatch(setMessage({ title, text })),
    saveCategory: (category: Category) => dispatch(SaveCategory(category)),
    updateCategory: (category: Category) => dispatch(UpdateCategory(category)),
  };
};

const connector = connect(null, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
export default connector(CategoryForm);
