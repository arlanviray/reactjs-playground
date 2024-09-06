export const replaceArrayValue = (arr, oldValue, newValue) => {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] === oldValue) {
      arr[i] = newValue;
    }
  }

  return arr;
};

export const shuffleArray = (arr) => {
  return arr.sort(() => 0.5 - Math.random());
};
