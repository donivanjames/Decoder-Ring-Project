// Write your tests here!
const { expect } = require("chai");
const { polybius } = require("../src/polybius");

describe("Donivan's Polybius Tests", () => {
  describe("--Error Handling While Decoding--", () => {
    it("should return false if length of numbers without spaces is odd", () => {
      const actual = polybius("545 45 4 5 454 545 45", false);
      expect(actual).to.be.false;
    });
  });

  describe("--Encoding--", () => {
    it("should turn each letter into number pairs", () => {
      const actual = polybius("alpaca");
      const expected = "111353113111";
      expect(actual).to.equal(expected);
    });

    it("should leave spaces as is", () => {
      const actual = polybius("e i e i o");
      const expected = "51 42 51 42 43";
      expect(actual).to.equal(expected);
    });

    it("should translate i and j to 42", () => {
      const actual = polybius("jib jab");
      const expected = "424221 421121";
      expect(actual).to.equal(expected);
    });
  });

  describe("--Decoding--", () => {
    it("should translate number pairs back to letters", () => {
      const actual = polybius("111353113111", false);
      const expected = "alpaca";
      expect(actual).to.equal(expected);
    });

    it("should leave spaces as is", () => {
      const actual = polybius("51 42 51 42 43", false);
      const expected = "e (i/j) e (i/j) o";
      expect(actual).to.equal(expected);
    });

    it("should translate 42 to (i/j)", () => {
      const actual = polybius("424242424242", false);
      expect(actual).to.include("(i/j)");
    });
  });
});
