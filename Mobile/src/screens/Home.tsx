/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { Component } from 'react';
import { Dimensions, View } from 'react-native';
import {
  Button,
  Card,
  DefaultTheme,
  Paragraph,
  Text,
  Title,
} from 'react-native-paper';
import { BarChart } from 'react-native-chart-kit';
import { Month } from './../app/util/Month';
import { connect, ConnectedProps } from 'react-redux';
import { setMessage } from '../store/actions/message';
import {
  CountDashboard,
  SumDashboard,
  TopDashboard,
} from '../store/actions/dashboard';
import { ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Props extends PropsFromRedux {
  navigation: {
    navigate: any;
    toggleDrawer: any;
    closeDrawer: any;
    openDrawer: any;
    dispatch: any;
    setOptions: any;
  };
  route: {
    params: any;
  };
}

class Home extends Component<Props> {
  state = {};

  componentDidMount = async () => {
    const name = (await AsyncStorage.getItem('name')) || '';
    this.props.loadSumDashboard();
    this.props.loadCountDashboard();
    this.props.loadTopDashboard();
    if (name) {
      this.props.navigation.setOptions({
        title: 'Bem vindo, ' + name,
      });
    }
  };

  render() {
    return (
      <ScrollView>
        <View>
          <Card
            style={{ width: '90%', alignSelf: 'center', marginVertical: 20 }}
          >
            <Card.Title title="Cadastros" />
            <Card.Content>
              <Title>Produtos</Title>
              <Paragraph>{this.props.count.productCount}</Paragraph>
            </Card.Content>
            <Card.Content>
              <Title>Compras</Title>
              <Paragraph>{this.props.count.purchasesCount}</Paragraph>
            </Card.Content>
          </Card>

          {this.props.sum.length >= 1 && (
            <View style={{ alignContent: 'center' }}>
              <Card
                style={{
                  width: Dimensions.get('window').width - 10,
                  alignSelf: 'center',
                  marginVertical: 20,
                }}
              >
                <Card.Title title="Compras por mês" />
                <Card.Content>
                  <Title>Ano:</Title>
                </Card.Content>

                <BarChart
                  data={{
                    labels: Month,
                    datasets: [
                      {
                        data: this.props.sum?.map((item: any) => item.total),
                      },
                    ],
                  }}
                  width={Dimensions.get('window').width - 10} // from react-native
                  height={350}
                  yAxisLabel="R$ "
                  yAxisSuffix=""
                  yAxisInterval={1} // optional, defaults to 1
                  chartConfig={{
                    backgroundColor: '#0080ff',
                    backgroundGradientFrom: '#0080ff',
                    backgroundGradientTo: '#82c0ff',
                    decimalPlaces: 2, // optional, defaults to 2dp
                    barPercentage: 0.5,
                    height: 5000,
                    fillShadowGradient: `rgba(1, 122, 205, 1)`,
                    fillShadowGradientOpacity: 1,
                    color: (opacity = 1) => `rgba(1, 122, 205, 1)`,
                    labelColor: (opacity = 1) => `rgba(0, 0, 0, 1)`,
                    style: {
                      borderRadius: 16,
                    },
                    propsForDots: {
                      r: '6',
                      strokeWidth: '2',
                      stroke: '#ffa726',
                    },
                  }}
                  style={{
                    marginVertical: 8,
                    borderRadius: 16,
                    alignSelf: 'center',
                  }}
                />
              </Card>
            </View>
          )}
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = ({ dashboard, sum }: any) => {
  return {
    count: dashboard.count,
    sum: dashboard.sum,
    top: dashboard.top,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    setMessage: (title: string, text: string) =>
      dispatch(setMessage({ title, text })),
    loadCountDashboard: () => dispatch(CountDashboard()),
    loadSumDashboard: () => dispatch(SumDashboard()),
    loadTopDashboard: () => dispatch(TopDashboard()),
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
export default connector(Home);
