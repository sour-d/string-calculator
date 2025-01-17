import add from "../src/add";

describe("add", () => {
  it("should return 0 if argument is a empty string", () => {
    expect(add('')).toBe(0);
  });

  it.each(["1", "2", "3"])(
    "should return the number if the argument is a signle digit number",
    (arg) => {
      expect(add(arg)).toBe(arg);
    }
  );

  it.each(["12", "123", "1234"])(
    "should return number if the argument is multiple digit number",
    (arg) => {
      expect(add(arg)).toBe(arg);
    }
  );

  it.each([
    ["1,2", 3],
    ["3,4", 7],
    ["5,3", 8],
  ])(
    "should return the sum of numbers if 2 numbers are is comma separated",
    (arg, expected) => {
      expect(add(arg)).toBe(expected);
    }
  );

  it.each([
    ["13,25", 38],
    ["3,45", 48],
    ["31,3", 34],
  ])(
    "should return the sum of numbers of 2 numbers having multiple digits and comma separated",
    (arg, expected) => {
      expect(add(arg)).toBe(expected);
    }
  );
});
