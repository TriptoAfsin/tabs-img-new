const commaFormat = (number: number | bigint) => {
  const interNumberFormat = new Intl.NumberFormat('en-IN', {
    maximumSignificantDigits: 7,
  });
  try {
    return interNumberFormat.format(number);
  } catch (e) {
    console.error(e);
  }
};

export default commaFormat;
