/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { KeyboardTypeOptions, StyleSheet, Text } from 'react-native';
import { TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface InputProps {
  label: string;
  value: string;
  disabled?: boolean;
  error?: string;
  onChangeText: (item: any) => void;
  keyboardType?: KeyboardTypeOptions;
}

export const Input = ({
  label,
  value,
  disabled = false,
  error,
  onChangeText,
  keyboardType = 'default',
}: InputProps) => {
  return (
    <>
      <TextInput
        mode="outlined"
        style={styles.input}
        label={label}
        value={value}
        onChangeText={onChangeText}
        error={!!error}
        disabled={disabled}
        keyboardType={keyboardType}
        right={
          !!error && (
            <TextInput.Icon
              name={() => (
                <Icon name="error" size={25} style={{ color: '#ff0000' }} />
              )}
            />
          )
        }
      />
      {!!error && <Text style={styles.text}>{error}</Text>}
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    width: '90%',
    marginTop: 20,
  },
  text: {
    color: '#ff0000',
    alignSelf: 'flex-start',
    marginStart: 20,
  },
});
