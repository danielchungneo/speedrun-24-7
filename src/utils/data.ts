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

export const msToTime = (s: number) => {
  if (!s) {
    return null;
  }
  // Pad to 2 or 3 digits, default is 2
  var pad = (n, z = 2) => ('0' + n).slice(-z);

  var npad = (n, z = 1) => ('0' + n).slice(-z);

  if (s >= 3.6e6) {
    return (
      pad((s / 3.6e6) | 0) +
      ':' +
      pad(((s % 3.6e6) / 6e4) | 0) +
      ':' +
      pad(((s % 6e4) / 1000) | 0) +
      '.' +
      pad(s % 1000, 2)
    );
  } else if (s >= 6e5) {
    return (
      pad(((s % 3.6e6) / 6e4) | 0) +
      ':' +
      pad(((s % 6e4) / 1000) | 0) +
      '.' +
      pad(s % 1000, 2)
    );
  }
  return (
    npad(((s % 3.6e6) / 6e4) | 0) +
    ':' +
    pad(((s % 6e4) / 1000) | 0) +
    '.' +
    pad(s % 1000, 2)
  );
};
