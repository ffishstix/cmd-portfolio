// Variables
const password = "Secret Password";

const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 -_!$%^&*():"; // Added space
const randomPhaseDuration = 5000; // 5 seconds of random characters
const revealDuration = 5000; // 5 seconds of showing the full password
const cycleSpeed = 150; // Milliseconds between each character change during scramble phase

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
    const passElements = document.querySelector(".pass");
    passElements.fontSize = 12;
    passElements.textContent = text;
}

// Function to reveal the password one character at a time
function revealPassword(randomisePhase) {
    let revealedText = Array(password.length).fill(""); // Empty array for revealed text
    let cycleIndexes = Array(password.length).fill(0); // Current index in charCycleOrder for each character
    let correct = Array(password.length).fill(false); // Array to track which characters are correct

    function revealCharacter(randomisePhase) {
        // Check if all characters have been revealed correctly
        let allCorrect = true;
        for (let i = 0; i < password.length; i++) {
            if (randomisePhase){
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
            }}else {typeAndDeleteEffect();}
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

            setTimeout(revealCharacter(randomisePhase), cycleSpeed); // Continue revealing the next character
        }
    }

    revealCharacter(randomisePhase); // Start revealing the password
}

// Function to scramble the password backward and keep scrambling all previous characters
// Function to scramble the password backward progressively
function scrambleBackward() {
    let scrambledText = password.split(''); // Start with the fully revealed password
    let index = password.length - 1; // Start scrambling from the last character
    let cycleCount = 1; // Track how many characters should be scrambled at once

    // Function to scramble the characters backward progressively
    function scrambleCharacter() {
        if (index >= 0) {
            // Scramble characters starting from the last one and progressively add more
            for (let i = 0; i < cycleCount; i++) {
                if (index - i >= 0) { // Ensure we're within the bounds of the password
                    scrambledText[index - i] = getRandomChar(); // Scramble character at current index
                }
            }

            // Update the display with the progressively scrambled password
            updatePassText(scrambledText.join(''));

            // Move to the previous characters by incrementing cycleCount
            cycleCount++; // Increase the number of characters to scramble in the next cycle

            // Continue the scrambling process after a short delay
            setTimeout(scrambleCharacter, cycleSpeed);
        } else {
            console.log("Scrambling complete!");
        }
    }

    scrambleCharacter(); // Start the progressive scrambling process
}


// Function to generate random characters to fill the rest of the unrevealed characters
function getRandomString(length) {
    return Array.from({ length }, getRandomChar).join('');
}

// Function to type and delete text
let isTypingEffectActive = false;  // Flag to check if typing effect is active

// Function to start typing and deleting effect
function typeAndDeleteEffect() {
    if (isTypingEffectActive) return;  // Prevent multiple typing effects

    isTypingEffectActive = true;  // Set the flag to true when typing effect starts

    const cycleSpeed = 40;
    const text1 = "password found";
    const text2 = "to disable this type:";
    const text3 = "i dislike rainbows";
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
                        isTypingEffectActive = false; // Reset flag after typing is finished
                    });
                });
            });
        });
    });
}

let count = 10;
function startEffect(randomisePhase = true) {
    console.log("Start effect with randomisePhase:", randomisePhase);

    let randomPhaseTime = 0;

    function randomPhase() {
        if (!isTypingEffectActive) {  // Only allow scrambling if typing effect isn't active
            console.log("Scrambling...");
            displayRandomText(); // Continuously display scrambled text
            randomPhaseTime += cycleSpeed;
    
            if (randomPhaseTime < randomPhaseDuration) {
                setTimeout(randomPhase, cycleSpeed); // Continue scrambling
            } else {
                revealPassword(true); // Move to the reveal phase after the scramble time
            }
        }
    }

    randomPhase(); // Start with the random scramble phase

    setTimeout(() => {
        revealPassword(randomisePhase); // Move to reveal phase
    }, randomPhaseDuration);
}

// Example of starting the effect
startEffect(true);
export { startEffect };