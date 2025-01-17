const add = (arg) => {
  if (arg === "") {
    return 0;
  }
  if (arg.match(/[0-9]/)) {
    return arg;
  }
};

export default add;
