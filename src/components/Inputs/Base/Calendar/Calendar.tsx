import React, { useCallback, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { Calendar as RNCalendar, LocaleConfig } from 'react-native-calendars';

import useTheme from '@/utils/hooks/context/useTheme';
import useTranslation from '@/utils/hooks/context/useTranslation';
import { ICalendar } from '@/constants/types';

const Calendar = ({ onClose, ...props }: ICalendar) => {
  const { colors, fonts } = useTheme();
  const { t, locale } = useTranslation();
  const [dates, setDates] = useState(props.dates || {});
  const [calendar, setCalendar] = useState({ start: 0, end: 0 });

  // handle marked dates
  const handleDates = useCallback(
    (calendar) => {
      // generate dates based on calendar start & end dates
      const datesRange = dayjs(calendar?.end).diff(
        dayjs(calendar?.start),
        'days'
      );

      const markedDates = Array.from({ length: datesRange }, (_, i) => {
        // add 1 day to start date
        const date = dayjs(calendar.start)
          .add(i + 1, 'day')
          .format('YYYY-MM-DD');

        return {
          [date]: {
            startingDay: false,
            endingDay: i + 1 === datesRange,
            color: String(colors.primary),
          },
        };
      }).reduce((list, entry) => ({ ...list, ...entry }), {
        [dayjs(calendar?.start).format('YYYY-MM-DD')]: {
          startingDay: true,
          color: String(colors.primary),
        },
      });

      setDates(markedDates);
    },
    [colors.primary, setDates]
  );

  // handleCalendar
  const handleCalendar = useCallback(
    (value) => {
      // check if start date does not exist
      // set start date

      const offset = new Date(value.timestamp).getTimezoneOffset();
      const timestamp = value.timestamp + offset * 60 * 1000; // convert offset (in minutes) to milliseconds

      if (calendar.start === 0) {
        calendar.start = timestamp;
      } else if (calendar.start && calendar.end) {
        calendar.start = timestamp;
        calendar.end = 0;
      } else {
        calendar.end = timestamp;
      }

      // update calendar
      setCalendar(calendar);

      // generate marked dates
      handleDates(calendar);

      // hide modal / reset modal state
      if (calendar.start && calendar.end) {
        onClose?.(calendar);
      }
    },
    [calendar, handleDates, setCalendar, onClose]
  );

  // init handle dates on calendar change
  useEffect(() => {
    handleDates(props?.calendar);
  }, [handleDates, props.calendar]);

  if (locale) {
    // change calendar locale based on app localization language
    const today = t('dates.today');

    // LocaleConfig.locales.en = LocaleConfig.locales[''];
    LocaleConfig.locales[locale] = {
      today: t('dates.today'),
      dayNames: t('dates.dayNames') as unknown as string[],
      dayNamesShort: t('dates.dayNamesShort') as unknown as string[],
      monthNames: t('dates.monthNames') as unknown as string[],
      monthNamesShort: t('dates.monthNamesShort') as unknown as string[],
    };
    LocaleConfig.defaultLocale = locale;
  }

  return (
    <RNCalendar
      key={locale}
      markingType="period"
      markedDates={dates}
      current={dayjs().format('YYYY-MM-DD')}
      minDate={dayjs().format('YYYY-MM-DD')}
      onDayPress={(day) => handleCalendar(day)}
      theme={{
        backgroundColor: 'transparent',
        calendarBackground: 'transparent',
        textSectionTitleColor: String(colors.secondary),
        arrowColor: String(colors.secondary),
        monthTextColor: String(colors.text),
        dayTextColor: String(colors.text),
        todayTextColor: String(colors.success),
        textDisabledColor: String(colors.gray),
        selectedDayTextColor: String(colors.text),
        selectedDayBackgroundColor: String(colors.primary),
        textDayFontFamily: fonts.text,
        textMonthFontFamily: fonts.text,
        textDayHeaderFontFamily: fonts.text,
      }}
      {...props}
    />
  );
};

export default Calendar;
