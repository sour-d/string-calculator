const add = (arg) => {
  if (arg === "") {
    return 0;
  }
  if (arg.match(/^[0-9]*$/)) {
    return arg;
  }

  const [num1, num2] = arg.split(",").map((num) => parseInt(num));
  return num1 + num2;
};

export default add;
