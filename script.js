/*
|-------------------------------------------------------
| Guess Words together with their associated hints
|-------------------------------------------------------
*/
const options = {
    "KIM": "HEAD OF CREATIVES",
    "MIKE": "ANUNAKI MANAGER",
    "ROSE": "FLOWER",
    "DEO": "NOBODY",
    "BRYAN": "TRAINING",
    "DIXIE": "SONGER",
    "MANNY": "EXEC. VICE PRESIDENT",
    "VERON": "VP BSG",
    "james philip": "IT SUPPORT"
};


/*
|-------------------------------------------------------
| Initial References
|-------------------------------------------------------
*/
const message = document.getElementById("message");
const hintRef = document.querySelector(".hint-ref");
const controls = document.querySelector(".controls-container");
const card = document.querySelector(".card");

const startBtn = document.getElementById("start");
const letterContainer = document.getElementById("letter-container");
const userInpSection = document.getElementById("user-input-section");
const resultText = document.getElementById("result");
const resultText1 = document.getElementById("result1");
const resultTextL = document.getElementById("resultl");
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
    return stopGame();
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
        card1.classList.add("hide");
        init();
    } else {
        alert("Please select Player.");
    }


});


/*
|-------------------------------------------------------
| Stop Game
|-------------------------------------------------------
*/
const stopGame = () => {
    controls.classList.remove("hide");
    card1.classList.remove("hide");
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
            displayItem += '<span class="inputSpace space"></span>';
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
        const index = revealedIndices[i];
        const revealedLetter = charArray[index];
        const inputSpaceItem = inputSpace[index];
        inputSpaceItem.innerText = revealedLetter;

        // Add a specific class to the revealed letters
        inputSpaceItem.classList.add("revealed");
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
    backgroundMusic.play();
    card.classList.add('dont_show');
    generateWord();


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
                // Skip processing if the clicked button is a space
                if (button.innerText === ' ') {
                    return;
                }

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

                // If the clicked character exists in the charArray, treat it as a correct guess
                if (charArray.includes(button.innerText)) {
                    charArray.forEach((char, index) => {
                        // If character in array is same as clicked button
                        if (char === button.innerText) {
                            button.classList.add("correct");

                            // Replace dash with letter
                            inputSpace[index].innerText = char;
                            inputSpace[index].classList.remove("revealed");


                            // Increment counter
                            winCount += 1;

                            // Calculate the total number of non-space characters
                            const nonSpaceCharacters = charArray.filter(char => char !== ' ').length;

                            // If winCount equals total non-space characters
                            if (winCount === nonSpaceCharacters) {
                                resultText.innerHTML = "You Won";
                                resultText1.innerHTML = lossCount;
                                resultTextL.innerHTML = "Your Score is:";
                                applauseSound.play();
                                card.classList.remove('dont_show');

                                difficultySelect.classList.add('dont_show');
                                startBtn.classList.add('dont_show');


                                var user = $('#difficulty').val(); // Get the value of the input with id 'difficulty'
                                var score = $('#chanceCount').val();



                                $.ajax({
                                    data: {
                                        button_click: 1,
                                        user: user,
                                        score: lossCount
                                    },
                                    type: "POST",
                                    url: "action.php"
                                });

                                // Block all buttons
                                blocker();
                            }
                        }
                    });

                    // Check if the clicked letter is one of the revealed letters
                    if (Array.from(inputSpace).some(input => input.innerText === button.innerText)) {
                        // Remove the "correct" class to reset its color to white
                        button.classList.remove("correct");
                    }
                } else {
                    // Lose count
                    button.classList.add("incorrect");
                    lossCount -= 1;
                    document.getElementById("chanceCount").innerText = `Chances Left: ${lossCount}`;
                    message.innerText = `Incorrect Letter`;
                    message.style.color = "#ff0000";
                    if (lossCount === 9) {
                        document.getElementById('treasures').src = "img/1.png";
                    } else if (lossCount === 8) {
                        document.getElementById('treasures').src = "img/2.png";
                    } else if (lossCount === 7) {
                        document.getElementById('treasures').src = "img/3.png";
                    } else if (lossCount === 6) {
                        document.getElementById('treasures').src = "img/4.png";
                    } else if (lossCount === 5) {
                        document.getElementById('treasures').src = "img/5.png";
                    } else if (lossCount === 4) {
                        document.getElementById('treasures').src = "img/6.png";
                    } else if (lossCount === 3) {
                        document.getElementById('treasures').src = "img/7.png";
                    } else if (lossCount === 2) {
                        document.getElementById('treasures').src = "img/8.png";
                    } else if (lossCount === 1) {
                        document.getElementById('treasures').src = "img/9.png";
                    } else if (lossCount == 0) {
                        word.innerHTML = `The word was: <span>${randomWord}</span>`;
                        resultText.innerHTML = "Game Over";
                        resultText1.innerHTML = lossCount;
                        resultTextL.innerHTML = "Your Score is:";
                        booSound.play();


                        var user = $('#difficulty').val(); // Get the value of the input with id 'difficulty'
                        var score = $('#chanceCount').val();



                        $.ajax({
                            data: {
                                button_click: 1,
                                user: user,
                                score: lossCount
                            },
                            type: "POST",
                            url: "action.php"
                        });


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