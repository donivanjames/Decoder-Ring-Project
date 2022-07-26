// Write your tests here!
const { expect } = require("chai");
const { caesar } = require("../src/caesar");

describe("Donivan's Ceasar Tests", () => {
  describe("--Guard Clauses--", () => {
    it("should return false if the shift is === 0", () => {
      const actual = caesar("Test Message", 0);
      expect(actual).to.be.false;
    });

    it("should return false if the shift is above 25", () => {
      const actual = caesar("Test Message", 26);
      expect(actual).to.be.false;
    });

    it("should return false if the shift is less than -25", () => {
      const actual = caesar("Test Message", -26);
      expect(actual).to.be.false;
    });
  });

  describe("--Encoding--", () => {
    it("should encode a message", () => {
      const actual = caesar("adamsandler", 5);
      const expected = "fifrxfsiqjw";
      expect(actual).to.equal(expected);
    });

    it("should work with special characters", () => {
      const actual = caesar("a message!!!", 3);
      const expected = "d phvvdjh!!!";
      expect(actual).to.equal(expected);
    });

    it("should convert message lowercase", () => {
      const actual = caesar("I'M YELLING", 5);
      const expected = "n'r djqqnsl";
      expect(actual).to.equal(expected);
    });

    it("should work with the letter z", () => {
      const actual = caesar("Palazzo", 3);
      const expected = "sdodccr";
      expect(actual).to.equal(expected);
    });

    it("should allow a negative shift", () => {
      const actual = caesar("Wakanda FOrever", -3);
      const expected = "txhxkax clobsbo";
      expect(actual).to.equal(expected);
    });
  });

  describe("--Decoding--", () => {
    it("should decode by shifting letters in the opposite direction", () => {
      const actual = caesar("fqufhf", 5, false);
      const expected = "alpaca";
      expect(actual).to.equal(expected);
    });

    it("should allow for a negative shift that will shift to the left", () => {
      const actual = caesar("hzmmt xcmdnohvn", -5, false);
      const expected = "merry christmas";
      expect(actual).to.equal(expected);
    });
  });

  it("should ignore capital letters", () => {
    const actual = caesar("N'R DJQQNSL", 5, false);
    const expected = "i'm yelling";
    expect(actual).to.equal(expected);
  });

  it("should leaves spaces and other symbols as is", () => {
    const actual = caesar("d phvvdjh.", 3, false);
    const expected = "a message.";
    expect(actual).to.equal(expected);
  });

  it("should appropriately handle letters at the end of the alphabet", () => {
    const actual = caesar("eee fff", 5, false);
    const expected = "zzz aaa";
    expect(actual).to.equal(expected);
  });
});
