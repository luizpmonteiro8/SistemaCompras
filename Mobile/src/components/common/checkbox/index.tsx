/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Checkbox, Text } from 'react-native-paper';

interface CheckBoxProps {
  label: string;
  status: 'checked' | 'unchecked' | 'indeterminate';
  onPress: () => void;
}

export const CheckBox = ({ label, status, onPress }: CheckBoxProps) => {
  return (
    <>
      <View style={styles.viewBlocked}>
        <Text style={styles.fontBlocked}>{label}</Text>
        <Checkbox status={status} onPress={onPress} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  viewBlocked: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    marginTop: 20,
  },
  fontBlocked: {
    fontSize: 18,
    color: '#747474',
  },
});
