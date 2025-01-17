import add from "../src/add";

describe("add", () => {
  it("should return 0 if argument is a empty string", () => {
    expect(add("")).toBe(0);
  });

  it.each([
    ["1", 1],
    ["2", 2],
    ["3", 3],
  ])(
    "should return the number if the argument is a signle digit number",
    (arg, expected) => {
      expect(add(arg)).toBe(expected);
    }
  );

  it.each([
    ["12", 12],
    ["123", 123],
    ["1234", 234],
  ])(
    "should return number if the argument is multiple digit number",
    (arg, expected) => {
      expect(add(arg)).toBe(expected);
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

  it.each([
    ["1,2,3", 6],
    ["3,4,5,0,10,30", 52],
    ["5,3,2,1,4,5,6,7,8,9,10", 60],
    ["0,0,0", 0],
  ])(
    "should return the sum of numbers if 3 numbers are is comma separated",
    (arg, expected) => {
      expect(add(arg)).toBe(expected);
    }
  );

  it.each([
    ["1\n2,3", 6],
    ["1,2\n3", 6],
    ["1,2\n10", 13],
  ])("should handle new lines between numbers", (arg, expected) => {
    expect(add(arg)).toBe(expected);
  });

  it.each([
    ["//;\n1;2;3", 6],
    ["//&\n1&2&12", 15],
  ])("should handle new lines between numbers", (arg, expected) => {
    expect(add(arg)).toBe(expected);
  });

  it.each([
    ["-1", "Negatives not allowed: -1"],
    ["1,2,-2", "Negatives not allowed: -2"],
    ["0,-5", "Negatives not allowed: -5"],
    ["0,-5, -10, 4, -1", "Negatives not allowed: -5, -10, -1"],
  ])("should throw error if negative number is passed", (arg, expected) => {
    expect(() => add(arg)).toThrow(expected);
  });

  it.each([
    ["1000,2", 2],
    ["1000,1000,1000", 0],
    ["1002,1", 3],
    ["1234,1", 235],
    ["//;\n1234;1", 235],
  ])("should ignore numbers greater than 1000", (arg, expected) => {
    expect(add(arg)).toBe(expected);
  });

  it.each([
    ["//[;;;]\n1;;;2;;;3", 6],
    ["//[***]\n5***2***3", 10],
  ])(`should handle custom delimiter`, (arg, expected) => {
    expect(add(arg)).toBe(expected);
  });

  it.each([
    ["//[*][;]\n1*2;3", 6],
    ["//[*][;][&]\n1*2;3&4", 10],
  ])(`should handle multiple custom single charecter delimiter`, (arg, expected) => {
    expect(add(arg)).toBe(expected);
  });

  it.each([
    ["//[**][;]\n1**2;3", 6],
    ["//[*][;;][&&&]\n1*2;;3&&&4", 10],
  ])(`should handle multiple custom multiple charecter delimiter`, (arg, expected) => {
    expect(add(arg)).toBe(expected);
  });
});
