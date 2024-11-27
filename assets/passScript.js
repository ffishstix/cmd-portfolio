// Variables
const password = "Very: Secret Password";
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
    for (let element of passElements) {
        element.textContent = text;
    }
}

// Function to reveal the password one character at a time
function revealPassword(temp=false) {
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
                    correct[i] = true; // Mark the character as correct
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
            setTimeout(() => checkTempAndContinue(temp), revealDuration); // Check temp after reveal duration
        } else {
            setTimeout(revealCharacter, cycleSpeed); // Continue revealing the next character
        }
    }

    revealCharacter(); // Start revealing the password
}

// Function to scramble the password backward and keep scrambling all previous characters
function scrambleBackward(temp=false) {
    let scrambledText = password.split(''); // Start with the fully revealed password
    let index = password.length - 1; // Start scrambling from the last character

    function scrambleCharacter() {
        if (index >= 0) {
            for (let i = index; i < password.length; i++) {
                scrambledText[i] = getRandomChar(); // Continuously randomize all scrambled characters
            }

            updatePassText(scrambledText.join('')); // Update the display
            index--; // Move to the previous character

            setTimeout(() => checkTempAndContinue(temp), cycleSpeed); // Check temp after each scramble step
        } else {
            checkTempAndContinue(temp); // Check temp after scrambling is complete
        }
    }

    scrambleCharacter(); // Start scrambling the password backward
}

// Function to generate random characters to fill the rest of the unrevealed characters
function getRandomString(length) {
    return Array.from({ length }, getRandomChar).join('');
}

// Function to check temp and decide whether to continue or call typeAndDeleteEffect()
function checkTempAndContinue(temp) {
    if (temp) {
        typeAndDeleteEffect(); // If temp is true, perform the typing and deleting effect
    } else {
        scrambleBackward(temp); // Continue the effect (scrambling backward)
    }
}

// Function to type and delete text
function typeAndDeleteEffect() {
    const cycleSpeed = 100; // Time in milliseconds between each letter, you can adjust this value
    const text1 = "password found";
    const text2 = "to disable this type:";
    const text3 = "password found";

    let outputElements = document.getElementsByClassName("pass"); // Get all elements with class 'pass'

    // Function to update all elements with the class 'pass'
    function updatePassText(text) {
        // Iterate over all elements with class 'pass' and update the text
        Array.from(outputElements).forEach(element => {
            element.style.fontSize = "28px";
            element.textContent = text;
        });
    }

    // Function to type out a string letter by letter
    function typeText(text, callback) {
        let index = 0;
        function typeLetter() {
            if (index < text.length) {
                updatePassText(text.substring(0, index + 1)); // Update text up to the current letter
                index++;
                setTimeout(typeLetter, cycleSpeed);
            } else {
                callback(); // Call the callback when typing is done
            }
        }
        typeLetter();
    }

    // Function to delete a string letter by letter in reverse
    function deleteText(text, callback) {
        let index = text.length - 1;
        function deleteLetter() {
            if (index >= 0) {
                updatePassText(text.substring(0, index)); // Remove the last character
                index--;
                setTimeout(deleteLetter, cycleSpeed);
            } else {
                callback(); // Call the callback when deleting is done
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

// Main function to start the effect
function startEffect(temp=false) {
    let randomPhaseTime = 0;

    function randomPhase() {
        var element = document.getElementById("true")
        if (!temp) {
            displayRandomText();
            randomPhaseTime += cycleSpeed;
            if (randomPhaseTime >= randomPhaseDuration) {
                revealPassword(temp); // After 5 seconds, start revealing the password
            } else {
                setTimeout(randomPhase, cycleSpeed);
            }
        } else {
            console.log("password found");
            typeAndDeleteEffect();
        }
    }

    randomPhase(); // Start the random phase
}

// Start the effect when the page loads
startEffect();
export { startEffect };