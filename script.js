/*
|-------------------------------------------------------
| Guess Words together with their associated hints
|-------------------------------------------------------
*/
const options = {
    "pleasing": "Pleasing smell",
    "salts": "Salt's partner",
    "put": "put a stop to",
    "rise": "Rise suddenly",
    "mix": "Mix cards up",
    "add": "Add; Mix",
    "total": "Total disorder",
    "maze": "Maze",
    "interrupt": "Interrupt; upset",
    "move": "Move; Period of word",
    "device": "Device or appliance",
    "james philip": "HAHAAHA"
};


/*
|-------------------------------------------------------
| Initial References
|-------------------------------------------------------
*/
const message = document.getElementById("message");
const hintRef = document.querySelector(".hint-ref");
const controls = document.querySelector(".controls-container");
const startBtn = document.getElementById("start");
const letterContainer = document.getElementById("letter-container");
const userInpSection = document.getElementById("user-input-section");
const resultText = document.getElementById("result");
const word = document.getElementById("word");
const difficultySelect = document.getElementById("difficulty");
const words = Object.keys(options);

/*
|-------------------------------------------------------
| Variable for Sounds
|-------------------------------------------------------
*/
const wrongSound = new Audio('sounds/wrong.mp3');
const correctSound = new Audio('sounds/correct.mp3');
const applauseSound = new Audio('sounds/applause.mp3');
const booSound = new Audio('sounds/boo.mp3');
const backgroundMusic = new Audio('sounds/tre.mp3');


/*
|-------------------------------------------------------
| Variable for random words and random hints
|-------------------------------------------------------
*/
let randomWord = "",
    randomHint = "";


/*
|-------------------------------------------------------
| Variable for Counting Win or Loss
|-------------------------------------------------------
*/
let winCount = 0,
    lossCount = 0;


/*
|-------------------------------------------------------
| Generate Random Value Function
|-------------------------------------------------------
*/
const generateRandomValue = (array) => Math.floor(Math.random() * array.length);


/*
|-------------------------------------------------------
| Block all the buttons Function
|-------------------------------------------------------
*/
const blocker = () => {
    let lettersButtons = document.querySelectorAll(".letters");
    stopGame();
};


/*
|-------------------------------------------------------
| Start Game
|-------------------------------------------------------
*/
startBtn.addEventListener("click", () => {
    const selectedDifficulty = difficultySelect.value;
    if (selectedDifficulty) {
        controls.classList.add("hide");
        init();
    } else {
        alert("Please select a difficulty level.");
    }


});


/*
|-------------------------------------------------------
| Stop Game
|-------------------------------------------------------
*/
const stopGame = () => {
    controls.classList.remove("hide");
};


/*
|-------------------------------------------------------
| Generate Word Function
|-------------------------------------------------------
*/
const generateWord = () => {
    letterContainer.classList.remove("hide");
    userInpSection.innerText = "";
    randomWord = Object.keys(options)[generateRandomValue(words)];
    randomHint = options[randomWord];
    hintRef.innerHTML = `<div id="wordHint"><span>Hint: </span>${randomHint}</div>`;
    let displayItem = "";

    // Split the word into characters and spaces
    const characters = randomWord.split('');
    characters.forEach((value) => {
        if (value === ' ') {
            displayItem += '<span class="inputSpace">   </span>';
        } else {
            displayItem += '<span class="inputSpace">_</span>';
        }
    });

    // Display each element as span
    userInpSection.innerHTML = displayItem;
    userInpSection.innerHTML += `<div id='chanceCount'>Chances Left: ${lossCount}</div>`;

    // Call the function to reveal at least two correct letters
    revealLetters();
};



/*
|-------------------------------------------------------
| Function to reveal at least two correct letters in the guessed word
|-------------------------------------------------------
*/
const revealLetters = () => {
    let charArray = randomWord.toUpperCase().split("");
    let inputSpace = document.getElementsByClassName("inputSpace");
    let revealedIndices = [];

    // Randomly select two indices to reveal
    while (revealedIndices.length < 2) {
        let randomIndex = Math.floor(Math.random() * charArray.length);
        if (charArray[randomIndex] !== " " && !revealedIndices.includes(randomIndex)) {
            revealedIndices.push(randomIndex);
        }
    }

    // Update the guessed word with the correct letters 
    // at the selected indices
    for (let i = 0; i < revealedIndices.length; i++) {
        inputSpace[revealedIndices[i]].innerText = charArray[revealedIndices[i]];
    }
};


/*
|-------------------------------------------------------
| Initialization Function
|-------------------------------------------------------
*/
const init = () => {
    winCount = 0;
    lossCount = 10;
    randomWord = "";
    word.innerText = "";
    randomHint = "";
    message.innerText = "";
    userInpSection.innerHTML = "";
    letterContainer.classList.add("hide");
    letterContainer.innerHTML = "";
    generateWord();
    backgroundMusic.play();


    // For creating letter buttons
    for (let i = 65; i < 91; i++) {
        // Convert ASCII code to character
        const char = String.fromCharCode(i);

        // Skip creating a button for the space character
        if (char !== ' ') {
            let button = document.createElement("button");
            button.classList.add("letters");
            button.innerText = char;

            // Character button onclick
            button.addEventListener("click", () => {
                message.innerText = `Correct Letter`;
                message.style.color = "#008000";

                // Move the charArray declaration here
                let charArray = randomWord.toUpperCase().split("");
                let inputSpace = document.getElementsByClassName("inputSpace");

                if (!charArray.includes(button.innerText)) {
                    // Play wrong sound for wrong letter
                    wrongSound.play();
                } else {
                    // Play correct sound for correct letter
                    correctSound.play();
                }

                // Remove the clicked button from the letter container
                button.remove();

                // If the clicked character is not a space and exists in the charArray, treat it as a correct guess
                if (button.innerText !== ' ' && charArray.includes(button.innerText)) {
                    charArray.forEach((char, index) => {
                        // If character in array is same as clicked button
                        if (char === button.innerText) {
                            button.classList.add("correct");

                            // Replace dash with letter
                            inputSpace[index].innerText = char;

                            // Increment counter
                            winCount += 1;

                            // If winCount equals word length
                            if (winCount == charArray.length - randomWord.split(' ').length) {
                                resultText.innerHTML = "You Won";
                                applauseSound.play();
                                startBtn.innerText = "Restart";

                                // Block all buttons
                                blocker();
                            }
                        }
                    });
                } else {

                    // Lose count
                    button.classList.add("incorrect");
                    lossCount -= 1;
                    document.getElementById("chanceCount").innerText = `Chances Left: ${lossCount}`;
                    message.innerText = `Incorrect Letter`;
                    message.style.color = "#ff0000";
                    if (lossCount == 0) {
                        word.innerHTML = `The word was: <span>${randomWord}</span>`;
                        resultText.innerHTML = "Game Over";
                        booSound.play();
                        blocker();
                    }
                }
            });

            // Append generated buttons to the letters container
            letterContainer.appendChild(button);
        }
    }

};

/*
|-------------------------------------------------------
| Loading the Initialization Function
|-------------------------------------------------------
*/
window.onload = () => {
    init();
};