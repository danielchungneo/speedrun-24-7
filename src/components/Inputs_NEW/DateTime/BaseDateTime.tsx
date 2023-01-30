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
import { IDateTimePicker } from 'types/components/inputComponents';
import TextField from '../Text/TextField';
import { Feather } from '@expo/vector-icons';

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
  append = [],
  prepend = [],
  variant,
  disabled,
  error,
  ...calendarProps
}: IDateTimePicker) => {
  const [show, setShow] = useState(false);
  const [internalDate, setInternalDate] = useState<Date>();

  const { colors, assets, sizes, styles } = useTheme();

  const handlePickerChange = (date: any) => {
    const dateString = date.toJSON().slice(0, -1);

    const value = returnType === 'string' ? dateString : date;

    const mockEvent = {
      target: {
        id,
        value,
      },
    };

    onChange?.(mockEvent as never);
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
          onChange?.(parsedDate);
        }

        setInternalDate(parsedDate);

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
      {/* {!!label && (
        <Text bold marginBottom={sizes.xs}>
          {label}
        </Text>
      )} */}

      <Block
        flex={0}
        style={{
          opacity: disabled ? 0.4 : 1,
        }}
      >
        <TextField
          variant={variant}
          form={false}
          error={error}
          label={label}
          prepend={prepend}
          append={[
            ...append,
            <Feather
              name='calendar'
              size={20}
              style={{
                marginHorizontal: sizes.s,
              }}
            />,
          ]}
          value={
            !!internalDate && DATE_FORMATS[mode]
              ? format(internalDate, DATE_FORMATS[mode])
              : `Choose a ${DATE_PLACEHOLDERS[mode] || 'date'}`
          }
        >
          {!!internalDate && DATE_FORMATS[mode] ? (
            <Text size='p'>{format(internalDate, DATE_FORMATS[mode])}</Text>
          ) : (
            <Text size='p' variant='neutral'>
              Choose a {DATE_PLACEHOLDERS[mode] || 'date'}
            </Text>
          )}
        </TextField>

        <Pressable
          disabled={disabled}
          onPress={() => setShow(true)}
          style={[StyleSheet.absoluteFill]}
        />
      </Block>

      <ModalDateTimePicker
        disabled={disabled}
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
