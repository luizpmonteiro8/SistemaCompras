import React from 'react';
import * as Styled from './styles';
import { month } from 'app/util/month';
import dynamic from 'next/dynamic';

export type BarChartProps = {
  values: number[];
};

export const BarChart = ({ values }: BarChartProps) => {
  const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false });
  const options = {
    chart: {
      id: 'basic-bar',
    },
    yaxis: {
      labels: {
        formatter: function (value) {
          return value.toString().replace('.', ',');
        },
      },
    },
    xaxis: {
      categories: month,
    },
    tooltip: {
      y: {
        formatter: function (value) {
          return value.toString().replace('.', ',');
        },
      },
    },
  };

  const series = [
    {
      name: 'Valor total',
      data: values.map((item: any) => item.total),
    },
  ];

  return (
    <Styled.Wrapper>
      <div className="card bg-light mx-auto col-md-8 ">
        <h4 className="card-header ">Compras por mês - ano: 2021</h4>
        <div className="card-body">
          <div id="chart">
            <ApexCharts options={options} series={series} type="bar" width="100%" />
          </div>
        </div>
      </div>
    </Styled.Wrapper>
  );
};
