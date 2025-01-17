import add from "../src/add";

describe("add", () => {
  it("should return 0 if argument is a empty string", () => {
    expect(add('')).toBe(0);
  });
});
