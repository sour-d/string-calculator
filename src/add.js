const add = (arg) => {
  if (arg === "") {
    return 0;
  }
  if (arg.match(/^[0-9]*$/)) {
    return arg;
  }

  const numbers = arg.split(",").map((num) => parseInt(num));
  return numbers.reduce((acc, num) => acc + num, 0);
};

export default add;
