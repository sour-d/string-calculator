import add from "../src/add";

describe("add", () => {
  it("should return 0 if argument is a empty string", () => {
    expect(add('')).toBe(0);
  });

  it.each(["1", "2", "3"])(
    "should return the number if the argument is a signle number",
    (arg) => {
      expect(add(arg)).toBe(arg);
    }
  );
});
