#!/home/midhun/.nvm/versions/node/v20.18.2/bin/node

import chalk from "chalk";
import keypress from "keypress";
import fs from 'fs/promises';


const paragraphs = [
    "The quick brown fox jumps over the lazy dog near the riverbank every morning.",
    "Linux is a powerful system built by a community of brilliant minds across the globe.",
    "Typing fast is a skill that improves with practice and a little bit of patience.",
  ];
  
  // State
  let textToType = paragraphs[Math.floor(Math.random() * paragraphs.length)];
let userInput  = '';
let startTime = null;
let errors = 0;
console.log(textToType)

function calculateWPM() {
    if (!startTime) return 0;
    const elapsed = (Date.now() - startTime) / 1000 / 60; 
    const words = userInput.trim().split(' ').length;
    return elapsed > 0 ? Math.round(words / elapsed) : 0;
  }
  

  function calculateAccuracy() {
    const typedLength = userInput.length;
    let correct = 0;
    for (let i = 0; i < typedLength; i++) {
      if (userInput[i] === textToType[i]) correct++;
    }
    return typedLength > 0 ? Math.round((correct / typedLength) * 100) : 100;
  }


function render(){
    process.stdout.write('\x1Bc');
    console.log(chalk.yellow('Type this:'));
    const typedPart = textToType.slice(0, userInput.length);
    const untypedPart = textToType.slice(userInput.length);
    console.log(chalk.green(typedPart) + chalk.gray(untypedPart));
    console.log(chalk.cyan('Your input:'));
    console.log(chalk.white(userInput));
    console.log(chalk.blue(`WPM: ${calculateWPM()} | Accuracy: ${calculateAccuracy()}% | Errors: ${errors}`));
}


keypress(process.stdin);

process.stdin.on('keypress',(ch,key)=>{
    if(key && key.ctrl && key.name==='c'){
      console.log('exit key')
        process.exit;
    }

    if(!startTime) startTime = Date.now();

    if(key &&key.name === 'backspace'){
        userInput = userInput.slice(0,-1);
    }else if(ch){
        userInput+=ch;
        if(userInput.length <= textToType.length && userInput[userInput.length-1] !==textToType[userInput.length - 1]){
            errors++;
        }
    }
    render();

    if(userInput === textToType){
        finish();
    }
})


async function finish(){
    process.stdin.pause();
    const wpm = calculateWPM();
    const accuracy = calculateAccuracy();
    console.log(chalk.green('\nDone!'));
    console.log(chalk.blue(`Final WPM: ${wpm} | Accuracy: ${accuracy}% | Errors: ${errors}`));
  process.exit();
}


console.log(chalk.bold('🏁 Terminal Typing Racer - Paragraph Mode 🏁'));
render();
process.stdin.setRawMode(true);
process.stdin.resume();
