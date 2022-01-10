/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Button as ButtonPaper } from 'react-native-paper';

interface ButtonProps {
  label: string;
  disabled?: boolean;
  onPress: () => void;
  marginLeft?: number;
  marginTop?: number;
  marginBottom?: number;
}

export const Button = ({
  label,
  disabled = false,
  onPress,
  marginLeft = 0,
  marginTop = 0,
  marginBottom = 0,
}: ButtonProps) => {
  return (
    <>
      <ButtonPaper
        mode="contained"
        style={{
          marginLeft: marginLeft,
          marginTop: marginTop,
          marginBottom: marginBottom,
        }}
        onPress={onPress}
        disabled={disabled}
      >
        {label}
      </ButtonPaper>
    </>
  );
};
