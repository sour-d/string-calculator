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

const validateNumbers = (numbers) => {
  const negativeNumbers = numbers.filter((num) => num < 0);
  if (negativeNumbers.length > 0) {
    throw new Error(`Negatives not allowed: ${negativeNumbers.join(", ")}`);
  }
};

const convertNumberToLessThanThousand = (number) => number % 1000;

const parseNumbers = (arg, delimiter) => {
  const delimiterAndNewLineRegex = new RegExp(`[${delimiter}\n]`);
  const numbers = arg
    .split(delimiterAndNewLineRegex)
    .map((num) => parseInt(num))
    .map(convertNumberToLessThanThousand);
  validateNumbers(numbers);

  return numbers;
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
