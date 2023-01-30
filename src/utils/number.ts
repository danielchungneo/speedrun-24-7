export const formatNumberWithCommas = (
  num: number | string,
  toFixedLength = null
) => {
  if (isNaN(num) || num === null) {
    return num;
  }

  // convert to a string so we can split it on the decimal
  const numSplit = num.toString().split('.');
  const decimalExists = num.toString().includes('.');

  const leftSide = numSplit[0]; // getting all numbers left of the decimal
  const rightSide = numSplit[1]; // getting all numbers right of the decimal

  const formattedLeftSide = leftSide
    .split('')
    .reverse()
    .map((char, charIdx) => (charIdx && charIdx % 3 === 0 ? char + ',' : char))
    .reverse()
    .join('');

  let formattedRightSide = '';

  if (toFixedLength !== null) {
    for (let i = 0; i < toFixedLength; i++) {
      formattedRightSide += `${
        !!rightSide && rightSide[i] != undefined ? rightSide[i] : 0
      }`;
    }
  } else {
    formattedRightSide = rightSide;
  }

  return !!formattedRightSide
    ? `${formattedLeftSide}.${formattedRightSide}`
    : `${formattedLeftSide}${decimalExists ? '.' : ''}`;
};

/**
 *
 * @param {*} value any value
 * @returns a parsed value or null (if null, the number is not valid)
 */
export const parseNumberInputValue = (
  value,
  toFixedLength = null,
  maxPlacesToRight = null
) => {
  let parsedValue;

  if (!value.toString().length) {
    parsedValue = 0;
  } else {
    const decimalPlacesToRight = [null, undefined].includes(value)
      ? 0
      : value.split('.').length > 1
      ? value.split('.')[1].length
      : 0;

    const newToFixedLength =
      toFixedLength !== null ? toFixedLength : decimalPlacesToRight;
    parsedValue = ![null, undefined].includes(value)
      ? parseFloat(value).toFixed(newToFixedLength)
      : null;
  }

  if (isNaN(parsedValue) || parsedValue === null) return null;

  return parsedValue;
};
