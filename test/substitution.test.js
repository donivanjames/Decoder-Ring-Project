// Write your tests here!
const { expect } = require("chai");
const { substitution } = require("../src/substitution");
const mainAlphabet = "plmoknijbuhvygctfxrdzeswaq";
const uniqueAlphabet = ".^()szrdxtf&ygvuhbijnokmpl";

describe("Donivan's Substitution Tests", () => {
  describe("--Error Handling--", () => {
    it("should return false if the cypher alphabet is missing", () => {
      const actual = substitution("missing");
      expect(actual).to.be.false;
    });

    it("should return false if the cypher alphabet is not 26 characters", () => {
      const actual = substitution("short alphabet", "abcdef");
      expect(actual).to.be.false;
    });

    it("should return false if the substitution alphabet does not contain unique characters", () => {
      const alphabet = "aaaaaaabbbhheiuiiidkkksjjj";
      const actual = substitution("crouton", alphabet);
      expect(actual).to.be.false;
    });
  });

  describe("--Encoding--", () => {
    it("should encode a message by using the given substitution alphabet", () => {
      const actual = substitution("llama", mainAlphabet);
      const expected = "vvpyp";
      expect(actual).to.equal(expected);
    });

    it("should preserve spaces", () => {
      const actual = substitution("a e i o u", mainAlphabet);
      const expected = "p k b c z";
      expect(actual).to.equal(expected);
    });

    it("should work with any kind of key with unique characters", () => {
      const actual = substitution("yetti tears", uniqueAlphabet);
      const expected = "psjjx js.bi";
      expect(actual).to.equal(expected);
    });
  });

  describe("--Decoding--", () => {
    it("should decode a message by using the given substitution alphabet", () => {
      const actual = substitution("vvpyp", mainAlphabet, false);
      const expected = "llama";
      expect(actual).to.equal(expected);
    });

    it("should preserve spaces", () => {
      const actual = substitution("p k b c z", mainAlphabet, false);
      const expected = "a e i o u";
      expect(actual).to.equal(expected);
    });

    it("should work with any kind of key with unique characters", () => {
      const actual = substitution("psjjx js.bi", uniqueAlphabet, false);
      const expected = "yetti tears";
      expect(actual).to.equal(expected);
    });
  });
});
