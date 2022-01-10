/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import DropDownPicker, { ValueType } from 'react-native-dropdown-picker';
import { DefaultTheme } from 'react-native-paper';
import { convertDataAutoComplete } from './convertdata';

type Props = {
  items: any;
  placeholder: string;
  onChangeValue: (value: ValueType | ValueType[] | null) => void;
  itemValue?: any;
  label?: string;
  searchable?: boolean;
  error?: string;
};

export const AutoComplete = ({
  items,
  onChangeValue,
  placeholder,
  itemValue,
  label,
  searchable = true,
  error,
}: Props) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<number>(0);

  useEffect(() => {
    if (itemValue && value != itemValue) {
      setValue(itemValue);
    }
  }, [itemValue]);

  return (
    <View>
      {!!items && (
        <View
          style={{
            width: '100%',
          }}
        >
          <Text
            style={{
              ...styles.textLabel,
              color: !error ? '#808080' : '#ff0000',
            }}
          >
            {label}
          </Text>
          <DropDownPicker
            items={convertDataAutoComplete(items)}
            open={open}
            setOpen={setOpen}
            value={value}
            setValue={setValue}
            searchable={searchable}
            placeholder={placeholder}
            searchPlaceholder="Buscar"
            listMode="SCROLLVIEW"
            mode="BADGE"
            onChangeValue={(value) => {
              onChangeValue(value);
            }}
            containerStyle={{
              width: '90%',
              marginTop: 20,
            }}
            style={{
              backgroundColor: '#0000',
              borderColor: !error ? '#808080' : '#ff0000',
              height: 58,
            }}
            dropDownContainerStyle={{
              zIndex: 9999999,
              elevation: 999,
              backgroundColor: DefaultTheme.colors.background,
            }}
            textStyle={{
              fontSize: 15,
            }}
            placeholderStyle={{
              color: '#747474',
            }}
          />
        </View>
      )}
      {!!error && <Text style={styles.text}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  textLabel: {
    height: 20,
    marginTop: 9,
    marginStart: 10,
    position: 'absolute',
    backgroundColor: DefaultTheme.colors.background,
    zIndex: 99999,
  },
  text: {
    color: '#ff0000',
    alignSelf: 'flex-start',
  },
});
