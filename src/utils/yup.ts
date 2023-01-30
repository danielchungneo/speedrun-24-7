export const transformNumberValuetoNull = (value: any): null | number =>
  isNaN(value) || value === "" || value === null ? null : value;
