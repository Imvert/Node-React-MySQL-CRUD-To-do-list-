export const palindrome = (string) => {
  return string.split("").reverse().join("");
};

export const average = (array) => {
  let sum = 0;
  array.forEach((num) => {
    sum += num;
  });
  return sum / array.length;
};
