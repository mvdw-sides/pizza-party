import Validator from "../lib/Utils/validate";

describe("Test validator functions for phone", () => {
  test("Invalid phone Number", () => {
    const valid = Validator.phone("0900-aa-bb-cc-dd");
    expect(valid).toEqual(false);
  });

  test("Too long phone Number", () => {
    const valid = Validator.phone("06297689770");
    expect(valid).toEqual(false);
  });

  test("Valid Mobile", () => {
    const valid = Validator.phone("0629491370");
    expect(valid).toEqual(true);
  });

  test("Valid Landline", () => {
    const valid = Validator.phone("0876342305");
    expect(valid).toEqual(true);
  });
});

describe("Test validator functions for zipcode", () => {
  test("Invalid zip", () => {
    const valid = Validator.postcode("abc098");
    expect(valid).toEqual(false);
  });

  test("Too many characters", () => {
    const valid = Validator.postcode("0987ADC");
    expect(valid).toEqual(false);
  });

  test("Valid Uppercase", () => {
    const valid = Validator.postcode("1234AB");
    expect(valid).toEqual(true);
  });

  test("Valid lowercase", () => {
    const valid = Validator.postcode("1234ab");
    expect(valid).toEqual(true);
  });
});
