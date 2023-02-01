type GenericObject = { [key: string]: any };

export const formatAddress = (address: GenericObject) => {
  return `${address.address1}, ${address.city}, ${address.state} ${address.zipCode}`;
};

export const generateGuid = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};
