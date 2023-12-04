class BrainfuckInterpreter
{
  constructor()
  {
    this.memory = new Array(30000).fill(0); //The size of the memory
    this.pointer = 0; //memory pointer
    this.code = ''; //BrainFuck code (from input_filed)
    this.codePointer = 0; //BrainFuck code pointer
    this.output = ''; //Compiled output
    //this.userInput = [];
  }

  readCode()
  {
    this.code = document.getElementById('input_field').value;
  }

  interpret()
  {
    while ( this.codePointer < this.code.length )
    {
      const instruction = this.code[this.codePointer];

      switch (instruction)
      {
        case '>':
          this.pointer++;
          break;
        case '<':
          this.pointer--;
          break;
        case '+':
          this.memory[this.pointer] = (this.memory[this.pointer] + 1) % 256; //Limiting the value of the memory cells (ASCII: 8 bit coding)
          break;
        case '-':
          this.memory[this.pointer] = (this.memory[this.pointer] + 255) % 256; //Limiting the value of the memory cells (ASCII: 8 bit coding)
          break;
        case '.':
          this.output += String.fromCharCode(this.memory[this.pointer]);
          break;
        case ',':
          //this.memory[this.pointer] = document.getElementById('input_field').value.charAt(0).charCodeAt(0);
          const userInput = prompt('Enter a character:');
          if (userInput === null || userInput === '') {
            this.memory[this.pointer] = 0;
          } else {
            this.memory[this.pointer] = userInput.charCodeAt(0) % 256;
          }
        case '[':
          if ( this.memory[this.pointer] === 0 )
          {
            this.findMatchingBracket(']');
          }
          break;
        case ']':
          if ( this.memory[this.pointer] !== 0 )
          {
            this.findMatchingBracket('[');
          }
          break;
        default:
          //Other characters are not allowed in BrainFuck
          break;
      }

      this.codePointer++;
    }

    document.getElementById('output_field').innerText = this.output;
  }

  findMatchingBracket(target)
  {
    const direction = target === ']' ? 1 : -1;
    let nestedCount = 0;

    while ( true )
    {
      this.codePointer += direction;

      if ( this.codePointer < 0 || this.codePointer >= this.code.length )
      {
      
        throw new Error('Syntax error - Unmatched brackets');
      }

      if ( this.code[this.codePointer] === target && nestedCount === 0) 
      {
        break;
      }

      if ( this.code[this.codePointer] === '[' )
      {
        nestedCount++;
      }
      else if ( this.code[this.codePointer] === ']' )
      {
        nestedCount--;
      }
    }
  }
}
  
function Compile()
{
  const interpreter = new BrainfuckInterpreter();
  console.log('Reading...');
  interpreter.readCode();
  console.log('Input code:\n' + interpreter.code);
  console.log('Compiling...');
  interpreter.interpret();
  console.log('Output:\n' + interpreter.output);
}