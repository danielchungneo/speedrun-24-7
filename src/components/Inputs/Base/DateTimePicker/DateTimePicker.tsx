import React, { useState, useEffect } from 'react';
import ModalDateTimePicker, {
  DateTimePickerProps,
} from 'react-native-modal-datetime-picker';
import Block from '@/components/Block';
import Text from '@/components/Text';
import useTheme from '@/utils/hooks/context/useTheme';
import { format } from 'date-fns-tz/esm';
import { Pressable, StyleSheet } from 'react-native';
import { parseISO, toDate } from 'date-fns/esm';
import { utcToZonedTime, zonedTimeToUtc } from 'date-fns-tz';
import {
  convertDatetimeToUTC,
  dateIsValid,
  DATE_FORMATS,
  getLocalTimeZone,
  prettifyDate,
} from '@/utils/date';
import TextField from '../TextField';

export interface IDateTimePicker extends DateTimePickerProps {
  id?: string;
  label?: string;
  value: Date | string;
  onChange(date: string | Date): void;
  onConfirm?: DateTimePickerProps['onConfirm']; // make these optional
  onCancel?: DateTimePickerProps['onCancel'];
  returnType?: 'date' | 'string';
}

const DATE_PLACEHOLDERS = {
  date: 'date',
  datetime: 'date',
  time: 'time',
};

const DateTimePicker = ({
  id = 'dateTimePicker',
  label,
  value,
  mode = 'date',
  onChange,
  returnType = 'string',
  ...calendarProps
}: IDateTimePicker) => {
  const [show, setShow] = useState(false);
  const [internalDate, setInternalDate] = useState<Date>();

  const { colors, assets, sizes, styles } = useTheme();

  const handlePickerChange = (date: any) => {
    const dateString = date.toJSON().slice(0, -1);

    console.log({
      date,
      dateString,
    });

    onChange(returnType === 'string' ? dateString : date);
    setShow(false);
  };

  const calculateInternalDate = () => {
    try {
      if (typeof value === 'string') {
        const isUTC = value.indexOf('Z') === -1;

        let dateToParse = isUTC ? value + 'Z' : value;

        // try to parse as ISO
        let parsedDate = new Date(dateToParse);

        // fire for react-hook-form to update internal value
        if (returnType === 'date') {
          onChange(parsedDate);
        }

        setInternalDate(parsedDate);

        console.log({
          value,
          parsedDate,
        });

        return;
      }

      // if not ISO, try to parse as JS Date
      const normalDate = new Date(value);
      const normalDateIsValid = dateIsValid(normalDate);

      if (normalDateIsValid) {
        setInternalDate(normalDate);
      }
    } catch (error) {
      console.log(error);
      //
    }
  };

  useEffect(() => {
    if (!!value) {
      calculateInternalDate();
    }
  }, [value]);

  return (
    <Block flex={0}>
      {!!label && (
        <Text bold marginBottom={sizes.xs}>
          {label}
        </Text>
      )}

      <Block>
        <TextField disabled icon={'calendar'} dropdown>
          {!!internalDate && DATE_FORMATS[mode] ? (
            <Text p>{format(internalDate, DATE_FORMATS[mode])}</Text>
          ) : (
            <Text p gray>
              Choose a {DATE_PLACEHOLDERS[mode] || 'date'}
            </Text>
          )}
        </TextField>
        <Pressable
          onPress={() => setShow(true)}
          style={[StyleSheet.absoluteFill]}
        />
      </Block>

      <ModalDateTimePicker
        themeVariant="light"
        date={internalDate}
        isVisible={show}
        mode={mode}
        onConfirm={handlePickerChange}
        onCancel={() => setShow(false)}
      />
    </Block>
  );
};

export default React.memo(DateTimePicker);
