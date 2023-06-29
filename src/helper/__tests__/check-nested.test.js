const {checkNested} = require("../check-nested-properties");

describe("checkNested", () => {
  const obj = {
    prop1: {
      prop2: {
        prop3: "value",
      },
    },
  };

  it("returns true for existing nested properties", () => {
    expect(checkNested(obj, "prop1", "prop2", "prop3")).toBe(true);
  });

  it("returns false for non-existing nested properties", () => {
    expect(checkNested(obj, "prop1", "prop2", "prop4")).toBe(false);
  });

  it("returns false for non-existing parent properties", () => {
    expect(checkNested(obj, "prop4", "prop2", "prop3")).toBe(false);
  });
});
