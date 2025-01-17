const add = (arg) => {
  if (arg === "") {
    return 0;
  }
  if (arg.length === 1 && arg[0].match(/[0-9]/)) {
    return arg;
  }
};

export default add;
