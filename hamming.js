const readline = require('readline');

function calculateParityBits(dataBits) {
    if (dataBits.length !== 16) {
        console.log("Error: You must enter exactly 16 bits.");
        return;
    }

    // Array to store the 21-bit Hamming code (16 data bits + 5 parity bits)
    let hammingCode = [];

    // Position the parity bits at powers of 2 and fill the rest with data bits
    let j = 0; // index for data bits
    for (let i = 1; i <= 21; i++) {
        if (Math.log2(i) % 1 === 0) {
            hammingCode[i] = "P" + i; // placeholder for parity bits
        } else {
            hammingCode[i] = dataBits[j];
            j++;
        }
    }

    // Calculate parity bits
    for (let i = 1; i <= 21; i++) {
        if (Math.log2(i) % 1 === 0) { // if position is a power of 2 (parity bit)
            let parityValue = 0;
            for (let k = i; k <= 21; k++) {
                if (k & i) { // if bit `k` has the parity bit `i` in its binary form
                    parityValue ^= hammingCode[k] === "1" ? 1 : 0;
                }
            }
            hammingCode[i] = parityValue.toString(); // set the calculated parity
        }
    }

    return hammingCode.slice(1); // return the 21-bit Hamming code as an array
}

function getUserInput() {
    // Set up readline to capture user input in Node.js
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question("Enter a 16-bit binary number: ", (userInput) => {
        if (!/^[01]{16}$/.test(userInput)) {
            console.log("Error: Please enter exactly 16 bits (binary 0s and 1s).");
            rl.close();
            return;
        }

        let dataBits = userInput.split('');
        console.log("Input Data Bits: " + dataBits.join(''));
        let hammingCode = calculateParityBits(dataBits);
        if (hammingCode) {
            console.log("Hamming Code with Parity Positions (21 bits): " + hammingCode.join(''));
        }
        rl.close();
    });
}

// Call the function to get user input and calculate the Hamming code
getUserInput();
