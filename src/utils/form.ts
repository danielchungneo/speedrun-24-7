import { format } from 'date-fns';
import { convertDatetimeToUTC } from './date';

export const convertFormToJson = (form: any, keysToChange: any = {}) => {
  const json = { ...form };

  if (keysToChange.date) {
    keysToChange.date.forEach((field: string) => {
      if (json[field]) {
        json[field] = convertDatetimeToUTC(json[field], 'UTC');
        // json[field] = new Date(json[field]).toISOString();
        // json[field] = formatInTimeZone(
        //   json[field],
        //   // parseISO(json[field]),
        //   "yyyy-MM-dd'T'kk:mm:ss",
        //   "UTC"
        // );
      }
    });
  }

  return json;
};

const setNestedObjectValue = (
  baseObject: any,
  path: string | string[],
  value: any
) => {
  const routes = typeof path === 'string' ? path.split('.') : path;
  const nextRoute = routes[0];

  if (routes.length === 1) {
    const newVal =
      typeof value === 'function' ? value(baseObject[nextRoute]) : value;
    baseObject[nextRoute] = newVal;
    return baseObject;
  }

  if (Array.isArray(baseObject[nextRoute])) {
    baseObject[nextRoute] = baseObject[nextRoute].map((obj: any) =>
      setNestedObjectValue(obj, routes.slice(1), value)
    );
  } else {
    baseObject[nextRoute] = setNestedObjectValue(
      baseObject[nextRoute],
      routes.slice(1),
      value
    );
  }
  return baseObject;
};

export const convertJsonToForm = (json: any, keysToChange: any) => {
  const formValues = { ...json };

  if (keysToChange.date) {
    keysToChange.date.forEach((field: string) => {
      try {
        const formatDate = (backendDate: string) =>
          format(new Date(backendDate), 'yyyy-MM-dd');

        setNestedObjectValue(formValues, field, formatDate);
      } catch (e) {
        //
      }
    });
  }

  return formValues;
};

export const getDateFieldsFromArray = (
  fieldsArray,
  propertiesArray,
  arrayName,
  additionalName
) => {
  const dateFields = [];
  propertiesArray.forEach((property, index) => {
    fieldsArray.forEach((field, fieldIndex) => {
      dateFields.push(
        `${additionalName}.${arrayName}.${fieldIndex}.${property}`
      );
    });
  });
  const results = {
    date: [...dateFields],
  };
  return results;
};

export const formatSelectBox = (idFieldName, nameFieldName, array) => {
  if (array) {
    return array.map((uom) => {
      return { id: uom[idFieldName], name: uom[nameFieldName] };
    });
  }

  return null;
};

export const formatSelectSearch = (idFieldName, nameFieldName, array) => {
  if (array) {
    return array.map((uom) => {
      return { value: uom[idFieldName], label: uom[nameFieldName] };
    });
  }

  return null;
};

export const formatAddressSelect = (array) => {
  if (array) {
    return array.map((address) => {
      return {
        id: address.addressId,
        name: `${address.address1}, ${address.city}, ${address.state} ${address.zipCode}`,
      };
    });
  }
  return null;
};

export const buildPath = (...fields: string[]) => {
  return fields.join('.');
};

export const formatNameField = (objectList: any) => {
  objectList.map(
    (nameObject) =>
      (nameObject.fullName = `${nameObject.firstName} ${nameObject.lastName}`)
  );
  return objectList;
};
