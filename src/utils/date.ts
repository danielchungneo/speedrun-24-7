import { format, toDate } from 'date-fns-tz';
export const DATE_FORMATS = {
  date: 'MM-dd-yyyy',
  datetime: 'MM-dd-yyyy h:mm aa',
  time: 'h:mm aa',
};

/**
 * Given three Date Objects, compare only the time portion of the objects and return true if the time being compared is within the min and max times (inclusive)
 * Returns Null if minDate is later than maxDate or if missing arguments
 * @param {Date} minDate date containing start of time range
 * @param {Date} maxDate date containing end of time range
 * @param {Date} compareDate date containing the time to be checked
 */
export function isTimeInRange(minDate: Date, maxDate: Date, compareDate: Date) {
  const breakException = {};
  const dateArr = [minDate, maxDate, compareDate];
  let returnValue = true;
  try {
    dateArr.forEach((element) => {
      if (!element) {
        returnValue = false;
        throw breakException;
      }
      element.setDate(1);
      element.setFullYear(1970);
      element.setMonth(0);
    });
    if (!(dateArr[0].getTime() <= dateArr[1].getTime())) {
      returnValue = false;
    }
    if (
      !(
        dateArr[0].getTime() <= dateArr[2].getTime() &&
        dateArr[2].getTime() <= dateArr[1].getTime()
      )
    ) {
      returnValue = false;
    }
  } catch (breakException) {}
  return returnValue;
}

export const getLocalTimeZone = (): string => {
  const { timeZone } = Intl.DateTimeFormat().resolvedOptions();
  return timeZone;
};

export const convertDatetimeToUTC = (datetime: Date, timeZone: string) => {
  const dateTimeString: string = format(datetime, "yyyy-MM-dd'T'HH:mm:ss");
  const localDatetime: Date = toDate(dateTimeString, { timeZone });
  const utcDateTimeString: string = localDatetime
    .toISOString()
    .replace('.000Z', '');

  // const utcDateTimeString = format(localDatetime, `yyyy-MM-dd'T'HH:mm`);
  return utcDateTimeString;
};

export const parseDate = (datetime: string) => {
  const newDate = new Date(datetime);
  const month = newDate.getUTCMonth() + 1;
  const day = newDate.getUTCDate();
  const year = newDate.getUTCFullYear();
  return `${month}-${day}-${year}`;
};

export const dateIsValid = (date) => {
  return date instanceof Date && !isNaN(date.valueOf());
};

export const prettifyDate = (date, dateFormat = DATE_FORMATS.date) => {
  try {
    return format(new Date(date), dateFormat);
  } catch (error) {
    console.log(error);
    return null;
  }
};
