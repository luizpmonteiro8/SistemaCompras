/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Portal } from 'react-native-paper';
import { Dialog } from 'react-native-paper';
import { Paragraph } from 'react-native-paper';
import { Button } from '../../components/common/button';

interface DeleteProps {
  visible: boolean;
  onDismiss: () => void;
  title: string;
  text: string;
  onPress: () => void;
}

export const DeleteModal = ({
  visible,
  onDismiss,
  title,
  text,
  onPress,
}: DeleteProps) => {
  return (
    <>
      <Portal>
        <Dialog visible={visible} onDismiss={onDismiss}>
          <Dialog.Title>{title}</Dialog.Title>
          <Dialog.Content>
            <Paragraph>{text}</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button label="Ok" onPress={onPress} />
            <Button label="Cancelar" onPress={onDismiss} marginLeft={10} />
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
  );
};
