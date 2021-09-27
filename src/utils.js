export const arrToObj = (arr) => {
  return arr.reduce((acc, crr) => {
    const [key, value] = crr;
    if (value.length > 0) {
      acc[key] = value;
      return acc;
    }
  }, {});
};
