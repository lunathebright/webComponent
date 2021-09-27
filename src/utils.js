export const arrToObj = (arr) => {
  return arr.reduce((acc, crr) => {
    const [key, value] = crr;
    acc[key] = value;
    return acc;
  }, {});
};
