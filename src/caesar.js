// Please refrain from tampering with the setup code provided here,
// as the index.html and test files rely on this setup to work properly.
// Only add code (helper methods, variables, etc.) within the scope
// of the anonymous function on line 6

const caesarModule = (function () {

  //Split the alphabet into an array
  const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

  //Turns input into an numbered array, shifts that array, then converts the array back to letters
  function caesar(input, shift = 0, encode = true) {

    //If the shift value is equal to 0, less than -25, or greater than 25, the function should return false.
    if(shift === 0 || shift < -25 || shift > 25) return false

    //Split the input into an array
    let inputArray = input.toLowerCase().split("")

    //Convert input to numbers by matching to the alphabet array
    let indexArray = makeIndexArray(inputArray)

    //Decide which direction to shift (will be either 1 or -1)
    let shiftDirection = Math.sign(shift)
    if(!encode) shiftDirection *= -1

    //Shifts the letters in the appropriate direction
    let ShiftedArray = makeShiftedArray(indexArray, shift, shiftDirection)
    
    //Convert the array back to letters
    return makeConvertedArray(ShiftedArray).join("")
  }


  ///////////////////////////////////////////////////////////////////////////////////////////////
  //                                                                                           //
  //                                  Helper Functions                                         //
  //                                                                                           //
  // (Normally I'd put these in their own file but I don't want to break anything in the test) //
  //                                                                                           //
  ///////////////////////////////////////////////////////////////////////////////////////////////

  
  //Convert input to numbers by matching letters to the alphabet array and returning the index
  function makeIndexArray(inputArray){
    return inputArray.map(letter => {
      return alphabet.includes(letter) ? alphabet.indexOf(letter) : letter
    }) 
  }

  //Function to check for spaces and special characters
  function isSpecialCharacter(character) {
    return isNaN(character) || character == " " && character !== 0
  }

  //Shifts the letters in the appropriate direction
  function makeShiftedArray(indexArray, shift, shiftDirection) {
    return indexArray.map(letterIndex => {
    
      //Checks for special character
      if(isSpecialCharacter(letterIndex)) return letterIndex

      //Shifts the letters in the appropriate direction
      for(i = 0; i < Math.abs(shift); i++) {
        letterIndex += shiftDirection

        //Loop around if it leaves array
        if(letterIndex >= alphabet.length) letterIndex = 0
        if(letterIndex < 0) letterIndex = alphabet.length - 1
      }
      //Finally, return the new letter index
      return letterIndex
    });
  }

  //Convert the array back to letters
  function makeConvertedArray(ShiftedArray) {
    return ShiftedArray.map(letterIndex => {
      //Checks for special character
      if(isSpecialCharacter(letterIndex)) return letterIndex
      //If it's a number then return the correct letter
      return alphabet[letterIndex]
    })
  }

  return {
    caesar,
  };
})();

module.exports = { caesar: caesarModule.caesar };
