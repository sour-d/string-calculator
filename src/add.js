const parseArgWithCustomDelimiter = (arg) => {
  const delimiter = arg[2];
  const numberStr = arg.slice(4);
  return [delimiter, numberStr];
};

const parseArg = (arg) => {
  if (arg.startsWith("//")) {
    return parseArgWithCustomDelimiter(arg);
  }

  const defaultDelimiter = ",";
  return [defaultDelimiter, arg];
};

const parseNumbers = (arg, delimiter) => {
  const delimiterAndNewLineRegex = new RegExp(`[${delimiter}\n]`);
  return arg.split(delimiterAndNewLineRegex).map((num) => parseInt(num));
};

const sum = (num1, num2) => num1 + num2;

const add = (arg) => {
  if (arg === "") {
    return 0;
  }
  if (arg.match(/^[0-9]*$/)) {
    return arg;
  }

  const [delimiter, numberStr] = parseArg(arg);
  const numbers = parseNumbers(numberStr, delimiter);
  return numbers.reduce(sum, 0);
};

export default add;
