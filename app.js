let hashingText=document.getElementById("hashingText");
let hashingResult=document.getElementById("hashingResult");

let hashBtn=document.getElementById("hashBtn");

async function hash(string) {
      const utf8 = new TextEncoder().encode(string);
      const hashBuffer = await crypto.subtle.digest('SHA-1', utf8);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray
        .map((bytes) => bytes.toString(16).padStart(2, '0'))
        .join('');
      return hashHex;
    }
    hashBtn.addEventListener("click",()=>
    hash(hashingText.value).then((hex) => hashingResult.value=hex))


console.log(hashingText.value)





// Filing Hashing Function

const output = document.getElementById('FileResult');
const file = document.getElementById('input');

// Run the hashing function when the user selects one or more file
file.addEventListener('change', hashTheseFiles);

// The digest function is asynchronous, it returns a promise, we use the async/await syntax to
// simplify the code.
async function fileHash(file) {
  const arrayBuffer = await file.arrayBuffer();
  // Use the subtle crypto API to perform a SHA256 Sum of the file's Array Buffer
  // The resulting hash is stored in an array buffer
  const hashAsArrayBuffer = await crypto.subtle.digest('SHA-1', arrayBuffer);

  // To display it as a string we will get the hexadecimal value of each byte of the array buffer
  // This gets us an array where each byte of the array buffer becomes one item in the array
  const uint8ViewOfHash = new Uint8Array(hashAsArrayBuffer);
  // We then convert it to a regular array so we can convert each item to hexadecimal strings
  // Where to characters of 0-9 or a-f represent a number between 0 and 16, containing 4 bits of information, so 2 of them is 8 bits (1 byte).
  const hashAsString = Array.from(uint8ViewOfHash).map((b) => b.toString(16).padStart(2, '0')).join('');
  return hashAsString;
}

async function hashTheseFiles(e) {
  let outHTML = ''
  // iterate over each file in file select input
  for (const file of this.files) {

    // calculate it's hash and list it in the output element.
    outHTML += `${await fileHash(file)}`
  }
  output.innerHTML = outHTML;
}

let fileName=document.getElementById("droppable-zone-text");
fileName.innerHTML="Drop File Here"
function getFileName(input) {
  fileName.innerHTML=input.files[0].name
}


 