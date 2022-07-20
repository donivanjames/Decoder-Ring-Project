// Please refrain from tampering with the setup code provided here,
// as the index.html and test files rely on this setup to work properly.
// Only add code (helper methods, variables, etc.) within the scope
// of the anonymous function on line 6

const polybiusModule = (function () {

  //Setup alphabet into 5x5 rows and columns
  const alphabet = [
    'a',  'b',  'c',    'd',  'e',
    'f',  'g',  'h','(i/j)',  'k',
    'l',  'm',  'n',    'o',  'p',
    'q',  'r',  's',    't',  'u',
    'v',  'w',  'x',    'y',  'z',
  ]

  function polybius(input, encode = true) {
    //if encode is false and the input without spaces is not even, return false (for decryption)
    if(!encode && input.replace(/\s+/g, '').length % 2) return false

    //Separate input into an array
    const inputArray = makeInputArray(input, encode)

    //Compare input array to alphabet grid and convert to numbers, or reverse if decrypting
    return makeEncodedArray(inputArray, encode).join("")
  }


  ///////////////////////////////////////////////////////////////////////////////////////////////
  //                                                                                           //
  //                                  Helper Functions                                         //
  //                                                                                           //
  // (Normally I'd put these in their own file but I don't want to break anything in the test) //
  //                                                                                           //
  ///////////////////////////////////////////////////////////////////////////////////////////////
  

  //Separate input into an array
  function makeInputArray(input, encode){ 
    //Jump counter will be used in the foor loop to catch spaces
    let jumpCounter = 2
    let inputArray = []

    //if encode is true, Split the input into an array
    if(encode) 
      inputArray = input.toLowerCase().split("")
    
    //If encode is false, get every second number
    else for (let i = 0; i < input.length; i += jumpCounter) //used a for loop to better control jumpCounter
      if(input[i] != " ") {
        //Add every second number in pairs of 2, then make sure jumpcounter is set to 2
        inputArray.push(input.slice(i, i+2))
        jumpCounter = 2
      }
      else {
        //Adds spaces, set jump counter to 1 so the loop doesn't skip 2 numbers
        inputArray.push(" ")
        jumpCounter = 1
      }

    return inputArray
  }

  //Encode or Decode array by row and column
  function makeEncodedArray(inputArray, encode){
    let encodedArray = []

    //For each letter in the Input Array
    inputArray.forEach(letter => {
      let col = 1, row = 1  //Declare columns and rows
      if(letter == " ") encodedArray.push(" ")  //check for spaces
      
      //If letter is not a space, encode letter
      else alphabet.forEach(character => {
        
        ////////////////////
        // Encode Message //
        ////////////////////
        if(encode) {
          //If character matches letter then push row and column as a string
          if(character.includes(letter)) //the .includes is to account for (i/j)
            encodedArray.push(`${row}${col}`)
        }
        ////////////////////
        // Decode Message //
        ////////////////////
        else {
          //If alphabet includes letter then push row and column as a string
          if(letter == `${row}${col}`) //the .includes is to account for (i/j)
            encodedArray.push(character)
        }
        ////////////////////
        // Count  Columns //
        ////////////////////
        row++
        if(row > 5) { col++; row = 1 } //If row exceeds 5 then start back at 1 and move to the next column
      })
    })
    
    return encodedArray
  }

  return {
    polybius,
  };
})();

module.exports = { polybius: polybiusModule.polybius };
