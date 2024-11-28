// Variables
const password = "Secret Password";

const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 -_!$%^&*():"; // Added space
const randomPhaseDuration = 5000; // 5 seconds of random characters
const revealDuration = 5000; // 5 seconds of showing the full password
const cycleSpeed = 50; // Milliseconds between each character change during scramble phase

// Create a random order of characters to cycle through
const charCycleOrder = chars.split('').sort(() => Math.random() - 0.5); // Randomize char order

// Precompute the index of each character of the password in the randomized array
const passwordIndexes = password.split('').map(char => charCycleOrder.indexOf(char));

// Function to display a string of random characters with the same length as the password
function displayRandomText() {
    const randomText = Array.from({ length: password.length }, () => getRandomChar()).join('');
    updatePassText(randomText);
}

// Function to get a random character from the charCycleOrder array
function getRandomChar() {
    return charCycleOrder[Math.floor(Math.random() * charCycleOrder.length)];
}

// Function to update the text of elements with class "pass"
function updatePassText(text) {
    const passElements = document.getElementsByClassName("pass");
    passElements.fontSize = 12;
    for (let element of passElements) {
        element.textContent = text;
    }
}

// Function to reveal the password one character at a time
function revealPassword() {
    let revealedText = Array(password.length).fill(""); // Empty array for revealed text
    let cycleIndexes = Array(password.length).fill(0); // Current index in charCycleOrder for each character
    let correct = Array(password.length).fill(false); // Array to track which characters are correct

    function revealCharacter() {
        // Check if all characters have been revealed correctly
        let allCorrect = true;
        for (let i = 0; i < password.length; i++) {
            if (!correct[i]) {
                let currentChar = charCycleOrder[cycleIndexes[i]];
                revealedText[i] = currentChar;
                // If the character doesn't match the password at this position
                if (currentChar !== password[i]) {
                    allCorrect = false;
                    cycleIndexes[i]++; // Increment to the next character in charCycleOrder
                } else {
                    correct[i] = true;
                    
                }
            }
        } 

        // Update the display with the revealed characters and random ones
        updatePassText(
            revealedText.join('') +
            getRandomString(password.length - revealedText.filter(c => c !== "").length)
        );

        // If all characters are correct, move on to the next phase
        if (allCorrect) {

            setTimeout(revealDuration);
        } else {

            setTimeout(revealCharacter, cycleSpeed); // Continue revealing the next character
        }
    }

    revealCharacter(); // Start revealing the password
}

// Function to scramble the password backward and keep scrambling all previous characters
function scrambleBackward() {
    let scrambledText = password.split(''); // Start with the fully revealed password
    let index = password.length -1; // Start scrambling from the last character

    function scrambleCharacter() {
        if (index >= 0) {
            for (let i = index; i < password.length; i++) {
                scrambledText[i] = getRandomChar(); // Continuously randomize all scrambled characters
            }
            console.log(scrambledText);
            updatePassText(scrambledText.join('')); // Update the display
            index--; // Move to the previous character

            setTimeout(cycleSpeed);
        } else {
            console.log("this shouldnt really show i dont think");
        }
    }

    scrambleCharacter(); // Start scrambling the password backward
}

// Function to generate random characters to fill the rest of the unrevealed characters
function getRandomString(length) {
    return Array.from({ length }, getRandomChar).join('');
}

// Function to type and delete text
function typeAndDeleteEffect() {
    
    const cycleSpeed = 75;
    const text1 = "password found";
    const text2 = "to disable this type:";
    const text3 = "i dislike rainbows";
    console.log("why am i here");
    let element = document.querySelector('.pass');

    // Function to update all elements with the class 'pass'
    function updatePassText(text) {
            element.style.fontSize = "28px";
            element.textContent = text;
    }

    // Function to type out a string letter by letter
    function typeText(text, callback) {
        let index = 0;
        function typeLetter() {
            if (index < text.length) {
                updatePassText(text.substring(0, index + 1));
                index++;
                setTimeout(typeLetter, cycleSpeed);
            } else {
                callback();
            }
        }
        typeLetter();
    }

    // Function to delete a string letter by letter in reverse
    function deleteText(text, callback) {
        let index = text.length - 1;
        function deleteLetter() {
            if (index >= 0) {
                updatePassText(text.substring(0, index));
                index--;
                setTimeout(deleteLetter, cycleSpeed);
            } else {
                callback();
            }
        }
        deleteLetter();
    }

    // Start the sequence
    typeText(text1, function() {
        deleteText(text1, function() {
            typeText(text2, function() {
                deleteText(text2, function() {
                    typeText(text3, function() {
                        // Final typing is done
                        console.log("All text typed and deleted.");
                    });
                });
            });
        });
    });
}

let count = 10;
function startEffect(randomisePhase=true) {
    console.log(randomisePhase);
    console.log("here one");
    let randomPhaseTime = 0;

    function randomPhase() {
        console.log("here 2");
        var element = document.getElementById("true")
        if (randomisePhase) {
            console.log("here 3");
            ;
            displayRandomText();
            randomPhaseTime += cycleSpeed;
            if (randomPhaseTime >= randomPhaseDuration) {
                revealPassword();
                console.log("here 6");
            } else {
                console.log("here 4");
                setTimeout(randomPhase(), cycleSpeed);
            }
        }else {
            console.log("here 5");
            typeAndDeleteEffect();
            
        }
        console.log(randomisePhase);
    }

    setTimeout(revealDuration);
    randomPhase();
    console.log('here', count++);
    
    
}

// Start the effect when the page loads
startEffect();
export { startEffect };