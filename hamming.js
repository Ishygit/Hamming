function calculateParityBits(dataBits) {
    // Array to store the 21-bit Hamming code (16 data bits + 5 parity bits)
    let hammingCode = [];

    // Position the parity bits at powers of 2 and fill the rest with data bits
    let j = 0; // index for data bits
    for (let i = 1; i <= 21; i++) {
        if (Math.log2(i) % 1 === 0) {
            hammingCode[i] = 0; // placeholder for parity bits
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
                    parityValue ^= hammingCode[k];
                }
            }
            hammingCode[i] = parityValue; // set the calculated parity
        }
    }

    return hammingCode.slice(1).join(''); // return the 21-bit Hamming code as a string
}

// Example function to display the Hamming Code for a 16-bit word
function example() {
    let dataBits = "1010101111001101".split('').map(Number); // example 16-bit word
    console.log("Input Data Bits: " + dataBits.join(''));
    let hammingCode = calculateParityBits(dataBits);
    console.log("Hamming Code (21 bits): " + hammingCode);
}

// Call the example
example();
