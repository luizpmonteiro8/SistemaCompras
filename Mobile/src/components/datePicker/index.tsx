import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Input } from './../common/input/index';
import Icon from 'react-native-vector-icons/AntDesign';
import { DefaultTheme } from 'react-native-paper';
import DatePicker from 'react-native-date-picker';
import { useState } from 'react';

interface DeleteProps {
  label: string;
  error?: string;
  value: string;
  date: Date;
  onConfirm: (date: Date) => void;
}

export const InputCalendar = ({
  label,
  error,
  value,
  date,
  onConfirm,
}: DeleteProps) => {
  const [dateModalShow, setDateModalShow] = useState(false);
  return (
    <>
      <View style={styles.viewCalendar}>
        <Input
          label={label}
          value={value}
          error={error}
          disabled={true}
          onChangeText={() => {
            null;
          }}
        />

        <Icon
          name="calendar"
          size={30}
          style={styles.buttonCalendar}
          color={DefaultTheme.colors.primary}
          onPress={() => setDateModalShow(true)}
        />
      </View>

      <DatePicker
        modal
        open={dateModalShow}
        mode="date"
        title="Seleciona a data"
        date={date}
        confirmText="ok"
        cancelText="Cancelar"
        onConfirm={onConfirm}
        onCancel={() => setDateModalShow(false)}
      />
    </>
  );
};

const styles = StyleSheet.create({
  viewCalendar: {
    flexDirection: 'row',
    width: '90%',
    alignItems: 'center',
  },
  buttonCalendar: {
    marginTop: 20,
    marginStart: 10,
  },
});
