const parseArgHavingCustomDelimiter = (arg) => {
  // if we have custom delimiter but length is more than 1 eg. //[;;;]
  if (arg.match(/^\/\/\[.*\]/)) {
    const regex = /\[(.*?)\]/g;
    const delimiters = arg.match(regex).map((match) => match.slice(1, -1));
    // const delimiter = arg.slice(3, arg.indexOf("\n") - 1);
    const numberStr = arg.slice(arg.indexOf("\n") + 1);
    return [delimiters, numberStr];
  }

  // if we have custom delimiter but length is 1 eg. //;
  const delimiter = arg[2];
  const numberStr = arg.slice(4);
  return [[delimiter], numberStr];
};

const parseArg = (arg) => {
  if (arg.startsWith("//")) {
    return parseArgHavingCustomDelimiter(arg);
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

const escapeAllCharecters = (str) => "\\" + str.split("").join("\\");

const combineDelimiters = (delimiters) => {
  if (Array.isArray(delimiters)) {
    return delimiters.map(escapeAllCharecters).join("|");
  }
  return escapeAllCharecters(delimiters);
};

const parseNumbers = (arg, delimiters) => {
  const delimiter = combineDelimiters(delimiters);
  const delimiterAndNewLineRegex = new RegExp(`${delimiter}|\n`);
  const numbers = arg
    .split(delimiterAndNewLineRegex)
    .map((num) => parseInt(num))
    .map(convertNumberToLessThanThousand)
    .filter((num) => num);
  validateNumbers(numbers);

  return numbers;
};

const sum = (num1, num2) => num1 + num2;
const multiply = (num1, num2) => num1 * num2;

const calculateStringExpression = (arg) => {
  const [delimiters, numberStr] = parseArg(arg);
  const numbers = parseNumbers(numberStr, delimiters);

  if (delimiters[0] === "*" && delimiters.length === 1) {
    return numbers.reduce(multiply, 1);
  }
  return numbers.reduce(sum, 0);
};

export default calculateStringExpression;
