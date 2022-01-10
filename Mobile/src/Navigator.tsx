/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Login from './screens/Login';
import ProductForm from './screens/ProductForm';
import ProductList from './screens/ProductList';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import CategoryForm from './screens/CategoryForm';
import CategoryList from './screens/CategoryList';
import MarketForm from './screens/MarketForm';
import MarketList from './screens/MarketList';
import PurchasesForm from './screens/PurchasesForm';
import PurchasesList from './screens/PurchasesList';
import PurchasesView from './screens/PurchasesView';
import StockList from './screens/StockList';
import EntraceExitForm from './screens/EntraceExitForm';
import EntraceExitList from './screens/EntraceExitList';
import Home from './screens/Home';
import { default as IconMaterial } from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/AntDesign';
import { View } from 'react-native';
import { List } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Line } from './components/common/line';
import { CommonActions } from '@react-navigation/native';

const Drawer = createDrawerNavigator();

function NavigatorMenu() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Login"
        drawerContent={(props) => <DrawerContent {...props} />}
      >
        <Drawer.Screen
          name="MarketForm"
          options={{ title: 'Cadastro de mercado' }}
          component={MarketForm}
        />
        <Drawer.Screen
          name="CategoryForm"
          options={{ title: 'Cadastro de categoria' }}
          component={CategoryForm}
        />
        <Drawer.Screen
          name="ProductForm"
          options={{ title: 'Cadastro de produto' }}
          component={ProductForm}
        />
        <Drawer.Screen
          name="PurchasesForm"
          options={{ title: 'Cadastro de nova compra' }}
          component={PurchasesForm}
        />
        <Drawer.Screen
          name="EntraceExitForm"
          options={{ title: 'Cadastro de entrade e saida' }}
          component={EntraceExitForm}
        />
        <Drawer.Screen
          name="MarketList"
          options={{ title: 'Lista de mercado' }}
          component={MarketList}
        />
        <Drawer.Screen
          name="CategoryList"
          options={{ title: 'Lista de categoria' }}
          component={CategoryList}
        />
        <Drawer.Screen
          name="ProductList"
          options={{ title: 'Lista de produto' }}
          component={ProductList}
        />
        <Drawer.Screen
          name="PurchasesList"
          options={{ title: 'Lista de compras' }}
          component={PurchasesList}
        />
        <Drawer.Screen
          name="StockList"
          options={{ title: 'Lista do estoque' }}
          component={StockList}
        />
        <Drawer.Screen
          name="EntraceExitList"
          options={{ title: 'Lista de entrada e saidas' }}
          component={EntraceExitList}
        />
        <Drawer.Screen
          name="PurchasesView"
          options={{ title: 'Lista de compras' }}
          component={PurchasesView}
        />
        <Drawer.Screen
          name="Login"
          options={{ title: 'Login', headerShown: false }}
          component={Login}
        />
        <Drawer.Screen
          name="Home"
          options={{ title: 'Home' }}
          component={Home}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

type DrawerInfo = {
  name: string;
  title: string;
};

const DrawerContent = (props: any) => {
  const [drawerInf, setDrawerInf] = useState<any[]>([]);

  useEffect(() => {
    convertInfo();
  }, []);

  const convertInfo = () => {
    if (props.descriptors) {
      const drawerInfoConvertMap = new Map(Object.entries(props.descriptors));
      const addDrawerInfo: { name: any; title: any }[] = [];
      drawerInfoConvertMap.forEach((item: any) => {
        addDrawerInfo.push({
          name: item.route.name,
          title: item.options.title,
        });
      });

      setDrawerInf(addDrawerInfo);
    }
  };

  return (
    <DrawerContentScrollView {...props}>
      <View>
        <List.Section
          title="Sistema compras"
          titleStyle={{ fontSize: 22, fontWeight: 'bold' }}
        >
          <List.Accordion
            title="Cadastros"
            left={(_) => <Icon name="form" size={30} />}
          >
            {drawerInf.map((item: DrawerInfo, index) => {
              if (item.name.includes('Form')) {
                return (
                  <List.Item
                    key={index}
                    title={item.title}
                    onPress={() => {
                      props.navigation.navigate(item.name);
                    }}
                  />
                );
              }
            })}
          </List.Accordion>
          <List.Accordion
            title="Lista"
            left={(_) => <Icon name="form" size={30} />}
          >
            {drawerInf.map((item: DrawerInfo, index) => {
              if (item.name.includes('List')) {
                return (
                  <List.Item
                    key={index}
                    title={item.title}
                    onPress={() => {
                      props.navigation.dispatch(
                        CommonActions.reset({
                          index: 0,
                          routes: [{ name: item.name }],
                        }),
                      );
                    }}
                  />
                );
              }
            })}
          </List.Accordion>
          <List.Accordion
            title="Outros"
            left={(_) => <Icon name="form" size={30} />}
          >
            {drawerInf.map((item: DrawerInfo, index) => {
              if (!item.name.includes('List') && !item.name.includes('Form')) {
                return (
                  <List.Item
                    key={index}
                    title={item.title}
                    onPress={() => {
                      props.navigation.navigate(item.name);
                    }}
                  />
                );
              }
            })}
          </List.Accordion>
          <Line />
          <DrawerItem
            label="Logout"
            onPress={async () => {
              await AsyncStorage.removeItem('token');
              await AsyncStorage.removeItem('name');
              props.navigation.navigate('Login');
            }}
            icon={() => <IconMaterial name="exit-to-app" size={30} />}
            labelStyle={{ fontSize: 18, margin: 0 }}
            style={{ margin: 0 }}
          />
        </List.Section>
      </View>
    </DrawerContentScrollView>
  );
};

export default NavigatorMenu;
