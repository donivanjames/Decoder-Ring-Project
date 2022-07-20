// Please refrain from tampering with the setup code provided here,
// as the index.html and test files rely on this setup to work properly.
// Only add code (helper methods, variables, etc.) within the scope
// of the anonymous function on line 6

const substitutionModule = (function () {
  
  function substitution(input, cypherAlphabet, encode = true) {

    //needs key to exist; can't have repeating letters;     key needs to be 26 characters
    if(!cypherAlphabet || !uniqueLetters(cypherAlphabet) || cypherAlphabet.length != 26) return false
    
    //Split the input and alphabets into an arrays
    const inputArray = input.split("")
    const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
    const cypherArray = cypherAlphabet.split("")

    //if encode === true, then encode the message. Else: decode the message
    return encode 
    //.map(if alphabet includes letter then return that index position of the cypher array, else return letter to account for spaces)
    ? inputArray.map(letter => alphabet.includes(letter)    ? cypherArray[alphabet.indexOf(letter)] : letter).join("")
    //.map(if cypher array includes letter then return that index position of the alphabet array, else return letter to account for spaces)
    : inputArray.map(letter => cypherArray.includes(letter) ? alphabet[cypherArray.indexOf(letter)] : letter).join("")
  }

  //Returns true if there are no repeating letters in the cypher key
  function uniqueLetters(cypherAlphabet){
    return cypherAlphabet.length === cypherAlphabet.split('').filter((element, index, array) => 
      array.indexOf(element) == index).join('').length
  }

  return {
    substitution,
  };
})();

module.exports = { substitution: substitutionModule.substitution };
