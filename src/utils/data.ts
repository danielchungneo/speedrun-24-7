type GenericObject = { [key: string]: any };

export const formatAddress = (address: GenericObject) => {
  return `${address.address1}, ${address.city}, ${address.state} ${address.zipCode}`;
};
