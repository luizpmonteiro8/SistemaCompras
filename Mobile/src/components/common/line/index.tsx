/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Text } from 'react-native';

type Props = {
  width?: string;
};
export const Line = ({ width = '100%' }: Props) => {
  return (
    <>
      <Text
        style={{
          height: 1,
          borderBottomColor: '#91a3b0',
          borderBottomWidth: 1,
          width: width,
          marginTop: 20,
        }}
      ></Text>
    </>
  );
};
